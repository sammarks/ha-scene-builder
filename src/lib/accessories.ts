import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  FloorRegistryEntry,
  HassEntity,
} from './ha/types'
import { type AccessoryKind, detectKind, domainOf, SUPPORTED_DOMAINS } from './capabilities'

export interface Accessory {
  entityId: string
  /** Name with the area prefix trimmed, the way HomeKit shows it in a room. */
  name: string
  fullName: string
  domain: string
  kind: AccessoryKind
  areaId: string | null
  entity: HassEntity
  available: boolean
}

export interface AreaGroup {
  areaId: string | null
  name: string
  icon: string | null
  accessories: Accessory[]
}

export interface FloorGroup {
  floorId: string | null
  name: string
  icon: string | null
  /** Position in Home Assistant's floor registry. */
  order: number
  areas: AreaGroup[]
}

export interface Registries {
  floors: FloorRegistryEntry[]
  areas: AreaRegistryEntry[]
  devices: DeviceRegistryEntry[]
  entities: EntityRegistryEntry[]
}

const supportedDomains = new Set<string>(SUPPORTED_DOMAINS)

const SEPARATOR_ONLY = /^[\s\-–—_:|·.,]+$/
const wordKey = (token: string) => token.toLowerCase().replace(/[^a-z0-9]/g, '')

/**
 * Trims the floor and room names off the front of an accessory name, the way
 * HomeKit shows "Chandelier" rather than "Main Floor Dining Room Chandelier"
 * once you are already looking at the Dining Room on the Main floor.
 *
 * Matching is done on whole phrases rather than loose words so that a genuine
 * "Floor Lamp" survives — "floor" is only dropped when it directly follows the
 * floor's own name.
 */
function stripLocationPrefix(
  name: string,
  areaName: string | null,
  floorName: string | null,
): string {
  const phrases: string[][] = []
  const push = (value: string | null, suffix?: string) => {
    if (!value) return
    const words = [...value.split(/\s+/), ...(suffix ? [suffix] : [])]
      .map(wordKey)
      .filter(Boolean)
    if (words.length) phrases.push(words)
  }

  // "Main Floor" before "Main", so the longer match wins.
  push(floorName, 'floor')
  push(floorName)
  push(areaName)
  if (!phrases.length) return name

  const tokens = name.split(/\s+/)
  let cursor = 0

  const matchAt = (start: number, phrase: string[]): number | null => {
    let index = start
    for (const word of phrase) {
      while (index < tokens.length && SEPARATOR_ONLY.test(tokens[index])) index++
      if (index >= tokens.length || wordKey(tokens[index]) !== word) return null
      index++
    }
    return index
  }

  // Keep consuming location phrases in whatever order they were written.
  for (;;) {
    let next: number | null = null
    for (const phrase of phrases) {
      const end = matchAt(cursor, phrase)
      if (end !== null) {
        next = end
        break
      }
    }
    if (next === null) break
    cursor = next
  }

  const remainder = tokens
    .slice(cursor)
    .join(' ')
    .replace(/^[\s\-–—_:|·.,]+/, '')
    .trim()

  // Stripping everything, or down to a bare "2", helps nobody.
  return remainder.length >= 2 ? remainder : name
}

export function buildAccessories(
  states: HassEntity[],
  registries: Registries,
  kindOverrides: Record<string, AccessoryKind>,
): Accessory[] {
  const entityById = new Map(registries.entities.map((entry) => [entry.entity_id, entry]))
  const deviceById = new Map(registries.devices.map((device) => [device.id, device]))
  const areaById = new Map(registries.areas.map((area) => [area.area_id, area]))
  const floorNameById = new Map(registries.floors.map((floor) => [floor.floor_id, floor.name]))

  const accessories: Accessory[] = []

  for (const entity of states) {
    const domain = domainOf(entity.entity_id)
    if (!supportedDomains.has(domain)) continue

    const registryEntry = entityById.get(entity.entity_id)
    if (registryEntry) {
      if (registryEntry.disabled_by || registryEntry.hidden_by) continue
      // Config and diagnostic entities are plumbing, not accessories.
      if (registryEntry.entity_category) continue
    }

    let areaId = registryEntry?.area_id ?? null
    if (!areaId && registryEntry?.device_id) {
      areaId = deviceById.get(registryEntry.device_id)?.area_id ?? null
    }

    const fullName =
      registryEntry?.name ||
      entity.attributes.friendly_name ||
      registryEntry?.original_name ||
      entity.entity_id

    const area = areaId ? areaById.get(areaId) : undefined
    const floorName = area?.floor_id ? (floorNameById.get(area.floor_id) ?? null) : null

    accessories.push({
      entityId: entity.entity_id,
      fullName,
      name: stripLocationPrefix(fullName, area?.name ?? null, floorName),
      domain,
      kind: kindOverrides[entity.entity_id] ?? detectKind(entity),
      areaId,
      entity,
      available: entity.state !== 'unavailable' && entity.state !== 'unknown',
    })
  }

  return accessories
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

/**
 * Groups accessories the way HomeKit does: floor, then room, then accessory.
 * Anything without a room lands in a trailing "Unassigned" bucket rather than
 * disappearing.
 *
 * Floors and rooms keep the order Home Assistant returns them in. That order is
 * meaningful, not incidental: `config/{area,floor}_registry/reorder` persists a
 * user's arrangement as registry insertion order, and the matching `list`
 * commands hand it back untouched. Sorting alphabetically here would throw away
 * exactly the arrangement the user set up in Home Assistant.
 */
export function groupByFloorAndArea(
  accessories: Accessory[],
  registries: Registries,
): FloorGroup[] {
  const areaById = new Map(registries.areas.map((area) => [area.area_id, area]))
  const floorById = new Map(registries.floors.map((floor) => [floor.floor_id, floor]))
  const areaOrder = new Map(registries.areas.map((area, index) => [area.area_id, index]))
  const floorOrder = new Map(registries.floors.map((floor, index) => [floor.floor_id, index]))

  const byArea = new Map<string | null, Accessory[]>()
  for (const accessory of accessories) {
    const key = accessory.areaId && areaById.has(accessory.areaId) ? accessory.areaId : null
    const list = byArea.get(key)
    if (list) list.push(accessory)
    else byArea.set(key, [accessory])
  }

  const byFloor = new Map<string | null, AreaGroup[]>()
  for (const [areaId, list] of byArea) {
    const area = areaId ? areaById.get(areaId) : undefined
    const floorId = area?.floor_id && floorById.has(area.floor_id) ? area.floor_id : null

    const group: AreaGroup = {
      areaId,
      name: area?.name ?? 'No Room',
      icon: area?.icon ?? null,
      accessories: list.sort((a, b) => collator.compare(a.name, b.name)),
    }

    const groups = byFloor.get(floorId)
    if (groups) groups.push(group)
    else byFloor.set(floorId, [group])
  }

  const floors: FloorGroup[] = []
  for (const [floorId, areas] of byFloor) {
    const floor = floorId ? floorById.get(floorId) : undefined
    floors.push({
      floorId,
      name: floor?.name ?? 'Unassigned',
      icon: floor?.icon ?? null,
      order: floorId ? (floorOrder.get(floorId) ?? Number.MAX_SAFE_INTEGER) : Number.MAX_SAFE_INTEGER,
      areas: areas.sort((a, b) => {
        if (a.areaId === null) return 1
        if (b.areaId === null) return -1
        return (areaOrder.get(a.areaId) ?? 0) - (areaOrder.get(b.areaId) ?? 0)
      }),
    })
  }

  // The catch-all bucket always trails the real floors.
  return floors.sort((a, b) => {
    if (a.floorId === null) return 1
    if (b.floorId === null) return -1
    return a.order - b.order
  })
}

/** Drops empty areas and floors from an already-built grouping. */
export function pruneEmpty(floors: FloorGroup[]): FloorGroup[] {
  return floors
    .map((floor) => ({ ...floor, areas: floor.areas.filter((area) => area.accessories.length) }))
    .filter((floor) => floor.areas.length)
}

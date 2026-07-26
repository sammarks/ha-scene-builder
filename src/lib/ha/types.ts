export interface HassEntity {
  entity_id: string
  state: string
  attributes: Record<string, any>
  last_changed?: string
  last_updated?: string
}

export interface FloorRegistryEntry {
  floor_id: string
  name: string
  level: number | null
  icon: string | null
  aliases?: string[]
}

export interface AreaRegistryEntry {
  area_id: string
  name: string
  floor_id: string | null
  icon: string | null
  aliases?: string[]
}

export interface DeviceRegistryEntry {
  id: string
  area_id: string | null
  name: string | null
  name_by_user: string | null
  disabled_by: string | null
}

export interface EntityRegistryEntry {
  entity_id: string
  device_id: string | null
  area_id: string | null
  name: string | null
  original_name: string | null
  platform: string
  disabled_by: string | null
  hidden_by: string | null
  entity_category: string | null
}

/**
 * A scene as stored in `scenes.yaml`, which is also the shape the
 * `/api/config/scene/config/<id>` endpoint reads and writes.
 *
 * `entities` maps an entity_id to either a bare state string (`"on"`) or a
 * dict of the state plus the attributes to reproduce (`{state: "on", brightness: 180}`).
 */
export interface SceneConfig {
  id?: string
  name: string
  icon?: string
  entities: Record<string, string | Record<string, any>>
  metadata?: Record<string, any>
}

/** A scene as it appears in the state machine. */
export interface SceneSummary {
  entity_id: string
  /** The `scenes.yaml` id. Only present on scenes that are editable via the API. */
  configId: string | null
  name: string
  icon: string | null
  entityCount: number
}

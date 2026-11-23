import type { HassEntity } from './ha/types'

/**
 * Per-accessory scene conditions.
 *
 * Home Assistant scenes have no notion of conditions, so the integration adds
 * them: an accessory with conditions is written to the scene's `metadata`
 * rather than its `entities`, and the integration applies it on activation
 * only if its conditions pass. See custom_components/scene_builder/conditions.py.
 *
 * What is stored is Home Assistant's own condition format, so the server can
 * hand it straight to the condition engine automations use. This module maps
 * the handful of shapes the editor offers onto that format and back. Anything
 * it does not recognise — a template, a zone condition written by hand — is
 * kept as `custom` and written back untouched.
 */

export type HaCondition = Record<string, any>
export type ConditionMatch = 'all' | 'any'
export type SunEvent = 'sunrise' | 'sunset'

export const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
export type Weekday = (typeof WEEKDAYS)[number]

export type SceneCondition =
  | { kind: 'sun'; up: boolean }
  | {
      kind: 'sun_event'
      after: SunEvent | null
      /** Minutes; negative is earlier. */
      afterOffset: number
      before: SunEvent | null
      beforeOffset: number
    }
  | { kind: 'time'; after: string | null; before: string | null; weekdays: Weekday[] }
  /** `who` is "anyone" or a person entity. */
  | { kind: 'presence'; who: string; home: boolean }
  | { kind: 'state'; entityId: string; state: string; negate: boolean }
  | { kind: 'numeric'; entityId: string; above: number | null; below: number | null }
  | { kind: 'custom'; raw: HaCondition }

export interface EntityConditions {
  match: ConditionMatch
  conditions: SceneCondition[]
}

/** What lives under `metadata[entity_id].scene_builder` in scenes.yaml. */
export interface StoredConditional {
  state: Record<string, any> | string
  match?: ConditionMatch
  conditions: HaCondition[]
}

export const METADATA_KEY = 'scene_builder'

export const CONDITION_PRESETS: { value: string; label: string; make: () => SceneCondition }[] = [
  { value: 'sun_up', label: 'Sun is up', make: () => ({ kind: 'sun', up: true }) },
  { value: 'sun_down', label: 'Sun is down', make: () => ({ kind: 'sun', up: false }) },
  {
    value: 'sun_event',
    label: 'Before or after sunrise / sunset',
    make: () => ({ kind: 'sun_event', after: 'sunrise', afterOffset: 0, before: null, beforeOffset: 0 }),
  },
  {
    value: 'time',
    label: 'Time of day or day of week',
    make: () => ({ kind: 'time', after: '07:00', before: '10:00', weekdays: [] }),
  },
  {
    value: 'anyone_home',
    label: 'Someone is home',
    make: () => ({ kind: 'presence', who: 'anyone', home: true }),
  },
  {
    value: 'nobody_home',
    label: 'Nobody is home',
    make: () => ({ kind: 'presence', who: 'anyone', home: false }),
  },
  {
    value: 'person',
    label: 'A specific person is home or away',
    make: () => ({ kind: 'presence', who: '', home: true }),
  },
  {
    value: 'state',
    label: 'An accessory or sensor is in a state',
    make: () => ({ kind: 'state', entityId: '', state: '', negate: false }),
  },
  {
    value: 'numeric',
    label: 'A sensor reading is above or below',
    make: () => ({ kind: 'numeric', entityId: '', above: null, below: null }),
  },
]

// ---------------------------------------------------------------------------
// Serialisation
// ---------------------------------------------------------------------------

function offsetToString(minutes: number): string {
  const sign = minutes < 0 ? '-' : ''
  const abs = Math.abs(Math.round(minutes))
  const h = String(Math.floor(abs / 60)).padStart(2, '0')
  const m = String(abs % 60).padStart(2, '0')
  return `${sign}${h}:${m}:00`
}

/** Parses "-01:30:00" / "00:45" / seconds into minutes. Null if unrecognised. */
function parseOffset(value: unknown): number | null {
  if (value == null) return 0
  if (typeof value === 'number') return Math.round(value / 60)
  if (typeof value !== 'string') return null
  const match = /^(-)?(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim())
  if (!match) return null
  const minutes = Number(match[2]) * 60 + Number(match[3]) + Number(match[4] ?? 0) / 60
  return Math.round(match[1] ? -minutes : minutes)
}

function toTimeString(hhmm: string): string {
  return hhmm.length === 5 ? `${hhmm}:00` : hhmm
}

/** "07:00:00" → "07:00"; null for entity references and other shapes. */
function parseTime(value: unknown): string | null | undefined {
  if (value == null) return null
  if (typeof value !== 'string') return undefined
  const match = /^(\d{2}):(\d{2})(?::\d{2})?$/.exec(value)
  return match ? `${match[1]}:${match[2]}` : undefined
}

function singleEntity(value: unknown): string | null {
  if (typeof value === 'string' && !value.includes(',')) return value
  if (Array.isArray(value) && value.length === 1 && typeof value[0] === 'string') return value[0]
  return null
}

function singleState(value: unknown): string | null {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (Array.isArray(value) && value.length === 1) return String(value[0])
  return null
}

const not = (condition: HaCondition): HaCondition => ({ condition: 'not', conditions: [condition] })

export function toHaCondition(condition: SceneCondition): HaCondition {
  switch (condition.kind) {
    case 'sun':
      return {
        condition: 'state',
        entity_id: 'sun.sun',
        state: condition.up ? 'above_horizon' : 'below_horizon',
      }
    case 'sun_event': {
      const result: HaCondition = { condition: 'sun' }
      if (condition.after) {
        result.after = condition.after
        if (condition.afterOffset) result.after_offset = offsetToString(condition.afterOffset)
      }
      if (condition.before) {
        result.before = condition.before
        if (condition.beforeOffset) result.before_offset = offsetToString(condition.beforeOffset)
      }
      return result
    }
    case 'time': {
      const result: HaCondition = { condition: 'time' }
      if (condition.after) result.after = toTimeString(condition.after)
      if (condition.before) result.before = toTimeString(condition.before)
      if (condition.weekdays.length) {
        result.weekday = WEEKDAYS.filter((day) => condition.weekdays.includes(day))
      }
      return result
    }
    case 'presence': {
      if (condition.who === 'anyone') {
        return condition.home
          ? { condition: 'numeric_state', entity_id: 'zone.home', above: 0 }
          : { condition: 'numeric_state', entity_id: 'zone.home', below: 1 }
      }
      const home = { condition: 'state', entity_id: condition.who, state: 'home' }
      // "Away" means anywhere but home — at work counts — so it is "not home"
      // rather than the literal `not_home` state.
      return condition.home ? home : not(home)
    }
    case 'state': {
      const base = { condition: 'state', entity_id: condition.entityId, state: condition.state }
      return condition.negate ? not(base) : base
    }
    case 'numeric': {
      const result: HaCondition = { condition: 'numeric_state', entity_id: condition.entityId }
      if (condition.above != null) result.above = condition.above
      if (condition.below != null) result.below = condition.below
      return result
    }
    case 'custom':
      return condition.raw
  }
}

const KNOWN_KEYS: Record<string, string[]> = {
  state: ['condition', 'entity_id', 'state'],
  numeric_state: ['condition', 'entity_id', 'above', 'below'],
  sun: ['condition', 'after', 'after_offset', 'before', 'before_offset'],
  time: ['condition', 'after', 'before', 'weekday'],
}

/** True when every key is one this module knows how to round-trip. */
function onlyKnownKeys(raw: HaCondition): boolean {
  const known = KNOWN_KEYS[raw.condition]
  return !!known && Object.keys(raw).every((key) => known.includes(key))
}

function parseSimple(raw: HaCondition): SceneCondition | null {
  if (!raw || typeof raw !== 'object' || !onlyKnownKeys(raw)) return null

  switch (raw.condition) {
    case 'state': {
      const entityId = singleEntity(raw.entity_id)
      const state = singleState(raw.state)
      if (!entityId || state == null) return null
      if (entityId === 'sun.sun' && (state === 'above_horizon' || state === 'below_horizon')) {
        return { kind: 'sun', up: state === 'above_horizon' }
      }
      if (entityId.startsWith('person.') && state === 'home') {
        return { kind: 'presence', who: entityId, home: true }
      }
      return { kind: 'state', entityId, state, negate: false }
    }
    case 'numeric_state': {
      const entityId = singleEntity(raw.entity_id)
      if (!entityId) return null
      const above = raw.above == null ? null : Number(raw.above)
      const below = raw.below == null ? null : Number(raw.below)
      if ((above != null && Number.isNaN(above)) || (below != null && Number.isNaN(below))) {
        return null
      }
      if (entityId === 'zone.home') {
        if (above === 0 && below == null) return { kind: 'presence', who: 'anyone', home: true }
        if (below === 1 && above == null) return { kind: 'presence', who: 'anyone', home: false }
      }
      return { kind: 'numeric', entityId, above, below }
    }
    case 'sun': {
      const isEvent = (value: unknown) => value == null || value === 'sunrise' || value === 'sunset'
      if (!isEvent(raw.after) || !isEvent(raw.before)) return null
      const afterOffset = parseOffset(raw.after_offset)
      const beforeOffset = parseOffset(raw.before_offset)
      if (afterOffset == null || beforeOffset == null) return null
      return {
        kind: 'sun_event',
        after: raw.after ?? null,
        afterOffset,
        before: raw.before ?? null,
        beforeOffset,
      }
    }
    case 'time': {
      const after = parseTime(raw.after)
      const before = parseTime(raw.before)
      if (after === undefined || before === undefined) return null
      const weekdayList =
        raw.weekday == null ? [] : Array.isArray(raw.weekday) ? raw.weekday : [raw.weekday]
      if (!weekdayList.every((day: unknown) => WEEKDAYS.includes(day as Weekday))) return null
      return { kind: 'time', after, before, weekdays: weekdayList as Weekday[] }
    }
  }
  return null
}

export function fromHaCondition(raw: HaCondition): SceneCondition {
  if (
    raw &&
    raw.condition === 'not' &&
    Object.keys(raw).length === 2 &&
    Array.isArray(raw.conditions) &&
    raw.conditions.length === 1
  ) {
    const inner = parseSimple(raw.conditions[0])
    if (inner?.kind === 'presence' && inner.who !== 'anyone' && inner.home) {
      return { ...inner, home: false }
    }
    if (inner?.kind === 'state') return { ...inner, negate: true }
  }
  return parseSimple(raw) ?? { kind: 'custom', raw }
}

/** Reads the conditional accessories out of a scene's metadata. */
export function readConditionals(
  metadata: Record<string, any> | undefined,
): Record<string, StoredConditional> {
  const result: Record<string, StoredConditional> = {}
  for (const [entityId, meta] of Object.entries(metadata ?? {})) {
    const entry = meta && typeof meta === 'object' ? meta[METADATA_KEY] : null
    if (entry && typeof entry === 'object' && entry.state != null) {
      result[entityId] = {
        state: entry.state,
        match: entry.match === 'any' ? 'any' : 'all',
        conditions: Array.isArray(entry.conditions) ? entry.conditions : [],
      }
    }
  }
  return result
}

export function toStoredConditions(value: EntityConditions): {
  match: ConditionMatch
  conditions: HaCondition[]
} {
  return { match: value.match, conditions: value.conditions.map(toHaCondition) }
}

// ---------------------------------------------------------------------------
// Validation and description
// ---------------------------------------------------------------------------

/** A problem the editor can catch before asking Home Assistant. */
export function conditionProblem(condition: SceneCondition): string | null {
  switch (condition.kind) {
    case 'sun_event':
      return condition.after || condition.before ? null : 'Choose sunrise or sunset.'
    case 'time':
      return condition.after || condition.before || condition.weekdays.length
        ? null
        : 'Choose a time or at least one day.'
    case 'presence':
      return condition.who ? null : 'Choose a person.'
    case 'state':
      if (!condition.entityId) return 'Choose an accessory or sensor.'
      return condition.state ? null : 'Choose a state.'
    case 'numeric':
      if (!condition.entityId) return 'Choose a sensor.'
      return condition.above != null || condition.below != null
        ? null
        : 'Set an "above" or "below" value.'
    default:
      return null
  }
}

const nameOf = (entityId: string, states: Record<string, HassEntity>) =>
  states[entityId]?.attributes.friendly_name ?? entityId

function describeOffset(minutes: number): string {
  if (!minutes) return ''
  const abs = Math.abs(minutes)
  const text = abs % 60 === 0 ? `${abs / 60} h` : abs > 60 ? `${Math.floor(abs / 60)} h ${abs % 60} min` : `${abs} min`
  return minutes < 0 ? ` − ${text}` : ` + ${text}`
}

const DAY_LABELS: Record<Weekday, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

export function weekdayLabel(day: Weekday): string {
  return DAY_LABELS[day]
}

function describeDays(days: Weekday[]): string {
  const set = new Set(days)
  if (set.size === 5 && !set.has('sat') && !set.has('sun')) return 'weekdays'
  if (set.size === 2 && set.has('sat') && set.has('sun')) return 'weekends'
  return WEEKDAYS.filter((day) => set.has(day)).map(weekdayLabel).join(', ')
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const date = new Date(2000, 0, 1, h, m)
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function describeCondition(
  condition: SceneCondition,
  states: Record<string, HassEntity>,
): string {
  switch (condition.kind) {
    case 'sun':
      return condition.up ? 'Sun is up' : 'Sun is down'
    case 'sun_event': {
      const parts: string[] = []
      if (condition.after) parts.push(`after ${condition.after}${describeOffset(condition.afterOffset)}`)
      if (condition.before) parts.push(`before ${condition.before}${describeOffset(condition.beforeOffset)}`)
      const text = parts.join(' and ') || 'Sunrise / sunset'
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
    case 'time': {
      const parts: string[] = []
      if (condition.after && condition.before) {
        parts.push(`${formatTime(condition.after)}–${formatTime(condition.before)}`)
      } else if (condition.after) {
        parts.push(`After ${formatTime(condition.after)}`)
      } else if (condition.before) {
        parts.push(`Before ${formatTime(condition.before)}`)
      }
      if (condition.weekdays.length) parts.push(describeDays(condition.weekdays))
      if (!parts.length) return 'Any time'
      const text = parts.join(' on ')
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
    case 'presence':
      if (condition.who === 'anyone') return condition.home ? 'Someone is home' : 'Nobody is home'
      if (!condition.who) return condition.home ? 'A person is home' : 'A person is away'
      return `${nameOf(condition.who, states)} is ${condition.home ? 'home' : 'away'}`
    case 'state':
      if (!condition.entityId) return 'An accessory is in a state'
      return `${nameOf(condition.entityId, states)} is ${condition.negate ? 'not ' : ''}${condition.state || '…'}`
    case 'numeric': {
      if (!condition.entityId) return 'A sensor reading'
      const unit = states[condition.entityId]?.attributes.unit_of_measurement ?? ''
      const fmt = (value: number) => `${value}${unit ? ` ${unit}` : ''}`
      const name = nameOf(condition.entityId, states)
      if (condition.above != null && condition.below != null) {
        return `${name} between ${fmt(condition.above)} and ${fmt(condition.below)}`
      }
      if (condition.above != null) return `${name} above ${fmt(condition.above)}`
      if (condition.below != null) return `${name} below ${fmt(condition.below)}`
      return name
    }
    case 'custom':
      return 'Custom condition'
  }
}

export function describeConditions(
  value: EntityConditions,
  states: Record<string, HassEntity>,
): string {
  const parts = value.conditions.map((condition) => describeCondition(condition, states))
  if (parts.length <= 1) return parts[0] ?? ''
  return parts.join(value.match === 'any' ? ' or ' : ' and ')
}

export function conditionIcon(condition: SceneCondition) {
  switch (condition.kind) {
    case 'sun':
      return 'sun' as const
    case 'sun_event':
      return 'sunset' as const
    case 'time':
      return 'clock' as const
    case 'presence':
      return 'account' as const
    case 'state':
      return 'state' as const
    case 'numeric':
      return 'gauge' as const
    case 'custom':
      return 'code' as const
  }
}

// ---------------------------------------------------------------------------
// Suggestions for the editor
// ---------------------------------------------------------------------------

const DOMAIN_STATES: Record<string, string[]> = {
  binary_sensor: ['on', 'off'],
  input_boolean: ['on', 'off'],
  switch: ['on', 'off'],
  light: ['on', 'off'],
  fan: ['on', 'off'],
  cover: ['open', 'closed', 'opening', 'closing'],
  lock: ['locked', 'unlocked', 'jammed'],
  media_player: ['playing', 'paused', 'idle', 'on', 'off', 'standby'],
  alarm_control_panel: [
    'disarmed',
    'armed_home',
    'armed_away',
    'armed_night',
    'armed_vacation',
    'triggered',
  ],
  person: ['home', 'not_home'],
  device_tracker: ['home', 'not_home'],
  climate: ['off', 'heat', 'cool', 'heat_cool', 'auto', 'dry', 'fan_only'],
  vacuum: ['cleaning', 'docked', 'idle', 'returning', 'paused'],
  weather: [
    'sunny',
    'clear-night',
    'partlycloudy',
    'cloudy',
    'rainy',
    'pouring',
    'snowy',
    'fog',
    'windy',
    'lightning-rainy',
  ],
}

/** States worth offering for an entity: what its domain can be, plus what it is now. */
export function suggestedStates(entity: HassEntity | undefined): string[] {
  if (!entity) return []
  const domain = entity.entity_id.split('.')[0]
  const options = new Set<string>(DOMAIN_STATES[domain] ?? [])
  if (Array.isArray(entity.attributes.options)) {
    for (const option of entity.attributes.options) options.add(String(option))
  }
  if (!['unavailable', 'unknown'].includes(entity.state)) options.add(entity.state)
  return [...options]
}

export function isNumericEntity(entity: HassEntity): boolean {
  return (
    (entity.entity_id.startsWith('sensor.') ||
      entity.entity_id.startsWith('input_number.') ||
      entity.entity_id.startsWith('number.')) &&
    (entity.attributes.unit_of_measurement != null ||
      entity.attributes.state_class != null ||
      !Number.isNaN(Number(entity.state)))
  )
}

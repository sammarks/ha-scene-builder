import type { HassEntity } from './ha/types'

/** The value we store for one entity inside a scene: a state plus attributes. */
export type SceneEntityState = { state: string } & Record<string, any>

export const FAN_FEATURES = {
  SET_SPEED: 1,
  OSCILLATE: 2,
  DIRECTION: 4,
  PRESET_MODE: 8,
}

export const COVER_FEATURES = {
  OPEN: 1,
  CLOSE: 2,
  SET_POSITION: 4,
  STOP: 8,
  OPEN_TILT: 16,
  CLOSE_TILT: 32,
  STOP_TILT: 64,
  SET_TILT_POSITION: 128,
}

export const MEDIA_FEATURES = {
  PAUSE: 1,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  TURN_ON: 128,
  TURN_OFF: 256,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384,
  SELECT_SOUND_MODE: 65536,
}

export const CLIMATE_FEATURES = {
  TARGET_TEMPERATURE: 1,
  TARGET_TEMPERATURE_RANGE: 2,
  TARGET_HUMIDITY: 4,
  FAN_MODE: 8,
  PRESET_MODE: 16,
  SWING_MODE: 32,
}

export function supports(entity: HassEntity, feature: number): boolean {
  return ((entity.attributes.supported_features || 0) & feature) !== 0
}

/** Domains offered as scene accessories. Everything else is hidden. */
export const SUPPORTED_DOMAINS = [
  'light',
  'switch',
  'fan',
  'cover',
  'media_player',
  'climate',
  'lock',
  'input_boolean',
  'humidifier',
  'valve',
  'water_heater',
  'siren',
  'automation',
  'script',
] as const

export function domainOf(entityId: string): string {
  return entityId.split('.')[0]
}

/**
 * The category an accessory is presented as. This drives the icon and the
 * filter chips, and is what an outlet override changes.
 */
export type AccessoryKind =
  | 'light'
  | 'fan'
  | 'shade'
  | 'media'
  | 'outlet'
  | 'switch'
  | 'climate'
  | 'lock'
  | 'other'

/** What the user can force an ambiguous switch/outlet to be presented as. */
export const KIND_OVERRIDES: { value: AccessoryKind; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'fan', label: 'Fan' },
  { value: 'outlet', label: 'Outlet' },
  { value: 'switch', label: 'Switch' },
  { value: 'other', label: 'Other' },
]

/** Only switch-like things are ambiguous enough to be worth reclassifying. */
export function canOverrideKind(entityId: string): boolean {
  const domain = domainOf(entityId)
  return domain === 'switch' || domain === 'input_boolean'
}

export function detectKind(entity: HassEntity): AccessoryKind {
  const domain = domainOf(entity.entity_id)
  const deviceClass = entity.attributes.device_class as string | undefined

  switch (domain) {
    case 'light':
      return 'light'
    case 'fan':
      return 'fan'
    case 'cover':
      return 'shade'
    case 'media_player':
      return 'media'
    case 'climate':
    case 'water_heater':
    case 'humidifier':
      return 'climate'
    case 'lock':
      return 'lock'
    case 'switch':
      return deviceClass === 'outlet' ? 'outlet' : 'switch'
    case 'input_boolean':
      return 'switch'
    default:
      return 'other'
  }
}

/**
 * A better default icon than the generic per-kind one, using the device class
 * Home Assistant reports — a HomePod should not look like a television.
 */
export function accessoryIconName(entity: HassEntity, kind: AccessoryKind): string {
  const domain = domainOf(entity.entity_id)
  const deviceClass = entity.attributes.device_class as string | undefined

  if (domain === 'media_player') {
    if (deviceClass === 'speaker') return 'speaker'
    if (deviceClass === 'receiver') return 'volume-high'
    return 'television'
  }

  if (domain === 'cover') {
    switch (deviceClass) {
      case 'curtain':
        return 'curtains'
      case 'shutter':
      case 'awning':
        return 'window-shutter'
      case 'garage':
        return 'garage'
      case 'door':
        return 'door'
      case 'window':
        return 'window-open'
      default:
        return 'blinds-horizontal'
    }
  }

  if (domain === 'light') {
    return lightCaps(entity).brightness ? 'lightbulb' : 'ceiling-light'
  }

  if (domain === 'climate') {
    if (deviceClass === 'humidifier') return 'water-percent'
    return 'thermostat'
  }

  if (domain === 'humidifier') return 'water-percent'
  if (domain === 'water_heater') return 'water'
  if (domain === 'valve') return 'water'

  return KIND_ICON_NAMES[kind]
}

/** Fallback icon per accessory kind. Mirrors KIND_ICONS in icons.generated.ts. */
const KIND_ICON_NAMES: Record<AccessoryKind, string> = {
  light: 'lightbulb',
  fan: 'fan',
  shade: 'blinds-horizontal',
  media: 'television',
  outlet: 'power-socket-us',
  switch: 'toggle-switch-outline',
  climate: 'thermostat',
  lock: 'lock',
  other: 'shape-outline',
}

// ---------------------------------------------------------------------------
// Light
// ---------------------------------------------------------------------------

export interface LightCaps {
  brightness: boolean
  colorTemp: boolean
  color: boolean
  minKelvin: number
  maxKelvin: number
}

/** Pre-colour-mode light feature bits, still used by some integrations. */
const LEGACY_LIGHT_FEATURES = { BRIGHTNESS: 1, COLOR_TEMP: 2, COLOR: 16 }

export function lightCaps(entity: HassEntity): LightCaps {
  const modes: string[] = entity.attributes.supported_color_modes || []
  const declared = modes.filter((mode) => mode !== 'unknown')
  const features = entity.attributes.supported_features || 0

  // Colour modes are the modern source of truth, but plenty of integrations —
  // older ones, and custom ones in particular — never report them. Rather than
  // calling a dimmer an on/off switch, fall back to the legacy feature bits and
  // then to the plain fact that the light is reporting a brightness value.
  const usingColorModes = declared.length > 0
  const legacyBrightness =
    (features & LEGACY_LIGHT_FEATURES.BRIGHTNESS) !== 0 ||
    entity.attributes.brightness != null

  return {
    brightness: usingColorModes
      ? declared.some((mode) => mode !== 'onoff')
      : legacyBrightness,
    colorTemp: usingColorModes
      ? declared.includes('color_temp')
      : (features & LEGACY_LIGHT_FEATURES.COLOR_TEMP) !== 0 ||
        entity.attributes.color_temp_kelvin != null,
    color: usingColorModes
      ? declared.some((mode) => ['hs', 'xy', 'rgb', 'rgbw', 'rgbww'].includes(mode))
      : (features & LEGACY_LIGHT_FEATURES.COLOR) !== 0 || entity.attributes.hs_color != null,
    minKelvin: entity.attributes.min_color_temp_kelvin ?? 2000,
    maxKelvin: entity.attributes.max_color_temp_kelvin ?? 6535,
  }
}

export const brightnessToPercent = (brightness: number | undefined): number =>
  brightness == null ? 100 : Math.max(1, Math.round((brightness / 255) * 100))

export const percentToBrightness = (percent: number): number =>
  Math.max(1, Math.min(255, Math.round((percent / 100) * 255)))

// ---------------------------------------------------------------------------
// Snapshotting the live state
// ---------------------------------------------------------------------------

/**
 * Builds the scene value for an entity from whatever it is doing right now —
 * the same "snapshot what I see" behaviour HomeKit and the HA scene editor use
 * when you add an accessory.
 */
export function captureState(entity: HassEntity): SceneEntityState {
  const domain = domainOf(entity.entity_id)
  const attrs = entity.attributes
  const live = entity.state
  const isOn = live === 'on' || live === 'open' || live === 'playing'

  switch (domain) {
    case 'light': {
      if (!isOn) return { state: 'off' }
      const caps = lightCaps(entity)
      const value: SceneEntityState = { state: 'on' }
      if (caps.brightness && attrs.brightness != null) value.brightness = attrs.brightness
      if (attrs.color_mode === 'color_temp' && attrs.color_temp_kelvin != null) {
        value.color_temp_kelvin = attrs.color_temp_kelvin
      } else if (caps.color && attrs.hs_color) {
        value.hs_color = [
          Math.round(attrs.hs_color[0]),
          Math.round(attrs.hs_color[1]),
        ]
      }
      return value
    }

    case 'fan': {
      if (live !== 'on') return { state: 'off' }
      const value: SceneEntityState = { state: 'on' }
      if (attrs.percentage != null) value.percentage = attrs.percentage
      if (attrs.preset_mode != null) value.preset_mode = attrs.preset_mode
      if (attrs.oscillating != null) value.oscillating = attrs.oscillating
      if (attrs.direction != null) value.direction = attrs.direction
      return value
    }

    case 'cover': {
      const value: SceneEntityState = { state: live === 'closed' ? 'closed' : 'open' }
      if (attrs.current_position != null) {
        value.current_position = attrs.current_position
        value.state = attrs.current_position > 0 ? 'open' : 'closed'
      }
      if (attrs.current_tilt_position != null) {
        value.current_tilt_position = attrs.current_tilt_position
      }
      return value
    }

    case 'media_player': {
      const value: SceneEntityState = {
        state: ['playing', 'paused', 'idle', 'on', 'off'].includes(live) ? live : 'off',
      }
      if (attrs.volume_level != null) value.volume_level = attrs.volume_level
      if (attrs.is_volume_muted != null) value.is_volume_muted = attrs.is_volume_muted
      if (attrs.source != null) value.source = attrs.source
      return value
    }

    case 'climate': {
      const value: SceneEntityState = { state: live }
      if (attrs.temperature != null) value.temperature = attrs.temperature
      if (attrs.target_temp_high != null) value.target_temp_high = attrs.target_temp_high
      if (attrs.target_temp_low != null) value.target_temp_low = attrs.target_temp_low
      if (attrs.fan_mode != null) value.fan_mode = attrs.fan_mode
      if (attrs.humidity != null) value.humidity = attrs.humidity
      return value
    }

    case 'humidifier': {
      const value: SceneEntityState = { state: live === 'on' ? 'on' : 'off' }
      if (attrs.humidity != null) value.humidity = attrs.humidity
      if (attrs.mode != null) value.mode = attrs.mode
      return value
    }

    case 'water_heater': {
      const value: SceneEntityState = { state: live }
      if (attrs.temperature != null) value.temperature = attrs.temperature
      return value
    }

    case 'valve': {
      const value: SceneEntityState = { state: live === 'closed' ? 'closed' : 'open' }
      if (attrs.current_position != null) value.current_position = attrs.current_position
      return value
    }

    case 'lock':
      return { state: live === 'unlocked' ? 'unlocked' : 'locked' }

    default:
      return { state: live === 'on' ? 'on' : 'off' }
  }
}

// ---------------------------------------------------------------------------
// Quick toggling straight from a tile
// ---------------------------------------------------------------------------

/**
 * Flips an accessory between its on and off states, HomeKit-style, keeping the
 * other attributes so that turning a light back on restores the brightness and
 * colour it had.
 *
 * Returns null for accessories with no meaningful on/off, so the caller can
 * leave the icon inert rather than offering a toggle that does nothing useful.
 */
export function toggleState(
  entity: HassEntity,
  value: SceneEntityState,
): SceneEntityState | null {
  const domain = domainOf(entity.entity_id)
  const flip = (on: string, off: string) => ({
    ...value,
    state: value.state === on ? off : on,
  })

  switch (domain) {
    case 'light':
    case 'fan':
    case 'switch':
    case 'input_boolean':
    case 'humidifier':
    case 'siren':
    case 'automation':
    case 'script':
      return flip('on', 'off')

    case 'lock':
      return flip('unlocked', 'locked')

    case 'cover':
    case 'valve': {
      const opening = value.state !== 'open'
      const next: SceneEntityState = { ...value, state: opening ? 'open' : 'closed' }
      if (value.current_position != null) next.current_position = opening ? 100 : 0
      if (opening && value.current_tilt_position === 0) delete next.current_tilt_position
      return next
    }

    case 'media_player': {
      if (!supports(entity, MEDIA_FEATURES.TURN_OFF) && !supports(entity, MEDIA_FEATURES.TURN_ON)) {
        return null
      }
      if (value.state === 'off') {
        return { ...value, state: supports(entity, MEDIA_FEATURES.PLAY) ? 'playing' : 'on' }
      }
      return { ...value, state: 'off' }
    }

    case 'climate':
    case 'water_heater': {
      const modes: string[] = entity.attributes.hvac_modes ?? entity.attributes.operation_list ?? []
      if (!modes.includes('off')) return null
      if (value.state === 'off') {
        const previous = modes.find((mode) => mode !== 'off')
        return previous ? { ...value, state: previous } : null
      }
      return { ...value, state: 'off' }
    }

    default:
      return null
  }
}

/** Whether an accessory currently reads as "on" for tinting and toggling. */
export function isActiveState(entityId: string, value: SceneEntityState): boolean {
  const domain = domainOf(entityId)
  if (domain === 'cover' || domain === 'valve') return value.state === 'open'
  if (domain === 'lock') return value.state === 'unlocked'
  if (domain === 'media_player') return value.state !== 'off'
  if (domain === 'climate' || domain === 'water_heater') return value.state !== 'off'
  return value.state === 'on'
}

/** Verb for the tile's toggle button, so screen readers get something true. */
export function toggleActionLabel(entityId: string, active: boolean): string {
  const domain = domainOf(entityId)
  if (domain === 'lock') return active ? 'Lock' : 'Unlock'
  if (domain === 'cover' || domain === 'valve') return active ? 'Close' : 'Open'
  return active ? 'Turn off' : 'Turn on'
}

/** A sensible starting point when an entity has no usable live state. */
export function defaultState(entity: HassEntity): SceneEntityState {
  const domain = domainOf(entity.entity_id)
  switch (domain) {
    case 'light':
      return lightCaps(entity).brightness ? { state: 'on', brightness: 255 } : { state: 'on' }
    case 'fan':
      return supports(entity, FAN_FEATURES.SET_SPEED)
        ? { state: 'on', percentage: 100 }
        : { state: 'on' }
    case 'cover':
      return supports(entity, COVER_FEATURES.SET_POSITION)
        ? { state: 'open', current_position: 100 }
        : { state: 'open' }
    case 'media_player':
      return { state: 'playing' }
    case 'climate':
      return { state: (entity.attributes.hvac_modes || ['heat'])[0] }
    case 'lock':
      return { state: 'locked' }
    default:
      return { state: 'on' }
  }
}

// ---------------------------------------------------------------------------
// Reading and writing the scenes.yaml shape
// ---------------------------------------------------------------------------

/**
 * Reads either scenes.yaml form — the shorthand `light.x: "on"` or the full
 * `light.x: {state: "on", ...}` — into the one shape the editor works with.
 * Loading through here is what lets a shorthand scene be rewritten in the
 * explicit form on the next save.
 */
export function normalizeSceneEntity(value: string | Record<string, any>): SceneEntityState {
  if (typeof value === 'string') return { state: value }
  const { state, ...rest } = value
  return { state: typeof state === 'string' ? state : 'on', ...rest }
}

/**
 * Turns an edited value back into the scenes.yaml representation, dropping
 * attributes that do not apply to the chosen state so Home Assistant does not
 * try to reproduce, say, a brightness on a light that should be off.
 *
 * Always writes the explicit `{state: ...}` mapping, never the bare-string
 * shorthand: it is unambiguous, it is what Home Assistant's own scene editor
 * produces, and it leaves somewhere to add attributes later.
 */
export function toSceneEntityValue(
  entityId: string,
  value: SceneEntityState,
): Record<string, any> {
  const domain = domainOf(entityId)
  let cleaned: SceneEntityState = { ...value }

  const offish = ['off', 'closed', 'locked', 'idle', 'unavailable'].includes(value.state)
  if (domain === 'light' && value.state !== 'on') cleaned = { state: value.state }
  if (domain === 'fan' && value.state !== 'on') cleaned = { state: value.state }
  if (domain === 'media_player' && (value.state === 'off' || value.state === 'idle')) {
    cleaned = { state: value.state }
  }
  if (domain === 'humidifier' && value.state !== 'on') cleaned = { state: value.state }
  if ((domain === 'switch' || domain === 'input_boolean' || domain === 'lock') && offish) {
    cleaned = { state: value.state }
  }

  for (const key of Object.keys(cleaned)) {
    if (cleaned[key] === undefined || cleaned[key] === null) delete cleaned[key]
  }

  return cleaned
}

// ---------------------------------------------------------------------------
// Human-readable summaries for the accessory tiles
// ---------------------------------------------------------------------------

const titleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ')

export function describeState(
  entityId: string,
  value: SceneEntityState,
  entity?: HassEntity,
): string {
  const domain = domainOf(entityId)
  const parts: string[] = []

  switch (domain) {
    case 'light':
      if (value.state !== 'on') return 'Off'
      parts.push(value.brightness != null ? `${brightnessToPercent(value.brightness)}%` : 'On')
      if (value.color_temp_kelvin) parts.push(`${value.color_temp_kelvin}K`)
      else if (value.hs_color) parts.push('Color')
      return parts.join(' · ')

    case 'fan': {
      if (value.state !== 'on') return 'Off'
      // Discrete-speed fans read better as "2 of 3" than as "66%".
      const step = entity?.attributes.percentage_step
      if (value.percentage != null && step && step > 1) {
        parts.push(`Speed ${Math.round(value.percentage / step)} of ${Math.round(100 / step)}`)
      } else {
        parts.push(value.percentage != null ? `${Math.round(value.percentage)}%` : 'On')
      }
      if (value.preset_mode) parts.push(titleCase(String(value.preset_mode)))
      if (value.oscillating) parts.push('Oscillating')
      return parts.join(' · ')
    }

    case 'cover':
    case 'valve':
      if (value.current_position != null) {
        if (value.current_position === 0) return 'Closed'
        if (value.current_position === 100) return 'Open'
        return `Open ${Math.round(value.current_position)}%`
      }
      return value.state === 'closed' ? 'Closed' : 'Open'

    case 'media_player':
      parts.push(titleCase(value.state))
      if (value.volume_level != null && value.state !== 'off') {
        parts.push(`Vol ${Math.round(value.volume_level * 100)}%`)
      }
      if (value.source) parts.push(String(value.source))
      return parts.join(' · ')

    case 'climate':
      parts.push(titleCase(value.state))
      if (value.temperature != null) parts.push(`${value.temperature}°`)
      else if (value.target_temp_low != null && value.target_temp_high != null) {
        parts.push(`${value.target_temp_low}–${value.target_temp_high}°`)
      }
      return parts.join(' · ')

    case 'humidifier':
      if (value.state !== 'on') return 'Off'
      return value.humidity != null ? `On · ${value.humidity}%` : 'On'

    case 'water_heater':
      parts.push(titleCase(value.state))
      if (value.temperature != null) parts.push(`${value.temperature}°`)
      return parts.join(' · ')

    default:
      return titleCase(value.state)
  }
}

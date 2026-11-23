/**
 * A stand-in for Home Assistant's `hass` object, used only by the dev harness.
 *
 * The panel is normally handed this object by the real frontend, which means
 * running the app outside Home Assistant needs something to hand it instead.
 * The fixture is deliberately small — enough rooms, floors and device types to
 * exercise the grouping and the editors, not a simulation of a house.
 */
import type { HomeAssistant } from '../src/lib/ha/hass'
import type { HassEntity } from '../src/lib/ha/types'

const entity = (
  entity_id: string,
  state: string,
  attributes: Record<string, unknown> = {},
): HassEntity => ({ entity_id, state, attributes, last_changed: '', last_updated: '' })

const STATES: HassEntity[] = [
  entity('light.living_room_chandelier', 'on', {
    friendly_name: 'Living Room Chandelier',
    supported_color_modes: ['color_temp', 'hs'],
    color_mode: 'color_temp',
    brightness: 180,
    color_temp_kelvin: 2700,
    min_color_temp_kelvin: 2000,
    max_color_temp_kelvin: 6500,
  }),
  entity('light.living_room_sconces', 'off', {
    friendly_name: 'Living Room Sconces',
    supported_color_modes: ['onoff'],
  }),
  entity('fan.living_room_ceiling', 'on', {
    friendly_name: 'Living Room Ceiling Fan',
    percentage: 66,
    percentage_step: 33.33,
    oscillating: false,
    supported_features: 1 | 2 | 4,
  }),
  entity('cover.living_room_blinds', 'open', {
    friendly_name: 'Living Room Blinds',
    current_position: 70,
    supported_features: 1 | 2 | 4 | 8,
  }),
  entity('media_player.living_room_apple_tv', 'playing', {
    friendly_name: 'Living Room Apple TV',
    volume_level: 0.4,
    is_volume_muted: false,
    source_list: ['Apple TV', 'HDMI 1'],
    source: 'Apple TV',
    supported_features: 4 | 16384 | 8192,
  }),
  entity('switch.kitchen_coffee_maker', 'off', { friendly_name: 'Kitchen Coffee Maker' }),
  entity('light.kitchen_downlights', 'on', {
    friendly_name: 'Kitchen Downlights',
    supported_color_modes: ['brightness'],
    brightness: 255,
  }),
  entity('climate.upstairs_thermostat', 'heat', {
    friendly_name: 'Upstairs Thermostat',
    hvac_modes: ['off', 'heat', 'cool', 'heat_cool'],
    temperature: 21,
    min_temp: 7,
    max_temp: 32,
    supported_features: 1,
  }),
  entity('lock.front_door', 'locked', { friendly_name: 'Front Door Lock' }),
  entity('cover.bedroom_shades', 'closed', {
    friendly_name: 'Bedroom Shades',
    current_position: 0,
    supported_features: 1 | 2 | 4 | 8,
  }),
  // Not accessories, but what conditions are built from.
  entity('sun.sun', 'below_horizon', { friendly_name: 'Sun' }),
  entity('zone.home', '1', { friendly_name: 'Home', persons: ['person.alex'] }),
  entity('person.alex', 'home', { friendly_name: 'Alex' }),
  entity('person.jordan', 'not_home', { friendly_name: 'Jordan' }),
  entity('sensor.outdoor_temperature', '7.5', {
    friendly_name: 'Outdoor Temperature',
    unit_of_measurement: '°C',
    state_class: 'measurement',
  }),
  entity('binary_sensor.workday', 'on', { friendly_name: 'Workday' }),
  entity('scene.movie_night', 'unknown', {
    friendly_name: 'Movie Night',
    id: '1700000000001',
    icon: 'mdi:movie-open',
    entity_id: ['light.living_room_chandelier', 'cover.living_room_blinds'],
  }),
  entity('scene.good_morning', 'unknown', {
    friendly_name: 'Good Morning',
    id: '1700000000002',
    icon: 'mdi:weather-sunny',
    entity_id: ['light.kitchen_downlights'],
  }),
  // No `id`, so the app should list it as read-only — HA cannot edit these either.
  entity('scene.yaml_only', 'unknown', {
    friendly_name: 'Defined In YAML',
    entity_id: ['light.living_room_sconces'],
  }),
]

const REGISTRIES: Record<string, unknown[]> = {
  'config/floor_registry/list': [
    { floor_id: 'ground', name: 'Main Floor', level: 0, icon: 'mdi:home' },
    { floor_id: 'upstairs', name: 'Upstairs', level: 1, icon: 'mdi:stairs-up' },
  ],
  'config/area_registry/list': [
    { area_id: 'living_room', name: 'Living Room', floor_id: 'ground', icon: null },
    { area_id: 'kitchen', name: 'Kitchen', floor_id: 'ground', icon: null },
    { area_id: 'bedroom', name: 'Bedroom', floor_id: 'upstairs', icon: null },
    { area_id: 'entry', name: 'Entry', floor_id: 'ground', icon: null },
  ],
  'config/device_registry/list': [],
  'config/entity_registry/list': [
    ['light.living_room_chandelier', 'living_room'],
    ['light.living_room_sconces', 'living_room'],
    ['fan.living_room_ceiling', 'living_room'],
    ['cover.living_room_blinds', 'living_room'],
    ['media_player.living_room_apple_tv', 'living_room'],
    ['switch.kitchen_coffee_maker', 'kitchen'],
    ['light.kitchen_downlights', 'kitchen'],
    ['climate.upstairs_thermostat', 'bedroom'],
    ['lock.front_door', 'entry'],
    ['cover.bedroom_shades', 'bedroom'],
  ].map(([entity_id, area_id]) => ({
    entity_id,
    area_id,
    device_id: null,
    name: null,
    original_name: null,
    platform: 'demo',
    disabled_by: null,
    hidden_by: null,
    entity_category: null,
  })),
}

const savedScenes = new Map<string, unknown>([
  [
    '1700000000001',
    {
      id: '1700000000001',
      name: 'Movie Night',
      icon: 'mdi:movie-open',
      entities: {
        'light.living_room_chandelier': { state: 'on', brightness: 40 },
        'cover.living_room_blinds': { state: 'closed' },
      },
    },
  ],
  [
    '1700000000002',
    {
      id: '1700000000002',
      name: 'Good Morning',
      icon: 'mdi:weather-sunny',
      entities: {
        'light.kitchen_downlights': { state: 'on', brightness: 255 },
      },
      metadata: {
        'cover.bedroom_shades': {
          scene_builder: {
            state: { state: 'open', current_position: 100 },
            match: 'all',
            conditions: [{ condition: 'state', entity_id: 'sun.sun', state: 'above_horizon' }],
          },
        },
      },
    },
  ],
])

/**
 * A rough stand-in for Home Assistant's condition engine: enough to exercise
 * the editor's live status. Sun and time conditions are not modelled and
 * always pass.
 */
function mockCheck(condition: any, states: Record<string, HassEntity>): boolean {
  switch (condition?.condition) {
    case 'and':
      return condition.conditions.every((c: any) => mockCheck(c, states))
    case 'or':
      return condition.conditions.some((c: any) => mockCheck(c, states))
    case 'not':
      return !condition.conditions.some((c: any) => mockCheck(c, states))
    case 'state':
      return states[condition.entity_id]?.state === String(condition.state)
    case 'numeric_state': {
      const value = Number(states[condition.entity_id]?.state)
      if (Number.isNaN(value)) return false
      if (condition.above != null && !(value > condition.above)) return false
      if (condition.below != null && !(value < condition.below)) return false
      return true
    }
    case 'sun':
    case 'time':
      return true
    default:
      throw new Error(`Unknown condition: ${condition?.condition}`)
  }
}

export function createMockHass(onChange: (hass: HomeAssistant) => void): HomeAssistant {
  const states: Record<string, HassEntity> = Object.fromEntries(
    STATES.map((item) => [item.entity_id, item]),
  )

  const hass: HomeAssistant = {
    states,
    language: 'en',
    themes: { darkMode: matchMedia('(prefers-color-scheme: dark)').matches },
    user: { id: 'dev', name: 'Developer', is_admin: true },
    connection: {
      async subscribeEvents() {
        return async () => undefined
      },
    },
    async callWS<T>(message: Record<string, unknown>): Promise<T> {
      if (message.type === 'scene_builder/evaluate') {
        const entries = message.entities as Record<string, { match?: string; conditions: unknown[] }>
        const results = Object.fromEntries(
          Object.entries(entries).map(([entityId, entry]) => {
            try {
              const group = { condition: entry.match === 'any' ? 'or' : 'and', conditions: entry.conditions }
              return [entityId, { result: !entry.conditions.length || mockCheck(group, states) }]
            } catch (error) {
              return [entityId, { error: (error as Error).message }]
            }
          }),
        )
        return { results } as T
      }
      const result = REGISTRIES[String(message.type)]
      if (!result) throw { code: 'unknown_command', message: `Unhandled: ${message.type}` }
      return result as T
    },
    async callService(domain, service, data) {
      console.info('[mock] service', `${domain}.${service}`, data)
      return undefined
    },
    async callApi<T>(
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      path: string,
      parameters?: Record<string, unknown>,
    ): Promise<T> {
      const id = path.split('/').pop() ?? ''
      console.info('[mock] api', method, path, parameters)
      if (method === 'GET') {
        const found = savedScenes.get(id)
        if (!found) throw { status_code: 404, message: 'Not found' }
        return found as T
      }
      if (method === 'POST') savedScenes.set(id, { id, ...(parameters ?? {}) })
      if (method === 'DELETE') savedScenes.delete(id)
      return undefined as T
    },
  }

  // Home Assistant hands the panel a new `hass` on every change; mimic that so
  // the sampling in useHomeAssistant is exercised rather than bypassed.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    onChange({ ...hass, themes: { darkMode: event.matches } })
  })

  return hass
}

import type { HomeAssistant } from './hass'
import { toHaError } from './hass'
import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  FloorRegistryEntry,
} from './types'

/**
 * The floor/area/device/entity registries.
 *
 * `hass` exposes reduced copies of some of these already, but their shape has
 * changed across frontend releases and they drop fields this app relies on
 * (`entity_category`, `hidden_by`). Reading the registries over the WebSocket
 * API is stable across versions and costs one round trip on load.
 */
export async function fetchRegistries(hass: HomeAssistant) {
  try {
    const [floors, areas, devices, entities] = await Promise.all([
      fetchFloors(hass),
      hass.callWS<AreaRegistryEntry[]>({ type: 'config/area_registry/list' }),
      hass.callWS<DeviceRegistryEntry[]>({ type: 'config/device_registry/list' }),
      hass.callWS<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' }),
    ])
    return { floors, areas, devices, entities }
  } catch (caught) {
    throw toHaError(caught, 'Could not read your Home Assistant registries.')
  }
}

async function fetchFloors(hass: HomeAssistant): Promise<FloorRegistryEntry[]> {
  try {
    return await hass.callWS<FloorRegistryEntry[]>({ type: 'config/floor_registry/list' })
  } catch {
    // Floors landed in HA 2024.4; older installs simply have none.
    return []
  }
}

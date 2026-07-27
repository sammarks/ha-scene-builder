import type { HomeAssistant } from './hass'
import { toHaError } from './hass'
import type { SceneConfig } from './types'

/**
 * Scene persistence goes through the REST config API — there is no WebSocket
 * equivalent. Served from inside Home Assistant this is a same-origin request
 * carrying the signed-in user's own credentials, so there is no CORS step and
 * no token to manage; `hass.callApi` supplies the auth header.
 *
 * The endpoint is admin-only, which is why the panel is registered with
 * `require_admin`.
 */
export async function fetchSceneConfig(
  hass: HomeAssistant,
  sceneId: string,
): Promise<SceneConfig | null> {
  try {
    return await hass.callApi<SceneConfig>(
      'GET',
      `config/scene/config/${encodeURIComponent(sceneId)}`,
    )
  } catch (caught) {
    const error = toHaError(caught, 'Could not load that scene.')
    if (error.kind === 'not-found') return null
    throw error
  }
}

export async function saveSceneConfig(
  hass: HomeAssistant,
  sceneId: string,
  config: SceneConfig,
): Promise<void> {
  // The endpoint stamps the id itself from the URL; sending it in the body too
  // is harmless but noisy in scenes.yaml.
  const { id: _id, ...body } = config
  try {
    await hass.callApi(
      'POST',
      `config/scene/config/${encodeURIComponent(sceneId)}`,
      body as unknown as Record<string, unknown>,
    )
  } catch (caught) {
    throw toHaError(caught, 'Could not save that scene.')
  }
}

export async function deleteSceneConfig(hass: HomeAssistant, sceneId: string): Promise<void> {
  try {
    await hass.callApi('DELETE', `config/scene/config/${encodeURIComponent(sceneId)}`)
  } catch (caught) {
    const error = toHaError(caught, 'Could not delete that scene.')
    // Already gone is the outcome the caller wanted anyway.
    if (error.kind === 'not-found') return
    throw error
  }
}

/** Generates the id Home Assistant itself uses for new scenes. */
export function newSceneId(): string {
  return Date.now().toString()
}

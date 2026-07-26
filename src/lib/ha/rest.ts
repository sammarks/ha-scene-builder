import { HaError } from './connection'
import type { SceneConfig } from './types'
import { mixedContentProblem } from './url'

/**
 * Scene persistence goes through the REST config API — there is no WebSocket
 * equivalent, so this is the one part of the app that needs
 * `http.cors_allowed_origins` set in Home Assistant (see the README).
 */
async function request<T>(
  baseUrl: string,
  token: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (mixedContentProblem(baseUrl)) {
    throw new HaError(
      'This page is served over HTTPS but your Home Assistant URL is plain HTTP. Browsers block that combination.',
      'mixed-content',
    )
  }

  let response: Response
  try {
    response = await fetch(baseUrl + path, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    })
  } catch (error) {
    // A blocked CORS preflight is indistinguishable from an offline host at
    // this layer, but CORS is overwhelmingly the cause here: the WebSocket
    // connection already proved the host is reachable.
    throw new HaError(
      'Home Assistant refused the request from this page.',
      'cors',
      String(error),
    )
  }

  if (response.status === 401 || response.status === 403) {
    throw new HaError('Home Assistant rejected the access token.', 'auth')
  }
  if (response.status === 404) {
    throw new HaError('Not found.', 'not-found')
  }
  if (!response.ok) {
    let detail = ''
    try {
      detail = await response.text()
    } catch {
      /* body already consumed or empty */
    }
    throw new HaError(
      `Home Assistant returned ${response.status} ${response.statusText}.`,
      'server',
      detail,
    )
  }

  if (response.status === 204) return undefined as T
  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

export async function fetchSceneConfig(
  baseUrl: string,
  token: string,
  sceneId: string,
): Promise<SceneConfig | null> {
  try {
    return await request<SceneConfig>(
      baseUrl,
      token,
      `/api/config/scene/config/${encodeURIComponent(sceneId)}`,
    )
  } catch (error) {
    if (error instanceof HaError && error.kind === 'not-found') return null
    throw error
  }
}

export async function saveSceneConfig(
  baseUrl: string,
  token: string,
  sceneId: string,
  config: SceneConfig,
): Promise<void> {
  // The endpoint stamps the id itself from the URL; sending it in the body too
  // is harmless but noisy in scenes.yaml.
  const { id: _id, ...body } = config
  await request(baseUrl, token, `/api/config/scene/config/${encodeURIComponent(sceneId)}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function deleteSceneConfig(
  baseUrl: string,
  token: string,
  sceneId: string,
): Promise<void> {
  await request(baseUrl, token, `/api/config/scene/config/${encodeURIComponent(sceneId)}`, {
    method: 'DELETE',
  })
}

/** Generates the id Home Assistant itself uses for new scenes. */
export function newSceneId(): string {
  return Date.now().toString()
}

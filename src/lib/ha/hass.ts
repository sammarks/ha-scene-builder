import type { HassEntity } from './types'

/**
 * The parts of Home Assistant's `hass` object this app uses.
 *
 * The frontend sets this object as a property on the panel element and replaces
 * it whenever anything changes. There is no published type package for it that
 * is worth a dependency, so this is a hand-written shim covering only what is
 * actually touched — anything wrong here shows up immediately at the call site
 * rather than hiding behind an `any`.
 */
export interface HomeAssistant {
  states: Record<string, HassEntity>
  connection: HassConnection
  themes: { darkMode: boolean }
  user?: { id: string; name: string; is_admin: boolean }
  language: string

  callWS<T>(message: Record<string, unknown>): Promise<T>
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>
  callApi<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    parameters?: Record<string, unknown>,
  ): Promise<T>
}

export interface HassConnection {
  subscribeEvents<T>(
    callback: (event: T) => void,
    eventType: string,
  ): Promise<() => Promise<void>>
}

export interface StateChangedEvent {
  data: {
    entity_id: string
    new_state: HassEntity | null
    old_state: HassEntity | null
  }
}

export class HaError extends Error {
  /** A short machine-readable hint the UI uses to show targeted help. */
  readonly kind: 'auth' | 'network' | 'not-found' | 'server' | 'unknown'

  constructor(
    message: string,
    kind: HaError['kind'] = 'unknown',
    readonly detail?: string,
  ) {
    super(message)
    this.name = 'HaError'
    this.kind = kind
  }
}

/**
 * `callApi` rejects with a plain object rather than an Error, and `callWS`
 * rejects with a `{code, message}` record. Both get funnelled through here so
 * the UI only ever has to understand HaError.
 */
export function toHaError(caught: unknown, fallback: string): HaError {
  if (caught instanceof HaError) return caught

  if (caught && typeof caught === 'object') {
    const value = caught as {
      status_code?: number
      code?: string
      message?: string
      error?: string
      body?: { message?: string }
    }

    const message = value.body?.message || value.message || value.error

    if (value.status_code === 404) return new HaError('Not found.', 'not-found')
    if (value.status_code === 401 || value.status_code === 403 || value.code === 'unauthorized') {
      return new HaError(
        'Home Assistant refused that request. Scene editing requires an administrator account.',
        'auth',
      )
    }
    if (typeof value.status_code === 'number') {
      return new HaError(message || `Home Assistant returned ${value.status_code}.`, 'server')
    }
    if (message) return new HaError(message, 'server')
  }

  if (caught instanceof Error) return new HaError(caught.message || fallback, 'unknown')
  return new HaError(fallback, 'unknown', String(caught))
}

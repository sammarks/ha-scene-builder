import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  FloorRegistryEntry,
  HassEntity,
} from './types'
import { mixedContentProblem, websocketUrl } from './url'

export class HaError extends Error {
  /** A short machine-readable hint the UI uses to show targeted help. */
  readonly kind: 'auth' | 'network' | 'mixed-content' | 'cors' | 'not-found' | 'server' | 'unknown'

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

type Pending = {
  resolve: (value: any) => void
  reject: (error: Error) => void
}

/**
 * A thin Home Assistant WebSocket client.
 *
 * The WebSocket API is used for everything readable because it is the only way
 * to reach the floor/area/device/entity registries, and because WebSocket
 * connections are not subject to CORS — so reads work without touching the HA
 * configuration. Writing scenes still needs the REST config API (see rest.ts).
 */
export class HaConnection {
  private socket: WebSocket
  private nextId = 1
  private pending = new Map<number, Pending>()
  private subscriptions = new Map<number, (event: any) => void>()
  private closedIntentionally = false

  onDisconnect: ((reason: string) => void) | null = null

  private constructor(socket: WebSocket) {
    this.socket = socket
    this.socket.onmessage = (event) => this.handleMessage(event)
    this.socket.onclose = () => {
      const error = new HaError('Connection to Home Assistant closed.', 'network')
      for (const pending of this.pending.values()) pending.reject(error)
      this.pending.clear()
      if (!this.closedIntentionally) this.onDisconnect?.('Connection to Home Assistant was lost.')
    }
  }

  static connect(baseUrl: string, token: string): Promise<HaConnection> {
    if (mixedContentProblem(baseUrl)) {
      return Promise.reject(
        new HaError(
          'This page is served over HTTPS but your Home Assistant URL is plain HTTP. Browsers block that combination.',
          'mixed-content',
        ),
      )
    }

    return new Promise((resolve, reject) => {
      let socket: WebSocket
      try {
        socket = new WebSocket(websocketUrl(baseUrl))
      } catch (error) {
        reject(new HaError(`Could not open a connection to ${baseUrl}.`, 'network', String(error)))
        return
      }

      let settled = false
      const finish = (fn: () => void) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        fn()
      }

      const timer = setTimeout(() => {
        finish(() => {
          socket.close()
          reject(
            new HaError(
              `Timed out connecting to ${baseUrl}. Check the address and that the machine is reachable from this device.`,
              'network',
            ),
          )
        })
      }, 15000)

      socket.onerror = () => {
        finish(() => {
          socket.close()
          reject(
            new HaError(
              `Could not reach ${baseUrl}. Check the address, and make sure this device is on a network that can see it.`,
              'network',
            ),
          )
        })
      }

      socket.onclose = () => {
        finish(() =>
          reject(new HaError(`Home Assistant closed the connection to ${baseUrl}.`, 'network')),
        )
      }

      socket.onmessage = (event) => {
        let message: any
        try {
          message = JSON.parse(event.data)
        } catch {
          return
        }

        if (message.type === 'auth_required') {
          socket.send(JSON.stringify({ type: 'auth', access_token: token }))
        } else if (message.type === 'auth_ok') {
          finish(() => resolve(new HaConnection(socket)))
        } else if (message.type === 'auth_invalid') {
          finish(() => {
            socket.close()
            reject(
              new HaError(
                message.message || 'Home Assistant rejected that access token.',
                'auth',
              ),
            )
          })
        }
      }
    })
  }

  private handleMessage(event: MessageEvent) {
    let message: any
    try {
      message = JSON.parse(event.data)
    } catch {
      return
    }

    if (message.type === 'event') {
      this.subscriptions.get(message.id)?.(message.event)
      return
    }
    if (message.type !== 'result') return

    const pending = this.pending.get(message.id)
    if (!pending) return
    this.pending.delete(message.id)

    if (message.success) {
      pending.resolve(message.result)
    } else {
      pending.reject(
        new HaError(
          message.error?.message || 'Home Assistant returned an error.',
          message.error?.code === 'unauthorized' ? 'auth' : 'server',
        ),
      )
    }
  }

  send<T = any>(message: Record<string, unknown>): Promise<T> {
    if (this.socket.readyState !== WebSocket.OPEN) {
      return Promise.reject(new HaError('Not connected to Home Assistant.', 'network'))
    }
    const id = this.nextId++
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.socket.send(JSON.stringify({ ...message, id }))
    })
  }

  close() {
    this.closedIntentionally = true
    this.socket.close()
  }

  getStates() {
    return this.send<HassEntity[]>({ type: 'get_states' })
  }

  async getFloors(): Promise<FloorRegistryEntry[]> {
    try {
      return await this.send<FloorRegistryEntry[]>({ type: 'config/floor_registry/list' })
    } catch {
      // Floors landed in HA 2024.4; older installs simply have none.
      return []
    }
  }

  getAreas() {
    return this.send<AreaRegistryEntry[]>({ type: 'config/area_registry/list' })
  }

  getDevices() {
    return this.send<DeviceRegistryEntry[]>({ type: 'config/device_registry/list' })
  }

  getEntityRegistry() {
    return this.send<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' })
  }

  /**
   * Subscribes to an event type, returning an unsubscribe function. Used to
   * keep live entity values current so "use current state" means it.
   */
  async subscribeEvents(eventType: string, handler: (event: any) => void): Promise<() => void> {
    const id = this.nextId
    await this.send({ type: 'subscribe_events', event_type: eventType })
    this.subscriptions.set(id, handler)
    return () => {
      this.subscriptions.delete(id)
      this.send({ type: 'unsubscribe_events', subscription: id }).catch(() => {
        /* the socket is already gone; nothing to clean up */
      })
    }
  }

  callService(domain: string, service: string, serviceData?: Record<string, unknown>) {
    return this.send({ type: 'call_service', domain, service, service_data: serviceData })
  }
}

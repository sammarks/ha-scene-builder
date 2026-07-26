import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HaConnection, HaError } from './ha/connection'
import type { HassEntity, SceneSummary } from './ha/types'
import type { Registries } from './accessories'
import { buildAccessories, groupByFloorAndArea } from './accessories'
import type { AccessoryKind } from './capabilities'
import { loadKindOverrides, saveKindOverrides, type Settings } from './storage'

export type ConnectionStatus = 'idle' | 'connecting' | 'ready' | 'error'

const EMPTY_REGISTRIES: Registries = { floors: [], areas: [], devices: [], entities: [] }

export function useHomeAssistant(settings: Settings | null) {
  const [status, setStatus] = useState<ConnectionStatus>('idle')
  const [error, setError] = useState<HaError | null>(null)
  const [states, setStates] = useState<Record<string, HassEntity>>({})
  const [registries, setRegistries] = useState<Registries>(EMPTY_REGISTRIES)
  const [kindOverrides, setKindOverrides] = useState<Record<string, AccessoryKind>>(() =>
    loadKindOverrides(),
  )

  const connectionRef = useRef<HaConnection | null>(null)
  // State change events arrive far faster than anyone can read them, so they
  // are buffered and flushed on a timer instead of re-rendering per event.
  const pendingStates = useRef<Record<string, HassEntity>>({})
  const flushTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!settings) {
      connectionRef.current?.close()
      connectionRef.current = null
      setStatus('idle')
      setStates({})
      setRegistries(EMPTY_REGISTRIES)
      return
    }

    let cancelled = false
    let unsubscribe: (() => void) | null = null

    setStatus('connecting')
    setError(null)
    ;(async () => {
      try {
        const connection = await HaConnection.connect(settings.baseUrl, settings.token)
        if (cancelled) {
          connection.close()
          return
        }
        connectionRef.current = connection
        connection.onDisconnect = (reason) => {
          if (cancelled) return
          setStatus('error')
          setError(new HaError(reason, 'network'))
        }

        const [allStates, floors, areas, devices, entities] = await Promise.all([
          connection.getStates(),
          connection.getFloors(),
          connection.getAreas(),
          connection.getDevices(),
          connection.getEntityRegistry(),
        ])
        if (cancelled) return

        setStates(Object.fromEntries(allStates.map((entity) => [entity.entity_id, entity])))
        setRegistries({ floors, areas, devices, entities })
        setStatus('ready')

        unsubscribe = await connection.subscribeEvents('state_changed', (event) => {
          const next = event?.data?.new_state as HassEntity | undefined
          if (!next) return
          pendingStates.current[next.entity_id] = next
          if (flushTimer.current != null) return
          flushTimer.current = window.setTimeout(() => {
            flushTimer.current = null
            const buffered = pendingStates.current
            pendingStates.current = {}
            setStates((current) => ({ ...current, ...buffered }))
          }, 750)
        })
      } catch (caught) {
        if (cancelled) return
        setError(
          caught instanceof HaError
            ? caught
            : new HaError(String(caught), 'unknown'),
        )
        setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      unsubscribe?.()
      if (flushTimer.current != null) {
        clearTimeout(flushTimer.current)
        flushTimer.current = null
      }
      connectionRef.current?.close()
      connectionRef.current = null
    }
  }, [settings])

  const setKindOverride = useCallback((entityId: string, kind: AccessoryKind | null) => {
    setKindOverrides((current) => {
      const next = { ...current }
      if (kind) next[entityId] = kind
      else delete next[entityId]
      saveKindOverrides(next)
      return next
    })
  }, [])

  const stateList = useMemo(() => Object.values(states), [states])

  const accessories = useMemo(
    () => buildAccessories(stateList, registries, kindOverrides),
    [stateList, registries, kindOverrides],
  )

  const floors = useMemo(
    () => groupByFloorAndArea(accessories, registries),
    [accessories, registries],
  )

  const scenes = useMemo<SceneSummary[]>(() => {
    return stateList
      .filter((entity) => entity.entity_id.startsWith('scene.'))
      .map((entity) => ({
        entity_id: entity.entity_id,
        configId: entity.attributes.id ? String(entity.attributes.id) : null,
        name: entity.attributes.friendly_name || entity.entity_id,
        icon: entity.attributes.icon ?? null,
        entityCount: (entity.attributes.entity_id ?? []).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [stateList])

  const refresh = useCallback(async () => {
    const connection = connectionRef.current
    if (!connection) return
    const [allStates, floorList, areas, devices, entities] = await Promise.all([
      connection.getStates(),
      connection.getFloors(),
      connection.getAreas(),
      connection.getDevices(),
      connection.getEntityRegistry(),
    ])
    setStates(Object.fromEntries(allStates.map((entity) => [entity.entity_id, entity])))
    setRegistries({ floors: floorList, areas, devices, entities })
  }, [])

  const callService = useCallback(
    (domain: string, service: string, data?: Record<string, unknown>) => {
      const connection = connectionRef.current
      if (!connection) throw new HaError('Not connected to Home Assistant.', 'network')
      return connection.callService(domain, service, data)
    },
    [],
  )

  return {
    status,
    error,
    states,
    registries,
    accessories,
    floors,
    scenes,
    kindOverrides,
    setKindOverride,
    refresh,
    callService,
  }
}

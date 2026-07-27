import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { HaError } from './ha/hass'
import { toHaError } from './ha/hass'
import type { HassEntity, SceneSummary } from './ha/types'
import { fetchRegistries } from './ha/registry'
import type { HassStore } from './ha/store'
import { useHassStore } from './ha/store'
import type { Registries } from './accessories'
import { buildAccessories, groupByFloorAndArea } from './accessories'
import type { AccessoryKind } from './capabilities'
import { loadKindOverrides, saveKindOverrides } from './storage'

export type LoadStatus = 'loading' | 'ready' | 'error'

const EMPTY_REGISTRIES: Registries = { floors: [], areas: [], devices: [], entities: [] }

/**
 * Entity states change far faster than anyone can read them, so the newest
 * `hass` is sampled on a timer rather than followed render-for-render.
 */
const STATE_SAMPLE_MS = 750

export function useHomeAssistant() {
  const store = useHassStore()
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [error, setError] = useState<HaError | null>(null)
  const [states, setStates] = useState<Record<string, HassEntity>>(() => store.current.states)
  const [registries, setRegistries] = useState<Registries>(EMPTY_REGISTRIES)
  const [kindOverrides, setKindOverrides] = useState<Record<string, AccessoryKind>>(() =>
    loadKindOverrides(),
  )

  useStateSampling(store, setStates)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const next = await fetchRegistries(store.current)
        if (cancelled) return
        setRegistries(next)
        setStates(store.current.states)
        setStatus('ready')
      } catch (caught) {
        if (cancelled) return
        setError(toHaError(caught, 'Could not read your Home Assistant registries.'))
        setStatus('error')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [store])

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
    setRegistries(await fetchRegistries(store.current))
    setStates(store.current.states)
  }, [store])

  const callService = useCallback(
    async (domain: string, service: string, data?: Record<string, unknown>) => {
      try {
        return await store.current.callService(domain, service, data)
      } catch (caught) {
        throw toHaError(caught, `Home Assistant refused ${domain}.${service}.`)
      }
    },
    [store],
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

/**
 * Copies `hass.states` into React state at most once per sample window. The
 * trailing edge is what matters here — the value that should win is the last
 * one in the window, not the first.
 */
function useStateSampling(
  store: HassStore,
  setStates: (states: Record<string, HassEntity>) => void,
) {
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (timer.current != null) return
      timer.current = window.setTimeout(() => {
        timer.current = null
        setStates(store.current.states)
      }, STATE_SAMPLE_MS)
    })
    return () => {
      unsubscribe()
      if (timer.current != null) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [store, setStates])
}

/** Re-renders only when Home Assistant collapses or expands its sidebar. */
export function useNarrow(): boolean {
  const store = useHassStore()
  const [narrow, setNarrow] = useState(() => store.panel.narrow)
  useEffect(() => store.subscribe(() => setNarrow(store.panel.narrow)), [store])
  return narrow
}

import { createContext, useContext } from 'react'
import type { HomeAssistant } from './hass'

/**
 * Home Assistant replaces the `hass` property on the panel element every time
 * anything in the system changes — many times a second in a busy house. React
 * must not re-render on each of those, so the element pushes updates into this
 * store instead of into component state, and consumers decide how often they
 * care.
 */
export class HassStore {
  private listeners = new Set<() => void>()

  constructor(
    private hass: HomeAssistant,
    private panelState: PanelState,
  ) {}

  /** Always the newest `hass`. Never destructure and hold onto the result. */
  get current(): HomeAssistant {
    return this.hass
  }

  get panel(): PanelState {
    return this.panelState
  }

  update(hass: HomeAssistant, panelState: PanelState) {
    this.hass = hass
    this.panelState = panelState
    for (const listener of this.listeners) listener()
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }
}

export interface PanelState {
  /** True when Home Assistant has collapsed its sidebar behind a menu button. */
  narrow: boolean
}

const HassContext = createContext<HassStore | null>(null)

export const HassProvider = HassContext.Provider

export function useHassStore(): HassStore {
  const store = useContext(HassContext)
  if (!store) throw new Error('useHassStore must be used inside the Scene Builder panel.')
  return store
}

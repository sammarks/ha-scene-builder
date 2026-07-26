import type { AccessoryKind } from './capabilities'

export interface Settings {
  baseUrl: string
  token: string
}

const SETTINGS_KEY = 'ha-scene-builder.settings'
const KINDS_KEY = 'ha-scene-builder.entity-kinds'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private browsing, quota, or storage disabled — the app still works for
    // this session, it just will not remember anything.
  }
}

export function loadSettings(): Settings | null {
  const settings = read<Settings | null>(SETTINGS_KEY, null)
  if (!settings?.baseUrl || !settings?.token) return null
  return settings
}

export function saveSettings(settings: Settings) {
  write(SETTINGS_KEY, settings)
}

export function clearSettings() {
  try {
    localStorage.removeItem(SETTINGS_KEY)
  } catch {
    /* nothing we can do */
  }
}

/**
 * Per-entity presentation overrides — chiefly for smart outlets, where only
 * the owner knows whether a plug runs a lamp or a space heater.
 */
export function loadKindOverrides(): Record<string, AccessoryKind> {
  return read<Record<string, AccessoryKind>>(KINDS_KEY, {})
}

export function saveKindOverrides(overrides: Record<string, AccessoryKind>) {
  write(KINDS_KEY, overrides)
}

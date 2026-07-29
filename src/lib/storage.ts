import type { AccessoryKind } from './capabilities'

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

/**
 * Per-entity presentation overrides — chiefly for smart outlets, where only
 * the owner knows whether a plug runs a lamp or a space heater.
 *
 * These live in the browser rather than in Home Assistant, so they are per
 * device and per user. That is a fair trade for not owning server-side storage,
 * and nothing is lost if they disappear: the override only changes which
 * controls are offered, never what a saved scene does.
 */
export function loadKindOverrides(): Record<string, AccessoryKind> {
  return read<Record<string, AccessoryKind>>(KINDS_KEY, {})
}

export function saveKindOverrides(overrides: Record<string, AccessoryKind>) {
  write(KINDS_KEY, overrides)
}

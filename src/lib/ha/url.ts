/** Trim a user-entered host into a usable origin, e.g. `homeassistant.local:8123`. */
export function normalizeBaseUrl(input: string): string {
  let value = input.trim().replace(/\/+$/, '')
  if (!value) return ''

  if (!/^https?:\/\//i.test(value)) {
    // Bare hosts are almost always local installs, which are plain http.
    const looksLocal =
      /^(localhost|127\.0\.0\.1|\[?::1\]?)(:|$)/i.test(value) ||
      /^\d{1,3}(\.\d{1,3}){3}(:|$)/.test(value) ||
      /\.local(:|$)/i.test(value)
    value = (looksLocal ? 'http://' : 'https://') + value
  }

  try {
    const url = new URL(value)
    // Keep any subpath, since HA can live behind a reverse proxy prefix.
    return (url.origin + url.pathname).replace(/\/+$/, '')
  } catch {
    return value
  }
}

/** `http://x` -> `ws://x`, `https://x` -> `wss://x`. */
export function websocketUrl(baseUrl: string): string {
  return baseUrl.replace(/^http/i, 'ws') + '/api/websocket'
}

/**
 * A page served over https cannot talk to an http Home Assistant — the browser
 * blocks it as mixed content, and there is nothing the app can do about it.
 * Worth catching before the user stares at an opaque network error.
 */
export function mixedContentProblem(baseUrl: string): boolean {
  if (typeof window === 'undefined') return false
  return window.location.protocol === 'https:' && /^http:\/\//i.test(baseUrl)
}

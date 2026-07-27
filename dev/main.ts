/**
 * Dev harness entry point.
 *
 * Loads the real panel element and feeds it a mock `hass`, so the app can be
 * worked on in a browser without a Home Assistant instance, an access token, or
 * a rebuild-and-copy cycle. Nothing here ships.
 */
import '../src/entrypoint'
import { createMockHass } from './mock-hass'

const panel = document.createElement('scene-builder-panel') as HTMLElement & {
  hass: unknown
  narrow: boolean
}

panel.hass = createMockHass((next) => {
  panel.hass = next
})

// Home Assistant collapses its sidebar below this width and expects the panel
// to offer its own menu button; the harness mirrors that so the button can be
// seen and tested.
const narrowQuery = matchMedia('(max-width: 870px)')
const applyNarrow = () => {
  panel.narrow = narrowQuery.matches
}
narrowQuery.addEventListener('change', applyNarrow)
applyNarrow()

document.body.appendChild(panel)

// The real frontend listens for this to open the sidebar. Logging it proves the
// event escapes the panel's shadow root, which is easy to get wrong.
document.addEventListener('hass-toggle-menu', () => {
  console.info('[mock] hass-toggle-menu received at document level')
})

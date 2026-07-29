import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import App from './App'
import type { HomeAssistant } from './lib/ha/hass'
import { HassProvider, HassStore, type PanelState } from './lib/ha/store'
import styles from './styles.css?inline'

/**
 * The custom element Home Assistant mounts for this panel.
 *
 * `custom_components/scene_builder/__init__.py` registers a `panel_custom`
 * pointing at this module; the frontend then creates <scene-builder-panel> and
 * keeps `hass` and `narrow` up to date as properties.
 *
 * Everything renders inside a shadow root. Home Assistant's own frontend is
 * built from web components so its styles cannot reach in — but this app's
 * stylesheet claims names general enough (`.screen`, `.overlay`, `.banner`)
 * that letting it loose on the shared document would be asking for trouble.
 */
const ELEMENT_NAME = 'scene-builder-panel'

class SceneBuilderPanel extends HTMLElement {
  private root: Root | null = null
  private mountPoint: HTMLDivElement | null = null
  private store: HassStore | null = null
  private _hass: HomeAssistant | null = null
  private _narrow = false

  set hass(hass: HomeAssistant | null) {
    this._hass = hass
    if (hass) this.setAttribute('data-theme', hass.themes?.darkMode ? 'dark' : 'light')
    this.publish()
  }

  get hass(): HomeAssistant | null {
    return this._hass
  }

  set narrow(narrow: boolean) {
    this._narrow = Boolean(narrow)
    this.publish()
  }

  get narrow(): boolean {
    return this._narrow
  }

  connectedCallback() {
    this.replayUpgradedProperties()

    const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' })
    if (!shadow.adoptedStyleSheets?.length && !shadow.querySelector('style')) {
      adoptStyles(shadow, styles)
    }

    // A fresh container every time. Home Assistant detaches and re-attaches
    // panels while navigating, and reusing a container whose React root is
    // still tearing down asynchronously races the new root.
    this.mountPoint = document.createElement('div')
    shadow.appendChild(this.mountPoint)

    this.mount()
  }

  disconnectedCallback() {
    const root = this.root
    const mountPoint = this.mountPoint
    this.root = null
    this.store = null
    this.mountPoint = null

    mountPoint?.remove()
    // React warns when a root is unmounted from inside a lifecycle it is
    // already committing, which is exactly when this fires. A tick is enough.
    if (root) setTimeout(() => root.unmount(), 0)
  }

  /**
   * If the frontend assigned these before this module finished loading, the
   * values landed as own properties shadowing the accessors above. Replaying
   * them through the setters is the standard custom-element upgrade dance.
   */
  private replayUpgradedProperties() {
    const own = this as unknown as Record<string, unknown>
    if (Object.prototype.hasOwnProperty.call(this, 'hass')) {
      const value = own.hass as HomeAssistant | null
      delete own.hass
      this.hass = value
    }
    if (Object.prototype.hasOwnProperty.call(this, 'narrow')) {
      const value = own.narrow as boolean
      delete own.narrow
      this.narrow = value
    }
  }

  private publish() {
    if (this.store && this._hass) {
      this.store.update(this._hass, { narrow: this._narrow })
      return
    }
    this.mount()
  }

  private mount() {
    if (this.root || !this._hass || !this.mountPoint) return
    const panelState: PanelState = { narrow: this._narrow }
    this.store = new HassStore(this._hass, panelState)
    this.root = createRoot(this.mountPoint)
    this.root.render(
      <StrictMode>
        <HassProvider value={this.store}>
          <App />
        </HassProvider>
      </StrictMode>,
    )
  }
}

function adoptStyles(shadow: ShadowRoot, css: string) {
  if ('adoptedStyleSheets' in Document.prototype && 'replaceSync' in CSSStyleSheet.prototype) {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(css)
    shadow.adoptedStyleSheets = [sheet]
    return
  }
  const style = document.createElement('style')
  style.textContent = css
  shadow.appendChild(style)
}

if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, SceneBuilderPanel)
}

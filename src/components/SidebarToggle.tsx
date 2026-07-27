import { useRef } from 'react'
import { UiIcon } from './Icon'
import { useNarrow } from '../lib/useHomeAssistant'

/**
 * Home Assistant draws no toolbar of its own for a custom panel, so on narrow
 * screens — where the sidebar is collapsed — this panel is responsible for
 * offering the way back to it. `hass-toggle-menu` is the event the frontend
 * listens for; it has to be `composed` to escape this panel's shadow root.
 */
export function SidebarToggle() {
  const narrow = useNarrow()
  const buttonRef = useRef<HTMLButtonElement>(null)

  if (!narrow) return null

  return (
    <button
      ref={buttonRef}
      type="button"
      className="icon-button topbar__menu"
      aria-label="Open Home Assistant sidebar"
      onClick={() =>
        buttonRef.current?.dispatchEvent(
          new CustomEvent('hass-toggle-menu', { bubbles: true, composed: true }),
        )
      }
    >
      <UiIcon name="menu" size={24} />
    </button>
  )
}

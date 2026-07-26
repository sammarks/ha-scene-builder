import { useMemo, useState } from 'react'
import { ICON_PICKER_GROUPS, MDI_PATHS } from '../lib/icons.generated'
import { HaIcon, Icon, UiIcon } from './Icon'
import { Sheet } from './ui'

/**
 * Picks an icon by its Home Assistant `mdi:` name, so whatever is chosen here
 * renders identically in the HA sidebar, dashboards and the scene list.
 */
export function IconPicker({
  open,
  value,
  onClose,
  onChange,
}: {
  open: boolean
  value: string | undefined
  onClose: () => void
  onChange: (icon: string | undefined) => void
}) {
  const [query, setQuery] = useState('')
  const [custom, setCustom] = useState('')

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return ICON_PICKER_GROUPS
    const matches = Object.keys(MDI_PATHS).filter((name) => name.includes(needle))
    return matches.length ? [{ name: 'Results', icons: matches }] : []
  }, [query])

  const select = (name: string) => {
    onChange(`mdi:${name}`)
    onClose()
  }

  const applyCustom = () => {
    const trimmed = custom.trim().replace(/^mdi:/, '')
    if (!trimmed) return
    onChange(`mdi:${trimmed}`)
    onClose()
  }

  return (
    <Sheet
      open={open}
      title="Choose an icon"
      subtitle="Material Design Icons, the same set Home Assistant uses"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="button button--ghost" onClick={() => { onChange(undefined); onClose() }}>
            No icon
          </button>
          <button type="button" className="button" onClick={onClose}>
            Done
          </button>
        </>
      }
    >
      <div className="icon-picker__search">
        <UiIcon name="search" size={20} />
        <input
          type="search"
          value={query}
          placeholder="Search all icons…"
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
      </div>

      {groups.map((group) => (
        <section key={group.name} className="icon-picker__group">
          <h3>{group.name}</h3>
          <div className="icon-picker__grid">
            {group.icons.map((name) => (
              <button
                key={name}
                type="button"
                title={`mdi:${name}`}
                aria-label={`mdi:${name}`}
                className={`icon-picker__item${value === `mdi:${name}` ? ' icon-picker__item--active' : ''}`}
                onClick={() => select(name)}
              >
                <Icon path={MDI_PATHS[name]} size={26} />
              </button>
            ))}
          </div>
        </section>
      ))}

      {!groups.length ? (
        <p className="muted">
          No bundled icon matches “{query}”. Any valid MDI name still works — type it below.
        </p>
      ) : null}

      <section className="icon-picker__group">
        <h3>Use any MDI name</h3>
        <p className="muted">
          Home Assistant ships the full Material Design Icons set. Browse it at{' '}
          <a href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noreferrer">
            pictogrammers.com
          </a>{' '}
          and paste the name here — it will be saved even if this app cannot preview it.
        </p>
        <div className="icon-picker__custom">
          <span className="icon-picker__prefix">mdi:</span>
          <input
            type="text"
            value={custom}
            placeholder="washing-machine"
            onChange={(event) => setCustom(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') applyCustom()
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="button button--small" onClick={applyCustom}>
            Use
          </button>
        </div>
      </section>
    </Sheet>
  )
}

/** The button that opens the picker, previewing the current selection. */
export function IconButton({
  icon,
  onClick,
}: {
  icon: string | undefined
  onClick: () => void
}) {
  return (
    <button type="button" className="scene-icon-button" onClick={onClick} aria-label="Change icon">
      <HaIcon name={icon} fallbackKind="other" size={28} />
      <span className="scene-icon-button__edit">
        <UiIcon name="pencil" size={12} />
      </span>
    </button>
  )
}

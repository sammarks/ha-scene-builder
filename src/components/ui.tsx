import { useEffect, useRef, type ReactNode } from 'react'
import { UiIcon } from './Icon'

export function Row({
  label,
  hint,
  children,
  stacked,
}: {
  label: ReactNode
  hint?: ReactNode
  children: ReactNode
  stacked?: boolean
}) {
  return (
    <div className={`row${stacked ? ' row--stacked' : ''}`}>
      <div className="row__label">
        <span>{label}</span>
        {hint ? <span className="row__hint">{hint}</span> : null}
      </div>
      <div className="row__control">{children}</div>
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle${checked ? ' toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle__knob" />
    </button>
  )
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  format,
  accent,
  disabled,
}: {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  format?: (value: number) => string
  accent?: string
  disabled?: boolean
}) {
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100
  return (
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        style={
          {
            '--fill': `${percent}%`,
            ...(accent ? { '--slider-accent': accent } : {}),
          } as React.CSSProperties
        }
      />
      <output className="slider__value">{format ? format(value) : value}</output>
    </div>
  )
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div className="segmented" role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`segmented__item${option.value === value ? ' segmented__item--active' : ''}`}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function Select({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: string | undefined
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="select">
      <select value={value ?? ''} onChange={(event) => onChange(event.target.value)}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <UiIcon name="chevronDown" size={18} />
    </div>
  )
}

export function Stepper({
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  format?: (value: number) => string
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next / step) * step))
  return (
    <div className="stepper">
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
        aria-label="Decrease"
      >
        <UiIcon name="minus" size={18} />
      </button>
      <span className="stepper__value">{format ? format(value) : value}</span>
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
        aria-label="Increase"
      >
        <UiIcon name="plus" size={18} />
      </button>
    </div>
  )
}

/**
 * A bottom sheet on phones, a centred dialog on desktop — the layout switch
 * lives in CSS so there is only one implementation.
 */
export function Sheet({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  open: boolean
  title: ReactNode
  subtitle?: ReactNode
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Callers pass an inline arrow, so onClose is a new function on every render.
  // Reading it through a ref keeps the effects below keyed on `open` alone.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('is-locked')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('is-locked')
    }
  }, [open])

  // Moving focus is a one-time thing when the sheet appears. Re-running it on
  // later renders would yank focus out of whatever the user is typing in —
  // live entity updates alone re-render this several times a second.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
      <div className="sheet__backdrop" onClick={onClose} />
      <div className="sheet__panel" ref={panelRef} tabIndex={-1}>
        <div className="sheet__grabber" />
        <header className="sheet__header">
          <div className="sheet__titles">
            <h2>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <UiIcon name="close" size={22} />
          </button>
        </header>
        <div className="sheet__body">{children}</div>
        {footer ? <footer className="sheet__footer">{footer}</footer> : null}
      </div>
    </div>
  )
}

export function Banner({
  tone = 'info',
  title,
  children,
  action,
}: {
  tone?: 'info' | 'warn' | 'error' | 'success'
  title?: ReactNode
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className={`banner banner--${tone}`}>
      <UiIcon
        name={tone === 'info' ? 'info' : tone === 'success' ? 'check' : 'alert'}
        size={20}
        className="banner__icon"
      />
      <div className="banner__content">
        {title ? <strong>{title}</strong> : null}
        {children ? <div>{children}</div> : null}
      </div>
      {action ? <div className="banner__action">{action}</div> : null}
    </div>
  )
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="spinner">
      <UiIcon name="loading" size={28} className="spinner__icon" />
      {label ? <span>{label}</span> : null}
    </div>
  )
}

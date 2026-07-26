import { KIND_ICONS, MDI_PATHS, UI_ICONS, type UiIconName } from '../lib/icons.generated'

const FALLBACK = MDI_PATHS[KIND_ICONS.other]

/** Resolves a Home Assistant style icon name (`mdi:fan`) to path data. */
export function pathForIcon(name: string | null | undefined): string | null {
  if (!name) return null
  return MDI_PATHS[name.replace(/^mdi:/, '')] ?? null
}

export function Icon({
  path,
  size = 24,
  className,
}: {
  path: string
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  )
}

/** An icon from the app's own chrome set, referenced by a stable key. */
export function UiIcon({
  name,
  size = 24,
  className,
}: {
  name: UiIconName
  size?: number
  className?: string
}) {
  return <Icon path={MDI_PATHS[UI_ICONS[name]]} size={size} className={className} />
}

/** An icon named the Home Assistant way, with a graceful fallback. */
export function HaIcon({
  name,
  fallbackKind,
  size = 24,
  className,
}: {
  name?: string | null
  fallbackKind?: string
  size?: number
  className?: string
}) {
  const path =
    pathForIcon(name) ??
    (fallbackKind ? MDI_PATHS[KIND_ICONS[fallbackKind] ?? ''] : null) ??
    FALLBACK
  return <Icon path={path} size={size} className={className} />
}

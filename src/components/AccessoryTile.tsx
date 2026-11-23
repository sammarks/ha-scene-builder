import type { Accessory } from '../lib/accessories'
import {
  accessoryIconName,
  describeState,
  isActiveState,
  toggleActionLabel,
  type SceneEntityState,
} from '../lib/capabilities'
import { lightPreviewColor } from '../lib/color'
import { HaIcon, UiIcon } from './Icon'

export function AccessoryTile({
  accessory,
  value,
  condition,
  onClick,
  onToggle,
}: {
  accessory: Accessory
  value: SceneEntityState
  /** A summary of the accessory's conditions, when it has any. */
  condition?: string
  onClick: () => void
  /** Omitted for accessories with no meaningful on/off, e.g. a fixed sensor. */
  onToggle?: () => void
}) {
  const active = isActiveState(accessory.entityId, value)
  const tint = accessory.domain === 'light' ? lightPreviewColor(value) : null

  const icon = (
    <HaIcon
      name={accessory.entity.attributes.icon ?? accessoryIconName(accessory.entity, accessory.kind)}
      size={26}
      fallbackKind={accessory.kind}
    />
  )

  return (
    <div
      className={`tile${active ? ' tile--active' : ''}${condition ? ' tile--conditional' : ''}`}
      title={condition ? `Only if ${condition}` : undefined}
      style={tint ? ({ '--tile-tint': tint } as React.CSSProperties) : undefined}
    >
      {onToggle ? (
        <button
          type="button"
          className="tile__icon tile__icon--toggle"
          onClick={onToggle}
          aria-pressed={active}
          aria-label={`${toggleActionLabel(accessory.entityId, active)} ${accessory.fullName}`}
          title={toggleActionLabel(accessory.entityId, active)}
        >
          {icon}
        </button>
      ) : (
        <span className="tile__icon">{icon}</span>
      )}

      <button type="button" className="tile__body" onClick={onClick} title={accessory.fullName}>
        <strong className="tile__name">{accessory.name}</strong>
        <small className="tile__value">
          {describeState(accessory.entityId, value, accessory.entity)}
        </small>
        {condition ? (
          <small className="tile__condition">
            <UiIcon name="condition" size={13} />
            <span>{condition}</span>
          </small>
        ) : null}
      </button>

      {!accessory.available ? <span className="tile__badge">Offline</span> : null}
    </div>
  )
}

/** An entity that is in the scene but no longer exists in Home Assistant. */
export function MissingTile({
  entityId,
  value,
  onRemove,
}: {
  entityId: string
  value: SceneEntityState
  onRemove: () => void
}) {
  return (
    <div className="tile tile--missing">
      <span className="tile__icon">
        <HaIcon fallbackKind="other" size={26} />
      </span>
      <span className="tile__text">
        <strong className="tile__name">{entityId}</strong>
        <small className="tile__value">Not in Home Assistant · {value.state}</small>
      </span>
      <button type="button" className="button button--small button--ghost" onClick={onRemove}>
        Remove
      </button>
    </div>
  )
}

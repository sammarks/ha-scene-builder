import { useMemo, useState } from 'react'
import type { Accessory, FloorGroup, Registries } from '../lib/accessories'
import { groupByFloorAndArea, pruneEmpty } from '../lib/accessories'
import { accessoryIconName, type AccessoryKind } from '../lib/capabilities'
import { HaIcon, UiIcon } from './Icon'
import { Sheet } from './ui'

const FILTERS: { value: AccessoryKind | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'light', label: 'Lights' },
  { value: 'fan', label: 'Fans' },
  { value: 'shade', label: 'Shades' },
  { value: 'media', label: 'Media' },
  { value: 'outlet', label: 'Outlets' },
  { value: 'switch', label: 'Switches' },
  { value: 'climate', label: 'Climate' },
  { value: 'lock', label: 'Locks' },
  { value: 'other', label: 'Other' },
]

/**
 * Full-height accessory browser, grouped floor → room → accessory, with
 * multi-select. Mirrors the "Add Accessories" step in HomeKit.
 */
export function AccessoryPicker({
  open,
  accessories,
  registries,
  selected,
  onToggle,
  onToggleMany,
  onClose,
}: {
  open: boolean
  accessories: Accessory[]
  registries: Registries
  selected: Set<string>
  onToggle: (accessory: Accessory) => void
  onToggleMany: (accessories: Accessory[], include: boolean) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<AccessoryKind | 'all'>('all')

  const floors: FloorGroup[] = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = accessories.filter((accessory) => {
      if (filter !== 'all' && accessory.kind !== filter) return false
      if (!needle) return true
      return (
        accessory.fullName.toLowerCase().includes(needle) ||
        accessory.entityId.toLowerCase().includes(needle)
      )
    })
    return pruneEmpty(groupByFloorAndArea(filtered, registries))
  }, [accessories, registries, query, filter])

  const availableFilters = useMemo(() => {
    const kinds = new Set(accessories.map((accessory) => accessory.kind))
    return FILTERS.filter((option) => option.value === 'all' || kinds.has(option.value))
  }, [accessories])

  return (
    <Sheet
      open={open}
      title="Add accessories"
      subtitle={`${selected.size} selected`}
      onClose={onClose}
      footer={
        <button type="button" className="button button--block" onClick={onClose}>
          Done
        </button>
      }
    >
      <div className="picker__controls">
        <div className="search">
          <UiIcon name="search" size={20} />
          <input
            type="search"
            placeholder="Search accessories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="chips">
          {availableFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`chip${filter === option.value ? ' chip--active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {floors.map((floor) => (
        <section key={floor.floorId ?? '_none'} className="picker__floor">
          <h3 className="picker__floor-title">
            <HaIcon name={floor.icon} fallbackKind="other" size={18} />
            {floor.name}
          </h3>

          {floor.areas.map((area) => {
            const allSelected = area.accessories.every((accessory) =>
              selected.has(accessory.entityId),
            )
            return (
              <div key={`${floor.floorId}-${area.areaId ?? '_none'}`} className="picker__area">
                <div className="picker__area-head">
                  <h4>{area.name}</h4>
                  <button
                    type="button"
                    className="button button--small button--ghost"
                    onClick={() => onToggleMany(area.accessories, !allSelected)}
                  >
                    {allSelected ? 'Clear' : 'Select all'}
                  </button>
                </div>
                <ul className="picker__list">
                  {area.accessories.map((accessory) => {
                    const isSelected = selected.has(accessory.entityId)
                    return (
                      <li key={accessory.entityId}>
                        <button
                          type="button"
                          className={`picker__row${isSelected ? ' picker__row--selected' : ''}`}
                          onClick={() => onToggle(accessory)}
                          aria-pressed={isSelected}
                        >
                          <span className="picker__row-icon">
                            <HaIcon
                              name={
                                accessory.entity.attributes.icon ??
                                accessoryIconName(accessory.entity, accessory.kind)
                              }
                              fallbackKind={accessory.kind}
                              size={22}
                            />
                          </span>
                          <span className="picker__row-text">
                            <strong>{accessory.name}</strong>
                            <small>
                              {accessory.entityId}
                              {accessory.available ? '' : ' · offline'}
                            </small>
                          </span>
                          <span className={`checkmark${isSelected ? ' checkmark--on' : ''}`}>
                            {isSelected ? <UiIcon name="check" size={16} /> : null}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </section>
      ))}

      {!floors.length ? (
        <p className="muted">
          Nothing matches. Try a different filter, or check that the devices are assigned to areas
          in Home Assistant.
        </p>
      ) : null}
    </Sheet>
  )
}

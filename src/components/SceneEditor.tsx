import { useCallback, useMemo, useState } from 'react'
import type { Accessory, Registries } from '../lib/accessories'
import { groupByFloorAndArea, pruneEmpty } from '../lib/accessories'
import {
  canOverrideKind,
  captureState,
  defaultState,
  detectKind,
  KIND_OVERRIDES,
  normalizeSceneEntity,
  toggleState,
  toSceneEntityValue,
  type AccessoryKind,
  type SceneEntityState,
} from '../lib/capabilities'
import type { HassEntity, SceneConfig } from '../lib/ha/types'
import { AccessoryEditor } from './AccessoryEditor'
import { AccessoryPicker } from './AccessoryPicker'
import { AccessoryTile, MissingTile } from './AccessoryTile'
import { HaIcon, UiIcon } from './Icon'
import { IconButton, IconPicker } from './IconPicker'
import { Banner, Row, Segmented, Sheet } from './ui'

export function SceneEditor({
  sceneId,
  initialConfig,
  accessories,
  registries,
  states,
  kindOverrides,
  onSetKindOverride,
  onSave,
  onDelete,
  onApply,
  onBack,
}: {
  sceneId: string | null
  initialConfig: SceneConfig | null
  accessories: Accessory[]
  registries: Registries
  states: Record<string, HassEntity>
  kindOverrides: Record<string, AccessoryKind>
  onSetKindOverride: (entityId: string, kind: AccessoryKind | null) => void
  onSave: (config: SceneConfig) => Promise<void>
  onDelete: () => Promise<void>
  onApply: (entities: Record<string, string | Record<string, any>>) => Promise<void>
  onBack: () => void
}) {
  const [name, setName] = useState(initialConfig?.name ?? '')
  const [icon, setIcon] = useState<string | undefined>(initialConfig?.icon)
  const [entities, setEntities] = useState<Record<string, SceneEntityState>>(() =>
    Object.fromEntries(
      Object.entries(initialConfig?.entities ?? {}).map(([entityId, value]) => [
        entityId,
        normalizeSceneEntity(value),
      ]),
    ),
  )

  const [dirty, setDirty] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [iconPickerOpen, setIconPickerOpen] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [applying, setApplying] = useState(false)
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const accessoryById = useMemo(
    () => new Map(accessories.map((accessory) => [accessory.entityId, accessory])),
    [accessories],
  )

  const selected = useMemo(() => new Set(Object.keys(entities)), [entities])

  const includedAccessories = useMemo(
    () => accessories.filter((accessory) => selected.has(accessory.entityId)),
    [accessories, selected],
  )

  const missingEntityIds = useMemo(
    () => Object.keys(entities).filter((entityId) => !accessoryById.has(entityId)),
    [entities, accessoryById],
  )

  const floors = useMemo(
    () => pruneEmpty(groupByFloorAndArea(includedAccessories, registries)),
    [includedAccessories, registries],
  )

  const mutate = useCallback(
    (updater: (current: Record<string, SceneEntityState>) => Record<string, SceneEntityState>) => {
      setEntities(updater)
      setDirty(true)
      setMessage(null)
    },
    [],
  )

  const toggleAccessory = useCallback(
    (accessory: Accessory) => {
      mutate((current) => {
        const next = { ...current }
        if (next[accessory.entityId]) {
          delete next[accessory.entityId]
        } else {
          // Snapshot what the device is doing right now, the way HomeKit does
          // when you add an accessory to a scene.
          next[accessory.entityId] = accessory.available
            ? captureState(accessory.entity)
            : defaultState(accessory.entity)
        }
        return next
      })
    },
    [mutate],
  )

  const toggleMany = useCallback(
    (list: Accessory[], include: boolean) => {
      mutate((current) => {
        const next = { ...current }
        for (const accessory of list) {
          if (include) {
            if (!next[accessory.entityId]) {
              next[accessory.entityId] = accessory.available
                ? captureState(accessory.entity)
                : defaultState(accessory.entity)
            }
          } else {
            delete next[accessory.entityId]
          }
        }
        return next
      })
    },
    [mutate],
  )

  const updateValue = useCallback(
    (entityId: string, value: SceneEntityState) => {
      mutate((current) => ({ ...current, [entityId]: value }))
    },
    [mutate],
  )

  /** Tapping a tile's icon flips it on or off without opening the editor. */
  const quickToggle = useCallback(
    (accessory: Accessory) => {
      mutate((current) => {
        const value = current[accessory.entityId]
        if (!value) return current
        const next = toggleState(accessory.entity, value)
        return next ? { ...current, [accessory.entityId]: next } : current
      })
    },
    [mutate],
  )

  const removeEntity = useCallback(
    (entityId: string) => {
      mutate((current) => {
        const next = { ...current }
        delete next[entityId]
        return next
      })
      setEditing(null)
    },
    [mutate],
  )

  const buildConfig = useCallback((): SceneConfig => {
    const config: SceneConfig = {
      name: name.trim(),
      entities: Object.fromEntries(
        Object.entries(entities).map(([entityId, value]) => [
          entityId,
          toSceneEntityValue(entityId, value),
        ]),
      ),
    }
    if (icon) config.icon = icon
    return config
  }, [name, icon, entities])

  const handleSave = async () => {
    if (!name.trim()) {
      setMessage({ tone: 'error', text: 'Give the scene a name before saving.' })
      return
    }
    if (!Object.keys(entities).length) {
      setMessage({ tone: 'error', text: 'Add at least one accessory before saving.' })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      await onSave(buildConfig())
      setDirty(false)
      setMessage({ tone: 'success', text: 'Saved to Home Assistant.' })
    } catch (error) {
      setMessage({ tone: 'error', text: error instanceof Error ? error.message : String(error) })
    } finally {
      setSaving(false)
    }
  }

  const handleApply = async () => {
    setApplying(true)
    setMessage(null)
    try {
      await onApply(buildConfig().entities)
      setMessage({ tone: 'success', text: 'Applied to your home — this did not save anything.' })
    } catch (error) {
      setMessage({ tone: 'error', text: error instanceof Error ? error.message : String(error) })
    } finally {
      setApplying(false)
    }
  }

  const handleBack = () => {
    if (dirty && !window.confirm('Discard unsaved changes to this scene?')) return
    onBack()
  }

  const editingAccessory = editing ? accessoryById.get(editing) : undefined
  const editingValue = editing ? entities[editing] : undefined

  return (
    <div className="screen">
      <header className="topbar">
        <button type="button" className="icon-button" onClick={handleBack} aria-label="Back">
          <UiIcon name="chevronLeft" size={24} />
        </button>
        <div className="topbar__main">
          <h1>{sceneId ? 'Edit Scene' : 'New Scene'}</h1>
          <p className="topbar__subtitle">
            {Object.keys(entities).length} accessor
            {Object.keys(entities).length === 1 ? 'y' : 'ies'}
            {dirty ? ' · unsaved changes' : ''}
          </p>
        </div>
        <div className="topbar__actions">
          <button type="button" className="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </header>

      <div className="screen__body">
        {message ? (
          <Banner tone={message.tone} title={message.tone === 'error' ? 'Could not save' : undefined}>
            {message.text}
          </Banner>
        ) : null}

        <section className="card scene-identity">
          <IconButton icon={icon} onClick={() => setIconPickerOpen(true)} />
          <label className="field field--flush">
            <span className="field__label">Scene name</span>
            <input
              type="text"
              value={name}
              placeholder="Movie Night"
              onChange={(event) => {
                setName(event.target.value)
                setDirty(true)
              }}
            />
          </label>
        </section>

        <div className="editor__actions">
          <button type="button" className="button button--block" onClick={() => setPickerOpen(true)}>
            <UiIcon name="plus" size={20} />
            Add accessories
          </button>
          <button
            type="button"
            className="button button--ghost button--block"
            onClick={handleApply}
            disabled={applying || !Object.keys(entities).length}
            title="Runs these settings on your home right now without saving"
          >
            <UiIcon name="play" size={20} />
            {applying ? 'Applying…' : 'Test'}
          </button>
        </div>

        {!Object.keys(entities).length ? (
          <div className="empty">
            <UiIcon name="dotsGrid" size={40} />
            <h2>No accessories yet</h2>
            <p>
              Add the lights, fans, shades and speakers this scene should control. Each one is
              captured at its current setting, then you can fine-tune it.
            </p>
          </div>
        ) : null}

        {floors.map((floor) => (
          <section key={floor.floorId ?? '_none'} className="section">
            <h2 className="section__title">
              <HaIcon name={floor.icon} fallbackKind="other" size={18} />
              {floor.name}
            </h2>
            {floor.areas.map((area) => (
              <div key={`${floor.floorId}-${area.areaId ?? '_none'}`} className="area">
                <h3 className="area__title">{area.name}</h3>
                <div className="tile-grid">
                  {area.accessories.map((accessory) => (
                    <AccessoryTile
                      key={accessory.entityId}
                      accessory={accessory}
                      value={entities[accessory.entityId]}
                      onClick={() => setEditing(accessory.entityId)}
                      onToggle={
                        toggleState(accessory.entity, entities[accessory.entityId])
                          ? () => quickToggle(accessory)
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        {missingEntityIds.length ? (
          <section className="section">
            <h2 className="section__title">Unknown entities</h2>
            <div className="tile-grid">
              {missingEntityIds.map((entityId) => (
                <MissingTile
                  key={entityId}
                  entityId={entityId}
                  value={entities[entityId]}
                  onRemove={() => removeEntity(entityId)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {sceneId ? (
          <div className="danger-zone">
            <button
              type="button"
              className="button button--danger button--block"
              onClick={() => setConfirmDelete(true)}
            >
              <UiIcon name="trash" size={20} />
              Delete scene
            </button>
          </div>
        ) : null}
      </div>

      <AccessoryPicker
        open={pickerOpen}
        accessories={accessories}
        registries={registries}
        selected={selected}
        onToggle={toggleAccessory}
        onToggleMany={toggleMany}
        onClose={() => setPickerOpen(false)}
      />

      <IconPicker
        open={iconPickerOpen}
        value={icon}
        onClose={() => setIconPickerOpen(false)}
        onChange={(next) => {
          setIcon(next)
          setDirty(true)
        }}
      />

      {editingAccessory && editingValue ? (
        <Sheet
          open
          title={editingAccessory.fullName}
          subtitle={editingAccessory.entityId}
          onClose={() => setEditing(null)}
          footer={
            <>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => removeEntity(editingAccessory.entityId)}
              >
                Remove
              </button>
              <button type="button" className="button" onClick={() => setEditing(null)}>
                Done
              </button>
            </>
          }
        >
          {!editingAccessory.available ? (
            <Banner tone="warn">
              This accessory is currently unavailable in Home Assistant, so its options come from
              the last information Home Assistant had about it.
            </Banner>
          ) : null}

          <AccessoryEditor
            entity={states[editingAccessory.entityId] ?? editingAccessory.entity}
            value={editingValue}
            onChange={(value) => updateValue(editingAccessory.entityId, value)}
          />

          <div className="sheet__extras">
            <button
              type="button"
              className="button button--ghost button--block"
              onClick={() => {
                const live = states[editingAccessory.entityId]
                if (live) updateValue(editingAccessory.entityId, captureState(live))
              }}
            >
              <UiIcon name="camera" size={20} />
              Use current state
            </button>

            {canOverrideKind(editingAccessory.entityId) ? (
              <Row
                label="Treat as"
                hint="Changes the icon and which filter this appears under"
                stacked
              >
                <Segmented
                  value={kindOverrides[editingAccessory.entityId] ?? detectKind(editingAccessory.entity)}
                  options={KIND_OVERRIDES}
                  onChange={(kind) => {
                    const detected = detectKind(editingAccessory.entity)
                    onSetKindOverride(
                      editingAccessory.entityId,
                      kind === detected ? null : kind,
                    )
                  }}
                />
              </Row>
            ) : null}
          </div>
        </Sheet>
      ) : null}

      <Sheet
        open={confirmDelete}
        title="Delete this scene?"
        onClose={() => setConfirmDelete(false)}
        footer={
          <>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button button--danger"
              onClick={async () => {
                setConfirmDelete(false)
                await onDelete()
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <p>
          <strong>{name || 'This scene'}</strong> will be removed from Home Assistant's{' '}
          <code>scenes.yaml</code>. Anything that calls it — automations, dashboards, voice
          assistants — will stop working.
        </p>
      </Sheet>
    </div>
  )
}

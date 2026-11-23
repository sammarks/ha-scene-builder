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
import {
  conditionProblem,
  describeConditions,
  fromHaCondition,
  METADATA_KEY,
  readConditionals,
  toStoredConditions,
  type EntityConditions,
} from '../lib/conditions'
import { evaluateConditions } from '../lib/ha/evaluate'
import { useHassStore } from '../lib/ha/store'
import type { HassEntity, SceneConfig } from '../lib/ha/types'
import { AccessoryEditor } from './AccessoryEditor'
import { ConditionsEditor } from './ConditionsEditor'
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
  const store = useHassStore()
  // Conditional accessories live in the scene's metadata, not its entities —
  // see lib/conditions.ts. In the editor both kinds are just accessories.
  const [initialConditionals] = useState(() => readConditionals(initialConfig?.metadata))
  const [entities, setEntities] = useState<Record<string, SceneEntityState>>(() => ({
    ...Object.fromEntries(
      Object.entries(initialConfig?.entities ?? {}).map(([entityId, value]) => [
        entityId,
        normalizeSceneEntity(value),
      ]),
    ),
    ...Object.fromEntries(
      Object.entries(initialConditionals).map(([entityId, entry]) => [
        entityId,
        normalizeSceneEntity(entry.state),
      ]),
    ),
  }))
  const [conditions, setConditions] = useState<Record<string, EntityConditions>>(() =>
    Object.fromEntries(
      Object.entries(initialConditionals).map(([entityId, entry]) => [
        entityId,
        { match: entry.match ?? 'all', conditions: entry.conditions.map(fromHaCondition) },
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
      setConditions((current) => {
        if (!current[entityId]) return current
        const next = { ...current }
        delete next[entityId]
        return next
      })
      setEditing(null)
    },
    [mutate],
  )

  const updateConditions = useCallback((entityId: string, value: EntityConditions) => {
    setConditions((current) => ({ ...current, [entityId]: value }))
    setDirty(true)
    setMessage(null)
  }, [])

  /** Accessories that actually have conditions; an emptied list means unconditional. */
  const activeConditions = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(conditions).filter(
          ([entityId, value]) => value.conditions.length && entities[entityId],
        ),
      ),
    [conditions, entities],
  )

  const buildConfig = useCallback((): SceneConfig => {
    const sceneEntities: SceneConfig['entities'] = {}
    // Start from what was there so metadata written by Home Assistant's own
    // editor (e.g. `entity_only`) survives, minus accessories no longer in the scene.
    const metadata: Record<string, any> = {}
    for (const [entityId, meta] of Object.entries(initialConfig?.metadata ?? {})) {
      if (!entities[entityId] || !meta || typeof meta !== 'object') continue
      const { [METADATA_KEY]: _ours, ...rest } = meta as Record<string, any>
      if (Object.keys(rest).length) metadata[entityId] = rest
    }

    for (const [entityId, value] of Object.entries(entities)) {
      const sceneValue = toSceneEntityValue(entityId, value)
      const conditional = activeConditions[entityId]
      if (conditional) {
        // Kept out of `entities` so Home Assistant never sets it unconditionally;
        // the integration applies it when the conditions pass.
        metadata[entityId] = {
          ...metadata[entityId],
          [METADATA_KEY]: { state: sceneValue, ...toStoredConditions(conditional) },
        }
      } else {
        sceneEntities[entityId] = sceneValue
      }
    }

    const config: SceneConfig = { name: name.trim(), entities: sceneEntities }
    if (icon) config.icon = icon
    if (Object.keys(metadata).length) config.metadata = metadata
    return config
  }, [name, icon, entities, activeConditions, initialConfig])

  const nameFor = useCallback(
    (entityId: string) => accessoryById.get(entityId)?.fullName ?? entityId,
    [accessoryById],
  )

  /**
   * Validates every accessory's conditions with Home Assistant and returns
   * which ones pass right now. Throws with a readable message if any are invalid.
   */
  const checkConditions = useCallback(async () => {
    for (const [entityId, value] of Object.entries(activeConditions)) {
      const problem = value.conditions.map(conditionProblem).find(Boolean)
      if (problem) throw new Error(`${nameFor(entityId)}: ${problem}`)
    }
    const results = await evaluateConditions(
      store.current,
      Object.fromEntries(
        Object.entries(activeConditions).map(([entityId, value]) => [
          entityId,
          toStoredConditions(value),
        ]),
      ),
    )
    for (const [entityId, result] of Object.entries(results)) {
      if (result.error) throw new Error(`${nameFor(entityId)}: ${result.error}`)
    }
    return results
  }, [activeConditions, store, nameFor])

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
      await checkConditions()
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
      const results = await checkConditions()
      const config = buildConfig()
      const toApply: Record<string, string | Record<string, any>> = { ...config.entities }
      const skipped: string[] = []
      for (const [entityId, result] of Object.entries(results)) {
        if (result.result) toApply[entityId] = toSceneEntityValue(entityId, entities[entityId])
        else skipped.push(nameFor(entityId))
      }
      if (Object.keys(toApply).length) await onApply(toApply)
      setMessage({
        tone: 'success',
        text:
          'Applied to your home — this did not save anything.' +
          (skipped.length
            ? ` Left alone because their conditions are not met right now: ${skipped.join(', ')}.`
            : ''),
      })
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
            {Object.keys(activeConditions).length
              ? ` · ${Object.keys(activeConditions).length} conditional`
              : ''}
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
                      condition={
                        activeConditions[accessory.entityId]
                          ? describeConditions(activeConditions[accessory.entityId], states)
                          : undefined
                      }
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

          <ConditionsEditor
            value={conditions[editingAccessory.entityId] ?? { match: 'all', conditions: [] }}
            onChange={(value) => updateConditions(editingAccessory.entityId, value)}
            states={states}
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

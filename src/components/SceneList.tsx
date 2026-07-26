import { useMemo, useState } from 'react'
import type { SceneSummary } from '../lib/ha/types'
import { HaIcon, UiIcon } from './Icon'
import { Banner } from './ui'

export function SceneList({
  scenes,
  onOpen,
  onCreate,
  onRefresh,
  onSettings,
}: {
  scenes: SceneSummary[]
  onOpen: (scene: SceneSummary) => void
  onCreate: () => void
  onRefresh: () => void
  onSettings: () => void
}) {
  const [query, setQuery] = useState('')

  const { editable, readOnly } = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matches = needle
      ? scenes.filter((scene) => scene.name.toLowerCase().includes(needle))
      : scenes
    return {
      editable: matches.filter((scene) => scene.configId),
      readOnly: matches.filter((scene) => !scene.configId),
    }
  }, [scenes, query])

  return (
    <div className="screen">
      <header className="topbar">
        <div className="topbar__main">
          <h1>Scenes</h1>
          <p className="topbar__subtitle">
            {scenes.length} scene{scenes.length === 1 ? '' : 's'} in Home Assistant
          </p>
        </div>
        <div className="topbar__actions">
          <button type="button" className="icon-button" onClick={onRefresh} aria-label="Refresh">
            <UiIcon name="refresh" size={22} />
          </button>
          <button type="button" className="icon-button" onClick={onSettings} aria-label="Settings">
            <UiIcon name="settings" size={22} />
          </button>
        </div>
      </header>

      <div className="screen__body">
        <button type="button" className="new-scene" onClick={onCreate}>
          <span className="new-scene__icon">
            <UiIcon name="plus" size={24} />
          </span>
          <span>
            <strong>New Scene</strong>
            <small>Pick accessories and set how each one should look</small>
          </span>
          <UiIcon name="chevronRight" size={22} />
        </button>

        {scenes.length > 6 ? (
          <div className="search">
            <UiIcon name="search" size={20} />
            <input
              type="search"
              placeholder="Search scenes"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        ) : null}

        {editable.length ? (
          <ul className="scene-list">
            {editable.map((scene) => (
              <li key={scene.entity_id}>
                <button type="button" className="scene-row" onClick={() => onOpen(scene)}>
                  <span className="scene-row__icon">
                    <HaIcon name={scene.icon} fallbackKind="other" size={24} />
                  </span>
                  <span className="scene-row__text">
                    <strong>{scene.name}</strong>
                    <small>
                      {scene.entityCount} accessor{scene.entityCount === 1 ? 'y' : 'ies'}
                    </small>
                  </span>
                  <UiIcon name="chevronRight" size={22} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {!scenes.length ? (
          <Banner tone="info" title="No scenes yet">
            Create your first scene above. It will be written to Home Assistant's{' '}
            <code>scenes.yaml</code>, exactly like scenes made in the Home Assistant UI.
          </Banner>
        ) : null}

        {readOnly.length ? (
          <section className="section">
            <h2 className="section__title">Not editable</h2>
            <p className="muted section__note">
              These scenes are defined in YAML without an <code>id</code>, so Home Assistant's own
              editor cannot change them either. Add an <code>id</code> to make them editable.
            </p>
            <ul className="scene-list scene-list--muted">
              {readOnly.map((scene) => (
                <li key={scene.entity_id}>
                  <div className="scene-row scene-row--static">
                    <span className="scene-row__icon">
                      <HaIcon name={scene.icon} fallbackKind="other" size={24} />
                    </span>
                    <span className="scene-row__text">
                      <strong>{scene.name}</strong>
                      <small>{scene.entity_id}</small>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}

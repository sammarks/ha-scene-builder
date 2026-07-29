import { useCallback, useState } from 'react'
import { SceneEditor } from './components/SceneEditor'
import { SceneList } from './components/SceneList'
import { Banner, Spinner } from './components/ui'
import { UiIcon } from './components/Icon'
import { HaError, toHaError } from './lib/ha/hass'
import {
  deleteSceneConfig,
  fetchSceneConfig,
  newSceneId,
  saveSceneConfig,
} from './lib/ha/rest'
import { useHassStore } from './lib/ha/store'
import type { SceneConfig, SceneSummary } from './lib/ha/types'
import { useHomeAssistant } from './lib/useHomeAssistant'

type View =
  | { name: 'list' }
  | { name: 'editor'; sceneId: string | null; config: SceneConfig | null }

export default function App() {
  const store = useHassStore()
  const [view, setView] = useState<View>({ name: 'list' })
  const [busy, setBusy] = useState<string | null>(null)
  const [actionError, setActionError] = useState<HaError | null>(null)
  // Bumped only when a different scene is opened, so that saving a new scene —
  // which gives the editor an id it did not have — does not remount it and
  // throw away the "Saved" confirmation.
  const [editorSession, setEditorSession] = useState(0)

  const ha = useHomeAssistant()

  const openScene = useCallback(
    async (scene: SceneSummary) => {
      if (!scene.configId) return
      setBusy('Loading scene…')
      setActionError(null)
      try {
        const config = await fetchSceneConfig(store.current, scene.configId)
        setEditorSession((session) => session + 1)
        setView({
          name: 'editor',
          sceneId: scene.configId,
          config: config ?? { name: scene.name, icon: scene.icon ?? undefined, entities: {} },
        })
      } catch (error) {
        setActionError(toHaError(error, 'Could not load that scene.'))
      } finally {
        setBusy(null)
      }
    },
    [store],
  )

  const saveScene = useCallback(
    async (sceneId: string | null, config: SceneConfig) => {
      const id = sceneId ?? newSceneId()
      await saveSceneConfig(store.current, id, config)
      // Picks up the new scene entity without waiting for HA to notice on its own.
      try {
        await ha.callService('scene', 'reload')
      } catch {
        /* the config API reloads scenes itself; this is only a nudge */
      }
      await ha.refresh()
      return id
    },
    [store, ha],
  )

  if (ha.status === 'error') {
    return (
      <div className="screen screen--center">
        <Banner tone="error" title="Could not reach Home Assistant">
          {ha.error?.message ?? 'Something went wrong reading your devices.'}
        </Banner>
      </div>
    )
  }

  if (ha.status === 'loading') {
    return (
      <div className="screen screen--center">
        <Spinner label="Loading your home…" />
      </div>
    )
  }

  return (
    <>
      {busy ? (
        <div className="overlay">
          <Spinner label={busy} />
        </div>
      ) : null}

      {actionError ? (
        <div className="floating-banner">
          <Banner
            tone="error"
            title="Something went wrong"
            action={
              <button
                type="button"
                className="icon-button"
                onClick={() => setActionError(null)}
                aria-label="Dismiss"
              >
                <UiIcon name="close" size={20} />
              </button>
            }
          >
            {actionError.message}
          </Banner>
        </div>
      ) : null}

      {view.name === 'list' ? (
        <SceneList
          scenes={ha.scenes}
          onOpen={openScene}
          onCreate={() => {
            setEditorSession((session) => session + 1)
            setView({ name: 'editor', sceneId: null, config: null })
          }}
          onRefresh={() => ha.refresh()}
        />
      ) : null}

      {view.name === 'editor' ? (
        <SceneEditor
          key={editorSession}
          sceneId={view.sceneId}
          initialConfig={view.config}
          accessories={ha.accessories}
          registries={ha.registries}
          states={ha.states}
          kindOverrides={ha.kindOverrides}
          onSetKindOverride={ha.setKindOverride}
          onSave={async (config) => {
            const id = await saveScene(view.sceneId, config)
            setView({ name: 'editor', sceneId: id, config })
          }}
          onDelete={async () => {
            if (!view.sceneId) return
            setBusy('Deleting…')
            try {
              await deleteSceneConfig(store.current, view.sceneId)
              await ha.refresh()
              setView({ name: 'list' })
            } catch (error) {
              setActionError(toHaError(error, 'Could not delete that scene.'))
            } finally {
              setBusy(null)
            }
          }}
          onApply={async (entities) => {
            await ha.callService('scene', 'apply', { entities })
          }}
          onBack={() => setView({ name: 'list' })}
        />
      ) : null}
    </>
  )
}

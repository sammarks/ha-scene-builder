import { useCallback, useEffect, useState } from 'react'
import { SceneEditor } from './components/SceneEditor'
import { SceneList } from './components/SceneList'
import { SetupScreen } from './components/SetupScreen'
import { Banner, Spinner } from './components/ui'
import { UiIcon } from './components/Icon'
import { HaError } from './lib/ha/connection'
import {
  deleteSceneConfig,
  fetchSceneConfig,
  newSceneId,
  saveSceneConfig,
} from './lib/ha/rest'
import type { SceneConfig, SceneSummary } from './lib/ha/types'
import { clearSettings, loadSettings, saveSettings, type Settings } from './lib/storage'
import { useHomeAssistant } from './lib/useHomeAssistant'

type View =
  | { name: 'list' }
  | { name: 'settings' }
  | { name: 'editor'; sceneId: string | null; config: SceneConfig | null }

function CorsHelp({ origin }: { origin: string }) {
  return (
    <>
      <p>
        Home Assistant would not accept this request. Saving scenes uses its REST API, which only
        answers web pages you have allowed. Add this to <code>configuration.yaml</code> and restart
        Home Assistant:
      </p>
      <pre>{`http:\n  cors_allowed_origins:\n    - ${origin}`}</pre>
    </>
  )
}

export default function App() {
  const [settings, setSettings] = useState<Settings | null>(() => loadSettings())
  const [view, setView] = useState<View>({ name: 'list' })
  const [busy, setBusy] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<HaError | null>(null)
  // Bumped only when a different scene is opened, so that saving a new scene —
  // which gives the editor an id it did not have — does not remount it and
  // throw away the "Saved" confirmation.
  const [editorSession, setEditorSession] = useState(0)

  const ha = useHomeAssistant(settings)
  const origin = window.location.origin

  // A failed connection sends you back to setup with the reason attached.
  useEffect(() => {
    if (ha.status === 'error' && view.name !== 'settings') setView({ name: 'settings' })
  }, [ha.status, view.name])

  const connect = useCallback((next: Settings) => {
    saveSettings(next)
    setSettings(next)
    setView({ name: 'list' })
  }, [])

  const openScene = useCallback(
    async (scene: SceneSummary) => {
      if (!settings || !scene.configId) return
      setBusy('Loading scene…')
      setLoadError(null)
      try {
        const config = await fetchSceneConfig(settings.baseUrl, settings.token, scene.configId)
        setEditorSession((session) => session + 1)
        setView({
          name: 'editor',
          sceneId: scene.configId,
          config: config ?? { name: scene.name, icon: scene.icon ?? undefined, entities: {} },
        })
      } catch (error) {
        setLoadError(error instanceof HaError ? error : new HaError(String(error), 'unknown'))
      } finally {
        setBusy(null)
      }
    },
    [settings],
  )

  const saveScene = useCallback(
    async (sceneId: string | null, config: SceneConfig) => {
      if (!settings) throw new HaError('Not connected.', 'network')
      const id = sceneId ?? newSceneId()
      await saveSceneConfig(settings.baseUrl, settings.token, id, config)
      // Picks up the new scene entity without waiting for HA to notice on its own.
      try {
        await ha.callService('scene', 'reload')
      } catch {
        /* the config API reloads scenes itself; this is only a nudge */
      }
      await ha.refresh()
      return id
    },
    [settings, ha],
  )

  if (!settings || view.name === 'settings') {
    return (
      <SetupScreen
        initial={settings}
        connecting={ha.status === 'connecting'}
        errorMessage={ha.error?.message ?? null}
        errorKind={ha.error?.kind ?? null}
        onConnect={connect}
        onCancel={
          settings && ha.status === 'ready'
            ? () => setView({ name: 'list' })
            : undefined
        }
        onForget={
          settings
            ? () => {
                clearSettings()
                setSettings(null)
                setView({ name: 'list' })
              }
            : undefined
        }
      />
    )
  }

  if (ha.status === 'connecting' || ha.status === 'idle') {
    return (
      <div className="screen screen--center">
        <Spinner label="Connecting to Home Assistant…" />
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

      {loadError ? (
        <div className="floating-banner">
          <Banner
            tone="error"
            title="Could not load that scene"
            action={
              <button
                type="button"
                className="icon-button"
                onClick={() => setLoadError(null)}
                aria-label="Dismiss"
              >
                <UiIcon name="close" size={20} />
              </button>
            }
          >
            {loadError.kind === 'cors' ? <CorsHelp origin={origin} /> : loadError.message}
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
          onSettings={() => setView({ name: 'settings' })}
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
            if (!settings || !view.sceneId) return
            setBusy('Deleting…')
            try {
              await deleteSceneConfig(settings.baseUrl, settings.token, view.sceneId)
              await ha.refresh()
              setView({ name: 'list' })
            } catch (error) {
              setLoadError(error instanceof HaError ? error : new HaError(String(error), 'unknown'))
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

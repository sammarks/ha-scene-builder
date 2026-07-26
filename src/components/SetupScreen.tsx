import { useState } from 'react'
import { normalizeBaseUrl } from '../lib/ha/url'
import type { Settings } from '../lib/storage'
import { UiIcon } from './Icon'
import { Banner } from './ui'

function Disclosure({
  title,
  children,
  defaultOpen,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="disclosure" open={defaultOpen}>
      <summary>
        <span>{title}</span>
        <UiIcon name="chevronDown" size={20} />
      </summary>
      <div className="disclosure__body">{children}</div>
    </details>
  )
}

function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="copy-block">
      <pre>{text}</pre>
      <button
        type="button"
        className="button button--small button--ghost"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          } catch {
            setCopied(false)
          }
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export function SetupScreen({
  initial,
  connecting,
  errorMessage,
  errorKind,
  onConnect,
  onCancel,
  onForget,
}: {
  initial: Settings | null
  connecting: boolean
  errorMessage?: string | null
  errorKind?: string | null
  onConnect: (settings: Settings) => void
  onCancel?: () => void
  onForget?: () => void
}) {
  const [baseUrl, setBaseUrl] = useState(initial?.baseUrl ?? '')
  const [token, setToken] = useState(initial?.token ?? '')
  const [showToken, setShowToken] = useState(false)

  const origin = typeof window === 'undefined' ? 'https://example.github.io' : window.location.origin
  const normalized = normalizeBaseUrl(baseUrl)
  const mixedContent = window.location.protocol === 'https:' && /^http:\/\//i.test(normalized)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!normalized || !token.trim()) return
    onConnect({ baseUrl: normalized, token: token.trim() })
  }

  return (
    <div className="setup">
      <div className="setup__card">
        <header className="setup__header">
          <h1>Scene Builder</h1>
          <p>A HomeKit-style scene editor for Home Assistant.</p>
        </header>

        {errorMessage ? (
          <Banner tone="error" title="Could not connect">
            {errorMessage}
            {errorKind === 'auth' ? ' Create a fresh long-lived access token and try again.' : null}
          </Banner>
        ) : null}

        <form onSubmit={submit} className="setup__form">
          <label className="field">
            <span className="field__label">Home Assistant address</span>
            <input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="http://homeassistant.local:8123"
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.target.value)}
            />
            <span className="field__hint">
              {normalized && normalized !== baseUrl.trim() ? `Will connect to ${normalized}` : 'Include the port if it is not 80 or 443.'}
            </span>
          </label>

          <label className="field">
            <span className="field__label">Long-lived access token</span>
            <span className="field__with-button">
              <input
                type={showToken ? 'text' : 'password'}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6…"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowToken((value) => !value)}
                aria-label={showToken ? 'Hide token' : 'Show token'}
              >
                <UiIcon name={showToken ? 'eyeOff' : 'eye'} size={20} />
              </button>
            </span>
            <span className="field__hint">
              Stored only in this browser's local storage, and sent only to your Home Assistant.
            </span>
          </label>

          {mixedContent ? (
            <Banner tone="warn" title="This combination is blocked by your browser">
              This page is loaded over HTTPS, but <code>{normalized}</code> is plain HTTP. Browsers
              refuse those requests. Use your HTTPS address (for example a Nabu Casa remote URL), or
              run this app locally with <code>npm run dev</code>, or serve it from Home Assistant
              itself — see the README.
            </Banner>
          ) : null}

          <div className="setup__actions">
            {onForget ? (
              <button
                type="button"
                className="button button--ghost button--quiet"
                onClick={() => {
                  if (window.confirm('Remove the saved address and token from this browser?')) {
                    setBaseUrl('')
                    setToken('')
                    onForget()
                  }
                }}
              >
                <UiIcon name="logout" size={18} />
                Forget
              </button>
            ) : null}
            <span className="setup__spacer" />
            {onCancel ? (
              <button type="button" className="button button--ghost" onClick={onCancel}>
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              className="button"
              disabled={connecting || !normalized || !token.trim()}
            >
              {connecting ? 'Connecting…' : 'Connect'}
            </button>
          </div>
        </form>

        <Disclosure title="How do I create an access token?" defaultOpen={!initial}>
          <ol>
            <li>Open Home Assistant and click your user name at the bottom of the sidebar.</li>
            <li>
              Go to the <strong>Security</strong> tab and scroll to{' '}
              <strong>Long-lived access tokens</strong>.
            </li>
            <li>
              Choose <strong>Create token</strong>, give it a name such as “Scene Builder”, and
              confirm.
            </li>
            <li>
              Copy the token straight away — Home Assistant shows it exactly once — and paste it
              above.
            </li>
          </ol>
          <p className="muted">
            You can revoke the token from that same page at any time, which instantly cuts off this
            app.
          </p>
        </Disclosure>

        <Disclosure title="One-time Home Assistant setup (required to save scenes)">
          <p>
            Reading your devices works with no configuration. <strong>Saving</strong> a scene uses
            Home Assistant's REST API, which only accepts requests from web pages you have allowed.
            Add this to <code>configuration.yaml</code> and restart Home Assistant:
          </p>
          <CopyBlock text={`http:\n  cors_allowed_origins:\n    - ${origin}`} />
          <p className="muted">
            If you already have an <code>http:</code> section, add the{' '}
            <code>cors_allowed_origins</code> key to it rather than repeating the section. Skipping
            this step means you can browse and build a scene, but the save will fail.
          </p>
        </Disclosure>

        <Disclosure title="Is it safe to paste my token here?">
          <p>
            This app has no backend. Everything runs in this browser tab: your address and token go
            to local storage, and requests go directly from your browser to your Home Assistant —
            nothing is sent anywhere else.
          </p>
          <p className="muted">
            That said, a long-lived token grants full access to your Home Assistant, so treat it
            like a password. Prefer a dedicated token you can revoke, and avoid using this on a
            shared or public computer. If you would rather not trust a page hosted elsewhere, serve
            the app from your own Home Assistant — the README explains how.
          </p>
        </Disclosure>
      </div>
    </div>
  )
}

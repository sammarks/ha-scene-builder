# Scene Builder

A HomeKit-style scene editor for Home Assistant. Pick accessories grouped by floor and room,
set exactly what each one should do, and save the result straight into Home Assistant's
`scenes.yaml` — the same place the built-in scene editor writes to.

It is a single static page with no backend. Your Home Assistant address and token live in your
browser's local storage, and every request goes directly from your browser to your Home Assistant.

## Features

- **Floor → Room → Accessory grouping**, read from Home Assistant's own floor, area, device and
  entity registries.
- **Controls that match the device.** Capabilities come from Home Assistant, so a non-dimmable
  light gets a plain on/off toggle, a three-speed fan gets "2 of 3" rather than "66%", and a
  cover without position support gets Open/Closed instead of a slider.
- **Snapshot on add.** Adding an accessory captures what it is doing right now, then you fine-tune.
- **Test before saving** — applies the settings to your home without writing anything.
- **Icon picker** using Material Design Icons, the same set Home Assistant uses, so the icon you
  pick renders identically in dashboards and the sidebar.
- **Responsive** — a bottom sheet and two-column tiles on a phone, a dialog and wider grid on
  desktop. Light and dark themes follow the system setting.

### Supported accessories

| Type | What you can set |
| --- | --- |
| Lights | On/off, brightness, colour temperature, hue and saturation — only what the light supports |
| Fans | On/off, speed (percentage or discrete steps), preset mode, oscillation, direction |
| Covers / shades / blinds | Position, tilt, or plain open/closed |
| Media players (Apple TV, HomePod, …) | Play, pause, stop, on, off, volume, mute, source |
| Switches and smart outlets | On/off, plus a "treat as" override so a plug running a lamp shows as a light |
| Climate | HVAC mode, target temperature or range, fan mode |
| Locks | Locked / unlocked |
| Humidifiers, water heaters, valves | Mode, target humidity, temperature, position |

Anything else in a supported domain falls back to on/off.

## Setup

### 1. Create a long-lived access token

1. Open Home Assistant and click your user name at the bottom of the sidebar.
2. Go to the **Security** tab and scroll to **Long-lived access tokens**.
3. Choose **Create token**, name it something like "Scene Builder", and confirm.
4. Copy the token immediately — Home Assistant shows it exactly once.

You can revoke it from the same page at any time, which instantly cuts off this app.

### 2. Allow the app to save scenes

Reading your devices works with no configuration, because that goes over Home Assistant's
WebSocket API. **Saving** a scene uses the REST config API, which only answers web pages you have
explicitly allowed. Add this to `configuration.yaml` and restart Home Assistant:

```yaml
http:
  cors_allowed_origins:
    - https://YOUR-USERNAME.github.io
```

Use the origin only — scheme and host, no path. If you already have an `http:` section, add the
`cors_allowed_origins` key to it instead of repeating the section. The app shows you the exact
origin to paste on its setup screen.

Skip this step and you can still browse devices and build a scene, but the save will fail.

### 3. Open the app and connect

Enter your Home Assistant address (including the port, e.g. `http://homeassistant.local:8123`)
and the token.

## The HTTPS problem, and how to avoid it

Browsers refuse to let an **HTTPS** page talk to an **HTTP** server. GitHub Pages is always HTTPS,
so a GitHub Pages deployment can only reach a Home Assistant that has HTTPS itself — for example a
Nabu Casa remote URL or your own reverse proxy. The app detects this and tells you rather than
failing silently.

If your Home Assistant is plain HTTP on your LAN, use one of these instead:

**Serve it from Home Assistant itself (recommended for local installs).** Same origin, so there is
no CORS step and no mixed-content problem:

```bash
npm run build
```

Copy the contents of `dist/` into your Home Assistant config folder at `config/www/scene-builder/`,
then open `http://homeassistant.local:8123/local/scene-builder/index.html`. You can skip the
`cors_allowed_origins` step entirely in this setup.

**Or run it locally:**

```bash
npm run dev
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`. The included workflow at `.github/workflows/deploy.yml` builds and publishes.

The build uses a relative base path, so it works from a project page
(`https://user.github.io/ha-scene-builder/`), a user page, or any static host without
reconfiguration.

## Development

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` — typecheck and produce `dist/`
- `npm run preview` — serve the production build locally
- `node scripts/gen-icons.mjs` — regenerate `src/lib/icons.generated.ts` after editing the curated
  icon list. Every name is validated against `@mdi/js`, and only the icons actually used are
  bundled.

### How it talks to Home Assistant

| Purpose | Transport | Why |
| --- | --- | --- |
| Auth, states, floor/area/device/entity registries, `scene.apply`, `scene.reload` | WebSocket (`/api/websocket`) | The registries have no REST equivalent, and WebSockets are not subject to CORS |
| Load, save and delete scene configs | REST (`/api/config/scene/config/<id>`) | The only way to persist a scene; this is what needs `cors_allowed_origins` |

Scenes are written in exactly the format Home Assistant's own editor uses, so scenes made here are
editable there and vice versa. Scenes defined in YAML without an `id` are listed as read-only,
because Home Assistant's API cannot modify them either.

## A note on the token

A long-lived access token grants full access to your Home Assistant, so treat it like a password.
This app sends it only to the address you enter, and stores it only in your own browser. Even so,
prefer a dedicated token you can revoke, and avoid using this on a shared computer. If you would
rather not trust a page hosted elsewhere, serve it from your own Home Assistant as described above.

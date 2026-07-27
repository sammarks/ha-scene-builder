# Scene Builder

A HomeKit-style scene editor for Home Assistant. Pick accessories grouped by floor and room,
set exactly what each one should do, and save the result straight into Home Assistant's
`scenes.yaml` — the same place the built-in scene editor writes to.

It installs as a custom integration and adds a **Scene Builder** item to your sidebar. The panel
is served by your own Home Assistant and talks to it as the signed-in user, so there is no access
token to create, nothing to keep in local storage, and no CORS configuration.

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
  desktop. Follows the light or dark theme you have chosen in Home Assistant.

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

## Requirements

- Home Assistant **2024.7** or newer.
- An **administrator** account. Home Assistant's scene config API is admin-only, so the panel is
  registered with `require_admin` and will not appear in the sidebar for other users.

## Installation

### Via HACS

1. In HACS, open the three-dot menu and choose **Custom repositories**.
2. Add `https://github.com/sammarks/ha-scene-builder` with category **Integration**.
3. Find **Scene Builder** in the list, choose **Download**, and restart Home Assistant.
4. Go to **Settings → Devices & Services → Add Integration** and pick **Scene Builder**.

**Scene Builder** now appears in your sidebar.

### Manually

Copy `custom_components/scene_builder/` from this repository into your Home Assistant config
directory so you end up with `config/custom_components/scene_builder/`, restart, then add the
integration as in step 4 above. The built frontend is committed, so no build step is needed.

## How it works

The integration itself is small: it serves the built frontend on a static route and registers a
`panel_custom` pointing at it. Home Assistant then hands the panel its `hass` object, and the
editor uses that for everything.

| Purpose | Transport |
| --- | --- |
| Entity states | `hass.states`, sampled every 750 ms rather than followed change-for-change |
| Floor, area, device and entity registries | `hass.callWS` |
| `scene.apply`, `scene.reload` | `hass.callService` |
| Load, save and delete scene configs | `hass.callApi` → `/api/config/scene/config/<id>` |

Scenes are written in exactly the format Home Assistant's own editor uses, so scenes made here are
editable there and vice versa. Scenes defined in YAML without an `id` are listed as read-only,
because Home Assistant's API cannot modify them either.

The panel renders inside a shadow root. Home Assistant's frontend is built from web components so
its styles cannot reach in, and this app's stylesheet claims names general enough (`.screen`,
`.overlay`, `.banner`) that letting it loose on the shared document would be asking for trouble.

### What is stored where

Scenes go to `scenes.yaml` through Home Assistant. The only thing kept in browser storage is the
per-entity "treat as" override — the one that decides whether a smart plug is presented as a lamp
or a heater. That is per browser and per device, and losing it changes nothing about your saved
scenes, only which controls the editor offers.

## Development

```bash
npm install
npm run dev
```

`npm run dev` serves the harness in `dev/`, which mounts the real panel element against a mock
`hass` — a small fixture with a couple of floors, rooms and device types. It needs no Home
Assistant instance and no token, and it exercises the same code path the panel uses in production.

To try it against a real instance:

```bash
npm run build
HA_CONFIG=~/homeassistant npm run install:local
```

Then restart Home Assistant. Custom components are only loaded at startup, so a restart is needed
after every copy.

Other scripts:

- `npm run build` — typecheck, then bundle into `custom_components/scene_builder/frontend/`
- `npm run typecheck` — types only
- `npm run icons` — regenerate `src/lib/icons.generated.ts` after editing the curated icon list.
  Every name is validated against `@mdi/js`, and only the icons actually used are bundled.

### The committed bundle

`custom_components/scene_builder/frontend/entrypoint.js` is checked in. HACS copies files out of
the repository and has no way to run a build, so the shipped artifact has to be in git. CI rebuilds
it on every pull request and fails if the result differs from what is committed — run
`npm run build` and include the result in your commit.

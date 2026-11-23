"""Constants for the Scene Builder integration."""

DOMAIN = "scene_builder"

PANEL_TITLE = "Scene Builder"
PANEL_ICON = "mdi:palette-outline"

# The path the panel lives at, e.g. http://homeassistant.local:8123/scene-builder
PANEL_URL = "scene-builder"

# Where the built frontend is served from. Kept distinct from PANEL_URL so the
# assets never collide with the panel's own routes.
STATIC_URL = "/scene_builder_static"

# The custom element entrypoint.tsx defines. Must match customElements.define().
WEBCOMPONENT_NAME = "scene-builder-panel"

# aiohttp routes cannot be removed once added, so the static path is registered
# at most once per Home Assistant run and this flag records that it happened.
STATIC_PATH_REGISTERED = "scene_builder_static_path_registered"

# The key inside a scene's per-entity `metadata` that holds an accessory's
# conditions and the state to apply when they pass.
METADATA_KEY = "scene_builder"

# hass.data key for the unsubscribe callback of the scene activation listener.
DATA_UNSUB = "scene_builder_unsub"

# The websocket command only needs registering once per Home Assistant run.
WS_REGISTERED = "scene_builder_ws_registered"

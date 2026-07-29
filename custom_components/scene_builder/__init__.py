"""Scene Builder — a HomeKit-style scene editor served from inside Home Assistant.

This integration ships no entities and polls nothing. All it does is put the
built frontend on an HTTP route and register a sidebar panel that loads it. The
panel receives Home Assistant's `hass` object directly, so the editor talks to
the running instance as the signed-in user — no access token, and no
`cors_allowed_origins` entry, because nothing is cross-origin any more.
"""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import (
    DOMAIN,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL,
    STATIC_PATH_REGISTERED,
    STATIC_URL,
    WEBCOMPONENT_NAME,
)

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Serve the frontend and add the sidebar panel."""
    entrypoint = FRONTEND_DIR / "entrypoint.js"
    if not entrypoint.is_file():
        _LOGGER.error(
            "Scene Builder's frontend bundle is missing from %s. If you installed "
            "from a git clone rather than HACS, run 'npm ci && npm run build' in "
            "the repository first",
            FRONTEND_DIR,
        )
        return False

    if not hass.data.get(STATIC_PATH_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=True)]
        )
        hass.data[STATIC_PATH_REGISTERED] = True

    # The bundle is served with cache headers, so the URL has to change when the
    # integration is updated or browsers will keep the old build indefinitely.
    integration = await async_get_integration(hass, DOMAIN)
    module_url = f"{STATIC_URL}/entrypoint.js?v={integration.version}"

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL,
        webcomponent_name=WEBCOMPONENT_NAME,
        module_url=module_url,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        # Reading devices needs no special rights, but the scene config API that
        # saves them is admin-only. Better to hide the panel than to let a
        # non-admin build a scene and fail at the last step.
        require_admin=True,
        embed_iframe=False,
    )

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the sidebar panel.

    The static route stays behind: aiohttp has no way to unregister one. It is
    inert without the panel, and a restart clears it.
    """
    frontend.async_remove_panel(hass, PANEL_URL)
    return True

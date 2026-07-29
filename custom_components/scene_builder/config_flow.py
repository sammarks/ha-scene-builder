"""Config flow for Scene Builder.

There is nothing to configure — the flow exists so the panel can be added and
removed from the UI like any other integration, rather than through a
`configuration.yaml` entry and a restart.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN, PANEL_TITLE


class SceneBuilderConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Scene Builder."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Confirm adding the panel."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is None:
            return self.async_show_form(step_id="user", data_schema=vol.Schema({}))

        return self.async_create_entry(title=PANEL_TITLE, data={})

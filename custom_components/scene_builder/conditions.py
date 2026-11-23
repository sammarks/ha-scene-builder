"""Per-accessory conditions for scenes.

Home Assistant scenes are plain state snapshots: activating one sets every
entity in it, unconditionally. Scene Builder adds conditions on top without
changing what a scene is.

An accessory with conditions is kept out of the scene's `entities` — so Home
Assistant itself never touches it — and is written to the scene's `metadata`
instead, which Home Assistant stores verbatim and otherwise ignores:

    - id: "1700000000002"
      name: Good Morning
      entities:
        light.kitchen: {state: "on", brightness: 255}
      metadata:
        cover.bedroom_shades:
          scene_builder:
            state: {state: open, current_position: 100}
            match: all
            conditions:
              - condition: state
                entity_id: sun.sun
                state: above_horizon

When the scene is activated — from a dashboard, an automation, a voice
assistant, HomeKit, anywhere — its state changes to the activation time. This
module listens for that, evaluates each accessory's conditions with Home
Assistant's own condition engine, and applies the ones that pass.

Conditions are stored in Home Assistant's native condition format, so anything
that works in an automation's `conditions:` block works here.
"""

from __future__ import annotations

import copy
import logging
import os
from typing import Any

try:  # Home Assistant 2026.x replaced voluptuous with probatio.
    import probatio as vol
except ImportError:  # pragma: no cover - older Home Assistant
    import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.const import (
    EVENT_STATE_CHANGED,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
)
from homeassistant.core import CALLBACK_TYPE, Context, Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import condition
from homeassistant.helpers import config_validation as cv
from homeassistant.util.yaml import load_yaml

from .const import METADATA_KEY

_LOGGER = logging.getLogger(__name__)

# The file Home Assistant's scene config API writes to.
SCENES_FILE = "scenes.yaml"


class _SceneFileCache:
    """Reads scenes.yaml, re-reading only when the file has changed."""

    def __init__(self, path: str) -> None:
        self._path = path
        self._mtime: float | None = None
        self._scenes: dict[str, dict[str, Any]] = {}

    def _load(self) -> dict[str, dict[str, Any]]:
        try:
            mtime = os.path.getmtime(self._path)
        except OSError:
            self._mtime = None
            self._scenes = {}
            return self._scenes

        if mtime != self._mtime:
            data = load_yaml(self._path)
            scenes: dict[str, dict[str, Any]] = {}
            if isinstance(data, list):
                for item in data:
                    if isinstance(item, dict) and item.get("id") is not None:
                        scenes[str(item["id"])] = item
            self._scenes = scenes
            self._mtime = mtime
        return self._scenes

    async def async_get(self, hass: HomeAssistant, scene_id: str) -> dict[str, Any] | None:
        scenes = await hass.async_add_executor_job(self._load)
        return scenes.get(scene_id)


def conditional_entries(scene: dict[str, Any]) -> dict[str, dict[str, Any]]:
    """Return {entity_id: {state, match, conditions}} for a scene config."""
    metadata = scene.get("metadata")
    if not isinstance(metadata, dict):
        return {}
    result: dict[str, dict[str, Any]] = {}
    for entity_id, meta in metadata.items():
        if isinstance(meta, dict) and isinstance(entry := meta.get(METADATA_KEY), dict):
            result[str(entity_id)] = entry
    return result


async def async_build_checker(
    hass: HomeAssistant, conditions: list[Any], match: str | None
) -> Any:
    """Validate a condition list and turn it into a checker.

    Raises vol.Invalid / HomeAssistantError if the conditions are malformed.
    """
    config = {
        "condition": "or" if match == "any" else "and",
        # Validation mutates in place; never let it touch the caller's data.
        "conditions": copy.deepcopy(conditions),
    }
    config = cv.CONDITION_SCHEMA(config)
    config = await condition.async_validate_condition_config(hass, config)
    return await condition.async_from_config(hass, config)


def _run_checker(hass: HomeAssistant, checker: Any) -> bool:
    try:
        # Works on both the plain function older releases return and the
        # ConditionChecker object newer ones do.
        return bool(checker(hass, {}))
    finally:
        if unload := getattr(checker, "async_unload", None):
            unload()


async def async_evaluate(hass: HomeAssistant, entry: dict[str, Any]) -> bool:
    """Whether an accessory's conditions pass right now.

    An accessory with no conditions always passes. A condition that cannot be
    evaluated — say, it names an entity that no longer exists — counts as
    failing, the same as it would in an automation.
    """
    conditions = entry.get("conditions") or []
    if not conditions:
        return True
    checker = await async_build_checker(hass, conditions, entry.get("match"))
    try:
        return _run_checker(hass, checker)
    except HomeAssistantError as err:
        _LOGGER.warning("Scene Builder condition could not be evaluated: %s", err)
        return False


async def _async_apply_conditional(
    hass: HomeAssistant, cache: _SceneFileCache, scene_entity_id: str, scene_id: str, context: Context
) -> None:
    scene = await cache.async_get(hass, scene_id)
    if not scene:
        return
    entries = conditional_entries(scene)
    if not entries:
        return

    to_apply: dict[str, Any] = {}
    for entity_id, entry in entries.items():
        state = entry.get("state")
        if not isinstance(state, (dict, str)):
            continue
        try:
            passed = await async_evaluate(hass, entry)
        except (vol.Invalid, HomeAssistantError) as err:
            _LOGGER.error(
                "Skipping %s in %s: its conditions are invalid: %s",
                entity_id,
                scene_entity_id,
                err,
            )
            continue
        _LOGGER.debug(
            "%s: conditions for %s %s", scene_entity_id, entity_id, "passed" if passed else "failed"
        )
        if passed:
            to_apply[entity_id] = state

    if not to_apply:
        return

    await hass.services.async_call(
        "scene",
        "apply",
        {"entities": to_apply},
        blocking=True,
        # Ties these changes to the activation in the logbook.
        context=Context(parent_id=context.id, user_id=context.user_id),
    )


@callback
def async_setup_conditions(hass: HomeAssistant) -> CALLBACK_TYPE:
    """Start applying conditional accessories when scenes are activated."""
    cache = _SceneFileCache(hass.config.path(SCENES_FILE))

    @callback
    def _on_state_changed(event: Event) -> None:
        entity_id: str = event.data.get("entity_id", "")
        if not entity_id.startswith("scene."):
            return
        old_state = event.data.get("old_state")
        new_state = event.data.get("new_state")
        # A scene's state is the time it was last activated, so a real
        # activation is a change from one value to another. Entities appearing
        # (startup, reload) or disappearing have no old or new state.
        if old_state is None or new_state is None:
            return
        if old_state.state == STATE_UNAVAILABLE:
            return
        if new_state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            return
        if new_state.state == old_state.state:
            return
        scene_id = new_state.attributes.get("id")
        if scene_id is None:
            return
        hass.async_create_task(
            _async_apply_conditional(hass, cache, entity_id, str(scene_id), event.context),
            f"scene_builder apply conditional {entity_id}",
        )

    return hass.bus.async_listen(EVENT_STATE_CHANGED, _on_state_changed)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "scene_builder/evaluate",
        # {entity_id: {"conditions": [...], "match": "all" | "any"}}
        vol.Required("entities"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_evaluate(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Evaluate conditions without applying anything.

    Used by the editor to show whether each accessory would be set right now,
    to validate conditions before saving, and by the Test button.
    """
    results: dict[str, dict[str, Any]] = {}
    for entity_id, entry in msg["entities"].items():
        if not isinstance(entry, dict):
            results[entity_id] = {"error": "Expected a mapping."}
            continue
        try:
            results[entity_id] = {"result": await async_evaluate(hass, entry)}
        except (vol.Invalid, HomeAssistantError) as err:
            results[entity_id] = {"error": str(err)}
    connection.send_result(msg["id"], {"results": results})


@callback
def async_register_websocket(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_evaluate)

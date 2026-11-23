"""Conditional accessories are applied when — and only when — their conditions pass."""

from __future__ import annotations

import yaml
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

from custom_components.scene_builder.conditions import (
    async_register_websocket,
    async_setup_conditions,
)

SCENE = {
    "id": "1700000000002",
    "name": "Good Morning",
    "entities": {"input_boolean.kitchen": {"state": "on"}},
    "metadata": {
        "input_boolean.shades": {
            "scene_builder": {
                "state": {"state": "on"},
                "match": "all",
                "conditions": [
                    {"condition": "state", "entity_id": "sun.sun", "state": "above_horizon"}
                ],
            }
        },
        "input_boolean.porch": {
            "scene_builder": {
                "state": {"state": "on"},
                "match": "any",
                "conditions": [
                    {"condition": "numeric_state", "entity_id": "zone.home", "below": 1},
                    {"condition": "state", "entity_id": "sun.sun", "state": "below_horizon"},
                ],
            }
        },
    },
}


async def _setup(hass: HomeAssistant) -> None:
    with open(hass.config.path("scenes.yaml"), "w") as file:
        yaml.safe_dump([SCENE], file)
    assert await async_setup_component(
        hass,
        "input_boolean",
        {"input_boolean": {"kitchen": {}, "shades": {}, "porch": {}}},
    )
    assert await async_setup_component(hass, "scene", {"scene": [SCENE]})
    async_setup_conditions(hass)
    await hass.async_block_till_done()


async def _activate(hass: HomeAssistant) -> None:
    await hass.services.async_call(
        "scene", "turn_on", {"entity_id": "scene.good_morning"}, blocking=True
    )
    await hass.async_block_till_done()


async def test_conditions_pass(hass: HomeAssistant) -> None:
    await _setup(hass)
    hass.states.async_set("sun.sun", "above_horizon")
    hass.states.async_set("zone.home", "2")

    await _activate(hass)

    assert hass.states.get("input_boolean.kitchen").state == "on"
    assert hass.states.get("input_boolean.shades").state == "on"
    # Neither nobody-home nor sun-down holds.
    assert hass.states.get("input_boolean.porch").state == "off"


async def test_conditions_fail(hass: HomeAssistant) -> None:
    await _setup(hass)
    hass.states.async_set("sun.sun", "below_horizon")
    hass.states.async_set("zone.home", "2")

    await _activate(hass)

    assert hass.states.get("input_boolean.kitchen").state == "on"
    assert hass.states.get("input_boolean.shades").state == "off"
    assert hass.states.get("input_boolean.porch").state == "on"


async def test_unconditional_part_untouched_by_ha(hass: HomeAssistant) -> None:
    """Home Assistant's own scene must not contain the conditional accessories."""
    await _setup(hass)
    attrs = hass.states.get("scene.good_morning").attributes
    assert attrs["entity_id"] == ["input_boolean.kitchen"]


async def test_ws_evaluate(hass: HomeAssistant, hass_ws_client) -> None:
    assert await async_setup_component(hass, "websocket_api", {})
    async_register_websocket(hass)
    hass.states.async_set("sun.sun", "above_horizon")
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "scene_builder/evaluate",
            "entities": {
                "light.a": {
                    "conditions": [
                        {"condition": "state", "entity_id": "sun.sun", "state": "above_horizon"}
                    ]
                },
                "light.b": {
                    "conditions": [
                        {"condition": "state", "entity_id": "sun.sun", "state": "below_horizon"}
                    ]
                },
                "light.c": {"conditions": [{"condition": "bogus"}]},
                "light.d": {"conditions": []},
                # Every shape the editor writes must validate.
                "light.e": {
                    "match": "any",
                    "conditions": [
                        {"condition": "sun", "after": "sunrise", "after_offset": "-00:30:00"},
                        {"condition": "sun", "before": "sunset", "before_offset": "01:00:00"},
                        {
                            "condition": "time",
                            "after": "07:00:00",
                            "before": "09:30:00",
                            "weekday": ["mon", "fri"],
                        },
                        {"condition": "numeric_state", "entity_id": "zone.home", "above": 0},
                        {
                            "condition": "not",
                            "conditions": [
                                {"condition": "state", "entity_id": "person.alex", "state": "home"}
                            ],
                        },
                    ],
                },
            },
        }
    )
    msg = await client.receive_json()
    assert msg["success"], msg
    results = msg["result"]["results"]
    assert results["light.a"] == {"result": True}
    assert results["light.b"] == {"result": False}
    assert "error" in results["light.c"]
    assert results["light.d"] == {"result": True}
    assert "result" in results["light.e"], results["light.e"]

import type { HomeAssistant } from './hass'
import { HaError, toHaError } from './hass'
import type { ConditionMatch, HaCondition } from '../conditions'

export type EvaluateResult = { result: boolean; error?: undefined } | { error: string; result?: undefined }

/**
 * Asks the integration whether conditions pass right now, using Home
 * Assistant's own condition engine. Nothing is applied. Also how conditions
 * are validated: a malformed one comes back as an `error`.
 */
export async function evaluateConditions(
  hass: HomeAssistant,
  entities: Record<string, { match: ConditionMatch; conditions: HaCondition[] }>,
): Promise<Record<string, EvaluateResult>> {
  if (!Object.keys(entities).length) return {}
  try {
    const response = await hass.callWS<{ results: Record<string, EvaluateResult> }>({
      type: 'scene_builder/evaluate',
      entities,
    })
    return response.results
  } catch (caught) {
    const value = caught as { code?: string } | undefined
    if (value?.code === 'unknown_command') {
      // The frontend updated but the Python side is still the old version.
      throw new HaError(
        'Conditions need the updated Scene Builder integration. Restart Home Assistant to finish the update.',
        'server',
      )
    }
    throw toHaError(caught, 'Could not check those conditions.')
  }
}

import { useEffect, useMemo, useState } from 'react'
import {
  CONDITION_PRESETS,
  conditionIcon,
  conditionProblem,
  describeCondition,
  isNumericEntity,
  suggestedStates,
  toStoredConditions,
  WEEKDAYS,
  weekdayLabel,
  type EntityConditions,
  type SceneCondition,
  type SunEvent,
} from '../lib/conditions'
import { evaluateConditions, type EvaluateResult } from '../lib/ha/evaluate'
import { useHassStore } from '../lib/ha/store'
import type { HassEntity } from '../lib/ha/types'
import { UiIcon } from './Icon'
import { Row, Segmented, Select, Stepper } from './ui'

/** How long to wait after an edit before asking Home Assistant to evaluate. */
const EVALUATE_DEBOUNCE_MS = 400

export function ConditionsEditor({
  value,
  onChange,
  states,
}: {
  value: EntityConditions
  onChange: (value: EntityConditions) => void
  states: Record<string, HassEntity>
}) {
  const update = (index: number, next: SceneCondition) =>
    onChange({
      ...value,
      conditions: value.conditions.map((item, i) => (i === index ? next : item)),
    })

  const remove = (index: number) =>
    onChange({ ...value, conditions: value.conditions.filter((_, i) => i !== index) })

  return (
    <section className="conditions">
      <div className="conditions__head">
        <h3>Conditions</h3>
        <p className="field__hint">
          {value.conditions.length
            ? 'This accessory is only set when the scene runs and these are true.'
            : 'Set this accessory only when something is true — for example, open the shades only once the sun is up.'}
        </p>
      </div>

      {value.conditions.length > 1 ? (
        <Segmented
          value={value.match}
          options={[
            { value: 'all', label: 'All are true' },
            { value: 'any', label: 'Any is true' },
          ]}
          onChange={(match) => onChange({ ...value, match })}
        />
      ) : null}

      {value.conditions.map((condition, index) => (
        <ConditionCard
          key={index}
          condition={condition}
          states={states}
          onChange={(next) => update(index, next)}
          onRemove={() => remove(index)}
        />
      ))}

      <Select
        value=""
        placeholder={value.conditions.length ? 'Add another condition…' : 'Add a condition…'}
        options={CONDITION_PRESETS.map(({ value, label }) => ({ value, label }))}
        onChange={(preset) => {
          const found = CONDITION_PRESETS.find((item) => item.value === preset)
          if (found) onChange({ ...value, conditions: [...value.conditions, found.make()] })
        }}
      />

      {value.conditions.length ? <LiveStatus value={value} /> : null}
    </section>
  )
}

/** Shows whether the scene would set this accessory if it ran right now. */
function LiveStatus({ value }: { value: EntityConditions }) {
  const store = useHassStore()
  const [status, setStatus] = useState<EvaluateResult | { pending: true } | { failed: string }>({
    pending: true,
  })

  const problem = value.conditions.map(conditionProblem).find(Boolean) ?? null
  // Re-evaluate only when the stored shape changes, not on every re-render.
  const key = JSON.stringify(toStoredConditions(value))

  useEffect(() => {
    if (problem) return
    let cancelled = false
    setStatus({ pending: true })
    const timer = window.setTimeout(async () => {
      try {
        const results = await evaluateConditions(store.current, { _: toStoredConditions(value) })
        if (!cancelled) setStatus(results._ ?? { failed: 'No result.' })
      } catch (error) {
        if (!cancelled) setStatus({ failed: error instanceof Error ? error.message : String(error) })
      }
    }, EVALUATE_DEBOUNCE_MS)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // `value` is captured through `key`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, problem, store])

  let tone = 'muted'
  let text = 'Checking…'
  if (problem) {
    tone = 'warn'
    text = problem
  } else if ('failed' in status) {
    tone = 'error'
    text = status.failed
  } else if ('error' in status && status.error) {
    tone = 'error'
    text = `Home Assistant rejected this: ${status.error}`
  } else if ('result' in status && status.result !== undefined) {
    tone = status.result ? 'pass' : 'fail'
    text = status.result
      ? 'Right now: conditions are met, so this would be set.'
      : 'Right now: conditions are not met, so this would be left alone.'
  }

  return (
    <p className={`condition-status condition-status--${tone}`} role="status">
      <UiIcon name={tone === 'pass' ? 'check' : tone === 'muted' ? 'info' : 'alert'} size={18} />
      {text}
    </p>
  )
}

function ConditionCard({
  condition,
  states,
  onChange,
  onRemove,
}: {
  condition: SceneCondition
  states: Record<string, HassEntity>
  onChange: (value: SceneCondition) => void
  onRemove: () => void
}) {
  return (
    <div className="condition-card">
      <div className="condition-card__head">
        <span className="condition-card__icon">
          <UiIcon name={conditionIcon(condition)} size={18} />
        </span>
        <strong>{describeCondition(condition, states)}</strong>
        <button type="button" className="icon-button" onClick={onRemove} aria-label="Remove condition">
          <UiIcon name="close" size={18} />
        </button>
      </div>
      <ConditionFields condition={condition} states={states} onChange={onChange} />
    </div>
  )
}

function ConditionFields({
  condition,
  states,
  onChange,
}: {
  condition: SceneCondition
  states: Record<string, HassEntity>
  onChange: (value: SceneCondition) => void
}) {
  const people = useMemo(
    () => entitiesInDomain(states, (entity) => entity.entity_id.startsWith('person.')),
    [states],
  )
  const allEntities = useMemo(() => entitiesInDomain(states, () => true), [states])
  const numericEntities = useMemo(() => entitiesInDomain(states, isNumericEntity), [states])

  switch (condition.kind) {
    case 'sun':
      return (
        <Segmented
          value={condition.up ? 'up' : 'down'}
          options={[
            { value: 'up', label: 'Sun is up' },
            { value: 'down', label: 'Sun is down' },
          ]}
          onChange={(next) => onChange({ ...condition, up: next === 'up' })}
        />
      )

    case 'sun_event':
      return (
        <>
          <SunEventRow
            label="After"
            event={condition.after}
            offset={condition.afterOffset}
            onChange={(after, afterOffset) => onChange({ ...condition, after, afterOffset })}
          />
          <SunEventRow
            label="Before"
            event={condition.before}
            offset={condition.beforeOffset}
            onChange={(before, beforeOffset) => onChange({ ...condition, before, beforeOffset })}
          />
          <p className="field__hint">
            Days run from midnight to midnight: “after sunset” on its own means sunset until
            midnight. For “any time it's dark” use <em>Sun is down</em> instead.
          </p>
        </>
      )

    case 'time':
      return (
        <>
          <Row label="After">
            <TimeInput value={condition.after} onChange={(after) => onChange({ ...condition, after })} />
          </Row>
          <Row label="Before">
            <TimeInput
              value={condition.before}
              onChange={(before) => onChange({ ...condition, before })}
            />
          </Row>
          <Row label="Days" hint={condition.weekdays.length ? undefined : 'Every day'} stacked>
            <div className="chips chips--wrap">
              {WEEKDAYS.map((day) => {
                const active = condition.weekdays.includes(day)
                return (
                  <button
                    key={day}
                    type="button"
                    className={`chip${active ? ' chip--active' : ''}`}
                    aria-pressed={active}
                    onClick={() =>
                      onChange({
                        ...condition,
                        weekdays: active
                          ? condition.weekdays.filter((item) => item !== day)
                          : [...condition.weekdays, day],
                      })
                    }
                  >
                    {weekdayLabel(day)}
                  </button>
                )
              })}
            </div>
          </Row>
          {condition.after && condition.before && condition.after > condition.before ? (
            <p className="field__hint">Wraps past midnight.</p>
          ) : null}
        </>
      )

    case 'presence':
      return (
        <>
          <Row label="Who">
            <Select
              value={condition.who}
              placeholder={condition.who ? undefined : 'Choose a person…'}
              options={[
                { value: 'anyone', label: 'Anyone' },
                ...people.map((entity) => ({ value: entity.entity_id, label: entityLabel(entity) })),
              ]}
              onChange={(who) => onChange({ ...condition, who })}
            />
          </Row>
          <Segmented
            value={condition.home ? 'home' : 'away'}
            options={[
              { value: 'home', label: condition.who === 'anyone' ? 'Someone is home' : 'Home' },
              { value: 'away', label: condition.who === 'anyone' ? 'Nobody is home' : 'Away' },
            ]}
            onChange={(next) => onChange({ ...condition, home: next === 'home' })}
          />
          {condition.who !== 'anyone' && !people.length ? (
            <p className="field__hint">
              No people are set up in Home Assistant. Add them under Settings → People.
            </p>
          ) : null}
        </>
      )

    case 'state': {
      const suggestions = suggestedStates(states[condition.entityId])
      const listId = `states-${condition.entityId || 'none'}`
      return (
        <>
          <EntitySelect
            value={condition.entityId}
            entities={allEntities}
            onChange={(entityId) =>
              onChange({
                ...condition,
                entityId,
                // Carry over the entity's current state as a starting point.
                state: condition.state || states[entityId]?.state || '',
              })
            }
          />
          <Segmented
            value={condition.negate ? 'not' : 'is'}
            options={[
              { value: 'is', label: 'Is' },
              { value: 'not', label: 'Is not' },
            ]}
            onChange={(next) => onChange({ ...condition, negate: next === 'not' })}
          />
          <input
            type="text"
            list={listId}
            value={condition.state}
            placeholder="State, e.g. on"
            onChange={(event) => onChange({ ...condition, state: event.target.value })}
          />
          <datalist id={listId}>
            {suggestions.map((state) => (
              <option key={state} value={state} />
            ))}
          </datalist>
          {states[condition.entityId] ? (
            <p className="field__hint">Currently {states[condition.entityId].state}.</p>
          ) : null}
        </>
      )
    }

    case 'numeric': {
      const entity = states[condition.entityId]
      const unit = entity?.attributes.unit_of_measurement
      return (
        <>
          <EntitySelect
            value={condition.entityId}
            entities={numericEntities}
            onChange={(entityId) => onChange({ ...condition, entityId })}
          />
          <Row label="Above" hint={unit}>
            <NumberInput
              value={condition.above}
              onChange={(above) => onChange({ ...condition, above })}
            />
          </Row>
          <Row label="Below" hint={unit}>
            <NumberInput
              value={condition.below}
              onChange={(below) => onChange({ ...condition, below })}
            />
          </Row>
          {entity ? (
            <p className="field__hint">
              Currently {entity.state}
              {unit ? ` ${unit}` : ''}.
            </p>
          ) : null}
        </>
      )
    }

    case 'custom':
      return (
        <>
          <p className="field__hint">
            Written outside Scene Builder. It is kept exactly as it is and still applies.
          </p>
          <pre className="condition-card__raw">{JSON.stringify(condition.raw, null, 2)}</pre>
        </>
      )
  }
}

function SunEventRow({
  label,
  event,
  offset,
  onChange,
}: {
  label: string
  event: SunEvent | null
  offset: number
  onChange: (event: SunEvent | null, offset: number) => void
}) {
  return (
    <Row label={label} stacked>
      <div className="condition-inline">
        <Select
          value={event ?? 'none'}
          options={[
            { value: 'none', label: 'Any time' },
            { value: 'sunrise', label: 'Sunrise' },
            { value: 'sunset', label: 'Sunset' },
          ]}
          onChange={(next) =>
            onChange(next === 'none' ? null : (next as SunEvent), next === 'none' ? 0 : offset)
          }
        />
        {event ? (
          <Stepper
            value={offset}
            min={-240}
            max={240}
            step={15}
            onChange={(next) => onChange(event, next)}
            format={formatOffset}
          />
        ) : null}
      </div>
    </Row>
  )
}

function formatOffset(minutes: number): string {
  if (!minutes) return 'On time'
  const abs = Math.abs(minutes)
  const text = abs >= 60 ? `${Math.floor(abs / 60)}h${abs % 60 ? ` ${abs % 60}m` : ''}` : `${abs}m`
  return minutes < 0 ? `${text} early` : `${text} late`
}

function TimeInput({
  value,
  onChange,
}: {
  value: string | null
  onChange: (value: string | null) => void
}) {
  return (
    <div className="condition-inline">
      <input
        type="time"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value || null)}
      />
      {value ? (
        <button type="button" className="icon-button" aria-label="Clear" onClick={() => onChange(null)}>
          <UiIcon name="close" size={18} />
        </button>
      ) : null}
    </div>
  )
}

function NumberInput({
  value,
  onChange,
}: {
  value: number | null
  onChange: (value: number | null) => void
}) {
  // Kept as text while typing so "-" and "1." survive until they parse.
  const [text, setText] = useState(value == null ? '' : String(value))
  useEffect(() => {
    if (value == null ? text !== '' : Number(text) !== value) {
      setText(value == null ? '' : String(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <input
      type="number"
      inputMode="decimal"
      step="any"
      value={text}
      placeholder="—"
      onChange={(event) => {
        setText(event.target.value)
        const trimmed = event.target.value.trim()
        if (!trimmed) onChange(null)
        else if (!Number.isNaN(Number(trimmed))) onChange(Number(trimmed))
      }}
    />
  )
}

function EntitySelect({
  value,
  entities,
  onChange,
}: {
  value: string
  entities: HassEntity[]
  onChange: (entityId: string) => void
}) {
  const groups = useMemo(() => {
    const byDomain = new Map<string, HassEntity[]>()
    for (const entity of entities) {
      const domain = entity.entity_id.split('.')[0]
      byDomain.set(domain, [...(byDomain.get(domain) ?? []), entity])
    }
    return [...byDomain.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [entities])

  return (
    <div className="select">
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="" disabled>
          Choose…
        </option>
        {value && !entities.some((entity) => entity.entity_id === value) ? (
          <option value={value}>{value}</option>
        ) : null}
        {groups.map(([domain, list]) => (
          <optgroup key={domain} label={domain.replace(/_/g, ' ')}>
            {list.map((entity) => (
              <option key={entity.entity_id} value={entity.entity_id}>
                {entityLabel(entity)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <UiIcon name="chevronDown" size={18} />
    </div>
  )
}

function entityLabel(entity: HassEntity): string {
  return entity.attributes.friendly_name ?? entity.entity_id
}

function entitiesInDomain(
  states: Record<string, HassEntity>,
  include: (entity: HassEntity) => boolean,
): HassEntity[] {
  return Object.values(states)
    .filter(include)
    .sort((a, b) => entityLabel(a).localeCompare(entityLabel(b)))
}

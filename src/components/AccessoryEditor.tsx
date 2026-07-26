import { useMemo } from 'react'
import type { HassEntity } from '../lib/ha/types'
import {
  brightnessToPercent,
  CLIMATE_FEATURES,
  COVER_FEATURES,
  FAN_FEATURES,
  lightCaps,
  MEDIA_FEATURES,
  percentToBrightness,
  type SceneEntityState,
  supports,
} from '../lib/capabilities'
import { hsToRgb, kelvinToRgb, rgbToCss } from '../lib/color'
import { Row, Segmented, Select, Slider, Stepper, Toggle } from './ui'

interface EditorProps {
  entity: HassEntity
  value: SceneEntityState
  onChange: (value: SceneEntityState) => void
}

const patch = (
  value: SceneEntityState,
  onChange: (value: SceneEntityState) => void,
  changes: Record<string, any>,
) => onChange({ ...value, ...changes })

const titleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ')

const asOptions = (values: string[] | undefined) =>
  (values ?? []).map((value) => ({ value, label: titleCase(value) }))

const OnOff = ({ value, onChange }: EditorProps) => (
  <Row label="Power">
    <Segmented
      value={value.state === 'on' ? 'on' : 'off'}
      options={[
        { value: 'off', label: 'Off' },
        { value: 'on', label: 'On' },
      ]}
      onChange={(state) => patch(value, onChange, { state })}
    />
  </Row>
)

function LightEditor({ entity, value, onChange }: EditorProps) {
  const caps = useMemo(() => lightCaps(entity), [entity])
  const isOn = value.state === 'on'
  const colorMode: 'temp' | 'color' = value.hs_color ? 'color' : 'temp'

  const kelvin = value.color_temp_kelvin ?? Math.round((caps.minKelvin + caps.maxKelvin) / 2)
  const [hue, saturation] = value.hs_color ?? [30, 80]

  const tint = isOn
    ? value.hs_color
      ? rgbToCss(hsToRgb(hue, saturation))
      : value.color_temp_kelvin
        ? rgbToCss(kelvinToRgb(kelvin))
        : undefined
    : undefined

  return (
    <>
      {/* On a dimmer, power and brightness are one control: 0% is off, exactly
          as HomeKit presents it. Only a non-dimmable light needs a toggle. */}
      {caps.brightness ? (
        <Row label="Brightness">
          <Slider
            value={isOn ? brightnessToPercent(value.brightness) : 0}
            min={0}
            max={100}
            accent={isOn ? tint : undefined}
            onChange={(percent) =>
              percent === 0
                ? patch(value, onChange, { state: 'off' })
                : patch(value, onChange, {
                    state: 'on',
                    brightness: percentToBrightness(percent),
                  })
            }
            format={(percent) => (percent === 0 ? 'Off' : `${percent}%`)}
          />
        </Row>
      ) : (
        <OnOff entity={entity} value={value} onChange={onChange} />
      )}

      {isOn && caps.colorTemp && caps.color ? (
        <Row label="Color">
          <Segmented
            value={colorMode}
            options={[
              { value: 'temp', label: 'White' },
              { value: 'color', label: 'Color' },
            ]}
            onChange={(mode) =>
              mode === 'temp'
                ? patch(value, onChange, { hs_color: undefined, color_temp_kelvin: kelvin })
                : patch(value, onChange, {
                    color_temp_kelvin: undefined,
                    hs_color: [hue, saturation],
                  })
            }
          />
        </Row>
      ) : null}

      {isOn && caps.colorTemp && colorMode === 'temp' ? (
        <Row label="Warmth" hint={`${caps.minKelvin}–${caps.maxKelvin}K`}>
          <Slider
            value={kelvin}
            min={caps.minKelvin}
            max={caps.maxKelvin}
            step={50}
            accent={rgbToCss(kelvinToRgb(kelvin))}
            onChange={(next) =>
              patch(value, onChange, { color_temp_kelvin: next, hs_color: undefined })
            }
            format={(next) => `${next}K`}
          />
        </Row>
      ) : null}

      {isOn && caps.color && colorMode === 'color' ? (
        <>
          <Row label="Hue">
            <Slider
              value={hue}
              min={0}
              max={360}
              accent={rgbToCss(hsToRgb(hue, 100))}
              onChange={(next) =>
                patch(value, onChange, {
                  hs_color: [next, saturation],
                  color_temp_kelvin: undefined,
                })
              }
              format={(next) => `${Math.round(next)}°`}
            />
          </Row>
          <Row label="Saturation">
            <Slider
              value={saturation}
              min={0}
              max={100}
              accent={rgbToCss(hsToRgb(hue, saturation))}
              onChange={(next) =>
                patch(value, onChange, { hs_color: [hue, next], color_temp_kelvin: undefined })
              }
              format={(next) => `${Math.round(next)}%`}
            />
          </Row>
        </>
      ) : null}
    </>
  )
}

function FanEditor({ entity, value, onChange }: EditorProps) {
  const isOn = value.state === 'on'
  const presets: string[] = entity.attributes.preset_modes ?? []
  const hasSpeed = supports(entity, FAN_FEATURES.SET_SPEED)

  // A fan with a percentage_step has discrete speeds. Sliding over speed
  // numbers rather than raw percentages keeps the saved value tidy (33/67/100
  // for a three-speed fan) instead of the 99.999 a stepped range would land on.
  const rawStep = entity.attributes.percentage_step
  const speeds = rawStep && rawStep > 1 ? Math.round(100 / rawStep) : 0
  const percentage = value.percentage ?? 100

  return (
    <>
      {/* Speed subsumes power the way HomeKit does: slide to zero to turn off. */}
      {hasSpeed ? (
        <Row label="Speed" hint={speeds > 1 ? `${speeds} speeds` : undefined}>
          {speeds > 1 ? (
            <Slider
              value={isOn ? Math.max(1, Math.round((percentage / 100) * speeds)) : 0}
              min={0}
              max={speeds}
              step={1}
              onChange={(index) =>
                index === 0
                  ? patch(value, onChange, { state: 'off' })
                  : patch(value, onChange, {
                      state: 'on',
                      percentage: Math.round((index / speeds) * 100),
                    })
              }
              format={(index) => (index === 0 ? 'Off' : `${index} of ${speeds}`)}
            />
          ) : (
            <Slider
              value={isOn ? Math.round(percentage) : 0}
              min={0}
              max={100}
              onChange={(percent) =>
                percent === 0
                  ? patch(value, onChange, { state: 'off' })
                  : patch(value, onChange, { state: 'on', percentage: percent })
              }
              format={(percent) => (percent === 0 ? 'Off' : `${percent}%`)}
            />
          )}
        </Row>
      ) : (
        <OnOff entity={entity} value={value} onChange={onChange} />
      )}

      {isOn && supports(entity, FAN_FEATURES.PRESET_MODE) && presets.length ? (
        <Row label="Preset">
          <Select
            value={value.preset_mode}
            options={asOptions(presets)}
            placeholder="None"
            onChange={(preset) =>
              patch(value, onChange, { preset_mode: preset || undefined })
            }
          />
        </Row>
      ) : null}

      {isOn && supports(entity, FAN_FEATURES.OSCILLATE) ? (
        <Row label="Oscillate">
          <Toggle
            checked={Boolean(value.oscillating)}
            onChange={(oscillating) => patch(value, onChange, { oscillating })}
            label="Oscillate"
          />
        </Row>
      ) : null}

      {isOn && supports(entity, FAN_FEATURES.DIRECTION) ? (
        <Row label="Direction">
          <Segmented
            value={value.direction === 'reverse' ? 'reverse' : 'forward'}
            options={[
              { value: 'forward', label: 'Forward' },
              { value: 'reverse', label: 'Reverse' },
            ]}
            onChange={(direction) => patch(value, onChange, { direction })}
          />
        </Row>
      ) : null}
    </>
  )
}

function CoverEditor({ entity, value, onChange }: EditorProps) {
  const positionable = supports(entity, COVER_FEATURES.SET_POSITION)
  const tiltable = supports(entity, COVER_FEATURES.SET_TILT_POSITION)

  return (
    <>
      {positionable ? (
        <Row label="Position" hint="0% closed, 100% open">
          <Slider
            value={value.current_position ?? 100}
            min={0}
            max={100}
            onChange={(position) =>
              patch(value, onChange, {
                current_position: position,
                state: position > 0 ? 'open' : 'closed',
              })
            }
            format={(position) =>
              position === 0 ? 'Closed' : position === 100 ? 'Open' : `${position}%`
            }
          />
        </Row>
      ) : (
        <Row label="Position">
          <Segmented
            value={value.state === 'closed' ? 'closed' : 'open'}
            options={[
              { value: 'closed', label: 'Closed' },
              { value: 'open', label: 'Open' },
            ]}
            onChange={(state) => patch(value, onChange, { state })}
          />
        </Row>
      )}

      {tiltable ? (
        <Row label="Tilt">
          <Slider
            value={value.current_tilt_position ?? 0}
            min={0}
            max={100}
            onChange={(tilt) => patch(value, onChange, { current_tilt_position: tilt })}
            format={(tilt) => `${tilt}%`}
          />
        </Row>
      ) : null}
    </>
  )
}

function MediaEditor({ entity, value, onChange }: EditorProps) {
  const sources: string[] = entity.attributes.source_list ?? []

  // Only offer states this player can actually be driven into.
  const stateOptions: { value: string; label: string }[] = []
  if (supports(entity, MEDIA_FEATURES.PLAY) || entity.attributes.supported_features == null) {
    stateOptions.push({ value: 'playing', label: 'Play' })
  }
  if (supports(entity, MEDIA_FEATURES.PAUSE)) stateOptions.push({ value: 'paused', label: 'Pause' })
  if (supports(entity, MEDIA_FEATURES.STOP)) stateOptions.push({ value: 'idle', label: 'Stop' })
  if (supports(entity, MEDIA_FEATURES.TURN_ON)) stateOptions.push({ value: 'on', label: 'On' })
  if (supports(entity, MEDIA_FEATURES.TURN_OFF)) stateOptions.push({ value: 'off', label: 'Off' })
  if (!stateOptions.length) {
    stateOptions.push({ value: 'playing', label: 'Play' }, { value: 'paused', label: 'Pause' })
  }

  const isOff = value.state === 'off'

  return (
    <>
      <Row label="Playback">
        <Segmented
          value={value.state}
          options={stateOptions}
          onChange={(state) => patch(value, onChange, { state })}
        />
      </Row>

      {!isOff && supports(entity, MEDIA_FEATURES.VOLUME_SET) ? (
        <Row label="Volume">
          <Slider
            value={Math.round((value.volume_level ?? 0.3) * 100)}
            min={0}
            max={100}
            onChange={(volume) => patch(value, onChange, { volume_level: volume / 100 })}
            format={(volume) => `${volume}%`}
          />
        </Row>
      ) : null}

      {!isOff && supports(entity, MEDIA_FEATURES.VOLUME_MUTE) ? (
        <Row label="Muted">
          <Toggle
            checked={Boolean(value.is_volume_muted)}
            onChange={(muted) => patch(value, onChange, { is_volume_muted: muted })}
            label="Muted"
          />
        </Row>
      ) : null}

      {!isOff && supports(entity, MEDIA_FEATURES.SELECT_SOURCE) && sources.length ? (
        <Row label="Source">
          <Select
            value={value.source}
            options={sources.map((source) => ({ value: source, label: source }))}
            placeholder="Leave as is"
            onChange={(source) => patch(value, onChange, { source: source || undefined })}
          />
        </Row>
      ) : null}
    </>
  )
}

function ClimateEditor({ entity, value, onChange }: EditorProps) {
  const modes: string[] = entity.attributes.hvac_modes ?? []
  const min = entity.attributes.min_temp ?? 7
  const max = entity.attributes.max_temp ?? 35
  const step = entity.attributes.target_temp_step ?? 0.5
  const unit = entity.attributes.temperature_unit ?? '°'
  const fanModes: string[] = entity.attributes.fan_modes ?? []
  const isOff = value.state === 'off'

  return (
    <>
      {modes.length ? (
        <Row label="Mode">
          <Select
            value={value.state}
            options={asOptions(modes)}
            onChange={(state) => patch(value, onChange, { state })}
          />
        </Row>
      ) : null}

      {!isOff && supports(entity, CLIMATE_FEATURES.TARGET_TEMPERATURE) ? (
        <Row label="Temperature">
          <Stepper
            value={value.temperature ?? entity.attributes.temperature ?? min}
            min={min}
            max={max}
            step={step}
            onChange={(temperature) => patch(value, onChange, { temperature })}
            format={(temperature) => `${temperature}${unit}`}
          />
        </Row>
      ) : null}

      {!isOff && supports(entity, CLIMATE_FEATURES.TARGET_TEMPERATURE_RANGE) ? (
        <>
          <Row label="Heat to">
            <Stepper
              value={value.target_temp_low ?? min}
              min={min}
              max={max}
              step={step}
              onChange={(low) => patch(value, onChange, { target_temp_low: low })}
              format={(low) => `${low}${unit}`}
            />
          </Row>
          <Row label="Cool to">
            <Stepper
              value={value.target_temp_high ?? max}
              min={min}
              max={max}
              step={step}
              onChange={(high) => patch(value, onChange, { target_temp_high: high })}
              format={(high) => `${high}${unit}`}
            />
          </Row>
        </>
      ) : null}

      {!isOff && supports(entity, CLIMATE_FEATURES.FAN_MODE) && fanModes.length ? (
        <Row label="Fan">
          <Select
            value={value.fan_mode}
            options={asOptions(fanModes)}
            placeholder="Leave as is"
            onChange={(mode) => patch(value, onChange, { fan_mode: mode || undefined })}
          />
        </Row>
      ) : null}
    </>
  )
}

function HumidifierEditor({ entity, value, onChange }: EditorProps) {
  const isOn = value.state === 'on'
  const modes: string[] = entity.attributes.available_modes ?? []
  return (
    <>
      <OnOff entity={entity} value={value} onChange={onChange} />
      {isOn ? (
        <Row label="Humidity">
          <Slider
            value={value.humidity ?? entity.attributes.min_humidity ?? 40}
            min={entity.attributes.min_humidity ?? 0}
            max={entity.attributes.max_humidity ?? 100}
            onChange={(humidity) => patch(value, onChange, { humidity })}
            format={(humidity) => `${humidity}%`}
          />
        </Row>
      ) : null}
      {isOn && modes.length ? (
        <Row label="Mode">
          <Select
            value={value.mode}
            options={asOptions(modes)}
            placeholder="Leave as is"
            onChange={(mode) => patch(value, onChange, { mode: mode || undefined })}
          />
        </Row>
      ) : null}
    </>
  )
}

function WaterHeaterEditor({ entity, value, onChange }: EditorProps) {
  const operations: string[] = entity.attributes.operation_list ?? []
  const min = entity.attributes.min_temp ?? 40
  const max = entity.attributes.max_temp ?? 60
  return (
    <>
      {operations.length ? (
        <Row label="Mode">
          <Select
            value={value.state}
            options={asOptions(operations)}
            onChange={(state) => patch(value, onChange, { state })}
          />
        </Row>
      ) : null}
      <Row label="Temperature">
        <Stepper
          value={value.temperature ?? min}
          min={min}
          max={max}
          step={1}
          onChange={(temperature) => patch(value, onChange, { temperature })}
          format={(temperature) => `${temperature}°`}
        />
      </Row>
    </>
  )
}

function LockEditor({ value, onChange }: EditorProps) {
  return (
    <Row label="Lock">
      <Segmented
        value={value.state === 'unlocked' ? 'unlocked' : 'locked'}
        options={[
          { value: 'unlocked', label: 'Unlocked' },
          { value: 'locked', label: 'Locked' },
        ]}
        onChange={(state) => patch(value, onChange, { state })}
      />
    </Row>
  )
}

/** Picks the right controls for an entity based on its domain and features. */
export function AccessoryEditor(props: EditorProps) {
  const domain = props.entity.entity_id.split('.')[0]

  switch (domain) {
    case 'light':
      return <LightEditor {...props} />
    case 'fan':
      return <FanEditor {...props} />
    case 'cover':
    case 'valve':
      return <CoverEditor {...props} />
    case 'media_player':
      return <MediaEditor {...props} />
    case 'climate':
      return <ClimateEditor {...props} />
    case 'humidifier':
      return <HumidifierEditor {...props} />
    case 'water_heater':
      return <WaterHeaterEditor {...props} />
    case 'lock':
      return <LockEditor {...props} />
    default:
      return <OnOff {...props} />
  }
}

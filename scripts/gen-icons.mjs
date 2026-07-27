/**
 * Generates src/lib/icons.generated.ts.
 *
 * The icon picker needs real Material Design Icons path data (the same set
 * Home Assistant renders from `mdi:` names), but bundling all ~7,500 icons
 * would be absurd for a picker. So: curate a list here, validate every name
 * against @mdi/js, and emit static named imports that tree-shake down to only
 * what we ship.
 *
 * Run with: node scripts/gen-icons.mjs
 */
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const mdi = require('@mdi/js/commonjs/mdi.js')
const here = dirname(fileURLToPath(import.meta.url))

/** Icons used by the app's own chrome, keyed by the name the code refers to. */
const UI_ICONS = {
  close: 'close',
  check: 'check',
  chevronRight: 'chevron-right',
  chevronDown: 'chevron-down',
  chevronLeft: 'chevron-left',
  plus: 'plus',
  minus: 'minus',
  trash: 'delete-outline',
  refresh: 'refresh',
  search: 'magnify',
  // Opens Home Assistant's sidebar when it is collapsed behind a menu button.
  menu: 'menu',
  alert: 'alert-circle-outline',
  info: 'information-outline',
  eye: 'eye-outline',
  eyeOff: 'eye-off-outline',
  play: 'play-circle-outline',
  content_save: 'content-save-outline',
  camera: 'camera-outline',
  palette: 'palette-outline',
  home: 'home-outline',
  floor: 'layers-outline',
  room: 'floor-plan',
  dragHorizontal: 'drag-horizontal-variant',
  openInNew: 'open-in-new',
  filter: 'filter-variant',
  pencil: 'pencil-outline',
  dotsGrid: 'dots-grid',
  loading: 'loading',
}

/** Default accessory icons by AccessoryKind. */
const KIND_ICONS = {
  light: 'lightbulb',
  fan: 'fan',
  shade: 'blinds-horizontal',
  media: 'television',
  outlet: 'power-socket-us',
  switch: 'toggle-switch-outline',
  climate: 'thermostat',
  lock: 'lock',
  other: 'shape-outline',
}

/**
 * The scene icon picker. Chosen to cover the things people actually name
 * scenes after: times of day, rooms, activities, moods.
 */
const PICKER = {
  Lighting: [
    'lightbulb',
    'lightbulb-on',
    'lightbulb-outline',
    'lightbulb-group',
    'lightbulb-multiple',
    'ceiling-light',
    'floor-lamp',
    'desk-lamp',
    'lamp',
    'track-light',
    'wall-sconce',
    'string-lights',
    'chandelier',
    'candle',
    'led-strip-variant',
    'spotlight-beam',
  ],
  'Time of day': [
    'weather-sunny',
    'weather-sunset-up',
    'weather-sunset',
    'weather-sunset-down',
    'weather-night',
    'white-balance-sunny',
    'moon-waning-crescent',
    'sleep',
    'power-sleep',
    'alarm',
    'clock-outline',
    'calendar-clock',
  ],
  Living: [
    'home',
    'home-outline',
    'home-heart',
    'home-lock',
    'sofa',
    'bed',
    'bed-king',
    'silverware-fork-knife',
    'coffee',
    'glass-cocktail',
    'chef-hat',
    'food-turkey',
    'cupcake',
    'party-popper',
    'book-open-page-variant',
    'bookshelf',
  ],
  Entertainment: [
    'television',
    'television-classic',
    'movie-open',
    'filmstrip',
    'popcorn',
    'music',
    'music-note',
    'speaker',
    'speaker-multiple',
    'volume-high',
    'volume-off',
    'gamepad-variant',
    'microphone',
    'radio',
    'apple',
    'headphones',
  ],
  Rooms: [
    'floor-plan',
    'stairs',
    'garage',
    'garage-open',
    'door',
    'door-open',
    'window-shutter',
    'window-open',
    'blinds',
    'blinds-horizontal',
    'curtains',
    'shower',
    'toilet',
    'washing-machine',
    'stove',
    'fridge-outline',
  ],
  Comfort: [
    'fan',
    'air-conditioner',
    'air-filter',
    'radiator',
    'thermostat',
    'thermometer',
    'snowflake',
    'fire',
    'water',
    'water-percent',
    'hot-tub',
    'umbrella',
  ],
  Activity: [
    'briefcase-outline',
    'laptop',
    'desktop-tower-monitor',
    'school-outline',
    'dumbbell',
    'yoga',
    'meditation',
    'run',
    'walk',
    'account-group',
    'human-greeting',
    'baby-carriage',
    'dog',
    'cat',
    'flower',
    'tree',
  ],
  Security: [
    'shield-home',
    'shield-lock',
    'lock',
    'lock-open-variant',
    'key',
    'cctv',
    'motion-sensor',
    'bell',
    'bell-ring',
    'doorbell',
    'alarm-light',
    'account-alert',
  ],
  Utility: [
    'power',
    'power-plug',
    'flash',
    'lightning-bolt',
    'car',
    'ev-station',
    'robot-vacuum',
    'broom',
    'sprinkler-variant',
    'watering-can',
    'leaf',
    'solar-power-variant',
    'battery-charging',
    'star',
    'heart',
    'palette',
    'auto-fix',
    'creation',
    'magic-staff',
    'cog',
  ],
}

const toExport = (name) =>
  'mdi' + name.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')

const missing = []
const check = (name) => {
  const exportName = toExport(name)
  if (!(exportName in mdi)) {
    missing.push(name)
    return false
  }
  return true
}

for (const name of Object.values(UI_ICONS)) check(name)
for (const name of Object.values(KIND_ICONS)) check(name)

const picker = {}
for (const [group, names] of Object.entries(PICKER)) {
  picker[group] = names.filter(check)
}

if (missing.length) {
  console.warn(`Skipped ${missing.length} icon(s) not present in @mdi/js:`)
  for (const name of missing) console.warn(`  - ${name}`)
}

for (const name of Object.values(UI_ICONS)) {
  if (missing.includes(name)) throw new Error(`Required UI icon "${name}" is missing from @mdi/js`)
}
for (const name of Object.values(KIND_ICONS)) {
  if (missing.includes(name)) throw new Error(`Required kind icon "${name}" is missing from @mdi/js`)
}

const used = new Set([
  ...Object.values(UI_ICONS),
  ...Object.values(KIND_ICONS),
  ...Object.values(picker).flat(),
])
const sorted = [...used].sort()

const lines = []
lines.push('// GENERATED BY scripts/gen-icons.mjs — do not edit by hand.')
lines.push('// Run `node scripts/gen-icons.mjs` to regenerate.')
lines.push('')
lines.push('import {')
for (const name of sorted) lines.push(`  ${toExport(name)},`)
lines.push("} from '@mdi/js'")
lines.push('')
lines.push('/** Every icon we ship, keyed by its Home Assistant `mdi:` name. */')
lines.push('export const MDI_PATHS: Record<string, string> = {')
for (const name of sorted) lines.push(`  '${name}': ${toExport(name)},`)
lines.push('}')
lines.push('')
lines.push('export const UI_ICONS = {')
for (const [key, name] of Object.entries(UI_ICONS)) lines.push(`  ${key}: '${name}',`)
lines.push('} as const')
lines.push('')
lines.push('export type UiIconName = keyof typeof UI_ICONS')
lines.push('')
lines.push('export const KIND_ICONS: Record<string, string> = {')
for (const [key, name] of Object.entries(KIND_ICONS)) lines.push(`  ${key}: '${name}',`)
lines.push('}')
lines.push('')
lines.push('/** Grouped list backing the scene icon picker. */')
lines.push('export const ICON_PICKER_GROUPS: { name: string; icons: string[] }[] = [')
for (const [group, names] of Object.entries(picker)) {
  lines.push(`  {`)
  lines.push(`    name: '${group}',`)
  lines.push(`    icons: [${names.map((name) => `'${name}'`).join(', ')}],`)
  lines.push(`  },`)
}
lines.push(']')
lines.push('')

const out = resolve(here, '../src/lib/icons.generated.ts')
writeFileSync(out, lines.join('\n'))
console.log(`Wrote ${sorted.length} icons to ${out}`)

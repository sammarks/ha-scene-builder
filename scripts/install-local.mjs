/**
 * Copies the integration into a Home Assistant config directory.
 *
 * The dev harness (`npm run dev`) covers day-to-day work, but the panel should
 * be exercised against a real instance before release — the mock cannot prove
 * that Home Assistant serves the bundle, registers the sidebar item, or accepts
 * what gets written to scenes.yaml.
 *
 * Usage:
 *   HA_CONFIG=~/homeassistant npm run install:local
 *
 * Home Assistant loads custom components at startup, so restart it afterwards.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = resolve(here, '..', 'custom_components', 'scene_builder')

const configDir = process.env.HA_CONFIG
if (!configDir) {
  console.error('Set HA_CONFIG to your Home Assistant config directory, e.g.')
  console.error('  HA_CONFIG=~/homeassistant npm run install:local')
  process.exit(1)
}

const target = join(resolve(configDir.replace(/^~/, process.env.HOME ?? '~')), 'custom_components', 'scene_builder')

if (!existsSync(join(source, 'frontend', 'entrypoint.js'))) {
  console.error('No built frontend found. Run "npm run build" first.')
  process.exit(1)
}

// A plain copy would leave behind files that a later build no longer produces.
rmSync(target, { recursive: true, force: true })
mkdirSync(dirname(target), { recursive: true })
cpSync(source, target, { recursive: true })

console.log(`Copied the integration to ${target}`)
console.log('Restart Home Assistant, then add "Scene Builder" from Settings → Devices & Services.')

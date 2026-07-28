/**
 * Generates the brand assets Home Assistant and HACS look for.
 *
 * HACS validates `custom_components/<domain>/brand/icon.png` and `logo.png`,
 * falling back to the home-assistant/brands repository when they are absent.
 * The PNGs are committed, so this only needs running when the artwork changes.
 *
 * Run with: node scripts/gen-brand.mjs
 * Needs rsvg-convert (brew install librsvg).
 *
 * Sizes follow the brands spec: icon is square, logo is wider than it is tall,
 * and each has an @2x variant at double the resolution.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '..', 'custom_components', 'scene_builder', 'brand')

// The app's own accent, and the mdi:palette glyph the sidebar entry uses — the
// icon should read as the same thing in the sidebar and in the HACS list.
const ACCENT = '#f0a500'
const ACCENT_DEEP = '#e08900'
const INK = '#1a1200'
const MDI_PALETTE =
  'M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z'

const gradient = `
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${ACCENT}" />
      <stop offset="1" stop-color="${ACCENT_DEEP}" />
    </linearGradient>`

/** A rounded square in the accent gradient with the palette glyph centred. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>${gradient}</defs>
  <rect width="256" height="256" rx="58" fill="url(#bg)" />
  <g transform="translate(48 48) scale(6.6667)">
    <path d="${MDI_PALETTE}" fill="${INK}" />
  </g>
</svg>`

/** The same mark plus the wordmark, for the wider logo slot. */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="912" height="256" viewBox="0 0 912 256">
  <defs>${gradient}</defs>
  <rect width="256" height="256" rx="58" fill="url(#bg)" />
  <g transform="translate(48 48) scale(6.6667)">
    <path d="${MDI_PALETTE}" fill="${INK}" />
  </g>
  <text x="300" y="112" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="76" font-weight="700" fill="${ACCENT}">Scene</text>
  <text x="300" y="196" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="76" font-weight="400" fill="${ACCENT}">Builder</text>
</svg>`

mkdirSync(outDir, { recursive: true })

for (const [name, svg, width] of [
  ['icon', iconSvg, 256],
  ['logo', logoSvg, 912],
]) {
  for (const [suffix, scale] of [['', 1], ['@2x', 2]]) {
    const svgPath = join(outDir, `${name}.svg`)
    writeFileSync(svgPath, svg)
    execFileSync('rsvg-convert', [
      svgPath,
      '--width', String(width * scale),
      '--output', join(outDir, `${name}${suffix}.png`),
    ])
    rmSync(svgPath)
  }
  console.log(`Wrote ${name}.png and ${name}@2x.png`)
}

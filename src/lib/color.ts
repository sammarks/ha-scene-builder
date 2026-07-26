/** Approximate sRGB for a colour temperature, after Tanner Helland's fit. */
export function kelvinToRgb(kelvin: number): [number, number, number] {
  const temp = Math.max(1000, Math.min(40000, kelvin)) / 100
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)))

  let red: number
  let green: number
  let blue: number

  if (temp <= 66) {
    red = 255
    green = 99.4708025861 * Math.log(temp) - 161.1195681661
  } else {
    red = 329.698727446 * Math.pow(temp - 60, -0.1332047592)
    green = 288.1221695283 * Math.pow(temp - 60, -0.0755148492)
  }

  if (temp >= 66) blue = 255
  else if (temp <= 19) blue = 0
  else blue = 138.5177312231 * Math.log(temp - 10) - 305.0447927307

  return [clamp(red), clamp(green), clamp(blue)]
}

/** Home Assistant's hs_color is [hue 0-360, saturation 0-100] at full value. */
export function hsToRgb(hue: number, saturation: number): [number, number, number] {
  const s = Math.max(0, Math.min(100, saturation)) / 100
  const h = ((hue % 360) + 360) % 360
  const c = s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = 1 - c

  let rgb: [number, number, number]
  if (h < 60) rgb = [c, x, 0]
  else if (h < 120) rgb = [x, c, 0]
  else if (h < 180) rgb = [0, c, x]
  else if (h < 240) rgb = [0, x, c]
  else if (h < 300) rgb = [x, 0, c]
  else rgb = [c, 0, x]

  return rgb.map((channel) => Math.round((channel + m) * 255)) as [number, number, number]
}

export const rgbToCss = ([r, g, b]: [number, number, number]) => `rgb(${r}, ${g}, ${b})`

/** The tint used for a light's icon and sliders, so the UI previews the scene. */
export function lightPreviewColor(value: Record<string, any>): string | null {
  if (value.state !== 'on') return null
  if (value.hs_color) return rgbToCss(hsToRgb(value.hs_color[0], value.hs_color[1]))
  if (value.color_temp_kelvin) return rgbToCss(kelvinToRgb(value.color_temp_kelvin))
  return null
}

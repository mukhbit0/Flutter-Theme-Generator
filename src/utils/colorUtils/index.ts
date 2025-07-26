/**
 * Utility functions for color manipulation and conversion
 */

/**
 * Converts hex color to Dart Color code format
 * @param hex - Hex color string (e.g., "#FF5722")
 * @returns Dart color code (e.g., "0xFFFF5722")
 */
export function hexToColorCode(hex: string): string {
  // Remove # and convert to 0xFFxxxxxx format
  const cleanHex = hex.replace('#', '')
  return `0xFF${cleanHex}`
}

/**
 * Converts RGB values to hex color string
 * @param r - Red component (0-255)
 * @param g - Green component (0-255) 
 * @param b - Blue component (0-255)
 * @returns Hex color string (e.g., "#FF5722")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * Converts hex color to RGB values
 * @param hex - Hex color string (e.g., "#FF5722")
 * @returns RGB object with r, g, b values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Adjusts the brightness of a hex color
 * @param hex - Hex color string
 * @param percent - Percentage to adjust (-100 to 100)
 * @returns Adjusted hex color string
 */
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const adjust = (value: number) => {
    const adjusted = value + (255 * percent / 100)
    return Math.max(0, Math.min(255, Math.round(adjusted)))
  }

  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b))
}

/**
 * Calculates the luminance of a color
 * @param hex - Hex color string
 * @returns Luminance value (0-1)
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculates contrast ratio between two colors
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Determines if a color is light or dark
 * @param hex - Hex color string
 * @returns True if color is light, false if dark
 */
export function isLightColor(hex: string): boolean {
  return getLuminance(hex) > 0.5
}

/**
 * Gets optimal text color (black or white) for a background color
 * @param backgroundColor - Background hex color
 * @returns Optimal text color ("#000000" or "#FFFFFF")
 */
export function getOptimalTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF'
}

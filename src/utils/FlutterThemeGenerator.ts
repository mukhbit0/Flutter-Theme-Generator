import { ThemeConfig, ThemeColors, ThemeGeneratorSettings } from '../types/theme'

export function generateFlutterTheme(colors: {
  primary: string
  secondary: string
  tertiary: string
  logo?: string
}, settings?: ThemeGeneratorSettings): ThemeConfig {
  const lightColors: ThemeColors = generateLightMaterial3Colors(colors)
  const darkColors: ThemeColors = generateDarkMaterial3Colors(colors)

  // Build colors object based on enabled variants
  const colorsConfig: any = {}

  // Always include basic light and dark if enabled
  if (settings?.themeVariants?.lightMode !== false) {
    colorsConfig.light = lightColors
  }
  if (settings?.themeVariants?.darkMode !== false) {
    colorsConfig.dark = darkColors
  }

  // Add contrast variants if enabled
  if (settings?.themeVariants?.lightMedium) {
    colorsConfig.lightMediumContrast = generateLightMediumContrastColors(colors)
  }
  if (settings?.themeVariants?.lightHigh) {
    colorsConfig.lightHighContrast = generateLightHighContrastColors(colors)
  }
  if (settings?.themeVariants?.darkMedium) {
    colorsConfig.darkMediumContrast = generateDarkMediumContrastColors(colors)
  }
  if (settings?.themeVariants?.darkHigh) {
    colorsConfig.darkHighContrast = generateDarkHighContrastColors(colors)
  }

  return {
    colors: colorsConfig,
    typography: generateTypographyConfig(),
    spacing: generateSpacingConfig(),
    borderRadius: generateBorderRadiusConfig(),
    elevation: generateElevationConfig(),
    settings
  }
}

/**
 * Generate light mode Material 3 color scheme
 */
function generateLightMaterial3Colors(colors: { primary: string, secondary: string, tertiary: string }): ThemeColors {
  return {
    // Core Colors
    primary: colors.primary,
    onPrimary: getContrastColor(colors.primary),
    primaryContainer: adjustColor(colors.primary, 80),
    onPrimaryContainer: adjustColor(colors.primary, -40),
    secondary: colors.secondary,
    onSecondary: getContrastColor(colors.secondary),
    secondaryContainer: adjustColor(colors.secondary, 80),
    onSecondaryContainer: adjustColor(colors.secondary, -40),
    tertiary: colors.tertiary,
    onTertiary: getContrastColor(colors.tertiary),
    tertiaryContainer: adjustColor(colors.tertiary, 80),
    onTertiaryContainer: adjustColor(colors.tertiary, -40),

    // Error Colors
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#93000A',

    // Surface Colors
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    surfaceDim: '#E6E0E9',
    surfaceBright: '#FFFBFE',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F7F2FA',
    surfaceContainer: '#F3EDF7',
    surfaceContainerHigh: '#ECE6F0',
    surfaceContainerHighest: '#E6E0E9',

    // Background Colors (deprecated but kept for compatibility)
    background: '#FFFBFE',
    onBackground: '#1C1B1F',

    // Outline Colors
    outline: '#79747E',
    outlineVariant: '#CAC4D0',

    // Utility Colors
    shadow: '#000000',
    scrim: '#000000',

    // Inverse Colors
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: adjustColor(colors.primary, -20),

    // Fixed Colors
    primaryFixed: adjustColor(colors.primary, 80),
    onPrimaryFixed: adjustColor(colors.primary, -60),
    primaryFixedDim: adjustColor(colors.primary, 60),
    onPrimaryFixedVariant: adjustColor(colors.primary, -20),
    secondaryFixed: adjustColor(colors.secondary, 80),
    onSecondaryFixed: adjustColor(colors.secondary, -60),
    secondaryFixedDim: adjustColor(colors.secondary, 60),
    onSecondaryFixedVariant: adjustColor(colors.secondary, -20),
    tertiaryFixed: adjustColor(colors.tertiary, 80),
    onTertiaryFixed: adjustColor(colors.tertiary, -60),
    tertiaryFixedDim: adjustColor(colors.tertiary, 60),
    onTertiaryFixedVariant: adjustColor(colors.tertiary, -20),

    // Surface Tint
    surfaceTint: colors.primary,

    // Additional Colors (custom)
    success: '#2E7D32',
    warning: '#F57C00',
    info: '#1976D2',
  }
}

/**
 * Generate dark mode Material 3 color scheme
 */
function generateDarkMaterial3Colors(colors: { primary: string, secondary: string, tertiary: string }): ThemeColors {
  return {
    // Core Colors
    primary: adjustColor(colors.primary, -20),
    onPrimary: getOptimalTextColor(adjustColor(colors.primary, -20)),
    primaryContainer: adjustColor(colors.primary, -60),
    onPrimaryContainer: getOptimalTextColor(adjustColor(colors.primary, -60)),
    secondary: adjustColor(colors.secondary, -20),
    onSecondary: getOptimalTextColor(adjustColor(colors.secondary, -20)),
    secondaryContainer: adjustColor(colors.secondary, -60),
    onSecondaryContainer: getOptimalTextColor(adjustColor(colors.secondary, -60)),
    tertiary: adjustColor(colors.tertiary, -20),
    onTertiary: getOptimalTextColor(adjustColor(colors.tertiary, -20)),
    tertiaryContainer: adjustColor(colors.tertiary, -60),
    onTertiaryContainer: getOptimalTextColor(adjustColor(colors.tertiary, -60)),

    // Error Colors
    error: '#FFB4AB',
    onError: getOptimalTextColor('#FFB4AB'),
    errorContainer: '#93000A',
    onErrorContainer: getOptimalTextColor('#93000A'),

    // Surface Colors
    surface: '#10090D',
    onSurface: '#E6E0E9',
    onSurfaceVariant: '#CAC4D0',
    surfaceDim: '#10090D',
    surfaceBright: '#362F33',
    surfaceContainerLowest: '#0B0509',
    surfaceContainerLow: '#1D1418',
    surfaceContainer: '#211A1E',
    surfaceContainerHigh: '#2B2329',
    surfaceContainerHighest: '#362F33',

    // Background Colors (deprecated but kept for compatibility)
    background: '#10090D',
    onBackground: '#E6E0E9',

    // Outline Colors
    outline: '#938F99',
    outlineVariant: '#49454F',

    // Utility Colors
    shadow: '#000000',
    scrim: '#000000',

    // Inverse Colors
    inverseSurface: '#E6E0E9',
    inverseOnSurface: '#313033',
    inversePrimary: colors.primary,

    // Fixed Colors
    primaryFixed: adjustColor(colors.primary, 80),
    onPrimaryFixed: adjustColor(colors.primary, -60),
    primaryFixedDim: adjustColor(colors.primary, 60),
    onPrimaryFixedVariant: adjustColor(colors.primary, -20),
    secondaryFixed: adjustColor(colors.secondary, 80),
    onSecondaryFixed: adjustColor(colors.secondary, -60),
    secondaryFixedDim: adjustColor(colors.secondary, 60),
    onSecondaryFixedVariant: adjustColor(colors.secondary, -20),
    tertiaryFixed: adjustColor(colors.tertiary, 80),
    onTertiaryFixed: adjustColor(colors.tertiary, -60),
    tertiaryFixedDim: adjustColor(colors.tertiary, 60),
    onTertiaryFixedVariant: adjustColor(colors.tertiary, -20),

    // Surface Tint
    surfaceTint: adjustColor(colors.primary, -20),

    // Additional Colors (custom)
    success: '#66BB6A',
    warning: '#FFB74D',
    info: '#64B5F6',
  }
}

/**
 * Generate light medium contrast Material 3 color scheme
 */
function generateLightMediumContrastColors(colors: { primary: string, secondary: string, tertiary: string }): ThemeColors {
  const baseColors = generateLightMaterial3Colors(colors)
  return {
    ...baseColors,
    // Keep light surface but increase text contrast slightly
    primary: adjustColor(colors.primary, -5), // Slightly darker primary
    onPrimary: '#FFFFFF',
    primaryContainer: adjustColor(colors.primary, 85), // Lighter container
    onPrimaryContainer: adjustColor(colors.primary, -45), // Darker text on container
    secondary: adjustColor(colors.secondary, -5), // Slightly darker secondary
    onSecondary: '#FFFFFF',
    secondaryContainer: adjustColor(colors.secondary, 85), // Lighter container
    onSecondaryContainer: adjustColor(colors.secondary, -45), // Darker text on container
    tertiary: adjustColor(colors.tertiary, -5), // Slightly darker tertiary
    onTertiary: '#FFFFFF',
    tertiaryContainer: adjustColor(colors.tertiary, 85), // Lighter container
    onTertiaryContainer: adjustColor(colors.tertiary, -45), // Darker text on container
    surface: '#FEFEFE', // Very light surface
    onSurface: '#1A1A1A', // Darker text for better contrast
    onSurfaceVariant: '#42464F', // Darker variant text
    outline: '#6F737A', // Darker outline
    // Explicitly maintain light background
    background: '#FFFBFE',
    onBackground: '#1A1A1A',
  }
}

/**
 * Generate light high contrast Material 3 color scheme
 */
function generateLightHighContrastColors(colors: { primary: string, secondary: string, tertiary: string }): ThemeColors {
  const baseColors = generateLightMaterial3Colors(colors)
  return {
    ...baseColors,
    // Maximum contrast - keep light surface, make text very dark
    primary: adjustColor(colors.primary, -15), // Much darker primary
    onPrimary: '#FFFFFF',
    primaryContainer: adjustColor(colors.primary, 90), // Very light container
    onPrimaryContainer: adjustColor(colors.primary, -55), // Very dark text on container
    secondary: adjustColor(colors.secondary, -15), // Much darker secondary
    onSecondary: '#FFFFFF',
    secondaryContainer: adjustColor(colors.secondary, 90), // Very light container
    onSecondaryContainer: adjustColor(colors.secondary, -55), // Very dark text on container
    tertiary: adjustColor(colors.tertiary, -15), // Much darker tertiary
    onTertiary: '#FFFFFF',
    tertiaryContainer: adjustColor(colors.tertiary, 90), // Very light container
    onTertiaryContainer: adjustColor(colors.tertiary, -55), // Very dark text on container
    surface: '#FFFFFF', // Pure white surface
    onSurface: '#000000', // Pure black text
    onSurfaceVariant: '#2F323A', // Very dark variant text
    outline: '#1F232A', // Very dark outline
    // Explicitly maintain light background
    background: '#FFFFFF',
    onBackground: '#000000',
  }
}

/**
 * Generate dark medium contrast Material 3 color scheme
 */
function generateDarkMediumContrastColors(colors: { primary: string, secondary: string, tertiary: string }): ThemeColors {
  const baseColors = generateDarkMaterial3Colors(colors)
  return {
    ...baseColors,
    // Keep dark surface but increase text contrast slightly
    primary: adjustColor(colors.primary, -15), // Slightly lighter primary for better visibility
    onPrimary: adjustColor(colors.primary, -75), // Darker text on primary
    primaryContainer: adjustColor(colors.primary, -55), // Darker container
    onPrimaryContainer: adjustColor(colors.primary, 90), // Lighter text on container
    secondary: adjustColor(colors.secondary, -15), // Slightly lighter secondary
    onSecondary: adjustColor(colors.secondary, -75), // Darker text on secondary
    secondaryContainer: adjustColor(colors.secondary, -55), // Darker container
    onSecondaryContainer: adjustColor(colors.secondary, 90), // Lighter text on container
    tertiary: adjustColor(colors.tertiary, -15), // Slightly lighter tertiary
    onTertiary: adjustColor(colors.tertiary, -75), // Darker text on tertiary
    tertiaryContainer: adjustColor(colors.tertiary, -55), // Darker container
    onTertiaryContainer: adjustColor(colors.tertiary, 90), // Lighter text on container
    surface: '#0A0A0C', // Darker surface
    onSurface: '#F0F0F0', // Lighter text for better contrast
    onSurfaceVariant: '#D0D0D0', // Lighter variant text
    outline: '#A0A0A0', // Lighter outline
  }
}

/**
 * Generate dark high contrast Material 3 color scheme
 */
function generateDarkHighContrastColors(colors: { primary: string, secondary: string, tertiary: string }): ThemeColors {
  const baseColors = generateDarkMaterial3Colors(colors)
  return {
    ...baseColors,
    // Maximum contrast - keep dark surface, make text very light
    primary: adjustColor(colors.primary, -5), // Lighter primary for visibility
    onPrimary: adjustColor(colors.primary, -80), // Very dark text on primary
    primaryContainer: adjustColor(colors.primary, -45), // Much darker container
    onPrimaryContainer: '#FFFFFF', // Pure white text on container
    secondary: adjustColor(colors.secondary, -5), // Lighter secondary
    onSecondary: adjustColor(colors.secondary, -80), // Very dark text on secondary
    secondaryContainer: adjustColor(colors.secondary, -45), // Much darker container
    onSecondaryContainer: '#FFFFFF', // Pure white text on container
    tertiary: adjustColor(colors.tertiary, -5), // Lighter tertiary
    onTertiary: adjustColor(colors.tertiary, -80), // Very dark text on tertiary
    tertiaryContainer: adjustColor(colors.tertiary, -45), // Much darker container
    onTertiaryContainer: '#FFFFFF', // Pure white text on container
    surface: '#000000', // Pure black surface
    onSurface: '#FFFFFF', // Pure white text
    onSurfaceVariant: '#FFFFFF', // Pure white variant text
    outline: '#E0E0E0', // Very light outline
  }
}

/**
 * Generate typography configuration
 */
function generateTypographyConfig() {
  return {
    displayLarge: {
      fontSize: 57,
      fontWeight: '400',
      letterSpacing: -0.25,
      lineHeight: 64
    },
    displayMedium: {
      fontSize: 45,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 52
    },
    displaySmall: {
      fontSize: 36,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 44
    },
    headlineLarge: {
      fontSize: 32,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 40
    },
    headlineMedium: {
      fontSize: 28,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 36
    },
    headlineSmall: {
      fontSize: 24,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 32
    },
    titleLarge: {
      fontSize: 22,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 28
    },
    titleMedium: {
      fontSize: 16,
      fontWeight: '500',
      letterSpacing: 0.15,
      lineHeight: 24
    },
    titleSmall: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.1,
      lineHeight: 20
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.15,
      lineHeight: 24
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 20
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0.4,
      lineHeight: 16
    },
    labelLarge: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.1,
      lineHeight: 20
    },
    labelMedium: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0.5,
      lineHeight: 16
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: '500',
      letterSpacing: 0.5,
      lineHeight: 16
    }
  }
}

/**
 * Generate spacing configuration
 */
function generateSpacingConfig() {
  return {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  }
}

/**
 * Generate border radius configuration
 */
function generateBorderRadiusConfig() {
  return {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999
  }
}

/**
 * Generate elevation configuration
 */
function generateElevationConfig() {
  return {
    level0: 0,
    level1: 1,
    level2: 3,
    level3: 6,
    level4: 8,
    level5: 12
  }
}

function adjustColor(hex: string, amount: number): string {
  const color = hex.replace('#', '')
  const num = parseInt(color, 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function getContrastColor(hex: string): string {
  const color = hex.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000000' : '#FFFFFF'
}

// Enhanced contrast checking algorithm
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

// Validate contrast for accessibility compliance
function validateColorContrast(backgroundColor: string, textColor: string): {
  ratio: number;
  isAccessible: boolean;
  level: 'AA' | 'AAA' | 'FAIL';
} {
  const ratio = getContrastRatio(backgroundColor, textColor)

  return {
    ratio,
    isAccessible: ratio >= 4.5,
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'FAIL'
  }
}

// Enhanced color adjustment with contrast validation
function adjustColorWithContrast(baseColor: string, targetBackground: string, isDark: boolean = false): string {
  let adjustedColor = baseColor
  let attempts = 0
  const maxAttempts = 20 // Increased attempts for finer granularity

  while (attempts < maxAttempts) {
    const contrast = validateColorContrast(targetBackground, adjustedColor)

    if (contrast.isAccessible) {
      return adjustedColor
    }

    // Adjust color to improve contrast using HSL for better color preservation
    // If background is dark, we need to lighten the color (increase L)
    // If background is light, we need to darken the color (decrease L)
    const bgLuminance = getLuminance(targetBackground);
    const adjustment = bgLuminance < 0.5 ? 5 : -5; // Smaller steps for HSL

    adjustedColor = adjustColorHsl(adjustedColor, adjustment);
    attempts++
  }

  // Fallback to optimal text color if adjustment fails
  return getOptimalTextColor(targetBackground, isDark)
}

// Helper function to get luminance
function getLuminance(hex: string): number {
  const color = hex.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16) / 255
  const g = parseInt(color.substr(2, 2), 16) / 255
  const b = parseInt(color.substr(4, 2), 16) / 255

  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Helper function to get optimal text color using Max Contrast method
function getOptimalTextColor(backgroundColor: string, _preferDark: boolean = false): string {
  const whiteContrast = getContrastRatio(backgroundColor, '#FFFFFF');
  const blackContrast = getContrastRatio(backgroundColor, '#000000');

  // Return the color with the higher contrast ratio
  return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
}

// HSL Color Utilities
function hexToHsl(hex: string): { h: number, s: number, l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function adjustColorHsl(hex: string, lightnessAmount: number): string {
  const { h, s, l } = hexToHsl(hex);
  // Clamp lightness between 0 and 100
  const newL = Math.max(0, Math.min(100, l + lightnessAmount));
  return hslToHex(h, s, newL);
}

export class FlutterThemeGenerator {
  static generate = generateFlutterTheme
  static validateContrast = validateColorContrast
  static getContrastRatio = getContrastRatio
  static adjustColorWithContrast = adjustColorWithContrast
  static getOptimalTextColor = getOptimalTextColor
  static getLuminance = getLuminance
  static adjustColor = adjustColor
  static hexToHsl = hexToHsl
  static hslToHex = hslToHex
  static adjustColorHsl = adjustColorHsl
}

import { ThemeConfig, ThemeColors } from '../types/theme'

export function generateFlutterTheme(colors: {
  primary: string
  secondary: string
  tertiary: string
  logo?: string
}, settings?: { useScreenUtil?: boolean }): ThemeConfig {
  const lightColors: ThemeColors = {
    primary: colors.primary,
    primaryVariant: adjustColor(colors.primary, 20),
    secondary: colors.secondary,
    secondaryVariant: adjustColor(colors.secondary, 20),
    surface: '#FFFFFF',
    background: '#FAFAFA',
    error: '#B00020',
    onPrimary: getContrastColor(colors.primary),
    onSecondary: getContrastColor(colors.secondary),
    onSurface: '#1A1A1A',
    onBackground: '#1A1A1A',
    onError: '#FFFFFF',
    success: '#2E7D32',
    warning: '#F57C00',
    info: '#1976D2',
    outline: '#79747E',
    shadow: '#000000',
    inverseSurface: '#1E1E1E',
    inverseOnSurface: '#F5F5F5',
    inversePrimary: adjustColor(colors.primary, -40)
  }

  const sophisticatedDark = getSophisticatedDarkColors()

  const darkColors: ThemeColors = {
    primary: adjustColor(colors.primary, -20),
    primaryVariant: adjustColor(colors.primary, -40),
    secondary: adjustColor(colors.secondary, -20),
    secondaryVariant: adjustColor(colors.secondary, -40),
    surface: sophisticatedDark.surface,
    background: sophisticatedDark.background,
    error: '#CF6679',
    onPrimary: adjustColorWithContrast(getOptimalTextColor(adjustColor(colors.primary, -20), true), adjustColor(colors.primary, -20), true),
    onSecondary: adjustColorWithContrast(getOptimalTextColor(adjustColor(colors.secondary, -20), true), adjustColor(colors.secondary, -20), true),
    onSurface: sophisticatedDark.onSurface,
    onBackground: sophisticatedDark.onBackground,
    onError: '#000000',
    success: '#66BB6A',
    warning: '#FFB74D',
    info: '#64B5F6',
    outline: sophisticatedDark.outline,
    shadow: sophisticatedDark.shadow,
    inverseSurface: '#F5F5F5',
    inverseOnSurface: '#1A1A1A',
    inversePrimary: colors.primary
  }

  return {
    colors: {
      light: lightColors,
      dark: darkColors
    },
    typography: {
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
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48
    },
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      full: 9999
    },
    elevation: {
      level0: 0,
      level1: 1,
      level2: 3,
      level3: 6,
      level4: 8,
      level5: 12
    },
    settings: {
      useScreenUtil: settings?.useScreenUtil || false
    }
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
  const maxAttempts = 10
  
  while (attempts < maxAttempts) {
    const contrast = validateColorContrast(targetBackground, adjustedColor)
    
    if (contrast.isAccessible) {
      return adjustedColor
    }
    
    // Adjust color to improve contrast
    const adjustment = isDark ? 20 : -20
    adjustedColor = adjustColor(adjustedColor, adjustment)
    attempts++
  }
  
  // Fallback to optimal text color if adjustment fails
  return getOptimalTextColor(targetBackground, isDark)
}

function getLuminance(hex: string): number {
  const color = hex.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16) / 255
  const g = parseInt(color.substr(2, 2), 16) / 255
  const b = parseInt(color.substr(4, 2), 16) / 255
  
  const sR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  const sG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  const sB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB
}

// Enhanced text color algorithm for better readability
function getOptimalTextColor(backgroundHex: string, isDark: boolean = false): string {
  const luminance = getLuminance(backgroundHex)
  
  if (isDark) {
    // For dark themes, use sophisticated grays instead of pure white/black
    if (luminance > 0.5) {
      return '#1A1A1A' // Dark text on light backgrounds
    } else if (luminance > 0.2) {
      return '#F0F0F0' // Light gray on medium backgrounds
    } else {
      return '#E8E8E8' // Softer white on dark backgrounds
    }
  } else {
    // For light themes, ensure sufficient contrast
    return luminance > 0.5 ? '#1A1A1A' : '#FFFFFF'
  }
}

// Sophisticated dark color palette generator
function getSophisticatedDarkColors() {
  return {
    background: '#1A1A1A',      // Primary dark background - comfortable dark gray
    surface: '#2D2D2D',         // Elevated surfaces - distinct from background
    surfaceVariant: '#3A3A3A',  // Cards, dialogs - higher elevation
    outline: '#8A8A8A',         // Borders and dividers - visible but subtle
    outlineVariant: '#5A5A5A',  // Secondary borders
    onBackground: '#E8E8E8',    // Primary text - high contrast but not harsh
    onSurface: '#F0F0F0',       // Surface text - slightly brighter
    onSurfaceVariant: '#D0D0D0', // Secondary text
    shadow: '#000000',
    scrim: '#000000'
  }
}

export class FlutterThemeGenerator {
  static generate = generateFlutterTheme
  static validateContrast = validateColorContrast
  static getContrastRatio = getContrastRatio
  static adjustColorWithContrast = adjustColorWithContrast
  static getOptimalTextColor = getOptimalTextColor
}

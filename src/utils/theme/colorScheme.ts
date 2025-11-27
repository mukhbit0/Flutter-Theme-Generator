import { ThemeColors } from '../../types/theme';
import { adjustColor, getContrastColor, getOptimalTextColor } from './colorUtils';

// ==========================================
// Base Color Input Type
// ==========================================

export interface BaseColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

// ==========================================
// Light Mode Color Schemes
// ==========================================

/**
 * Generate light mode Material 3 color scheme
 */
export function generateLightMaterial3Colors(colors: BaseColors): ThemeColors {
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
    };
}

/**
 * Generate light medium contrast Material 3 color scheme
 */
export function generateLightMediumContrastColors(colors: BaseColors): ThemeColors {
    const baseColors = generateLightMaterial3Colors(colors);
    return {
        ...baseColors,
        primary: adjustColor(colors.primary, -5),
        onPrimary: '#FFFFFF',
        primaryContainer: adjustColor(colors.primary, 85),
        onPrimaryContainer: adjustColor(colors.primary, -45),
        secondary: adjustColor(colors.secondary, -5),
        onSecondary: '#FFFFFF',
        secondaryContainer: adjustColor(colors.secondary, 85),
        onSecondaryContainer: adjustColor(colors.secondary, -45),
        tertiary: adjustColor(colors.tertiary, -5),
        onTertiary: '#FFFFFF',
        tertiaryContainer: adjustColor(colors.tertiary, 85),
        onTertiaryContainer: adjustColor(colors.tertiary, -45),
        surface: '#FEFEFE',
        onSurface: '#1A1A1A',
        onSurfaceVariant: '#42464F',
        outline: '#6F737A',
        background: '#FFFBFE',
        onBackground: '#1A1A1A',
    };
}

/**
 * Generate light high contrast Material 3 color scheme
 */
export function generateLightHighContrastColors(colors: BaseColors): ThemeColors {
    const baseColors = generateLightMaterial3Colors(colors);
    return {
        ...baseColors,
        primary: adjustColor(colors.primary, -15),
        onPrimary: '#FFFFFF',
        primaryContainer: adjustColor(colors.primary, 90),
        onPrimaryContainer: adjustColor(colors.primary, -55),
        secondary: adjustColor(colors.secondary, -15),
        onSecondary: '#FFFFFF',
        secondaryContainer: adjustColor(colors.secondary, 90),
        onSecondaryContainer: adjustColor(colors.secondary, -55),
        tertiary: adjustColor(colors.tertiary, -15),
        onTertiary: '#FFFFFF',
        tertiaryContainer: adjustColor(colors.tertiary, 90),
        onTertiaryContainer: adjustColor(colors.tertiary, -55),
        surface: '#FFFFFF',
        onSurface: '#000000',
        onSurfaceVariant: '#2F323A',
        outline: '#1F232A',
        background: '#FFFFFF',
        onBackground: '#000000',
    };
}

// ==========================================
// Dark Mode Color Schemes
// ==========================================

/**
 * Generate dark mode Material 3 color scheme
 */
export function generateDarkMaterial3Colors(colors: BaseColors): ThemeColors {
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
    };
}

/**
 * Generate dark medium contrast Material 3 color scheme
 */
export function generateDarkMediumContrastColors(colors: BaseColors): ThemeColors {
    const baseColors = generateDarkMaterial3Colors(colors);
    return {
        ...baseColors,
        primary: adjustColor(colors.primary, -15),
        onPrimary: adjustColor(colors.primary, -75),
        primaryContainer: adjustColor(colors.primary, -55),
        onPrimaryContainer: adjustColor(colors.primary, 90),
        secondary: adjustColor(colors.secondary, -15),
        onSecondary: adjustColor(colors.secondary, -75),
        secondaryContainer: adjustColor(colors.secondary, -55),
        onSecondaryContainer: adjustColor(colors.secondary, 90),
        tertiary: adjustColor(colors.tertiary, -15),
        onTertiary: adjustColor(colors.tertiary, -75),
        tertiaryContainer: adjustColor(colors.tertiary, -55),
        onTertiaryContainer: adjustColor(colors.tertiary, 90),
        surface: '#0A0A0C',
        onSurface: '#F0F0F0',
        onSurfaceVariant: '#D0D0D0',
        outline: '#A0A0A0',
    };
}

/**
 * Generate dark high contrast Material 3 color scheme
 */
export function generateDarkHighContrastColors(colors: BaseColors): ThemeColors {
    const baseColors = generateDarkMaterial3Colors(colors);
    return {
        ...baseColors,
        primary: adjustColor(colors.primary, -5),
        onPrimary: adjustColor(colors.primary, -80),
        primaryContainer: adjustColor(colors.primary, -45),
        onPrimaryContainer: '#FFFFFF',
        secondary: adjustColor(colors.secondary, -5),
        onSecondary: adjustColor(colors.secondary, -80),
        secondaryContainer: adjustColor(colors.secondary, -45),
        onSecondaryContainer: '#FFFFFF',
        tertiary: adjustColor(colors.tertiary, -5),
        onTertiary: adjustColor(colors.tertiary, -80),
        tertiaryContainer: adjustColor(colors.tertiary, -45),
        onTertiaryContainer: '#FFFFFF',
        surface: '#000000',
        onSurface: '#FFFFFF',
        onSurfaceVariant: '#FFFFFF',
        outline: '#E0E0E0',
    };
}

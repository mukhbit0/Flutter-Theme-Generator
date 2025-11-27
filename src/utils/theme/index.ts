// ==========================================
// Flutter Theme Generator - Main Entry Point
// ==========================================

import { ThemeConfig, ThemeGeneratorSettings } from '../../types/theme';
import {
    BaseColors,
    generateLightMaterial3Colors,
    generateDarkMaterial3Colors,
    generateLightMediumContrastColors,
    generateLightHighContrastColors,
    generateDarkMediumContrastColors,
    generateDarkHighContrastColors,
} from './colorScheme';
import { generateTypographyConfig } from './typography';
import {
    generateSpacingConfig,
    generateBorderRadiusConfig,
    generateElevationConfig,
} from './designTokens';
import {
    adjustColor,
    getContrastColor,
    getLuminance,
    getContrastRatio,
    validateColorContrast,
    getOptimalTextColor,
    adjustColorWithContrast,
    hexToHsl,
    hslToHex,
    adjustColorHsl,
} from './colorUtils';

// Re-export all modules for direct access
export * from './colorScheme';
export * from './typography';
export * from './designTokens';
export * from './colorUtils';

// ==========================================
// Main Theme Generator Function
// ==========================================

export interface ThemeColorInput extends BaseColors {
    logo?: string;
}

/**
 * Generate a complete Flutter theme configuration
 */
export function generateFlutterTheme(
    colors: ThemeColorInput,
    settings?: ThemeGeneratorSettings
): ThemeConfig {
    const lightColors = generateLightMaterial3Colors(colors);
    const darkColors = generateDarkMaterial3Colors(colors);

    // Build colors config - light and dark are always included
    const colorsConfig: ThemeConfig['colors'] = {
        light: settings?.themeVariants?.lightMode !== false ? lightColors : lightColors,
        dark: settings?.themeVariants?.darkMode !== false ? darkColors : darkColors,
    };

    // Add contrast variants if enabled
    if (settings?.themeVariants?.lightMedium) {
        colorsConfig.lightMediumContrast = generateLightMediumContrastColors(colors);
    }
    if (settings?.themeVariants?.lightHigh) {
        colorsConfig.lightHighContrast = generateLightHighContrastColors(colors);
    }
    if (settings?.themeVariants?.darkMedium) {
        colorsConfig.darkMediumContrast = generateDarkMediumContrastColors(colors);
    }
    if (settings?.themeVariants?.darkHigh) {
        colorsConfig.darkHighContrast = generateDarkHighContrastColors(colors);
    }

    return {
        colors: colorsConfig,
        typography: generateTypographyConfig(),
        spacing: generateSpacingConfig(),
        borderRadius: generateBorderRadiusConfig(),
        elevation: generateElevationConfig(),
        settings,
    };
}

// ==========================================
// FlutterThemeGenerator Class
// Provides static access to all utilities
// ==========================================

export class FlutterThemeGenerator {
    // Main generator
    static generate = generateFlutterTheme;

    // Color scheme generators
    static generateLightColors = generateLightMaterial3Colors;
    static generateDarkColors = generateDarkMaterial3Colors;
    static generateLightMediumContrastColors = generateLightMediumContrastColors;
    static generateLightHighContrastColors = generateLightHighContrastColors;
    static generateDarkMediumContrastColors = generateDarkMediumContrastColors;
    static generateDarkHighContrastColors = generateDarkHighContrastColors;

    // Design tokens
    static generateTypography = generateTypographyConfig;
    static generateSpacing = generateSpacingConfig;
    static generateBorderRadius = generateBorderRadiusConfig;
    static generateElevation = generateElevationConfig;

    // Color utilities
    static validateContrast = validateColorContrast;
    static getContrastRatio = getContrastRatio;
    static adjustColorWithContrast = adjustColorWithContrast;
    static getOptimalTextColor = getOptimalTextColor;
    static getLuminance = getLuminance;
    static adjustColor = adjustColor;
    static getContrastColor = getContrastColor;

    // HSL utilities
    static hexToHsl = hexToHsl;
    static hslToHex = hslToHex;
    static adjustColorHsl = adjustColorHsl;
}

// Default export for backward compatibility
export default FlutterThemeGenerator;

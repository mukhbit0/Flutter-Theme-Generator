// ==========================================
// Typography Configuration
// Material 3 Typography Scale
// ==========================================

export interface TextStyle {
    fontSize: number;
    fontWeight: string;
    letterSpacing: number;
    lineHeight: number;
}

export interface TypographyConfig {
    displayLarge: TextStyle;
    displayMedium: TextStyle;
    displaySmall: TextStyle;
    headlineLarge: TextStyle;
    headlineMedium: TextStyle;
    headlineSmall: TextStyle;
    titleLarge: TextStyle;
    titleMedium: TextStyle;
    titleSmall: TextStyle;
    bodyLarge: TextStyle;
    bodyMedium: TextStyle;
    bodySmall: TextStyle;
    labelLarge: TextStyle;
    labelMedium: TextStyle;
    labelSmall: TextStyle;
}

/**
 * Generate Material 3 typography configuration
 */
export function generateTypographyConfig(): TypographyConfig {
    return {
        displayLarge: {
            fontSize: 57,
            fontWeight: '400',
            letterSpacing: -0.25,
            lineHeight: 64,
        },
        displayMedium: {
            fontSize: 45,
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 52,
        },
        displaySmall: {
            fontSize: 36,
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 44,
        },
        headlineLarge: {
            fontSize: 32,
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 40,
        },
        headlineMedium: {
            fontSize: 28,
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 36,
        },
        headlineSmall: {
            fontSize: 24,
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 32,
        },
        titleLarge: {
            fontSize: 22,
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 28,
        },
        titleMedium: {
            fontSize: 16,
            fontWeight: '500',
            letterSpacing: 0.15,
            lineHeight: 24,
        },
        titleSmall: {
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.1,
            lineHeight: 20,
        },
        bodyLarge: {
            fontSize: 16,
            fontWeight: '400',
            letterSpacing: 0.15,
            lineHeight: 24,
        },
        bodyMedium: {
            fontSize: 14,
            fontWeight: '400',
            letterSpacing: 0.25,
            lineHeight: 20,
        },
        bodySmall: {
            fontSize: 12,
            fontWeight: '400',
            letterSpacing: 0.4,
            lineHeight: 16,
        },
        labelLarge: {
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.1,
            lineHeight: 20,
        },
        labelMedium: {
            fontSize: 12,
            fontWeight: '500',
            letterSpacing: 0.5,
            lineHeight: 16,
        },
        labelSmall: {
            fontSize: 11,
            fontWeight: '500',
            letterSpacing: 0.5,
            lineHeight: 16,
        },
    };
}

/**
 * Get typography style for a specific text style
 */
export function getTextStyle(config: TypographyConfig, style: keyof TypographyConfig): TextStyle {
    return config[style];
}

/**
 * Generate CSS font string from text style
 */
export function textStyleToCss(style: TextStyle): string {
    return `font-size: ${style.fontSize}px; font-weight: ${style.fontWeight}; letter-spacing: ${style.letterSpacing}px; line-height: ${style.lineHeight}px;`;
}

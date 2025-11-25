import { ThemeConfig } from '../types/theme';
import { FlutterThemeGenerator } from './FlutterThemeGenerator';

export interface ValidationResult {
    pair: string;
    color1: string;
    color2: string;
    ratio: number;
    level: 'AA' | 'AAA' | 'FAIL';
    isAccessible: boolean;
    message: string;
}

export interface ThemeValidationReport {
    score: number;
    results: ValidationResult[];
    passedCount: number;
    warningCount: number; // AA but not AAA
    errorCount: number; // FAIL
}

export class ThemeValidator {
    static validateTheme(theme: ThemeConfig, isDark: boolean): ThemeValidationReport {
        const colors = isDark ? theme.colors.dark : theme.colors.light;
        const results: ValidationResult[] = [];

        // Define critical pairs to check
        const pairs = [
            { name: 'Primary / OnPrimary', bg: colors.primary, fg: colors.onPrimary },
            { name: 'Primary Container / OnPrimaryContainer', bg: colors.primaryContainer, fg: colors.onPrimaryContainer },
            { name: 'Secondary / OnSecondary', bg: colors.secondary, fg: colors.onSecondary },
            { name: 'Secondary Container / OnSecondaryContainer', bg: colors.secondaryContainer, fg: colors.onSecondaryContainer },
            { name: 'Tertiary / OnTertiary', bg: colors.tertiary, fg: colors.onTertiary },
            { name: 'Tertiary Container / OnTertiaryContainer', bg: colors.tertiaryContainer, fg: colors.onTertiaryContainer },
            { name: 'Error / OnError', bg: colors.error, fg: colors.onError },
            { name: 'Error Container / OnErrorContainer', bg: colors.errorContainer, fg: colors.onErrorContainer },
            { name: 'Surface / OnSurface', bg: colors.surface, fg: colors.onSurface },
            { name: 'Surface Variant / OnSurfaceVariant', bg: colors.surfaceContainerHighest, fg: colors.onSurfaceVariant },
            { name: 'Background / OnBackground', bg: colors.background, fg: colors.onBackground },
        ];

        let passedCount = 0;
        let warningCount = 0;
        let errorCount = 0;

        pairs.forEach(pair => {
            const contrast = FlutterThemeGenerator.validateContrast(pair.bg, pair.fg);

            let message = 'Passes WCAG AAA standards.';
            if (contrast.level === 'AA') {
                message = 'Passes WCAG AA standards, but could be improved for AAA.';
                warningCount++;
            } else if (contrast.level === 'FAIL') {
                message = `Fails WCAG accessibility standards. Ratio is ${contrast.ratio.toFixed(2)}:1, minimum required is 4.5:1.`;
                errorCount++;
            } else {
                passedCount++;
            }

            results.push({
                pair: pair.name,
                color1: pair.bg,
                color2: pair.fg,
                ratio: contrast.ratio,
                level: contrast.level,
                isAccessible: contrast.isAccessible,
                message
            });
        });

        // Calculate score (0-100)
        // Simple scoring: (Passed * 1 + Warnings * 0.5) / Total * 100
        const total = pairs.length;
        const score = Math.round(((passedCount + (warningCount * 0.5)) / total) * 100);

        return {
            score,
            results,
            passedCount,
            warningCount,
            errorCount
        };
    }

    static fixColor(color: string, bg: string, targetRatio: number = 3.0): string {
        const currentRatio = FlutterThemeGenerator.getContrastRatio(bg, color);
        if (currentRatio >= targetRatio) return color;

        // Try to lighten/darken to meet contrast
        for (let i = 1; i <= 50; i++) {
            const bgLuminance = FlutterThemeGenerator.getLuminance(bg);
            // If bg is dark, lighten color. If bg is light, darken color.
            // We use a dynamic step to reach the target faster but with precision
            const adjustment = bgLuminance < 0.5 ? 4 * i : -4 * i;

            const testColor = FlutterThemeGenerator.adjustColor(color, adjustment);
            if (FlutterThemeGenerator.getContrastRatio(bg, testColor) >= targetRatio) {
                return testColor;
            }
        }
        return color; // Return original if no fix found (unlikely)
    }

    static getFixedTheme(theme: ThemeConfig, isDark: boolean): ThemeConfig {
        // Create a deep copy to avoid mutation
        const newTheme = JSON.parse(JSON.stringify(theme)) as ThemeConfig;
        const colors = isDark ? newTheme.colors.dark : newTheme.colors.light;
        const appBg = colors.background; // Check against app background

        // 1. Fix Main Colors against Background (Target 3.0 for UI visibility)
        // We iterate through all colors that are NOT "on" colors (content colors)
        Object.keys(colors).forEach(key => {
            if (!key.startsWith('on') && typeof colors[key as keyof typeof colors] === 'string') {
                const colorVal = colors[key as keyof typeof colors] as string;
                colors[key as keyof typeof colors] = ThemeValidator.fixColor(colorVal, appBg, 3.0);
            }
        });

        // 2. Fix Content Pairs (Text on Backgrounds) - Target AAA (7.0)
        const fixPair = (bg: string, fg: string, targetRatio: number = 7.0): string => {
            // Use the shared fixColor logic but with higher target and fallback
            let fixed = ThemeValidator.fixColor(fg, bg, targetRatio);

            // If AAA fails, try AA (4.5)
            if (FlutterThemeGenerator.getContrastRatio(bg, fixed) < targetRatio && targetRatio > 4.5) {
                fixed = ThemeValidator.fixColor(fg, bg, 4.5);
            }

            // If still fails (rare), fallback to B/W
            if (FlutterThemeGenerator.getContrastRatio(bg, fixed) < 4.5) {
                return FlutterThemeGenerator.getOptimalTextColor(bg, isDark);
            }
            return fixed;
        };

        // Apply fixes to all critical pairs
        colors.onPrimary = fixPair(colors.primary, colors.onPrimary);
        colors.onPrimaryContainer = fixPair(colors.primaryContainer, colors.onPrimaryContainer);
        colors.onSecondary = fixPair(colors.secondary, colors.onSecondary);
        colors.onSecondaryContainer = fixPair(colors.secondaryContainer, colors.onSecondaryContainer);
        colors.onTertiary = fixPair(colors.tertiary, colors.onTertiary);
        colors.onTertiaryContainer = fixPair(colors.tertiaryContainer, colors.onTertiaryContainer);
        colors.onError = fixPair(colors.error, colors.onError);
        colors.onErrorContainer = fixPair(colors.errorContainer, colors.onErrorContainer);
        colors.onSurface = fixPair(colors.surface, colors.onSurface);
        colors.onSurfaceVariant = fixPair(colors.surfaceContainerHighest, colors.onSurfaceVariant);
        colors.onBackground = fixPair(colors.background, colors.onBackground);

        return newTheme;
    }
}

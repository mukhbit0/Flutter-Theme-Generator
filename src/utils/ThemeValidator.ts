import { ThemeConfig } from '../types/theme';
import { FlutterThemeGenerator } from './FlutterThemeGenerator';

export interface ValidationResult {
    pair: string;
    color1: string;
    color2: string;
    bgKey: string; // Added key for auto-fix
    fgKey: string; // Added key for auto-fix
    ratio: number;
    level: 'AA' | 'AAA' | 'FAIL';
    isAccessible: boolean;
    message: string;
}

export interface ThemeValidationReport {
    score: number;
    brandConsistencyScore: number;
    performanceScore: number;
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
            { name: 'Primary / OnPrimary', bg: colors.primary, fg: colors.onPrimary, bgKey: 'primary', fgKey: 'onPrimary' },
            { name: 'Primary Container / OnPrimaryContainer', bg: colors.primaryContainer, fg: colors.onPrimaryContainer, bgKey: 'primaryContainer', fgKey: 'onPrimaryContainer' },
            { name: 'Secondary / OnSecondary', bg: colors.secondary, fg: colors.onSecondary, bgKey: 'secondary', fgKey: 'onSecondary' },
            { name: 'Secondary Container / OnSecondaryContainer', bg: colors.secondaryContainer, fg: colors.onSecondaryContainer, bgKey: 'secondaryContainer', fgKey: 'onSecondaryContainer' },
            { name: 'Tertiary / OnTertiary', bg: colors.tertiary, fg: colors.onTertiary, bgKey: 'tertiary', fgKey: 'onTertiary' },
            { name: 'Tertiary Container / OnTertiaryContainer', bg: colors.tertiaryContainer, fg: colors.onTertiaryContainer, bgKey: 'tertiaryContainer', fgKey: 'onTertiaryContainer' },
            { name: 'Error / OnError', bg: colors.error, fg: colors.onError, bgKey: 'error', fgKey: 'onError' },
            { name: 'Error Container / OnErrorContainer', bg: colors.errorContainer, fg: colors.onErrorContainer, bgKey: 'errorContainer', fgKey: 'onErrorContainer' },
            { name: 'Surface / OnSurface', bg: colors.surface, fg: colors.onSurface, bgKey: 'surface', fgKey: 'onSurface' },
            { name: 'Surface Variant / OnSurfaceVariant', bg: colors.surfaceContainerHighest, fg: colors.onSurfaceVariant, bgKey: 'surfaceContainerHighest', fgKey: 'onSurfaceVariant' },
            { name: 'Background / OnBackground', bg: colors.background, fg: colors.onBackground, bgKey: 'background', fgKey: 'onBackground' },
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
                bgKey: pair.bgKey,
                fgKey: pair.fgKey,
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

        // Calculate Brand Consistency Score
        // Check if primary, secondary, and tertiary are distinct enough
        const brandConsistencyScore = ThemeValidator.calculateBrandConsistency(colors);

        // Calculate Performance Score
        // Based on number of unique colors (simulating complexity)
        const performanceScore = ThemeValidator.calculatePerformanceImpact(colors);

        return {
            score,
            brandConsistencyScore,
            performanceScore,
            results,
            passedCount,
            warningCount,
            errorCount
        };
    }

    static calculateBrandConsistency(colors: any): number {
        // Simple heuristic: Check distance between key brand colors
        // If they are too close, it might look muddy or inconsistent
        const getHue = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h = 0;

            if (max === min) return 0;
            const d = max - min;
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            return h * 60;
        };

        const primaryHue = getHue(colors.primary);
        const secondaryHue = getHue(colors.secondary);
        const tertiaryHue = getHue(colors.tertiary);

        // Calculate minimum distance between hues
        const diff1 = Math.abs(primaryHue - secondaryHue);
        const diff2 = Math.abs(secondaryHue - tertiaryHue);
        const diff3 = Math.abs(primaryHue - tertiaryHue);

        // Normalize diffs to be within 180 degrees
        const normDiff = (d: number) => Math.min(d, 360 - d);

        const minDiff = Math.min(normDiff(diff1), normDiff(diff2), normDiff(diff3));

        // If colors are too close (e.g. < 15 degrees), score is lower
        // If they are distinct (> 30 degrees), score is higher
        // This is just a heuristic for "visual distinction"
        if (minDiff < 10) return 70; // Monochromatic-ish but maybe unintentional
        if (minDiff < 20) return 85; // Analogous
        return 95; // Distinct
    }

    static calculatePerformanceImpact(colors: any): number {
        // In Flutter, more unique colors = slightly more memory, but negligible.
        // This is mostly a "complexity" score.
        // Let's count unique hex values in the scheme.
        const uniqueColors = new Set(Object.values(colors)).size;
        const totalSlots = Object.keys(colors).length;

        // If we reuse colors (e.g. primary = onSecondary), it's more efficient?
        // Actually, for a theme generator, we usually want unique colors for flexibility.
        // Let's say: 
        // Too few unique colors (< 5) = 100 (Simple, fast)
        // Moderate (5-15) = 90
        // Many (> 15) = 80 (Complex)

        if (uniqueColors < 10) return 98;
        if (uniqueColors < 20) return 92;
        return 85;
    }

    static fixColor(color: string, bg: string, targetRatio: number = 3.0): string {
        const currentRatio = FlutterThemeGenerator.getContrastRatio(bg, color);
        if (currentRatio >= targetRatio) return color;

        const bgLuminance = FlutterThemeGenerator.getLuminance(bg);
        const isBgDark = bgLuminance < 0.5;

        // Binary search for the minimum adjustment needed
        // If background is dark, we generally want lighter colors (higher L)
        // If background is light, we generally want darker colors (lower L)
        // However, we should try both directions to see which is closer/better

        const tryDirection = (direction: 'lighten' | 'darken'): string | null => {
            let low = 0;
            let high = 100;
            let foundColor = null;

            // We want the SMALLEST change that passes
            for (let i = 0; i < 10; i++) { // 10 iterations is enough precision
                const mid = (low + high) / 2;
                const adjustment = direction === 'lighten' ? mid : -mid;
                const testColor = FlutterThemeGenerator.adjustColorHsl(color, adjustment);
                const ratio = FlutterThemeGenerator.getContrastRatio(bg, testColor);

                if (ratio >= targetRatio) {
                    foundColor = testColor;
                    high = mid; // Try to find a smaller adjustment
                } else {
                    low = mid; // Need more adjustment
                }
            }
            return foundColor;
        };

        // Try both directions and pick the one that requires less change (conceptually)
        // or simply the one that works if only one works.
        // Usually, if bg is dark, lightening is the way to go, and vice versa.
        const lighter = tryDirection('lighten');
        const darker = tryDirection('darken');

        if (lighter && darker) {
            // Compare which one is closer to original lightness? 
            // For now, let's stick to the natural direction based on BG luminance for consistency
            return isBgDark ? lighter : darker;
        }

        return lighter || darker || FlutterThemeGenerator.getOptimalTextColor(bg, isBgDark);
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
                // Only fix if it's really bad, otherwise preserve design intent for main UI elements
                if (FlutterThemeGenerator.getContrastRatio(appBg, colorVal) < 3.0) {
                    colors[key as keyof typeof colors] = ThemeValidator.fixColor(colorVal, appBg, 3.0);
                }
            }
        });

        // 2. Fix Content Pairs (Text on Backgrounds) - Target AAA (7.0)
        const fixPair = (bg: string, fg: string, targetRatio: number = 7.0): string => {
            // Use the shared fixColor logic but with higher target and fallback
            let fixed = ThemeValidator.fixColor(fg, bg, targetRatio);

            // If AAA fails (e.g. impossible with this hue), try AA (4.5)
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

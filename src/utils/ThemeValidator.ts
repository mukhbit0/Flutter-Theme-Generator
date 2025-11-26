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
    harmonyName?: string; // New field
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
        const total = pairs.length;
        const score = Math.round(((passedCount + (warningCount * 0.5)) / total) * 100);

        // Calculate Brand Consistency Score
        const { score: brandConsistencyScore, harmony } = ThemeValidator.calculateBrandConsistency(colors);

        // Calculate Performance Score (System Efficiency)
        const performanceScore = ThemeValidator.calculateSystemEfficiency(colors);

        return {
            score,
            brandConsistencyScore,
            performanceScore,
            harmonyName: harmony,
            results,
            passedCount,
            warningCount,
            errorCount
        };
    }

    static calculateBrandConsistency(colors: any): { score: number, harmony: string } {
        // 1. Harmony Detection
        const getHue = (hex: string) => FlutterThemeGenerator.hexToHsl(hex).h;
        const getSat = (hex: string) => FlutterThemeGenerator.hexToHsl(hex).s;

        const h1 = getHue(colors.primary);
        const h2 = getHue(colors.secondary);
        const h3 = getHue(colors.tertiary);

        const hues = [h1, h2, h3].sort((a, b) => a - b);

        const diff = (a: number, b: number) => {
            const d = Math.abs(a - b);
            return Math.min(d, 360 - d);
        };

        const d1 = diff(hues[0], hues[1]);
        const d2 = diff(hues[1], hues[2]);
        const d3 = diff(hues[0], hues[2]);

        let harmony = 'Custom';
        let harmonyScore = 80;

        // Check for Monochromatic
        if (d1 < 15 && d2 < 15 && d3 < 15) {
            harmony = 'Monochromatic';
            harmonyScore = 95;
        }
        // Check for Analogous
        else if (d1 < 60 && d2 < 60 && d3 < 90) {
            harmony = 'Analogous';
            harmonyScore = 98;
        }
        // Check for Triadic
        else if (Math.abs(d1 - 120) < 20 && Math.abs(d2 - 120) < 20) {
            harmony = 'Triadic';
            harmonyScore = 95;
        }
        // Check for Split Complementary
        else if ((Math.abs(d1 - 150) < 30 || Math.abs(d2 - 150) < 30)) {
            harmony = 'Split Complementary';
            harmonyScore = 92;
        }
        // Check for Complementary
        else if (Math.abs(d1 - 180) < 20 || Math.abs(d2 - 180) < 20 || Math.abs(d3 - 180) < 20) {
            harmony = 'Complementary';
            harmonyScore = 90;
        }

        // 2. Saturation Consistency
        const s1 = getSat(colors.primary);
        const s2 = getSat(colors.secondary);
        const s3 = getSat(colors.tertiary);

        const avgS = (s1 + s2 + s3) / 3;
        const variance = ((s1 - avgS) ** 2 + (s2 - avgS) ** 2 + (s3 - avgS) ** 2) / 3;
        const stdDev = Math.sqrt(variance);

        const saturationBonus = Math.max(-10, Math.min(10, 10 - (stdDev / 2)));

        return {
            score: Math.min(100, Math.round(harmonyScore + saturationBonus)),
            harmony
        };
    }

    static calculateSystemEfficiency(colors: any): number {
        // 1. Redundancy Check
        const getHue = (hex: string) => FlutterThemeGenerator.hexToHsl(hex).h;
        const h1 = getHue(colors.primary);
        const h2 = getHue(colors.secondary);
        const h3 = getHue(colors.tertiary);

        const diff = (a: number, b: number) => {
            const d = Math.abs(a - b);
            return Math.min(d, 360 - d);
        };

        const d1 = diff(h1, h2);
        const d2 = diff(h2, h3);
        const d3 = diff(h1, h3);

        let redundancyPenalty = 0;
        if (d1 > 0 && d1 < 10) redundancyPenalty += 5;
        if (d2 > 0 && d2 < 10) redundancyPenalty += 5;
        if (d3 > 0 && d3 < 10) redundancyPenalty += 5;

        // 2. Palette Complexity
        const uniqueColors = new Set(Object.values(colors)).size;
        const totalSlots = Object.keys(colors).length;
        const uniquenessRatio = uniqueColors / totalSlots;

        let complexityScore = 90;
        if (uniquenessRatio > 0.9) complexityScore = 80;
        if (uniquenessRatio < 0.5) complexityScore = 95;

        return Math.max(0, Math.min(100, complexityScore - redundancyPenalty));
    }

    static fixColor(color: string, bg: string, targetRatio: number = 3.0): string {
        const currentRatio = FlutterThemeGenerator.getContrastRatio(bg, color);
        if (currentRatio >= targetRatio) return color;

        const bgLuminance = FlutterThemeGenerator.getLuminance(bg);
        const isBgDark = bgLuminance < 0.5;

        const tryDirection = (direction: 'lighten' | 'darken'): string | null => {
            let low = 0;
            let high = 100;
            let foundColor = null;

            for (let i = 0; i < 10; i++) {
                const mid = (low + high) / 2;
                const adjustment = direction === 'lighten' ? mid : -mid;
                const testColor = FlutterThemeGenerator.adjustColorHsl(color, adjustment);
                const ratio = FlutterThemeGenerator.getContrastRatio(bg, testColor);

                if (ratio >= targetRatio) {
                    foundColor = testColor;
                    high = mid;
                } else {
                    low = mid;
                }
            }
            return foundColor;
        };

        const lighter = tryDirection('lighten');
        const darker = tryDirection('darken');

        if (lighter && darker) {
            return isBgDark ? lighter : darker;
        }

        return lighter || darker || FlutterThemeGenerator.getOptimalTextColor(bg, isBgDark);
    }

    static getFixedTheme(theme: ThemeConfig, isDark: boolean): ThemeConfig {
        const newTheme = JSON.parse(JSON.stringify(theme)) as ThemeConfig;
        const colors = isDark ? newTheme.colors.dark : newTheme.colors.light;
        const appBg = colors.background;

        Object.keys(colors).forEach(key => {
            if (!key.startsWith('on') && typeof colors[key as keyof typeof colors] === 'string') {
                const colorVal = colors[key as keyof typeof colors] as string;
                if (FlutterThemeGenerator.getContrastRatio(appBg, colorVal) < 3.0) {
                    colors[key as keyof typeof colors] = ThemeValidator.fixColor(colorVal, appBg, 3.0);
                }
            }
        });

        const fixPair = (bg: string, fg: string, targetRatio: number = 7.0): string => {
            let fixed = ThemeValidator.fixColor(fg, bg, targetRatio);
            if (FlutterThemeGenerator.getContrastRatio(bg, fixed) < targetRatio && targetRatio > 4.5) {
                fixed = ThemeValidator.fixColor(fg, bg, 4.5);
            }
            if (FlutterThemeGenerator.getContrastRatio(bg, fixed) < 4.5) {
                return FlutterThemeGenerator.getOptimalTextColor(bg, isDark);
            }
            return fixed;
        };

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

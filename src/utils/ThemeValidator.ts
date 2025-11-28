import { ThemeConfig, ThemeColors } from '../types/theme';
import { FlutterThemeGenerator } from './FlutterThemeGenerator';

export interface ValidationResult {
    pair: string;
    color1: string;
    color2: string;
    bgKey: string;
    fgKey: string;
    ratio: number;
    level: 'AA' | 'AAA' | 'FAIL';
    largeTextLevel: 'AA' | 'AAA' | 'FAIL'; // Large text has different requirements
    isAccessible: boolean;
    message: string;
    category: 'core' | 'surface' | 'container' | 'inverse' | 'fixed';
}

export interface ColorBlindnessResult {
    type: 'deuteranopia' | 'protanopia' | 'tritanopia';
    displayName: string;
    description: string;
    affectedPairs: {
        pair: string;
        originalColors: [string, string];
        simulatedColors: [string, string];
        originalRatio: number;
        simulatedRatio: number;
        severity: 'ok' | 'warning' | 'critical';
    }[];
    overallScore: number;
}

export interface ThemeValidationReport {
    score: number;
    brandConsistencyScore: number;
    performanceScore: number;
    colorBlindnessScore: number;
    harmonyName?: string;
    results: ValidationResult[];
    colorBlindnessResults: ColorBlindnessResult[];
    passedCount: number;
    warningCount: number;
    errorCount: number;
    largeTextPassedCount: number;
    largeTextWarningCount: number;
    largeTextErrorCount: number;
}

// Color blindness simulation matrices
const COLOR_BLINDNESS_MATRICES = {
    deuteranopia: [
        [0.625, 0.375, 0],
        [0.7, 0.3, 0],
        [0, 0.3, 0.7]
    ],
    protanopia: [
        [0.567, 0.433, 0],
        [0.558, 0.442, 0],
        [0, 0.242, 0.758]
    ],
    tritanopia: [
        [0.95, 0.05, 0],
        [0, 0.433, 0.567],
        [0, 0.475, 0.525]
    ]
};

export class ThemeValidator {
    static validateTheme(theme: ThemeConfig, isDark: boolean): ThemeValidationReport {
        const colors = isDark ? theme.colors.dark : theme.colors.light;
        const results: ValidationResult[] = [];

        // Enhanced pairs with categories
        const pairs = [
            // Core Colors
            { name: 'Primary / OnPrimary', bg: colors.primary, fg: colors.onPrimary, bgKey: 'primary', fgKey: 'onPrimary', category: 'core' as const },
            { name: 'Secondary / OnSecondary', bg: colors.secondary, fg: colors.onSecondary, bgKey: 'secondary', fgKey: 'onSecondary', category: 'core' as const },
            { name: 'Tertiary / OnTertiary', bg: colors.tertiary, fg: colors.onTertiary, bgKey: 'tertiary', fgKey: 'onTertiary', category: 'core' as const },
            { name: 'Error / OnError', bg: colors.error, fg: colors.onError, bgKey: 'error', fgKey: 'onError', category: 'core' as const },
            
            // Container Colors
            { name: 'Primary Container / OnPrimaryContainer', bg: colors.primaryContainer, fg: colors.onPrimaryContainer, bgKey: 'primaryContainer', fgKey: 'onPrimaryContainer', category: 'container' as const },
            { name: 'Secondary Container / OnSecondaryContainer', bg: colors.secondaryContainer, fg: colors.onSecondaryContainer, bgKey: 'secondaryContainer', fgKey: 'onSecondaryContainer', category: 'container' as const },
            { name: 'Tertiary Container / OnTertiaryContainer', bg: colors.tertiaryContainer, fg: colors.onTertiaryContainer, bgKey: 'tertiaryContainer', fgKey: 'onTertiaryContainer', category: 'container' as const },
            { name: 'Error Container / OnErrorContainer', bg: colors.errorContainer, fg: colors.onErrorContainer, bgKey: 'errorContainer', fgKey: 'onErrorContainer', category: 'container' as const },
            
            // Surface Colors
            { name: 'Surface / OnSurface', bg: colors.surface, fg: colors.onSurface, bgKey: 'surface', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Dim / OnSurface', bg: colors.surfaceDim, fg: colors.onSurface, bgKey: 'surfaceDim', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Bright / OnSurface', bg: colors.surfaceBright, fg: colors.onSurface, bgKey: 'surfaceBright', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Container Lowest / OnSurface', bg: colors.surfaceContainerLowest, fg: colors.onSurface, bgKey: 'surfaceContainerLowest', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Container Low / OnSurface', bg: colors.surfaceContainerLow, fg: colors.onSurface, bgKey: 'surfaceContainerLow', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Container / OnSurface', bg: colors.surfaceContainer, fg: colors.onSurface, bgKey: 'surfaceContainer', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Container High / OnSurface', bg: colors.surfaceContainerHigh, fg: colors.onSurface, bgKey: 'surfaceContainerHigh', fgKey: 'onSurface', category: 'surface' as const },
            { name: 'Surface Container Highest / OnSurfaceVariant', bg: colors.surfaceContainerHighest, fg: colors.onSurfaceVariant, bgKey: 'surfaceContainerHighest', fgKey: 'onSurfaceVariant', category: 'surface' as const },
            { name: 'Background / OnBackground', bg: colors.background, fg: colors.onBackground, bgKey: 'background', fgKey: 'onBackground', category: 'surface' as const },
            
            // Inverse Colors
            { name: 'Inverse Surface / Inverse OnSurface', bg: colors.inverseSurface, fg: colors.inverseOnSurface, bgKey: 'inverseSurface', fgKey: 'inverseOnSurface', category: 'inverse' as const },
            { name: 'Inverse Surface / Inverse Primary', bg: colors.inverseSurface, fg: colors.inversePrimary, bgKey: 'inverseSurface', fgKey: 'inversePrimary', category: 'inverse' as const },
            
            // Fixed Colors (if they exist)
            ...(colors.primaryFixed ? [
                { name: 'Primary Fixed / OnPrimaryFixed', bg: colors.primaryFixed, fg: colors.onPrimaryFixed, bgKey: 'primaryFixed', fgKey: 'onPrimaryFixed', category: 'fixed' as const },
                { name: 'Primary Fixed Dim / OnPrimaryFixedVariant', bg: colors.primaryFixedDim, fg: colors.onPrimaryFixedVariant, bgKey: 'primaryFixedDim', fgKey: 'onPrimaryFixedVariant', category: 'fixed' as const },
            ] : []),
            ...(colors.secondaryFixed ? [
                { name: 'Secondary Fixed / OnSecondaryFixed', bg: colors.secondaryFixed, fg: colors.onSecondaryFixed, bgKey: 'secondaryFixed', fgKey: 'onSecondaryFixed', category: 'fixed' as const },
                { name: 'Secondary Fixed Dim / OnSecondaryFixedVariant', bg: colors.secondaryFixedDim, fg: colors.onSecondaryFixedVariant, bgKey: 'secondaryFixedDim', fgKey: 'onSecondaryFixedVariant', category: 'fixed' as const },
            ] : []),
            ...(colors.tertiaryFixed ? [
                { name: 'Tertiary Fixed / OnTertiaryFixed', bg: colors.tertiaryFixed, fg: colors.onTertiaryFixed, bgKey: 'tertiaryFixed', fgKey: 'onTertiaryFixed', category: 'fixed' as const },
                { name: 'Tertiary Fixed Dim / OnTertiaryFixedVariant', bg: colors.tertiaryFixedDim, fg: colors.onTertiaryFixedVariant, bgKey: 'tertiaryFixedDim', fgKey: 'onTertiaryFixedVariant', category: 'fixed' as const },
            ] : []),
        ];

        let passedCount = 0;
        let warningCount = 0;
        let errorCount = 0;
        let largeTextPassedCount = 0;
        let largeTextWarningCount = 0;
        let largeTextErrorCount = 0;

        pairs.forEach(pair => {
            // Skip if colors don't exist
            if (!pair.bg || !pair.fg) return;

            const ratio = FlutterThemeGenerator.getContrastRatio(pair.bg, pair.fg);
            
            // Normal text: AA = 4.5:1, AAA = 7:1
            let level: 'AA' | 'AAA' | 'FAIL';
            if (ratio >= 7) {
                level = 'AAA';
                passedCount++;
            } else if (ratio >= 4.5) {
                level = 'AA';
                warningCount++;
            } else {
                level = 'FAIL';
                errorCount++;
            }

            // Large text: AA = 3:1, AAA = 4.5:1
            let largeTextLevel: 'AA' | 'AAA' | 'FAIL';
            if (ratio >= 4.5) {
                largeTextLevel = 'AAA';
                largeTextPassedCount++;
            } else if (ratio >= 3) {
                largeTextLevel = 'AA';
                largeTextWarningCount++;
            } else {
                largeTextLevel = 'FAIL';
                largeTextErrorCount++;
            }

            let message = 'Passes WCAG AAA standards for both normal and large text.';
            if (level === 'AA') {
                message = 'Passes WCAG AA standards. Consider improving for AAA (7:1 ratio).';
            } else if (level === 'FAIL') {
                message = `Fails WCAG standards. Ratio is ${ratio.toFixed(2)}:1, minimum required is 4.5:1 for normal text.`;
            }

            results.push({
                pair: pair.name,
                color1: pair.bg,
                color2: pair.fg,
                bgKey: pair.bgKey,
                fgKey: pair.fgKey,
                ratio,
                level,
                largeTextLevel,
                isAccessible: ratio >= 4.5,
                message,
                category: pair.category
            });
        });

        // Calculate scores
        const total = results.length;
        // Refined scoring: AAA = 100%, AA = 75%, FAIL = 0%
        const score = total > 0 ? Math.round(((passedCount * 1 + warningCount * 0.75) / total) * 100) : 0;

        const { score: brandConsistencyScore, harmony } = ThemeValidator.calculateBrandConsistency(colors);
        const performanceScore = ThemeValidator.calculateSystemEfficiency(colors);
        
        // Color blindness simulation
        const colorBlindnessResults = ThemeValidator.simulateColorBlindness(colors, results);
        const colorBlindnessScore = colorBlindnessResults.length > 0 
            ? Math.round(colorBlindnessResults.reduce((sum, r) => sum + r.overallScore, 0) / colorBlindnessResults.length)
            : 100;

        return {
            score,
            brandConsistencyScore,
            performanceScore,
            colorBlindnessScore,
            harmonyName: harmony,
            results,
            colorBlindnessResults,
            passedCount,
            warningCount,
            errorCount,
            largeTextPassedCount,
            largeTextWarningCount,
            largeTextErrorCount
        };
    }

    static simulateColorBlindness(colors: ThemeColors, _contrastResults: ValidationResult[]): ColorBlindnessResult[] {
        const types: Array<{ type: 'deuteranopia' | 'protanopia' | 'tritanopia', displayName: string, description: string }> = [
            { type: 'deuteranopia', displayName: 'Deuteranopia', description: 'Red-green color blindness (most common, ~6% of males)' },
            { type: 'protanopia', displayName: 'Protanopia', description: 'Red-green color blindness (~1% of males)' },
            { type: 'tritanopia', displayName: 'Tritanopia', description: 'Blue-yellow color blindness (rare, <0.01%)' }
        ];

        return types.map(({ type, displayName, description }) => {
            const affectedPairs: ColorBlindnessResult['affectedPairs'] = [];
            let totalScore = 0;
            let pairCount = 0;

            // Check key color pairs for distinguishability under color blindness
            const keyPairs = [
                { pair: 'Primary vs Secondary', c1: colors.primary, c2: colors.secondary },
                { pair: 'Primary vs Error', c1: colors.primary, c2: colors.error },
                { pair: 'Secondary vs Tertiary', c1: colors.secondary, c2: colors.tertiary },
                { pair: 'Success vs Error', c1: colors.tertiary, c2: colors.error }, // Tertiary often used for success
                { pair: 'Primary vs Tertiary', c1: colors.primary, c2: colors.tertiary },
            ];

            keyPairs.forEach(({ pair, c1, c2 }) => {
                if (!c1 || !c2) return;

                const simC1 = ThemeValidator.simulateColorBlindnessForColor(c1, type);
                const simC2 = ThemeValidator.simulateColorBlindnessForColor(c2, type);

                const originalDiff = ThemeValidator.getColorDifference(c1, c2);
                const simulatedDiff = ThemeValidator.getColorDifference(simC1, simC2);

                // Calculate how much the difference decreased (lower = worse)
                const diffRatio = originalDiff > 0 ? simulatedDiff / originalDiff : 1;
                
                let severity: 'ok' | 'warning' | 'critical';
                let pairScore: number;
                
                if (diffRatio >= 0.7) {
                    severity = 'ok';
                    pairScore = 100;
                } else if (diffRatio >= 0.4) {
                    severity = 'warning';
                    pairScore = 60;
                } else {
                    severity = 'critical';
                    pairScore = 20;
                }

                totalScore += pairScore;
                pairCount++;

                affectedPairs.push({
                    pair,
                    originalColors: [c1, c2],
                    simulatedColors: [simC1, simC2],
                    originalRatio: originalDiff,
                    simulatedRatio: simulatedDiff,
                    severity
                });
            });

            return {
                type,
                displayName,
                description,
                affectedPairs,
                overallScore: pairCount > 0 ? Math.round(totalScore / pairCount) : 100
            };
        });
    }

    static simulateColorBlindnessForColor(hex: string, type: 'deuteranopia' | 'protanopia' | 'tritanopia'): string {
        const rgb = ThemeValidator.hexToRgb(hex);
        const matrix = COLOR_BLINDNESS_MATRICES[type];

        const r = Math.round(rgb.r * matrix[0][0] + rgb.g * matrix[0][1] + rgb.b * matrix[0][2]);
        const g = Math.round(rgb.r * matrix[1][0] + rgb.g * matrix[1][1] + rgb.b * matrix[1][2]);
        const b = Math.round(rgb.r * matrix[2][0] + rgb.g * matrix[2][1] + rgb.b * matrix[2][2]);

        return ThemeValidator.rgbToHex(
            Math.min(255, Math.max(0, r)),
            Math.min(255, Math.max(0, g)),
            Math.min(255, Math.max(0, b))
        );
    }

    static getColorDifference(hex1: string, hex2: string): number {
        const rgb1 = ThemeValidator.hexToRgb(hex1);
        const rgb2 = ThemeValidator.hexToRgb(hex2);

        // Calculate Euclidean distance in RGB space
        return Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2)
        );
    }

    static hexToRgb(hex: string): { r: number; g: number; b: number } {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    static rgbToHex(r: number, g: number, b: number): string {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    static calculateBrandConsistency(colors: ThemeColors): { score: number, harmony: string } {
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

        if (d1 < 15 && d2 < 15 && d3 < 15) {
            harmony = 'Monochromatic';
            harmonyScore = 95;
        } else if (d1 < 60 && d2 < 60 && d3 < 90) {
            harmony = 'Analogous';
            harmonyScore = 98;
        } else if (Math.abs(d1 - 120) < 20 && Math.abs(d2 - 120) < 20) {
            harmony = 'Triadic';
            harmonyScore = 95;
        } else if ((Math.abs(d1 - 150) < 30 || Math.abs(d2 - 150) < 30)) {
            harmony = 'Split Complementary';
            harmonyScore = 92;
        } else if (Math.abs(d1 - 180) < 20 || Math.abs(d2 - 180) < 20 || Math.abs(d3 - 180) < 20) {
            harmony = 'Complementary';
            harmonyScore = 90;
        }

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

    static calculateSystemEfficiency(colors: ThemeColors): number {
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

        const colorValues = Object.values(colors).filter((v): v is string => typeof v === 'string');
        const uniqueColors = new Set(colorValues).size;
        const totalSlots = colorValues.length;
        const uniquenessRatio = totalSlots > 0 ? uniqueColors / totalSlots : 1;

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
            if (!bg || !fg) return fg;
            let fixed = ThemeValidator.fixColor(fg, bg, targetRatio);
            if (FlutterThemeGenerator.getContrastRatio(bg, fixed) < targetRatio && targetRatio > 4.5) {
                fixed = ThemeValidator.fixColor(fg, bg, 4.5);
            }
            if (FlutterThemeGenerator.getContrastRatio(bg, fixed) < 4.5) {
                return FlutterThemeGenerator.getOptimalTextColor(bg, isDark);
            }
            return fixed;
        };

        // Core colors
        colors.onPrimary = fixPair(colors.primary, colors.onPrimary);
        colors.onSecondary = fixPair(colors.secondary, colors.onSecondary);
        colors.onTertiary = fixPair(colors.tertiary, colors.onTertiary);
        colors.onError = fixPair(colors.error, colors.onError);

        // Container colors
        colors.onPrimaryContainer = fixPair(colors.primaryContainer, colors.onPrimaryContainer);
        colors.onSecondaryContainer = fixPair(colors.secondaryContainer, colors.onSecondaryContainer);
        colors.onTertiaryContainer = fixPair(colors.tertiaryContainer, colors.onTertiaryContainer);
        colors.onErrorContainer = fixPair(colors.errorContainer, colors.onErrorContainer);

        // Surface colors
        colors.onSurface = fixPair(colors.surface, colors.onSurface);
        colors.onSurfaceVariant = fixPair(colors.surfaceContainerHighest, colors.onSurfaceVariant);
        colors.onBackground = fixPair(colors.background, colors.onBackground);

        // Inverse colors
        if (colors.inverseSurface && colors.inverseOnSurface) {
            colors.inverseOnSurface = fixPair(colors.inverseSurface, colors.inverseOnSurface);
        }

        // Fixed colors (if they exist)
        if (colors.primaryFixed && colors.onPrimaryFixed) {
            colors.onPrimaryFixed = fixPair(colors.primaryFixed, colors.onPrimaryFixed);
        }
        if (colors.primaryFixedDim && colors.onPrimaryFixedVariant) {
            colors.onPrimaryFixedVariant = fixPair(colors.primaryFixedDim, colors.onPrimaryFixedVariant);
        }
        if (colors.secondaryFixed && colors.onSecondaryFixed) {
            colors.onSecondaryFixed = fixPair(colors.secondaryFixed, colors.onSecondaryFixed);
        }
        if (colors.secondaryFixedDim && colors.onSecondaryFixedVariant) {
            colors.onSecondaryFixedVariant = fixPair(colors.secondaryFixedDim, colors.onSecondaryFixedVariant);
        }
        if (colors.tertiaryFixed && colors.onTertiaryFixed) {
            colors.onTertiaryFixed = fixPair(colors.tertiaryFixed, colors.onTertiaryFixed);
        }
        if (colors.tertiaryFixedDim && colors.onTertiaryFixedVariant) {
            colors.onTertiaryFixedVariant = fixPair(colors.tertiaryFixedDim, colors.onTertiaryFixedVariant);
        }

        return newTheme;
    }
}

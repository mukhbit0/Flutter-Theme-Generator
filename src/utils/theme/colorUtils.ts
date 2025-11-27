// ==========================================
// Color Utility Functions
// ==========================================

/**
 * Adjust a color by a specified amount (positive = lighter, negative = darker)
 */
export function adjustColor(hex: string, amount: number): string {
    const color = hex.replace('#', '');
    const num = parseInt(color, 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
    return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Get contrast color (black or white) based on background
 */
export function getContrastColor(hex: string): string {
    const color = hex.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
}

/**
 * Calculate relative luminance of a color
 */
export function getLuminance(hex: string): number {
    const color = hex.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;

    const [rs, gs, bs] = [r, g, b].map((c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Accessibility level type
 */
export type AccessibilityLevel = 'AA' | 'AAA' | 'FAIL';

/**
 * Color contrast validation result
 */
export interface ContrastValidation {
    ratio: number;
    isAccessible: boolean;
    level: AccessibilityLevel;
}

/**
 * Validate color contrast for accessibility compliance
 */
export function validateColorContrast(backgroundColor: string, textColor: string): ContrastValidation {
    const ratio = getContrastRatio(backgroundColor, textColor);
    return {
        ratio,
        isAccessible: ratio >= 4.5,
        level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'FAIL',
    };
}

/**
 * Get optimal text color (black or white) based on background
 */
export function getOptimalTextColor(backgroundColor: string, _preferDark: boolean = false): string {
    const whiteContrast = getContrastRatio(backgroundColor, '#FFFFFF');
    const blackContrast = getContrastRatio(backgroundColor, '#000000');
    return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
}

/**
 * Adjust color with contrast validation
 */
export function adjustColorWithContrast(
    baseColor: string,
    targetBackground: string,
    isDark: boolean = false
): string {
    let adjustedColor = baseColor;
    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
        const contrast = validateColorContrast(targetBackground, adjustedColor);

        if (contrast.isAccessible) {
            return adjustedColor;
        }

        const bgLuminance = getLuminance(targetBackground);
        const adjustment = bgLuminance < 0.5 ? 5 : -5;

        adjustedColor = adjustColorHsl(adjustedColor, adjustment);
        attempts++;
    }

    return getOptimalTextColor(targetBackground, isDark);
}

// ==========================================
// HSL Color Utilities
// ==========================================

export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

/**
 * Convert hex color to HSL
 */
export function hexToHsl(hex: string): HSLColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;
    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
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

/**
 * Adjust color lightness using HSL
 */
export function adjustColorHsl(hex: string, lightnessAmount: number): string {
    const { h, s, l } = hexToHsl(hex);
    const newL = Math.max(0, Math.min(100, l + lightnessAmount));
    return hslToHex(h, s, newL);
}

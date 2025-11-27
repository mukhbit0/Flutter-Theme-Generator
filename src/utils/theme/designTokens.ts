// ==========================================
// Design Tokens Configuration
// Spacing, Border Radius, Elevation
// ==========================================

// ==========================================
// Spacing
// ==========================================

export interface SpacingConfig {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}

/**
 * Generate spacing configuration
 */
export function generateSpacingConfig(): SpacingConfig {
    return {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    };
}

/**
 * Get spacing value by key
 */
export function getSpacing(config: SpacingConfig, key: keyof SpacingConfig): number {
    return config[key];
}

// ==========================================
// Border Radius
// ==========================================

export interface BorderRadiusConfig {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
}

/**
 * Generate border radius configuration
 */
export function generateBorderRadiusConfig(): BorderRadiusConfig {
    return {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
    };
}

/**
 * Get border radius value by key
 */
export function getBorderRadius(config: BorderRadiusConfig, key: keyof BorderRadiusConfig): number {
    return config[key];
}

// ==========================================
// Elevation
// ==========================================

export interface ElevationConfig {
    level0: number;
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
}

/**
 * Generate elevation configuration (Material 3 elevation levels)
 */
export function generateElevationConfig(): ElevationConfig {
    return {
        level0: 0,
        level1: 1,
        level2: 3,
        level3: 6,
        level4: 8,
        level5: 12,
    };
}

/**
 * Get elevation value by level
 */
export function getElevation(config: ElevationConfig, level: keyof ElevationConfig): number {
    return config[level];
}

/**
 * Generate CSS box-shadow for elevation level
 */
export function elevationToBoxShadow(elevation: number, shadowColor: string = 'rgba(0,0,0,0.2)'): string {
    if (elevation === 0) return 'none';
    
    const y = Math.round(elevation * 0.5);
    const blur = Math.round(elevation * 2);
    const spread = 0;
    
    return `0px ${y}px ${blur}px ${spread}px ${shadowColor}`;
}

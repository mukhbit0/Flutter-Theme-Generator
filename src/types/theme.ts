export interface ThemeColors {
  // Core Colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error Colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Surface Colors
  surface: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  // Background Colors (deprecated but kept for compatibility)
  background: string;
  onBackground: string;

  // Outline Colors
  outline: string;
  outlineVariant: string;

  // Utility Colors
  shadow: string;
  scrim: string;

  // Inverse Colors
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;

  // Fixed Colors
  primaryFixed: string;
  onPrimaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixedVariant: string;
  secondaryFixed: string;
  onSecondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixedVariant: string;
  tertiaryFixed: string;
  onTertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixedVariant: string;

  // Surface Tint
  surfaceTint: string;

  // Additional Colors (custom)
  success?: string;
  warning?: string;
  info?: string;
}

export interface ThemeConfig {
  colors: {
    light: ThemeColors;
    lightMediumContrast?: ThemeColors;
    lightHighContrast?: ThemeColors;
    dark: ThemeColors;
    darkMediumContrast?: ThemeColors;
    darkHighContrast?: ThemeColors;
  };
  typography: {
    displayLarge: TypographyStyle;
    displayMedium: TypographyStyle;
    displaySmall: TypographyStyle;
    headlineLarge: TypographyStyle;
    headlineMedium: TypographyStyle;
    headlineSmall: TypographyStyle;
    titleLarge: TypographyStyle;
    titleMedium: TypographyStyle;
    titleSmall: TypographyStyle;
    bodyLarge: TypographyStyle;
    bodyMedium: TypographyStyle;
    bodySmall: TypographyStyle;
    labelLarge: TypographyStyle;
    labelMedium: TypographyStyle;
    labelSmall: TypographyStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  elevation: {
    level0: number;
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  };
  settings?: {
    useScreenUtil?: boolean;
  };
}

export interface TypographyStyle {
  fontSize: number;
  fontWeight: string;
  letterSpacing: number;
  lineHeight: number;
}

export interface CustomColor {
  name: string;
  value: string;
}

export interface ThemeGeneratorSettings {
  themeName: string;
  packageName: string;
  customColors: CustomColor[];
  generateMaterialYou: boolean;
  includeExtensions: boolean;
  includeAnimations: boolean;
  useScreenUtil: boolean;
  logoFile?: File;
  baseColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  themeVariants: {
    lightMode: boolean;
    lightMedium: boolean;
    lightHigh: boolean;
    darkMode: boolean;
    darkMedium: boolean;
    darkHigh: boolean;
  };
}

export interface GeneratedTheme {
  themeFile: string;
  extensionsFile?: string;
  constantsFile?: string;
  animationsFile?: string;
}

export type PreviewMode = 'light' | 'lightMediumContrast' | 'lightHighContrast' | 'dark' | 'darkMediumContrast' | 'darkHighContrast';

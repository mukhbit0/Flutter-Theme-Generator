export interface ThemeColors {
  // Primary Colors
  primary: string;
  primaryVariant: string;
  secondary: string;
  secondaryVariant: string;
  
  // Surface Colors
  surface: string;
  background: string;
  error: string;
  
  // Text Colors
  onPrimary: string;
  onSecondary: string;
  onSurface: string;
  onBackground: string;
  onError: string;
  
  // Additional Colors
  success: string;
  warning: string;
  info: string;
  
  // Neutral Colors
  outline: string;
  shadow: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
}

export interface ThemeConfig {
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
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
  includeDarkMode: boolean;
  includeExtensions: boolean;
  includeAnimations: boolean;
  useScreenUtil: boolean;
  logoFile?: File;
  baseColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface GeneratedTheme {
  themeFile: string;
  extensionsFile?: string;
  constantsFile?: string;
  animationsFile?: string;
}

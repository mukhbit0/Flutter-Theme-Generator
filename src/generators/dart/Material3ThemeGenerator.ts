import { ThemeConfig } from '../../types/theme'

/**
 * Generates a comprehensive Material Design 3 theme file with complete ColorScheme
 * This follows the exact structure of Material 3 themes with all color variants
 */
export function generateMaterial3ThemeFile(config: ThemeConfig): string {
  const lightColors = config.colors.light
  const darkColors = config.colors.dark
  
  return `import "package:flutter/material.dart";

class MaterialTheme {
  final TextTheme textTheme;

  const MaterialTheme(this.textTheme);

  static ColorScheme lightScheme() {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(${hexToColorCode(lightColors.primary)}),
      surfaceTint: Color(${hexToColorCode(lightColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryContainer: Color(${hexToColorCode(lightColors.primaryContainer)}),
      onPrimaryContainer: Color(${hexToColorCode(lightColors.onPrimaryContainer)}),
      secondary: Color(${hexToColorCode(lightColors.secondary)}),
      onSecondary: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryContainer: Color(${hexToColorCode(lightColors.secondaryContainer)}),
      onSecondaryContainer: Color(${hexToColorCode(lightColors.onSecondaryContainer)}),
      tertiary: Color(${hexToColorCode(lightColors.tertiary)}),
      onTertiary: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryContainer: Color(${hexToColorCode(lightColors.tertiaryContainer)}),
      onTertiaryContainer: Color(${hexToColorCode(lightColors.onTertiaryContainer)}),
      error: Color(${hexToColorCode(lightColors.error)}),
      onError: Color(${hexToColorCode(lightColors.onError)}),
      errorContainer: Color(${hexToColorCode(lightColors.errorContainer)}),
      onErrorContainer: Color(${hexToColorCode(lightColors.onErrorContainer)}),
      surface: Color(${hexToColorCode(lightColors.surface)}),
      onSurface: Color(${hexToColorCode(lightColors.onSurface)}),
      onSurfaceVariant: Color(${hexToColorCode(lightColors.onSurfaceVariant)}),
      outline: Color(${hexToColorCode(lightColors.outline)}),
      outlineVariant: Color(${hexToColorCode(lightColors.outlineVariant)}),
      shadow: Color(${hexToColorCode(lightColors.shadow)}),
      scrim: Color(${hexToColorCode(lightColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(lightColors.inverseSurface)}),
      inversePrimary: Color(${hexToColorCode(lightColors.inversePrimary)}),
      primaryFixed: Color(${hexToColorCode(lightColors.primaryFixed)}),
      onPrimaryFixed: Color(${hexToColorCode(lightColors.onPrimaryFixed)}),
      primaryFixedDim: Color(${hexToColorCode(lightColors.primaryFixedDim)}),
      onPrimaryFixedVariant: Color(${hexToColorCode(lightColors.onPrimaryFixedVariant)}),
      secondaryFixed: Color(${hexToColorCode(lightColors.secondaryFixed)}),
      onSecondaryFixed: Color(${hexToColorCode(lightColors.onSecondaryFixed)}),
      secondaryFixedDim: Color(${hexToColorCode(lightColors.secondaryFixedDim)}),
      onSecondaryFixedVariant: Color(${hexToColorCode(lightColors.onSecondaryFixedVariant)}),
      tertiaryFixed: Color(${hexToColorCode(lightColors.tertiaryFixed)}),
      onTertiaryFixed: Color(${hexToColorCode(lightColors.onTertiaryFixed)}),
      tertiaryFixedDim: Color(${hexToColorCode(lightColors.tertiaryFixedDim)}),
      onTertiaryFixedVariant: Color(${hexToColorCode(lightColors.onTertiaryFixedVariant)}),
      surfaceDim: Color(${hexToColorCode(lightColors.surfaceDim)}),
      surfaceBright: Color(${hexToColorCode(lightColors.surfaceBright)}),
      surfaceContainerLowest: Color(${hexToColorCode(lightColors.surfaceContainerLowest)}),
      surfaceContainerLow: Color(${hexToColorCode(lightColors.surfaceContainerLow)}),
      surfaceContainer: Color(${hexToColorCode(lightColors.surfaceContainer)}),
      surfaceContainerHigh: Color(${hexToColorCode(lightColors.surfaceContainerHigh)}),
      surfaceContainerHighest: Color(${hexToColorCode(lightColors.surfaceContainerHighest)}),
    );
  }

  ThemeData light() {
    return theme(lightScheme());
  }

  static ColorScheme lightMediumContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(${hexToColorCode(adjustBrightness(lightColors.primary, -15))}),
      surfaceTint: Color(${hexToColorCode(lightColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryContainer: Color(${hexToColorCode(adjustBrightness(lightColors.primaryContainer, -10))}),
      onPrimaryContainer: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondary: Color(${hexToColorCode(adjustBrightness(lightColors.secondary, -15))}),
      onSecondary: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryContainer: Color(${hexToColorCode(adjustBrightness(lightColors.secondaryContainer, -10))}),
      onSecondaryContainer: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiary: Color(${hexToColorCode(adjustBrightness(lightColors.tertiary, -15))}),
      onTertiary: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryContainer: Color(${hexToColorCode(adjustBrightness(lightColors.tertiaryContainer, -10))}),
      onTertiaryContainer: Color(${hexToColorCode(lightColors.onTertiary)}),
      error: Color(${hexToColorCode(adjustBrightness(lightColors.error, -15))}),
      onError: Color(${hexToColorCode(lightColors.onError)}),
      errorContainer: Color(${hexToColorCode(adjustBrightness(lightColors.errorContainer, -10))}),
      onErrorContainer: Color(${hexToColorCode(lightColors.onError)}),
      surface: Color(${hexToColorCode(lightColors.surface)}),
      onSurface: Color(${hexToColorCode(adjustBrightness(lightColors.onSurface, -10))}),
      onSurfaceVariant: Color(${hexToColorCode(adjustBrightness(lightColors.onSurfaceVariant, -15))}),
      outline: Color(${hexToColorCode(adjustBrightness(lightColors.outline, -10))}),
      outlineVariant: Color(${hexToColorCode(adjustBrightness(lightColors.outlineVariant, -5))}),
      shadow: Color(${hexToColorCode(lightColors.shadow)}),
      scrim: Color(${hexToColorCode(lightColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(lightColors.inverseSurface)}),
      inversePrimary: Color(${hexToColorCode(lightColors.inversePrimary)}),
      primaryFixed: Color(${hexToColorCode(adjustBrightness(lightColors.primaryContainer, -10))}),
      onPrimaryFixed: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryFixedDim: Color(${hexToColorCode(adjustBrightness(lightColors.primary, -5))}),
      onPrimaryFixedVariant: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondaryFixed: Color(${hexToColorCode(adjustBrightness(lightColors.secondaryContainer, -10))}),
      onSecondaryFixed: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryFixedDim: Color(${hexToColorCode(adjustBrightness(lightColors.secondary, -5))}),
      onSecondaryFixedVariant: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiaryFixed: Color(${hexToColorCode(adjustBrightness(lightColors.tertiaryContainer, -10))}),
      onTertiaryFixed: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryFixedDim: Color(${hexToColorCode(adjustBrightness(lightColors.tertiary, -5))}),
      onTertiaryFixedVariant: Color(${hexToColorCode(lightColors.onTertiary)}),
      surfaceDim: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceDim, -5))}),
      surfaceBright: Color(${hexToColorCode(lightColors.surfaceBright)}),
      surfaceContainerLowest: Color(${hexToColorCode(lightColors.surfaceContainerLowest)}),
      surfaceContainerLow: Color(${hexToColorCode(lightColors.surfaceContainerLow)}),
      surfaceContainer: Color(${hexToColorCode(lightColors.surfaceContainer)}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceContainerHigh, -5))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceContainerHighest, -5))}),
    );
  }

  ThemeData lightMediumContrast() {
    return theme(lightMediumContrastScheme());
  }

  static ColorScheme lightHighContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.light,
      primary: Color(${hexToColorCode(adjustBrightness(lightColors.primary, -30))}),
      surfaceTint: Color(${hexToColorCode(lightColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryContainer: Color(${hexToColorCode(adjustBrightness(lightColors.primary, -10))}),
      onPrimaryContainer: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondary: Color(${hexToColorCode(adjustBrightness(lightColors.secondary, -30))}),
      onSecondary: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryContainer: Color(${hexToColorCode(adjustBrightness(lightColors.secondary, -10))}),
      onSecondaryContainer: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiary: Color(${hexToColorCode(adjustBrightness(lightColors.tertiary, -30))}),
      onTertiary: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryContainer: Color(${hexToColorCode(adjustBrightness(lightColors.tertiary, -10))}),
      onTertiaryContainer: Color(${hexToColorCode(lightColors.onTertiary)}),
      error: Color(${hexToColorCode(adjustBrightness(lightColors.error, -30))}),
      onError: Color(${hexToColorCode(lightColors.onError)}),
      errorContainer: Color(${hexToColorCode(adjustBrightness(lightColors.error, -10))}),
      onErrorContainer: Color(${hexToColorCode(lightColors.onError)}),
      surface: Color(${hexToColorCode(lightColors.surface)}),
      onSurface: Color(0xff000000),
      onSurfaceVariant: Color(0xff000000),
      outline: Color(${hexToColorCode(adjustBrightness(lightColors.onSurface, -40))}),
      outlineVariant: Color(${hexToColorCode(adjustBrightness(lightColors.onSurface, -20))}),
      shadow: Color(${hexToColorCode(lightColors.shadow)}),
      scrim: Color(${hexToColorCode(lightColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(lightColors.inverseSurface)}),
      inversePrimary: Color(${hexToColorCode(lightColors.inversePrimary)}),
      primaryFixed: Color(${hexToColorCode(adjustBrightness(lightColors.primary, -10))}),
      onPrimaryFixed: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryFixedDim: Color(${hexToColorCode(adjustBrightness(lightColors.primary, -20))}),
      onPrimaryFixedVariant: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondaryFixed: Color(${hexToColorCode(adjustBrightness(lightColors.secondary, -10))}),
      onSecondaryFixed: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryFixedDim: Color(${hexToColorCode(adjustBrightness(lightColors.secondary, -20))}),
      onSecondaryFixedVariant: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiaryFixed: Color(${hexToColorCode(adjustBrightness(lightColors.tertiary, -10))}),
      onTertiaryFixed: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryFixedDim: Color(${hexToColorCode(adjustBrightness(lightColors.tertiary, -20))}),
      onTertiaryFixedVariant: Color(${hexToColorCode(lightColors.onTertiary)}),
      surfaceDim: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceDim, -15))}),
      surfaceBright: Color(${hexToColorCode(lightColors.surfaceBright)}),
      surfaceContainerLowest: Color(${hexToColorCode(lightColors.surfaceContainerLowest)}),
      surfaceContainerLow: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceContainerLow, -5))}),
      surfaceContainer: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceContainer, -5))}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceContainerHigh, -10))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustBrightness(lightColors.surfaceContainerHighest, -15))}),
    );
  }

  ThemeData lightHighContrast() {
    return theme(lightHighContrastScheme());
  }

  static ColorScheme darkScheme() {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: Color(${hexToColorCode(darkColors.primary)}),
      surfaceTint: Color(${hexToColorCode(darkColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(darkColors.onPrimary)}),
      primaryContainer: Color(${hexToColorCode(darkColors.primaryContainer)}),
      onPrimaryContainer: Color(${hexToColorCode(darkColors.onPrimaryContainer)}),
      secondary: Color(${hexToColorCode(darkColors.secondary)}),
      onSecondary: Color(${hexToColorCode(darkColors.onSecondary)}),
      secondaryContainer: Color(${hexToColorCode(darkColors.secondaryContainer)}),
      onSecondaryContainer: Color(${hexToColorCode(darkColors.onSecondaryContainer)}),
      tertiary: Color(${hexToColorCode(darkColors.tertiary)}),
      onTertiary: Color(${hexToColorCode(darkColors.onTertiary)}),
      tertiaryContainer: Color(${hexToColorCode(darkColors.tertiaryContainer)}),
      onTertiaryContainer: Color(${hexToColorCode(darkColors.onTertiaryContainer)}),
      error: Color(${hexToColorCode(darkColors.error)}),
      onError: Color(${hexToColorCode(darkColors.onError)}),
      errorContainer: Color(${hexToColorCode(darkColors.errorContainer)}),
      onErrorContainer: Color(${hexToColorCode(darkColors.onErrorContainer)}),
      surface: Color(${hexToColorCode(darkColors.surface)}),
      onSurface: Color(${hexToColorCode(darkColors.onSurface)}),
      onSurfaceVariant: Color(${hexToColorCode(darkColors.onSurfaceVariant)}),
      outline: Color(${hexToColorCode(darkColors.outline)}),
      outlineVariant: Color(${hexToColorCode(darkColors.outlineVariant)}),
      shadow: Color(${hexToColorCode(darkColors.shadow)}),
      scrim: Color(${hexToColorCode(darkColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(darkColors.inverseSurface)}),
      inversePrimary: Color(${hexToColorCode(darkColors.inversePrimary)}),
      primaryFixed: Color(${hexToColorCode(darkColors.primaryFixed)}),
      onPrimaryFixed: Color(${hexToColorCode(darkColors.onPrimaryFixed)}),
      primaryFixedDim: Color(${hexToColorCode(darkColors.primaryFixedDim)}),
      onPrimaryFixedVariant: Color(${hexToColorCode(darkColors.onPrimaryFixedVariant)}),
      secondaryFixed: Color(${hexToColorCode(darkColors.secondaryFixed)}),
      onSecondaryFixed: Color(${hexToColorCode(darkColors.onSecondaryFixed)}),
      secondaryFixedDim: Color(${hexToColorCode(darkColors.secondaryFixedDim)}),
      onSecondaryFixedVariant: Color(${hexToColorCode(darkColors.onSecondaryFixedVariant)}),
      tertiaryFixed: Color(${hexToColorCode(darkColors.tertiaryFixed)}),
      onTertiaryFixed: Color(${hexToColorCode(darkColors.onTertiaryFixed)}),
      tertiaryFixedDim: Color(${hexToColorCode(darkColors.tertiaryFixedDim)}),
      onTertiaryFixedVariant: Color(${hexToColorCode(darkColors.onTertiaryFixedVariant)}),
      surfaceDim: Color(${hexToColorCode(darkColors.surfaceDim)}),
      surfaceBright: Color(${hexToColorCode(darkColors.surfaceBright)}),
      surfaceContainerLowest: Color(${hexToColorCode(darkColors.surfaceContainerLowest)}),
      surfaceContainerLow: Color(${hexToColorCode(darkColors.surfaceContainerLow)}),
      surfaceContainer: Color(${hexToColorCode(darkColors.surfaceContainer)}),
      surfaceContainerHigh: Color(${hexToColorCode(darkColors.surfaceContainerHigh)}),
      surfaceContainerHighest: Color(${hexToColorCode(darkColors.surfaceContainerHighest)}),
    );
  }

  ThemeData dark() {
    return theme(darkScheme());
  }

  static ColorScheme darkMediumContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: Color(${hexToColorCode(adjustBrightness(darkColors.primary, 10))}),
      surfaceTint: Color(${hexToColorCode(darkColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(adjustBrightness(darkColors.onPrimary, -10))}),
      primaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.primaryContainer, 10))}),
      onPrimaryContainer: Color(0xff000000),
      secondary: Color(${hexToColorCode(adjustBrightness(darkColors.secondary, 10))}),
      onSecondary: Color(${hexToColorCode(adjustBrightness(darkColors.onSecondary, -10))}),
      secondaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.secondaryContainer, 10))}),
      onSecondaryContainer: Color(0xff000000),
      tertiary: Color(${hexToColorCode(adjustBrightness(darkColors.tertiary, 10))}),
      onTertiary: Color(${hexToColorCode(adjustBrightness(darkColors.onTertiary, -10))}),
      tertiaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.tertiaryContainer, 10))}),
      onTertiaryContainer: Color(0xff000000),
      error: Color(${hexToColorCode(adjustBrightness(darkColors.error, 10))}),
      onError: Color(${hexToColorCode(adjustBrightness(darkColors.onError, -10))}),
      errorContainer: Color(${hexToColorCode(adjustBrightness(darkColors.errorContainer, 10))}),
      onErrorContainer: Color(0xff000000),
      surface: Color(${hexToColorCode(darkColors.surface)}),
      onSurface: Color(0xffffffff),
      onSurfaceVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onSurfaceVariant, 10))}),
      outline: Color(${hexToColorCode(adjustBrightness(darkColors.outline, 10))}),
      outlineVariant: Color(${hexToColorCode(adjustBrightness(darkColors.outlineVariant, 5))}),
      shadow: Color(${hexToColorCode(darkColors.shadow)}),
      scrim: Color(${hexToColorCode(darkColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(darkColors.inverseSurface)}),
      inversePrimary: Color(${hexToColorCode(adjustBrightness(darkColors.primary, -10))}),
      primaryFixed: Color(${hexToColorCode(darkColors.primaryFixed)}),
      onPrimaryFixed: Color(${hexToColorCode(adjustBrightness(darkColors.onPrimaryFixed, -20))}),
      primaryFixedDim: Color(${hexToColorCode(darkColors.primaryFixedDim)}),
      onPrimaryFixedVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onPrimaryFixedVariant, -10))}),
      secondaryFixed: Color(${hexToColorCode(darkColors.secondaryFixed)}),
      onSecondaryFixed: Color(${hexToColorCode(adjustBrightness(darkColors.onSecondaryFixed, -20))}),
      secondaryFixedDim: Color(${hexToColorCode(darkColors.secondaryFixedDim)}),
      onSecondaryFixedVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onSecondaryFixedVariant, -10))}),
      tertiaryFixed: Color(${hexToColorCode(darkColors.tertiaryFixed)}),
      onTertiaryFixed: Color(${hexToColorCode(adjustBrightness(darkColors.onTertiaryFixed, -20))}),
      tertiaryFixedDim: Color(${hexToColorCode(darkColors.tertiaryFixedDim)}),
      onTertiaryFixedVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onTertiaryFixedVariant, -10))}),
      surfaceDim: Color(${hexToColorCode(darkColors.surfaceDim)}),
      surfaceBright: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceBright, 10))}),
      surfaceContainerLowest: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerLowest, -5))}),
      surfaceContainerLow: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerLow, 5))}),
      surfaceContainer: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainer, 5))}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerHigh, 5))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerHighest, 5))}),
    );
  }

  ThemeData darkMediumContrast() {
    return theme(darkMediumContrastScheme());
  }

  static ColorScheme darkHighContrastScheme() {
    return const ColorScheme(
      brightness: Brightness.dark,
      primary: Color(${hexToColorCode(adjustBrightness(darkColors.primary, 20))}),
      surfaceTint: Color(${hexToColorCode(darkColors.surfaceTint)}),
      onPrimary: Color(0xff000000),
      primaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.primaryContainer, 20))}),
      onPrimaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.onPrimaryContainer, -30))}),
      secondary: Color(${hexToColorCode(adjustBrightness(darkColors.secondary, 20))}),
      onSecondary: Color(0xff000000),
      secondaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.secondaryContainer, 20))}),
      onSecondaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.onSecondaryContainer, -30))}),
      tertiary: Color(${hexToColorCode(adjustBrightness(darkColors.tertiary, 20))}),
      onTertiary: Color(0xff000000),
      tertiaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.tertiaryContainer, 20))}),
      onTertiaryContainer: Color(${hexToColorCode(adjustBrightness(darkColors.onTertiaryContainer, -30))}),
      error: Color(${hexToColorCode(adjustBrightness(darkColors.error, 20))}),
      onError: Color(0xff000000),
      errorContainer: Color(${hexToColorCode(adjustBrightness(darkColors.errorContainer, 20))}),
      onErrorContainer: Color(${hexToColorCode(adjustBrightness(darkColors.onErrorContainer, -30))}),
      surface: Color(${hexToColorCode(darkColors.surface)}),
      onSurface: Color(0xffffffff),
      onSurfaceVariant: Color(0xffffffff),
      outline: Color(${hexToColorCode(adjustBrightness(darkColors.outline, 30))}),
      outlineVariant: Color(${hexToColorCode(adjustBrightness(darkColors.outlineVariant, 20))}),
      shadow: Color(${hexToColorCode(darkColors.shadow)}),
      scrim: Color(${hexToColorCode(darkColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(darkColors.inverseSurface)}),
      inversePrimary: Color(${hexToColorCode(adjustBrightness(darkColors.primary, -10))}),
      primaryFixed: Color(${hexToColorCode(darkColors.primaryFixed)}),
      onPrimaryFixed: Color(0xff000000),
      primaryFixedDim: Color(${hexToColorCode(darkColors.primaryFixedDim)}),
      onPrimaryFixedVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onPrimaryFixedVariant, -30))}),
      secondaryFixed: Color(${hexToColorCode(darkColors.secondaryFixed)}),
      onSecondaryFixed: Color(0xff000000),
      secondaryFixedDim: Color(${hexToColorCode(darkColors.secondaryFixedDim)}),
      onSecondaryFixedVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onSecondaryFixedVariant, -30))}),
      tertiaryFixed: Color(${hexToColorCode(darkColors.tertiaryFixed)}),
      onTertiaryFixed: Color(0xff000000),
      tertiaryFixedDim: Color(${hexToColorCode(darkColors.tertiaryFixedDim)}),
      onTertiaryFixedVariant: Color(${hexToColorCode(adjustBrightness(darkColors.onTertiaryFixedVariant, -30))}),
      surfaceDim: Color(${hexToColorCode(darkColors.surfaceDim)}),
      surfaceBright: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceBright, 20))}),
      surfaceContainerLowest: Color(0xff000000),
      surfaceContainerLow: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerLow, 5))}),
      surfaceContainer: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainer, 15))}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerHigh, 15))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustBrightness(darkColors.surfaceContainerHighest, 20))}),
    );
  }

  ThemeData darkHighContrast() {
    return theme(darkHighContrastScheme());
  }

  ThemeData theme(ColorScheme colorScheme) => ThemeData(
    useMaterial3: true,
    brightness: colorScheme.brightness,
    colorScheme: colorScheme,
    textTheme: textTheme.apply(
      bodyColor: colorScheme.onSurface,
      displayColor: colorScheme.onSurface,
    ),
    scaffoldBackgroundColor: colorScheme.surface,
    canvasColor: colorScheme.surface,
  );

  List<ExtendedColor> get extendedColors => [
  ];
}

class ExtendedColor {
  final Color seed, value;
  final ColorFamily light;
  final ColorFamily lightHighContrast;
  final ColorFamily lightMediumContrast;
  final ColorFamily dark;
  final ColorFamily darkHighContrast;
  final ColorFamily darkMediumContrast;

  const ExtendedColor({
    required this.seed,
    required this.value,
    required this.light,
    required this.lightHighContrast,
    required this.lightMediumContrast,
    required this.dark,
    required this.darkHighContrast,
    required this.darkMediumContrast,
  });
}

class ColorFamily {
  const ColorFamily({
    required this.color,
    required this.onColor,
    required this.colorContainer,
    required this.onColorContainer,
  });

  final Color color;
  final Color onColor;
  final Color colorContainer;
  final Color onColorContainer;
}
`;
}

// Helper function to convert hex color to Flutter color code
function hexToColorCode(hex: string): string {
  if (!hex) return '0xff000000';
  const cleanHex = hex.replace('#', '');
  return `0xff${cleanHex}`;
}

// Helper function to adjust brightness
function adjustBrightness(hex: string, amount: number): string {
  if (!hex) return '#000000';
  const color = hex.replace('#', '');
  const num = parseInt(color, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

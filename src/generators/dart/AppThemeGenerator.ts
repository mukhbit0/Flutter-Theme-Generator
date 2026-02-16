import { ThemeConfig } from '../../types/theme'
import { hexToColorCode } from '../../utils/colorUtils'
import { generateTextThemes } from './TextThemesGenerator'
import { generateButtonThemes } from './ButtonThemesGenerator'
import { generateInputThemes } from './InputThemesGenerator'
import { generateComponentThemes } from './ComponentThemesGenerator'

/**
 * Adjust color brightness by a percentage
 */
function adjustColorBrightness(hex: string, percent: number): string {
  const color = hex.replace('#', '')
  const num = parseInt(color, 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + percent))
  const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + percent))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent))
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Generates the main app_theme.dart file with complete theme configuration
 * This version is clean, modular, and uses AppConstants properly
 */
export function generateAppThemeFile(config: ThemeConfig): string {
  const lightColors = config.colors.light
  const darkColors = config.colors.dark
  
  return `import 'package:flutter/material.dart';
import 'app_constants.dart';

/// AppTheme provides light and dark theme configurations with Material 3 support
/// Generated with Flutter Theme Generator - Clean, modular, and maintainable
/// 
/// Features:
/// ✅ Uses AppConstants for consistent design tokens
/// ✅ Modular structure with separate theme components
/// ✅ Material 3 compliant color schemes
/// ✅ Support for 6 contrast modes (light, dark, medium/high contrast variants)
/// ✅ Production-ready with proper type declarations
class AppTheme {
  AppTheme._(); // Private constructor to prevent instantiation

  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎨 PUBLIC THEME GETTERS
  // ═══════════════════════════════════════════════════════════════════════════════

  /// Light theme configuration
  static ThemeData get lightTheme => theme(lightScheme());

  /// Dark theme configuration
  static ThemeData get darkTheme => theme(darkScheme());

  /// Light medium contrast theme
  static ThemeData get lightMediumContrast => theme(lightMediumContrastScheme());

  /// Light high contrast theme
  static ThemeData get lightHighContrast => theme(lightHighContrastScheme());

  /// Dark medium contrast theme
  static ThemeData get darkMediumContrast => theme(darkMediumContrastScheme());

  /// Dark high contrast theme
  static ThemeData get darkHighContrast => theme(darkHighContrastScheme());

  // ═══════════════════════════════════════════════════════════════════════════════
  // 🌈 COLOR SCHEMES - Material 3 compliant
  // ═══════════════════════════════════════════════════════════════════════════════

  /// Light color scheme
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
      onInverseSurface: Color(${hexToColorCode(lightColors.inverseOnSurface)}),
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

  /// Dark color scheme
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
      onInverseSurface: Color(${hexToColorCode(darkColors.inverseOnSurface)}),
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

  /// Light medium contrast color scheme
  static ColorScheme lightMediumContrastScheme() {
    return lightScheme().copyWith(
      primary: Color(${hexToColorCode(adjustColorBrightness(lightColors.primary, -15))}),
      surface: Color(${hexToColorCode(adjustColorBrightness(lightColors.surface, -5))}),
    );
  }

  /// Light high contrast color scheme
  static ColorScheme lightHighContrastScheme() {
    return lightScheme().copyWith(
      primary: Color(${hexToColorCode(adjustColorBrightness(lightColors.primary, -30))}),
      surface: Color(${hexToColorCode(adjustColorBrightness(lightColors.surface, -10))}),
      outline: const Color(0xff000000),
    );
  }

  /// Dark medium contrast color scheme
  static ColorScheme darkMediumContrastScheme() {
    return darkScheme().copyWith(
      primary: Color(${hexToColorCode(adjustColorBrightness(darkColors.primary, 15))}),
      surface: Color(${hexToColorCode(adjustColorBrightness(darkColors.surface, 5))}),
    );
  }

  /// Dark high contrast color scheme
  static ColorScheme darkHighContrastScheme() {
    return darkScheme().copyWith(
      primary: Color(${hexToColorCode(adjustColorBrightness(darkColors.primary, 30))}),
      surface: Color(${hexToColorCode(adjustColorBrightness(darkColors.surface, 10))}),
      outline: const Color(0xffffffff),
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎯 MAIN THEME BUILDER - Clean and modular structure
  // ═══════════════════════════════════════════════════════════════════════════════

  /// Main theme function that combines all theme components
  /// Uses clean, modular structure with proper AppConstants integration
  static ThemeData theme(ColorScheme colorScheme) => ThemeData(
    useMaterial3: true,
    brightness: colorScheme.brightness,
    colorScheme: colorScheme,
    textTheme: _textTheme,
    appBarTheme: colorScheme.brightness == Brightness.light ? _lightAppBarTheme : _darkAppBarTheme,
    elevatedButtonTheme: elevatedButtonTheme(colorScheme),
    filledButtonTheme: filledButtonTheme(colorScheme),
    textButtonTheme: textButtonTheme(colorScheme),
    outlinedButtonTheme: outlinedButtonTheme(colorScheme),
    iconButtonTheme: iconButtonTheme(colorScheme),
    inputDecorationTheme: _inputDecorationTheme,
    cardTheme: _cardTheme,
    chipTheme: _chipTheme,
    progressIndicatorTheme: _progressIndicatorTheme,
    dividerTheme: _dividerTheme,
    bottomNavigationBarTheme: _bottomNavigationBarTheme,
    tabBarTheme: _tabBarTheme,
    switchTheme: switchTheme(colorScheme),
    checkboxTheme: _checkboxTheme,
    radioTheme: _radioTheme,
    sliderTheme: _sliderTheme,
    scaffoldBackgroundColor: colorScheme.surface,
    canvasColor: colorScheme.surface,
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  // 🎨 THEME COMPONENTS - All using AppConstants for consistency
  // ═══════════════════════════════════════════════════════════════════════════════

${generateTextThemes(config)}

${generateButtonThemes()}

${generateInputThemes()}

${generateComponentThemes()}
}

/// Custom theme colors extension for additional brand colors
extension CustomColors on ColorScheme {
  /// Success color for positive actions and states
  Color get success => const Color(${hexToColorCode(lightColors.success || '#4CAF50')});
  
  /// Warning color for caution states
  Color get warning => const Color(${hexToColorCode(lightColors.warning || '#FF9800')});
  
  /// Info color for informational states
  Color get info => const Color(${hexToColorCode(lightColors.info || '#2196F3')});
}
`
}

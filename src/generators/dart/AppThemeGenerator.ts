import { ThemeConfig } from '../../types/theme'
import { hexToColorCode } from '../../utils/colorUtils'

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
 */
export function generateAppThemeFile(config: ThemeConfig): string {
  const lightColors = config.colors.light
  const darkColors = config.colors.dark
  
  return `import 'package:flutter/material.dart';
import 'app_constants.dart';

/// AppTheme provides light and dark theme configurations with Material 3 support
/// Generated with Flutter Theme Generator
class AppTheme {
  AppTheme._();

  /// Light theme configuration
  static ThemeData get lightTheme {
    return theme(lightScheme());
  }

  /// Dark theme configuration
  static ThemeData get darkTheme {
    return theme(darkScheme());
  }

  /// Light medium contrast theme
  static ThemeData get lightMediumContrast {
    return theme(lightMediumContrastScheme());
  }

  /// Light high contrast theme
  static ThemeData get lightHighContrast {
    return theme(lightHighContrastScheme());
  }

  /// Dark medium contrast theme
  static ThemeData get darkMediumContrast {
    return theme(darkMediumContrastScheme());
  }

  /// Dark high contrast theme
  static ThemeData get darkHighContrast {
    return theme(darkHighContrastScheme());
  }

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

  /// Light medium contrast color scheme
  static ColorScheme lightMediumContrastScheme() {
    return ColorScheme(
      brightness: Brightness.light,
      primary: Color(${hexToColorCode(adjustColorBrightness(lightColors.primary, -20))}),
      surfaceTint: Color(${hexToColorCode(lightColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.primaryContainer, -10))}),
      onPrimaryContainer: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondary: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondary, -20))}),
      onSecondary: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondaryContainer, -10))}),
      onSecondaryContainer: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiary: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiary, -20))}),
      onTertiary: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiaryContainer, -10))}),
      onTertiaryContainer: Color(${hexToColorCode(lightColors.onTertiary)}),
      error: Color(${hexToColorCode(adjustColorBrightness(lightColors.error, -20))}),
      onError: Color(${hexToColorCode(lightColors.onError)}),
      errorContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.errorContainer, -20))}),
      onErrorContainer: Color(${hexToColorCode(lightColors.onError)}),
      surface: Color(${hexToColorCode(lightColors.surface)}),
      onSurface: Color(${hexToColorCode(adjustColorBrightness(lightColors.onSurface, -10))}),
      onSurfaceVariant: Color(${hexToColorCode(adjustColorBrightness(lightColors.onSurfaceVariant, -10))}),
      outline: Color(${hexToColorCode(adjustColorBrightness(lightColors.outline, -20))}),
      outlineVariant: Color(${hexToColorCode(adjustColorBrightness(lightColors.outlineVariant, -10))}),
      shadow: Color(${hexToColorCode(lightColors.shadow)}),
      scrim: Color(${hexToColorCode(lightColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(lightColors.inverseSurface)}),
      onInverseSurface: Color(${hexToColorCode(lightColors.inverseOnSurface)}),
      inversePrimary: Color(${hexToColorCode(lightColors.inversePrimary)}),
      primaryFixed: Color(${hexToColorCode(adjustColorBrightness(lightColors.primaryFixed, -10))}),
      onPrimaryFixed: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryFixedDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.primaryFixedDim, -20))}),
      onPrimaryFixedVariant: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondaryFixed: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondaryFixed, -10))}),
      onSecondaryFixed: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryFixedDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondaryFixedDim, -20))}),
      onSecondaryFixedVariant: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiaryFixed: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiaryFixed, -10))}),
      onTertiaryFixed: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryFixedDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiaryFixedDim, -20))}),
      onTertiaryFixedVariant: Color(${hexToColorCode(lightColors.onTertiary)}),
      surfaceDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceDim, -10))}),
      surfaceBright: Color(${hexToColorCode(lightColors.surfaceBright)}),
      surfaceContainerLowest: Color(${hexToColorCode(lightColors.surfaceContainerLowest)}),
      surfaceContainerLow: Color(${hexToColorCode(lightColors.surfaceContainerLow)}),
      surfaceContainer: Color(${hexToColorCode(lightColors.surfaceContainer)}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceContainerHigh, -5))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceContainerHighest, -10))}),
    );
  }

  /// Light high contrast color scheme
  static ColorScheme lightHighContrastScheme() {
    return ColorScheme(
      brightness: Brightness.light,
      primary: Color(${hexToColorCode(adjustColorBrightness(lightColors.primary, -40))}),
      surfaceTint: Color(${hexToColorCode(lightColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.primaryContainer, -30))}),
      onPrimaryContainer: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondary: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondary, -40))}),
      onSecondary: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondaryContainer, -30))}),
      onSecondaryContainer: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiary: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiary, -40))}),
      onTertiary: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiaryContainer, -30))}),
      onTertiaryContainer: Color(${hexToColorCode(lightColors.onTertiary)}),
      error: Color(${hexToColorCode(adjustColorBrightness(lightColors.error, -40))}),
      onError: Color(${hexToColorCode(lightColors.onError)}),
      errorContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.errorContainer, -40))}),
      onErrorContainer: Color(${hexToColorCode(lightColors.onError)}),
      surface: Color(${hexToColorCode(lightColors.surface)}),
      onSurface: Color(0xff000000),
      onSurfaceVariant: Color(0xff000000),
      outline: Color(0xff000000),
      outlineVariant: Color(${hexToColorCode(adjustColorBrightness(lightColors.outlineVariant, -50))}),
      shadow: Color(${hexToColorCode(lightColors.shadow)}),
      scrim: Color(${hexToColorCode(lightColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(lightColors.inverseSurface)}),
      onInverseSurface: Color(${hexToColorCode(lightColors.inverseOnSurface)}),
      inversePrimary: Color(${hexToColorCode(lightColors.inversePrimary)}),
      primaryFixed: Color(${hexToColorCode(adjustColorBrightness(lightColors.primaryFixed, -30))}),
      onPrimaryFixed: Color(${hexToColorCode(lightColors.onPrimary)}),
      primaryFixedDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.primaryFixedDim, -40))}),
      onPrimaryFixedVariant: Color(${hexToColorCode(lightColors.onPrimary)}),
      secondaryFixed: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondaryFixed, -30))}),
      onSecondaryFixed: Color(${hexToColorCode(lightColors.onSecondary)}),
      secondaryFixedDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.secondaryFixedDim, -40))}),
      onSecondaryFixedVariant: Color(${hexToColorCode(lightColors.onSecondary)}),
      tertiaryFixed: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiaryFixed, -30))}),
      onTertiaryFixed: Color(${hexToColorCode(lightColors.onTertiary)}),
      tertiaryFixedDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.tertiaryFixedDim, -40))}),
      onTertiaryFixedVariant: Color(${hexToColorCode(lightColors.onTertiary)}),
      surfaceDim: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceDim, -20))}),
      surfaceBright: Color(${hexToColorCode(lightColors.surfaceBright)}),
      surfaceContainerLowest: Color(${hexToColorCode(lightColors.surfaceContainerLowest)}),
      surfaceContainerLow: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceContainerLow, -5))}),
      surfaceContainer: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceContainer, -10))}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceContainerHigh, -15))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustColorBrightness(lightColors.surfaceContainerHighest, -20))}),
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

  /// Dark medium contrast color scheme
  static ColorScheme darkMediumContrastScheme() {
    return ColorScheme(
      brightness: Brightness.dark,
      primary: Color(${hexToColorCode(adjustColorBrightness(darkColors.primary, 20))}),
      surfaceTint: Color(${hexToColorCode(darkColors.surfaceTint)}),
      onPrimary: Color(${hexToColorCode(adjustColorBrightness(darkColors.onPrimary, -10))}),
      primaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.primaryContainer, 10))}),
      onPrimaryContainer: Color(0xff000000),
      secondary: Color(${hexToColorCode(adjustColorBrightness(darkColors.secondary, 20))}),
      onSecondary: Color(${hexToColorCode(adjustColorBrightness(darkColors.onSecondary, -10))}),
      secondaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.secondaryContainer, 10))}),
      onSecondaryContainer: Color(0xff000000),
      tertiary: Color(${hexToColorCode(adjustColorBrightness(darkColors.tertiary, 20))}),
      onTertiary: Color(${hexToColorCode(adjustColorBrightness(darkColors.onTertiary, -10))}),
      tertiaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.tertiaryContainer, 10))}),
      onTertiaryContainer: Color(0xff000000),
      error: Color(${hexToColorCode(adjustColorBrightness(darkColors.error, 20))}),
      onError: Color(${hexToColorCode(adjustColorBrightness(darkColors.onError, -10))}),
      errorContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.errorContainer, 20))}),
      onErrorContainer: Color(0xff000000),
      surface: Color(${hexToColorCode(darkColors.surface)}),
      onSurface: Color(0xffffffff),
      onSurfaceVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onSurfaceVariant, 10))}),
      outline: Color(${hexToColorCode(adjustColorBrightness(darkColors.outline, 10))}),
      outlineVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.outlineVariant, 5))}),
      shadow: Color(${hexToColorCode(darkColors.shadow)}),
      scrim: Color(${hexToColorCode(darkColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(darkColors.inverseSurface)}),
      onInverseSurface: Color(${hexToColorCode(darkColors.inverseOnSurface)}),
      inversePrimary: Color(${hexToColorCode(adjustColorBrightness(darkColors.inversePrimary, -20))}),
      primaryFixed: Color(${hexToColorCode(darkColors.primaryFixed)}),
      onPrimaryFixed: Color(${hexToColorCode(darkColors.onPrimary)}),
      primaryFixedDim: Color(${hexToColorCode(darkColors.primaryFixedDim)}),
      onPrimaryFixedVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onPrimaryFixedVariant, -20))}),
      secondaryFixed: Color(${hexToColorCode(darkColors.secondaryFixed)}),
      onSecondaryFixed: Color(${hexToColorCode(darkColors.onSecondary)}),
      secondaryFixedDim: Color(${hexToColorCode(darkColors.secondaryFixedDim)}),
      onSecondaryFixedVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onSecondaryFixedVariant, -20))}),
      tertiaryFixed: Color(${hexToColorCode(darkColors.tertiaryFixed)}),
      onTertiaryFixed: Color(${hexToColorCode(darkColors.onTertiary)}),
      tertiaryFixedDim: Color(${hexToColorCode(darkColors.tertiaryFixedDim)}),
      onTertiaryFixedVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onTertiaryFixedVariant, -20))}),
      surfaceDim: Color(${hexToColorCode(darkColors.surfaceDim)}),
      surfaceBright: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceBright, 10))}),
      surfaceContainerLowest: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerLowest, -5))}),
      surfaceContainerLow: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerLow, 5))}),
      surfaceContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainer, 10))}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerHigh, 15))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerHighest, 20))}),
    );
  }

  /// Dark high contrast color scheme
  static ColorScheme darkHighContrastScheme() {
    return ColorScheme(
      brightness: Brightness.dark,
      primary: Color(${hexToColorCode(adjustColorBrightness(darkColors.primary, 40))}),
      surfaceTint: Color(${hexToColorCode(darkColors.surfaceTint)}),
      onPrimary: Color(0xff000000),
      primaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.primaryContainer, 30))}),
      onPrimaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.onPrimaryContainer, -20))}),
      secondary: Color(${hexToColorCode(adjustColorBrightness(darkColors.secondary, 40))}),
      onSecondary: Color(0xff000000),
      secondaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.secondaryContainer, 30))}),
      onSecondaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.onSecondaryContainer, -20))}),
      tertiary: Color(${hexToColorCode(adjustColorBrightness(darkColors.tertiary, 40))}),
      onTertiary: Color(0xff000000),
      tertiaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.tertiaryContainer, 30))}),
      onTertiaryContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.onTertiaryContainer, -20))}),
      error: Color(${hexToColorCode(adjustColorBrightness(darkColors.error, 40))}),
      onError: Color(0xff000000),
      errorContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.errorContainer, 40))}),
      onErrorContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.onErrorContainer, -20))}),
      surface: Color(${hexToColorCode(darkColors.surface)}),
      onSurface: Color(0xffffffff),
      onSurfaceVariant: Color(0xffffffff),
      outline: Color(${hexToColorCode(adjustColorBrightness(darkColors.outline, 30))}),
      outlineVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.outlineVariant, 20))}),
      shadow: Color(${hexToColorCode(darkColors.shadow)}),
      scrim: Color(${hexToColorCode(darkColors.scrim)}),
      inverseSurface: Color(${hexToColorCode(darkColors.inverseSurface)}),
      onInverseSurface: Color(${hexToColorCode(darkColors.inverseOnSurface)}),
      inversePrimary: Color(${hexToColorCode(adjustColorBrightness(darkColors.inversePrimary, -40))}),
      primaryFixed: Color(${hexToColorCode(darkColors.primaryFixed)}),
      onPrimaryFixed: Color(0xff000000),
      primaryFixedDim: Color(${hexToColorCode(darkColors.primaryFixedDim)}),
      onPrimaryFixedVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onPrimaryFixedVariant, -40))}),
      secondaryFixed: Color(${hexToColorCode(darkColors.secondaryFixed)}),
      onSecondaryFixed: Color(0xff000000),
      secondaryFixedDim: Color(${hexToColorCode(darkColors.secondaryFixedDim)}),
      onSecondaryFixedVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onSecondaryFixedVariant, -40))}),
      tertiaryFixed: Color(${hexToColorCode(darkColors.tertiaryFixed)}),
      onTertiaryFixed: Color(0xff000000),
      tertiaryFixedDim: Color(${hexToColorCode(darkColors.tertiaryFixedDim)}),
      onTertiaryFixedVariant: Color(${hexToColorCode(adjustColorBrightness(darkColors.onTertiaryFixedVariant, -40))}),
      surfaceDim: Color(${hexToColorCode(darkColors.surfaceDim)}),
      surfaceBright: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceBright, 30))}),
      surfaceContainerLowest: Color(0xff000000),
      surfaceContainerLow: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerLow, 5))}),
      surfaceContainer: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainer, 20))}),
      surfaceContainerHigh: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerHigh, 30))}),
      surfaceContainerHighest: Color(${hexToColorCode(adjustColorBrightness(darkColors.surfaceContainerHighest, 40))}),
    );
  }

  /// Main theme function
  static ThemeData theme(ColorScheme colorScheme) => ThemeData(
    useMaterial3: true,
    brightness: colorScheme.brightness,
    colorScheme: colorScheme,
    textTheme: _textTheme,
    appBarTheme: colorScheme.brightness == Brightness.light ? _lightAppBarTheme : _darkAppBarTheme,
    elevatedButtonTheme: _elevatedButtonTheme,
    textButtonTheme: _textButtonTheme,
    outlinedButtonTheme: _outlinedButtonTheme,
    inputDecorationTheme: _inputDecorationTheme,
    cardTheme: _cardTheme,
    chipTheme: _chipTheme,
    progressIndicatorTheme: _progressIndicatorTheme,
    dividerTheme: _dividerTheme,
    bottomNavigationBarTheme: _bottomNavigationBarTheme,
    tabBarTheme: _tabBarTheme,
    switchTheme: _switchTheme,
    checkboxTheme: _checkboxTheme,
    radioTheme: _radioTheme,
    sliderTheme: _sliderTheme,
    scaffoldBackgroundColor: colorScheme.surface,
    canvasColor: colorScheme.surface,
  );

  /// Text theme
  static const TextTheme _textTheme = TextTheme(
    displayLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.displayLarge.fontSize}.sp` : config.typography.displayLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.displayLarge.fontWeight},
      letterSpacing: ${config.typography.displayLarge.letterSpacing},
      height: ${config.typography.displayLarge.lineHeight / config.typography.displayLarge.fontSize},
    ),
    displayMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.displayMedium.fontSize}.sp` : config.typography.displayMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.displayMedium.fontWeight},
      letterSpacing: ${config.typography.displayMedium.letterSpacing},
      height: ${config.typography.displayMedium.lineHeight / config.typography.displayMedium.fontSize},
    ),
    displaySmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.displaySmall.fontSize}.sp` : config.typography.displaySmall.fontSize},
      fontWeight: FontWeight.w${config.typography.displaySmall.fontWeight},
      letterSpacing: ${config.typography.displaySmall.letterSpacing},
      height: ${config.typography.displaySmall.lineHeight / config.typography.displaySmall.fontSize},
    ),
    headlineLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.headlineLarge.fontSize}.sp` : config.typography.headlineLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineLarge.fontWeight},
      letterSpacing: ${config.typography.headlineLarge.letterSpacing},
      height: ${config.typography.headlineLarge.lineHeight / config.typography.headlineLarge.fontSize},
    ),
    headlineMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.headlineMedium.fontSize}.sp` : config.typography.headlineMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineMedium.fontWeight},
      letterSpacing: ${config.typography.headlineMedium.letterSpacing},
      height: ${config.typography.headlineMedium.lineHeight / config.typography.headlineMedium.fontSize},
    ),
    headlineSmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.headlineSmall.fontSize}.sp` : config.typography.headlineSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineSmall.fontWeight},
      letterSpacing: ${config.typography.headlineSmall.letterSpacing},
      height: ${config.typography.headlineSmall.lineHeight / config.typography.headlineSmall.fontSize},
    ),
    titleLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.titleLarge.fontSize}.sp` : config.typography.titleLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.titleLarge.fontWeight},
      letterSpacing: ${config.typography.titleLarge.letterSpacing},
      height: ${config.typography.titleLarge.lineHeight / config.typography.titleLarge.fontSize},
    ),
    titleMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.titleMedium.fontSize}.sp` : config.typography.titleMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.titleMedium.fontWeight},
      letterSpacing: ${config.typography.titleMedium.letterSpacing},
      height: ${config.typography.titleMedium.lineHeight / config.typography.titleMedium.fontSize},
    ),
    titleSmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.titleSmall.fontSize}.sp` : config.typography.titleSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.titleSmall.fontWeight},
      letterSpacing: ${config.typography.titleSmall.letterSpacing},
      height: ${config.typography.titleSmall.lineHeight / config.typography.titleSmall.fontSize},
    ),
    bodyLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.bodyLarge.fontSize}.sp` : config.typography.bodyLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.bodyLarge.fontWeight},
      letterSpacing: ${config.typography.bodyLarge.letterSpacing},
      height: ${config.typography.bodyLarge.lineHeight / config.typography.bodyLarge.fontSize},
    ),
    bodyMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.bodyMedium.fontSize}.sp` : config.typography.bodyMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.bodyMedium.fontWeight},
      letterSpacing: ${config.typography.bodyMedium.letterSpacing},
      height: ${config.typography.bodyMedium.lineHeight / config.typography.bodyMedium.fontSize},
    ),
    bodySmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.bodySmall.fontSize}.sp` : config.typography.bodySmall.fontSize},
      fontWeight: FontWeight.w${config.typography.bodySmall.fontWeight},
      letterSpacing: ${config.typography.bodySmall.letterSpacing},
      height: ${config.typography.bodySmall.lineHeight / config.typography.bodySmall.fontSize},
    ),
    labelLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.labelLarge.fontSize}.sp` : config.typography.labelLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.labelLarge.fontWeight},
      letterSpacing: ${config.typography.labelLarge.letterSpacing},
      height: ${config.typography.labelLarge.lineHeight / config.typography.labelLarge.fontSize},
    ),
    labelMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.labelMedium.fontSize}.sp` : config.typography.labelMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.labelMedium.fontWeight},
      letterSpacing: ${config.typography.labelMedium.letterSpacing},
      height: ${config.typography.labelMedium.lineHeight / config.typography.labelMedium.fontSize},
    ),
    labelSmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.labelSmall.fontSize}.sp` : config.typography.labelSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.labelSmall.fontWeight},
      letterSpacing: ${config.typography.labelSmall.letterSpacing},
      height: ${config.typography.labelSmall.lineHeight / config.typography.labelSmall.fontSize},
    ),
  );

  /// Light AppBar theme
  static const AppBarTheme _lightAppBarTheme = AppBarTheme(
    centerTitle: true,
    elevation: 0,
    scrolledUnderElevation: ${config.elevation.level1},
  );

  /// Dark AppBar theme
  static const AppBarTheme _darkAppBarTheme = AppBarTheme(
    centerTitle: true,
    elevation: 0,
    scrolledUnderElevation: ${config.elevation.level1},
  );
    ),
    displaySmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.displaySmall.fontSize}.sp` : config.typography.displaySmall.fontSize},
      fontWeight: FontWeight.w${config.typography.displaySmall.fontWeight},
      letterSpacing: ${config.typography.displaySmall.letterSpacing},
      height: ${config.typography.displaySmall.lineHeight / config.typography.displaySmall.fontSize},
    ),
    headlineLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.headlineLarge.fontSize}.sp` : config.typography.headlineLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineLarge.fontWeight},
      letterSpacing: ${config.typography.headlineLarge.letterSpacing},
      height: ${config.typography.headlineLarge.lineHeight / config.typography.headlineLarge.fontSize},
    ),
    headlineMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.headlineMedium.fontSize}.sp` : config.typography.headlineMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineMedium.fontWeight},
      letterSpacing: ${config.typography.headlineMedium.letterSpacing},
      height: ${config.typography.headlineMedium.lineHeight / config.typography.headlineMedium.fontSize},
    ),
    headlineSmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.headlineSmall.fontSize}.sp` : config.typography.headlineSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineSmall.fontWeight},
      letterSpacing: ${config.typography.headlineSmall.letterSpacing},
      height: ${config.typography.headlineSmall.lineHeight / config.typography.headlineSmall.fontSize},
    ),
    titleLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.titleLarge.fontSize}.sp` : config.typography.titleLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.titleLarge.fontWeight},
      letterSpacing: ${config.typography.titleLarge.letterSpacing},
      height: ${config.typography.titleLarge.lineHeight / config.typography.titleLarge.fontSize},
    ),
    titleMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.titleMedium.fontSize}.sp` : config.typography.titleMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.titleMedium.fontWeight},
      letterSpacing: ${config.typography.titleMedium.letterSpacing},
      height: ${config.typography.titleMedium.lineHeight / config.typography.titleMedium.fontSize},
    ),
    titleSmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.titleSmall.fontSize}.sp` : config.typography.titleSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.titleSmall.fontWeight},
      letterSpacing: ${config.typography.titleSmall.letterSpacing},
      height: ${config.typography.titleSmall.lineHeight / config.typography.titleSmall.fontSize},
    ),
    bodyLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.bodyLarge.fontSize}.sp` : config.typography.bodyLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.bodyLarge.fontWeight},
      letterSpacing: ${config.typography.bodyLarge.letterSpacing},
      height: ${config.typography.bodyLarge.lineHeight / config.typography.bodyLarge.fontSize},
    ),
    bodyMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.bodyMedium.fontSize}.sp` : config.typography.bodyMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.bodyMedium.fontWeight},
      letterSpacing: ${config.typography.bodyMedium.letterSpacing},
      height: ${config.typography.bodyMedium.lineHeight / config.typography.bodyMedium.fontSize},
    ),
    bodySmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.bodySmall.fontSize}.sp` : config.typography.bodySmall.fontSize},
      fontWeight: FontWeight.w${config.typography.bodySmall.fontWeight},
      letterSpacing: ${config.typography.bodySmall.letterSpacing},
      height: ${config.typography.bodySmall.lineHeight / config.typography.bodySmall.fontSize},
    ),
    labelLarge: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.labelLarge.fontSize}.sp` : config.typography.labelLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.labelLarge.fontWeight},
      letterSpacing: ${config.typography.labelLarge.letterSpacing},
      height: ${config.typography.labelLarge.lineHeight / config.typography.labelLarge.fontSize},
    ),
    labelMedium: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.labelMedium.fontSize}.sp` : config.typography.labelMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.labelMedium.fontWeight},
      letterSpacing: ${config.typography.labelMedium.letterSpacing},
      height: ${config.typography.labelMedium.lineHeight / config.typography.labelMedium.fontSize},
    ),
    labelSmall: TextStyle(
      fontSize: ${config.settings?.useScreenUtil ? `${config.typography.labelSmall.fontSize}.sp` : config.typography.labelSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.labelSmall.fontWeight},
      letterSpacing: ${config.typography.labelSmall.letterSpacing},
      height: ${config.typography.labelSmall.lineHeight / config.typography.labelSmall.fontSize},
    ),
  );

  /// Light app bar theme
  static const AppBarTheme _lightAppBarTheme = AppBarTheme(
    elevation: ${config.elevation.level1},
    centerTitle: false,
    titleSpacing: ${config.settings?.useScreenUtil ? `${config.spacing.md}.w` : config.spacing.md},
    backgroundColor: Color(${hexToColorCode(lightColors.surface)}),
    foregroundColor: Color(${hexToColorCode(lightColors.onSurface)}),
    surfaceTintColor: Color(${hexToColorCode(lightColors.primary)}),
  );

  /// Dark app bar theme
  static const AppBarTheme _darkAppBarTheme = AppBarTheme(
    elevation: ${config.elevation.level1},
    centerTitle: false,
    titleSpacing: ${config.settings?.useScreenUtil ? `${config.spacing.md}.w` : config.spacing.md},
    backgroundColor: Color(${hexToColorCode(darkColors.surface)}),
    foregroundColor: Color(${hexToColorCode(darkColors.onSurface)}),
    surfaceTintColor: Color(${hexToColorCode(darkColors.primary)}),
  );

  /// Elevated button theme
  static final ElevatedButtonThemeData _elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: ${config.elevation.level2},
      padding: EdgeInsets.symmetric(
        horizontal: ${config.settings?.useScreenUtil ? `${config.spacing.lg}.w` : config.spacing.lg},
        vertical: ${config.settings?.useScreenUtil ? `${config.spacing.md}.h` : config.spacing.md},
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
      ),
    ),
  );

  /// Text button theme
  static final TextButtonThemeData _textButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      padding: EdgeInsets.symmetric(
        horizontal: ${config.settings?.useScreenUtil ? `${config.spacing.lg}.w` : config.spacing.lg},
        vertical: ${config.settings?.useScreenUtil ? `${config.spacing.md}.h` : config.spacing.md},
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
      ),
    ),
  );

  /// Outlined button theme
  static final OutlinedButtonThemeData _outlinedButtonTheme = OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      padding: EdgeInsets.symmetric(
        horizontal: ${config.settings?.useScreenUtil ? `${config.spacing.lg}.w` : config.spacing.lg},
        vertical: ${config.settings?.useScreenUtil ? `${config.spacing.md}.h` : config.spacing.md},
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
      ),
    ),
  );

  /// Input decoration theme
  static final InputDecorationTheme _inputDecorationTheme = InputDecorationTheme(
    filled: true,
    contentPadding: EdgeInsets.symmetric(
      horizontal: ${config.settings?.useScreenUtil ? `${config.spacing.md}.w` : config.spacing.md},
      vertical: ${config.settings?.useScreenUtil ? `${config.spacing.md}.h` : config.spacing.md},
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.md}.r` : config.borderRadius.md}),
    ),
  );

  /// Card theme
  static final CardTheme _cardTheme = CardTheme(
    elevation: ${config.elevation.level1},
    margin: EdgeInsets.all(${config.settings?.useScreenUtil ? `${config.spacing.sm}.w` : config.spacing.sm}),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.lg}.r` : config.borderRadius.lg}),
    ),
  );

  /// Chip theme
  static final ChipThemeData _chipTheme = ChipThemeData(
    padding: EdgeInsets.symmetric(
      horizontal: ${config.settings?.useScreenUtil ? `${config.spacing.sm}.w` : config.spacing.sm},
      vertical: ${config.settings?.useScreenUtil ? `${config.spacing.xs}.h` : config.spacing.xs},
    ),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${config.settings?.useScreenUtil ? `${config.borderRadius.full}.r` : config.borderRadius.full}),
    ),
  );

  /// Progress indicator theme
  static const ProgressIndicatorThemeData _progressIndicatorTheme = ProgressIndicatorThemeData(
    linearTrackColor: Colors.transparent,
  );

  /// Divider theme
  static const DividerThemeData _dividerTheme = DividerThemeData(
    thickness: 1,
    space: ${config.spacing.xs},
  );

  /// Bottom navigation bar theme
  static const BottomNavigationBarThemeData _bottomNavigationBarTheme = BottomNavigationBarThemeData(
    type: BottomNavigationBarType.fixed,
    elevation: ${config.elevation.level3},
  );

  /// Tab bar theme
  static const TabBarTheme _tabBarTheme = TabBarTheme(
    labelPadding: EdgeInsets.symmetric(
      horizontal: ${config.spacing.md},
      vertical: ${config.spacing.sm},
    ),
  );

  /// Switch theme
  static final SwitchThemeData _switchTheme = SwitchThemeData(
    thumbColor: MaterialStateProperty.resolveWith((states) {
      if (states.contains(MaterialState.selected)) {
        return _lightColorScheme.primary == _darkColorScheme.primary 
          ? _lightColorScheme.primary
          : null;
      }
      return null;
    }),
  );

  /// Checkbox theme
  static final CheckboxThemeData _checkboxTheme = CheckboxThemeData(
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.xs}),
    ),
  );

  /// Radio theme
  static const RadioThemeData _radioTheme = RadioThemeData();

  /// Slider theme
  static const SliderThemeData _sliderTheme = SliderThemeData();
}

/// Custom theme colors extension
extension CustomColors on ColorScheme {
  Color get success => const Color(${hexToColorCode(lightColors.success || '#4CAF50')});
  Color get warning => const Color(${hexToColorCode(lightColors.warning || '#FF9800')});
  Color get info => const Color(${hexToColorCode(lightColors.info || '#2196F3')});
}
`
}

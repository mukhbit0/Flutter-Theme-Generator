import { ThemeConfig } from '../../types/theme'
import { hexToColorCode } from '../../utils/colorUtils'

/**
 * Generates the main app_theme.dart file with complete theme configuration
 */
export function generateAppThemeFile(config: ThemeConfig): string {
  const lightColors = config.colors.light
  const darkColors = config.colors.dark
  
  return `import 'package:flutter/material.dart';
import 'app_constants.dart';

/// AppTheme provides light and dark theme configurations
/// Generated with Flutter Theme Generator
class AppTheme {
  AppTheme._();

  /// Light theme configuration
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: _lightColorScheme,
      textTheme: _textTheme,
      appBarTheme: _lightAppBarTheme,
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
    );
  }

  /// Dark theme configuration
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: _darkColorScheme,
      textTheme: _textTheme,
      appBarTheme: _darkAppBarTheme,
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
    );
  }

  /// Light color scheme
  static const ColorScheme _lightColorScheme = ColorScheme.light(
    primary: Color(${hexToColorCode(lightColors.primary)}),
    primaryContainer: Color(${hexToColorCode(lightColors.primaryVariant)}),
    secondary: Color(${hexToColorCode(lightColors.secondary)}),
    secondaryContainer: Color(${hexToColorCode(lightColors.secondaryVariant)}),
    surface: Color(${hexToColorCode(lightColors.surface)}),
    background: Color(${hexToColorCode(lightColors.background)}),
    error: Color(${hexToColorCode(lightColors.error)}),
    onPrimary: Color(${hexToColorCode(lightColors.onPrimary)}),
    onSecondary: Color(${hexToColorCode(lightColors.onSecondary)}),
    onSurface: Color(${hexToColorCode(lightColors.onSurface)}),
    onBackground: Color(${hexToColorCode(lightColors.onBackground)}),
    onError: Color(${hexToColorCode(lightColors.onError)}),
    outline: Color(${hexToColorCode(lightColors.outline)}),
    shadow: Color(${hexToColorCode(lightColors.shadow)}),
    inverseSurface: Color(${hexToColorCode(lightColors.inverseSurface)}),
    onInverseSurface: Color(${hexToColorCode(lightColors.inverseOnSurface)}),
    inversePrimary: Color(${hexToColorCode(lightColors.inversePrimary)}),
  );

  /// Dark color scheme
  static const ColorScheme _darkColorScheme = ColorScheme.dark(
    primary: Color(${hexToColorCode(darkColors.primary)}),
    primaryContainer: Color(${hexToColorCode(darkColors.primaryVariant)}),
    secondary: Color(${hexToColorCode(darkColors.secondary)}),
    secondaryContainer: Color(${hexToColorCode(darkColors.secondaryVariant)}),
    surface: Color(${hexToColorCode(darkColors.surface)}),
    background: Color(${hexToColorCode(darkColors.background)}),
    error: Color(${hexToColorCode(darkColors.error)}),
    onPrimary: Color(${hexToColorCode(darkColors.onPrimary)}),
    onSecondary: Color(${hexToColorCode(darkColors.onSecondary)}),
    onSurface: Color(${hexToColorCode(darkColors.onSurface)}),
    onBackground: Color(${hexToColorCode(darkColors.onBackground)}),
    onError: Color(${hexToColorCode(darkColors.onError)}),
    outline: Color(${hexToColorCode(darkColors.outline)}),
    shadow: Color(${hexToColorCode(darkColors.shadow)}),
    inverseSurface: Color(${hexToColorCode(darkColors.inverseSurface)}),
    onInverseSurface: Color(${hexToColorCode(darkColors.inverseOnSurface)}),
    inversePrimary: Color(${hexToColorCode(darkColors.inversePrimary)}),
  );

  /// Text theme
  static const TextTheme _textTheme = TextTheme(
    displayLarge: TextStyle(
      fontSize: ${config.typography.displayLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.displayLarge.fontWeight},
      letterSpacing: ${config.typography.displayLarge.letterSpacing},
      height: ${config.typography.displayLarge.lineHeight / config.typography.displayLarge.fontSize},
    ),
    displayMedium: TextStyle(
      fontSize: ${config.typography.displayMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.displayMedium.fontWeight},
      letterSpacing: ${config.typography.displayMedium.letterSpacing},
      height: ${config.typography.displayMedium.lineHeight / config.typography.displayMedium.fontSize},
    ),
    displaySmall: TextStyle(
      fontSize: ${config.typography.displaySmall.fontSize},
      fontWeight: FontWeight.w${config.typography.displaySmall.fontWeight},
      letterSpacing: ${config.typography.displaySmall.letterSpacing},
      height: ${config.typography.displaySmall.lineHeight / config.typography.displaySmall.fontSize},
    ),
    headlineLarge: TextStyle(
      fontSize: ${config.typography.headlineLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineLarge.fontWeight},
      letterSpacing: ${config.typography.headlineLarge.letterSpacing},
      height: ${config.typography.headlineLarge.lineHeight / config.typography.headlineLarge.fontSize},
    ),
    headlineMedium: TextStyle(
      fontSize: ${config.typography.headlineMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineMedium.fontWeight},
      letterSpacing: ${config.typography.headlineMedium.letterSpacing},
      height: ${config.typography.headlineMedium.lineHeight / config.typography.headlineMedium.fontSize},
    ),
    headlineSmall: TextStyle(
      fontSize: ${config.typography.headlineSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.headlineSmall.fontWeight},
      letterSpacing: ${config.typography.headlineSmall.letterSpacing},
      height: ${config.typography.headlineSmall.lineHeight / config.typography.headlineSmall.fontSize},
    ),
    titleLarge: TextStyle(
      fontSize: ${config.typography.titleLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.titleLarge.fontWeight},
      letterSpacing: ${config.typography.titleLarge.letterSpacing},
      height: ${config.typography.titleLarge.lineHeight / config.typography.titleLarge.fontSize},
    ),
    titleMedium: TextStyle(
      fontSize: ${config.typography.titleMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.titleMedium.fontWeight},
      letterSpacing: ${config.typography.titleMedium.letterSpacing},
      height: ${config.typography.titleMedium.lineHeight / config.typography.titleMedium.fontSize},
    ),
    titleSmall: TextStyle(
      fontSize: ${config.typography.titleSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.titleSmall.fontWeight},
      letterSpacing: ${config.typography.titleSmall.letterSpacing},
      height: ${config.typography.titleSmall.lineHeight / config.typography.titleSmall.fontSize},
    ),
    bodyLarge: TextStyle(
      fontSize: ${config.typography.bodyLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.bodyLarge.fontWeight},
      letterSpacing: ${config.typography.bodyLarge.letterSpacing},
      height: ${config.typography.bodyLarge.lineHeight / config.typography.bodyLarge.fontSize},
    ),
    bodyMedium: TextStyle(
      fontSize: ${config.typography.bodyMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.bodyMedium.fontWeight},
      letterSpacing: ${config.typography.bodyMedium.letterSpacing},
      height: ${config.typography.bodyMedium.lineHeight / config.typography.bodyMedium.fontSize},
    ),
    bodySmall: TextStyle(
      fontSize: ${config.typography.bodySmall.fontSize},
      fontWeight: FontWeight.w${config.typography.bodySmall.fontWeight},
      letterSpacing: ${config.typography.bodySmall.letterSpacing},
      height: ${config.typography.bodySmall.lineHeight / config.typography.bodySmall.fontSize},
    ),
    labelLarge: TextStyle(
      fontSize: ${config.typography.labelLarge.fontSize},
      fontWeight: FontWeight.w${config.typography.labelLarge.fontWeight},
      letterSpacing: ${config.typography.labelLarge.letterSpacing},
      height: ${config.typography.labelLarge.lineHeight / config.typography.labelLarge.fontSize},
    ),
    labelMedium: TextStyle(
      fontSize: ${config.typography.labelMedium.fontSize},
      fontWeight: FontWeight.w${config.typography.labelMedium.fontWeight},
      letterSpacing: ${config.typography.labelMedium.letterSpacing},
      height: ${config.typography.labelMedium.lineHeight / config.typography.labelMedium.fontSize},
    ),
    labelSmall: TextStyle(
      fontSize: ${config.typography.labelSmall.fontSize},
      fontWeight: FontWeight.w${config.typography.labelSmall.fontWeight},
      letterSpacing: ${config.typography.labelSmall.letterSpacing},
      height: ${config.typography.labelSmall.lineHeight / config.typography.labelSmall.fontSize},
    ),
  );

  /// Light app bar theme
  static const AppBarTheme _lightAppBarTheme = AppBarTheme(
    elevation: ${config.elevation.level1},
    centerTitle: false,
    titleSpacing: ${config.spacing.md},
    backgroundColor: Color(${hexToColorCode(lightColors.surface)}),
    foregroundColor: Color(${hexToColorCode(lightColors.onSurface)}),
    surfaceTintColor: Color(${hexToColorCode(lightColors.primary)}),
  );

  /// Dark app bar theme
  static const AppBarTheme _darkAppBarTheme = AppBarTheme(
    elevation: ${config.elevation.level1},
    centerTitle: false,
    titleSpacing: ${config.spacing.md},
    backgroundColor: Color(${hexToColorCode(darkColors.surface)}),
    foregroundColor: Color(${hexToColorCode(darkColors.onSurface)}),
    surfaceTintColor: Color(${hexToColorCode(darkColors.primary)}),
  );

  /// Elevated button theme
  static final ElevatedButtonThemeData _elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: ${config.elevation.level2},
      padding: const EdgeInsets.symmetric(
        horizontal: ${config.spacing.lg},
        vertical: ${config.spacing.md},
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${config.borderRadius.md}),
      ),
    ),
  );

  /// Text button theme
  static final TextButtonThemeData _textButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      padding: const EdgeInsets.symmetric(
        horizontal: ${config.spacing.lg},
        vertical: ${config.spacing.md},
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${config.borderRadius.md}),
      ),
    ),
  );

  /// Outlined button theme
  static final OutlinedButtonThemeData _outlinedButtonTheme = OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      padding: const EdgeInsets.symmetric(
        horizontal: ${config.spacing.lg},
        vertical: ${config.spacing.md},
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${config.borderRadius.md}),
      ),
    ),
  );

  /// Input decoration theme
  static final InputDecorationTheme _inputDecorationTheme = InputDecorationTheme(
    filled: true,
    contentPadding: const EdgeInsets.symmetric(
      horizontal: ${config.spacing.md},
      vertical: ${config.spacing.md},
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.md}),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.md}),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.md}),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.md}),
    ),
  );

  /// Card theme
  static final CardTheme _cardTheme = CardTheme(
    elevation: ${config.elevation.level1},
    margin: const EdgeInsets.all(${config.spacing.sm}),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.lg}),
    ),
  );

  /// Chip theme
  static final ChipThemeData _chipTheme = ChipThemeData(
    padding: const EdgeInsets.symmetric(
      horizontal: ${config.spacing.sm},
      vertical: ${config.spacing.xs},
    ),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${config.borderRadius.full}),
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
  Color get success => const Color(${hexToColorCode(lightColors.success)});
  Color get warning => const Color(${hexToColorCode(lightColors.warning)});
  Color get info => const Color(${hexToColorCode(lightColors.info)});
}
`
}

/**
 * Generates button theme configurations
 * These themes use AppConstants for consistent design tokens
 * Note: Using 'final' instead of 'const' to work with both regular and ScreenUtil AppConstants
 */
export function generateButtonThemes(): string {
  return `
  /// Elevated button theme
  static final ElevatedButtonThemeData _elevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: AppConstants.elevationLevel2,
      padding: EdgeInsets.symmetric(
        horizontal: AppConstants.spacingLG,
        vertical: AppConstants.spacingMD,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.radiusMD),
      ),
    ),
  );

  /// Text button theme
  static final TextButtonThemeData _textButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      padding: EdgeInsets.symmetric(
        horizontal: AppConstants.spacingLG,
        vertical: AppConstants.spacingMD,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.radiusMD),
      ),
    ),
  );

  /// Outlined button theme
  static final OutlinedButtonThemeData _outlinedButtonTheme = OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      padding: EdgeInsets.symmetric(
        horizontal: AppConstants.spacingLG,
        vertical: AppConstants.spacingMD,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.radiusMD),
      ),
    ),
  );`
}

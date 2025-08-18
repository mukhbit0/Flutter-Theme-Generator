/**
 * Generates input decoration theme configurations
 * These themes use AppConstants for consistent design tokens
 * Note: Using 'final' instead of 'const' to work with both regular and ScreenUtil AppConstants
 */
export function generateInputThemes(): string {
  return `
  /// Input decoration theme
  static final InputDecorationTheme _inputDecorationTheme = InputDecorationTheme(
    contentPadding: EdgeInsets.symmetric(
      horizontal: AppConstants.spacingMD,
      vertical: AppConstants.spacingMD,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AppConstants.radiusMD),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AppConstants.radiusMD),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AppConstants.radiusMD),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(AppConstants.radiusMD),
    ),
  );`
}

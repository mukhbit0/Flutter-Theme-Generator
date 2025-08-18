import { ThemeConfig } from '../../types/theme'

/**
 * Generates text theme configurations using AppConstants for consistency
 */
export function generateTextThemes(config: ThemeConfig): string {
  return `
  /// Text theme using AppConstants for consistent font sizes
  static final TextTheme _textTheme = TextTheme(
    displayLarge: TextStyle(
      fontSize: AppConstants.fontSizeDisplayLarge,
      fontWeight: FontWeight.w${config.typography.displayLarge.fontWeight},
      letterSpacing: ${config.typography.displayLarge.letterSpacing},
      height: ${config.typography.displayLarge.lineHeight / config.typography.displayLarge.fontSize},
    ),
    displayMedium: TextStyle(
      fontSize: AppConstants.fontSizeDisplayMedium,
      fontWeight: FontWeight.w${config.typography.displayMedium.fontWeight},
      letterSpacing: ${config.typography.displayMedium.letterSpacing},
      height: ${config.typography.displayMedium.lineHeight / config.typography.displayMedium.fontSize},
    ),
    displaySmall: TextStyle(
      fontSize: AppConstants.fontSizeDisplaySmall,
      fontWeight: FontWeight.w${config.typography.displaySmall.fontWeight},
      letterSpacing: ${config.typography.displaySmall.letterSpacing},
      height: ${config.typography.displaySmall.lineHeight / config.typography.displaySmall.fontSize},
    ),
    headlineLarge: TextStyle(
      fontSize: AppConstants.fontSizeHeadlineLarge,
      fontWeight: FontWeight.w${config.typography.headlineLarge.fontWeight},
      letterSpacing: ${config.typography.headlineLarge.letterSpacing},
      height: ${config.typography.headlineLarge.lineHeight / config.typography.headlineLarge.fontSize},
    ),
    headlineMedium: TextStyle(
      fontSize: AppConstants.fontSizeHeadlineMedium,
      fontWeight: FontWeight.w${config.typography.headlineMedium.fontWeight},
      letterSpacing: ${config.typography.headlineMedium.letterSpacing},
      height: ${config.typography.headlineMedium.lineHeight / config.typography.headlineMedium.fontSize},
    ),
    headlineSmall: TextStyle(
      fontSize: AppConstants.fontSizeHeadlineSmall,
      fontWeight: FontWeight.w${config.typography.headlineSmall.fontWeight},
      letterSpacing: ${config.typography.headlineSmall.letterSpacing},
      height: ${config.typography.headlineSmall.lineHeight / config.typography.headlineSmall.fontSize},
    ),
    titleLarge: TextStyle(
      fontSize: AppConstants.fontSizeTitleLarge,
      fontWeight: FontWeight.w${config.typography.titleLarge.fontWeight},
      letterSpacing: ${config.typography.titleLarge.letterSpacing},
      height: ${config.typography.titleLarge.lineHeight / config.typography.titleLarge.fontSize},
    ),
    titleMedium: TextStyle(
      fontSize: AppConstants.fontSizeTitleMedium,
      fontWeight: FontWeight.w${config.typography.titleMedium.fontWeight},
      letterSpacing: ${config.typography.titleMedium.letterSpacing},
      height: ${config.typography.titleMedium.lineHeight / config.typography.titleMedium.fontSize},
    ),
    titleSmall: TextStyle(
      fontSize: AppConstants.fontSizeTitleSmall,
      fontWeight: FontWeight.w${config.typography.titleSmall.fontWeight},
      letterSpacing: ${config.typography.titleSmall.letterSpacing},
      height: ${config.typography.titleSmall.lineHeight / config.typography.titleSmall.fontSize},
    ),
    labelLarge: TextStyle(
      fontSize: AppConstants.fontSizeLabelLarge,
      fontWeight: FontWeight.w${config.typography.labelLarge.fontWeight},
      letterSpacing: ${config.typography.labelLarge.letterSpacing},
      height: ${config.typography.labelLarge.lineHeight / config.typography.labelLarge.fontSize},
    ),
    labelMedium: TextStyle(
      fontSize: AppConstants.fontSizeLabelMedium,
      fontWeight: FontWeight.w${config.typography.labelMedium.fontWeight},
      letterSpacing: ${config.typography.labelMedium.letterSpacing},
      height: ${config.typography.labelMedium.lineHeight / config.typography.labelMedium.fontSize},
    ),
    labelSmall: TextStyle(
      fontSize: AppConstants.fontSizeLabelSmall,
      fontWeight: FontWeight.w${config.typography.labelSmall.fontWeight},
      letterSpacing: ${config.typography.labelSmall.letterSpacing},
      height: ${config.typography.labelSmall.lineHeight / config.typography.labelSmall.fontSize},
    ),
    bodyLarge: TextStyle(
      fontSize: AppConstants.fontSizeBodyLarge,
      fontWeight: FontWeight.w${config.typography.bodyLarge.fontWeight},
      letterSpacing: ${config.typography.bodyLarge.letterSpacing},
      height: ${config.typography.bodyLarge.lineHeight / config.typography.bodyLarge.fontSize},
    ),
    bodyMedium: TextStyle(
      fontSize: AppConstants.fontSizeBodyMedium,
      fontWeight: FontWeight.w${config.typography.bodyMedium.fontWeight},
      letterSpacing: ${config.typography.bodyMedium.letterSpacing},
      height: ${config.typography.bodyMedium.lineHeight / config.typography.bodyMedium.fontSize},
    ),
    bodySmall: TextStyle(
      fontSize: AppConstants.fontSizeBodySmall,
      fontWeight: FontWeight.w${config.typography.bodySmall.fontWeight},
      letterSpacing: ${config.typography.bodySmall.letterSpacing},
      height: ${config.typography.bodySmall.lineHeight / config.typography.bodySmall.fontSize},
    ),
  );`
}

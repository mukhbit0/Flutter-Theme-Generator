import { ThemeConfig } from '../../types/theme'

/**
 * Generates the theme_extensions.dart file with convenient extension methods
 */
export function generateExtensionsFile(_config: ThemeConfig): string {
  return `import 'package:flutter/material.dart';
import 'app_constants.dart';

/// 🚀 Flutter Theme Extensions
/// 
/// This file provides convenient extensions to make theme usage easier and more intuitive.
/// Instead of writing Theme.of(context).colorScheme.primary, you can simply use context.colorScheme.primary
/// 
/// Generated with Flutter Theme Generator for maximum developer experience.

/// Theme access extensions
extension ThemeExtensions on BuildContext {
  /// Get the current theme data
  ThemeData get theme => Theme.of(this);

  /// Get the current color scheme (primary, secondary, surface, etc.)
  ColorScheme get colorScheme => theme.colorScheme;

  /// Get the current text theme (headlineLarge, bodyMedium, etc.)
  TextTheme get textTheme => theme.textTheme;

  /// Get the current platform (iOS, Android, etc.)
  TargetPlatform get platform => theme.platform;

  /// Check if current theme is dark mode
  bool get isDarkMode => theme.brightness == Brightness.dark;

  /// Get screen size information
  MediaQueryData get mediaQuery => MediaQuery.of(this);

  /// Check if device is in landscape orientation
  bool get isLandscape => mediaQuery.orientation == Orientation.landscape;

  /// Check if device is in portrait orientation
  bool get isPortrait => mediaQuery.orientation == Orientation.portrait;
}

/// Spacing extensions - Gaps between widgets
extension SpacingExtensions on BuildContext {
  /// Extra small gap (4px) - For tight layouts, icon-text spacing
  Widget get gapXS => SizedBox(
    width: AppConstants.spacingXS,
    height: AppConstants.spacingXS,
  );

  /// Small gap (8px) - For compact layouts, button spacing
  Widget get gapSM => SizedBox(
    width: AppConstants.spacingSM,
    height: AppConstants.spacingSM,
  );

  /// Medium gap (16px) - For standard content spacing, form fields
  Widget get gapMD => SizedBox(
    width: AppConstants.spacingMD,
    height: AppConstants.spacingMD,
  );

  /// Large gap (24px) - For section spacing, card separation
  Widget get gapLG => SizedBox(
    width: AppConstants.spacingLG,
    height: AppConstants.spacingLG,
  );

  /// Extra large gap (32px) - For major section breaks
  Widget get gapXL => SizedBox(
    width: AppConstants.spacingXL,
    height: AppConstants.spacingXL,
  );

  /// Double extra large gap (48px) - For dramatic spacing, screen sections
  Widget get gapXXL => SizedBox(
    width: AppConstants.spacingXXL,
    height: AppConstants.spacingXXL,
  );
}

/// Padding extensions - Space inside widgets
extension PaddingExtensions on BuildContext {
  /// Extra small padding (4px all sides) - For tight spacing, borders
  EdgeInsets get paddingXS => EdgeInsets.all(AppConstants.spacingXS);

  /// Small padding (8px all sides) - For compact elements, buttons
  EdgeInsets get paddingSM => EdgeInsets.all(AppConstants.spacingSM);

  /// Medium padding (16px all sides) - For standard content, cards
  EdgeInsets get paddingMD => EdgeInsets.all(AppConstants.spacingMD);

  /// Large padding (24px all sides) - For spacious layouts, dialogs
  EdgeInsets get paddingLG => EdgeInsets.all(AppConstants.spacingLG);

  /// Extra large padding (32px all sides) - For major spacing, screen edges
  EdgeInsets get paddingXL => EdgeInsets.all(AppConstants.spacingXL);

  /// Double extra large padding (48px all sides) - For dramatic spacing
  EdgeInsets get paddingXXL => EdgeInsets.all(AppConstants.spacingXXL);

  /// Horizontal padding only (left and right)
  EdgeInsets paddingHorizontal(double value) => EdgeInsets.symmetric(horizontal: value);

  /// Vertical padding only (top and bottom)
  EdgeInsets paddingVertical(double value) => EdgeInsets.symmetric(vertical: value);

  /// Responsive padding that adjusts based on screen size
  EdgeInsets get paddingResponsive => AppConstants.getResponsivePadding(mediaQuery.size.width);
}

/// Border radius extensions
extension BorderRadiusExtensions on BuildContext {
  /// Extra small border radius (4px) - For subtle rounding, checkboxes
  BorderRadius get radiusXS => BorderRadius.circular(AppConstants.radiusXS);

  /// Small border radius (8px) - For buttons, chips, form fields
  BorderRadius get radiusSM => BorderRadius.circular(AppConstants.radiusSM);

  /// Medium border radius (12px) - For cards, containers, most elements
  BorderRadius get radiusMD => BorderRadius.circular(AppConstants.radiusMD);

  /// Large border radius (16px) - For prominent elements, dialogs
  BorderRadius get radiusLG => BorderRadius.circular(AppConstants.radiusLG);

  /// Extra large border radius (24px) - For hero elements, bottom sheets
  BorderRadius get radiusXL => BorderRadius.circular(AppConstants.radiusXL);

  /// Full border radius (circular) - For avatars, pills, circular buttons
  BorderRadius get radiusFull => BorderRadius.circular(AppConstants.radiusFull);

  /// Custom radius with specific value
  BorderRadius radius(double value) => BorderRadius.circular(value);
}

/// Responsive extensions
extension ResponsiveExtensions on BuildContext {
  /// Check if current device is mobile size (< 600px width)
  bool get isMobile => AppConstants.isMobile(mediaQuery.size.width);

  /// Check if current device is tablet size (600px - 1200px width)
  bool get isTablet => AppConstants.isTablet(mediaQuery.size.width);

  /// Check if current device is desktop size (>= 1200px width)
  bool get isDesktop => AppConstants.isDesktop(mediaQuery.size.width);

  /// Get responsive text size multiplier
  double get textSizeMultiplier => AppConstants.getTextSizeMultiplier(mediaQuery.size.width);

  /// Get screen width
  double get screenWidth => mediaQuery.size.width;

  /// Get screen height
  double get screenHeight => mediaQuery.size.height;
}

/// Widget extensions - Convenience methods
extension WidgetExtensions on Widget {
  /// Wrap widget with Padding using all-sides padding
  Widget paddingAll(double value) => Padding(
    padding: EdgeInsets.all(value),
    child: this,
  );

  /// Wrap widget with symmetric padding
  Widget paddingSymmetric({double horizontal = 0, double vertical = 0}) => Padding(
    padding: EdgeInsets.symmetric(horizontal: horizontal, vertical: vertical),
    child: this,
  );

  /// Center the widget
  Widget centered() => Center(child: this);

  /// Wrap with Expanded (for Flex children)
  Widget expanded({int flex = 1}) => Expanded(flex: flex, child: this);

  /// Wrap with Flexible (for Flex children)
  Widget flexible({int flex = 1, FlexFit fit = FlexFit.loose}) => 
    Flexible(flex: flex, fit: fit, child: this);

  /// Add opacity to widget
  Widget opacity(double opacity) => Opacity(opacity: opacity, child: this);

  /// Add tap gesture
  Widget onTap(VoidCallback onTap) => GestureDetector(onTap: onTap, child: this);

  /// Wrap with SafeArea
  Widget safeArea({
    bool top = true,
    bool bottom = true,
    bool left = true,
    bool right = true,
  }) => SafeArea(
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    child: this,
  );
}
`
}

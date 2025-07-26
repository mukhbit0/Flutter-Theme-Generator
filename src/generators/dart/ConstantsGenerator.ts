import { ThemeConfig } from '../../types/theme'

/**
 * Generates the app_constants.dart file with design system constants
 */
export function generateConstantsFile(config: ThemeConfig): string {
  const useScreenUtil = config.settings?.useScreenUtil || false;
  const screenUtilImport = useScreenUtil ? "import 'package:flutter_screenutil/flutter_screenutil.dart';" : '';
  const screenUtilSuffix = useScreenUtil ? '.w' : '';
  
  return `/// 🎨 App Design System Constants
/// 
/// This file contains all the design tokens used throughout your Flutter app.
/// Generated with Flutter Theme Generator for consistency and maintainability.
/// 
/// Usage examples:
/// - Spacing: SizedBox(height: AppConstants.spacingMD)
/// - Border Radius: BorderRadius.circular(AppConstants.radiusLG)
/// - Animation: AnimationController(duration: AppConstants.durationNormal)

import 'package:flutter/material.dart';
${screenUtilImport}

class AppConstants {
  AppConstants._(); // Private constructor to prevent instantiation

  // ═══════════════════════════════════════════════════════════════════════════
  // 📏 SPACING SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  // Consistent spacing creates visual rhythm and hierarchy
  
  /// Extra small spacing (4px) - For tight layouts, borders
  static ${useScreenUtil ? 'double get' : 'const double'} spacingXS = ${config.spacing.xs}${screenUtilSuffix};
  
  /// Small spacing (8px) - For compact elements, form fields
  static ${useScreenUtil ? 'double get' : 'const double'} spacingSM = ${config.spacing.sm}${screenUtilSuffix};
  
  /// Medium spacing (16px) - For cards, buttons, general content
  static ${useScreenUtil ? 'double get' : 'const double'} spacingMD = ${config.spacing.md}${screenUtilSuffix};
  
  /// Large spacing (24px) - For sections, major components
  static ${useScreenUtil ? 'double get' : 'const double'} spacingLG = ${config.spacing.lg}${screenUtilSuffix};
  
  /// Extra large spacing (32px) - For screen sections, headers
  static ${useScreenUtil ? 'double get' : 'const double'} spacingXL = ${config.spacing.xl}${screenUtilSuffix};
  
  /// Double extra large spacing (48px) - For major layout breaks
  static ${useScreenUtil ? 'double get' : 'const double'} spacingXXL = ${config.spacing.xxl}${screenUtilSuffix};

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔄 BORDER RADIUS SYSTEM  
  // ═══════════════════════════════════════════════════════════════════════════
  // Consistent corner rounding for modern, cohesive design
  
  /// Extra small radius (4px) - For subtle rounding, checkboxes
  static ${useScreenUtil ? 'double get' : 'const double'} radiusXS = ${config.borderRadius.xs}${screenUtilSuffix};
  
  /// Small radius (8px) - For buttons, chips, form fields
  static ${useScreenUtil ? 'double get' : 'const double'} radiusSM = ${config.borderRadius.sm}${screenUtilSuffix};
  
  /// Medium radius (12px) - For cards, containers
  static ${useScreenUtil ? 'double get' : 'const double'} radiusMD = ${config.borderRadius.md}${screenUtilSuffix};
  
  /// Large radius (16px) - For prominent elements, dialogs
  static ${useScreenUtil ? 'double get' : 'const double'} radiusLG = ${config.borderRadius.lg}${screenUtilSuffix};
  
  /// Extra large radius (24px) - For hero elements, bottom sheets
  static ${useScreenUtil ? 'double get' : 'const double'} radiusXL = ${config.borderRadius.xl}${screenUtilSuffix};
  
  /// Full radius (9999px) - For circular elements, pills
  static ${useScreenUtil ? 'double get' : 'const double'} radiusFull = ${config.borderRadius.full}${screenUtilSuffix};

  // ═══════════════════════════════════════════════════════════════════════════
  // 🏔️ ELEVATION SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  // Material Design elevation levels for depth hierarchy
  
  /// No elevation (0dp) - For flat elements on background
  static const double elevationLevel0 = ${config.elevation.level0};
  
  /// Level 1 elevation (1dp) - For cards, buttons at rest
  static const double elevationLevel1 = ${config.elevation.level1};
  
  /// Level 2 elevation (3dp) - For raised buttons, switches
  static const double elevationLevel2 = ${config.elevation.level2};
  
  /// Level 3 elevation (6dp) - For floating action buttons
  static const double elevationLevel3 = ${config.elevation.level3};
  
  /// Level 4 elevation (8dp) - For navigation drawer, modal bottom sheets
  static const double elevationLevel4 = ${config.elevation.level4};
  
  /// Level 5 elevation (12dp) - For app bar, dialogs
  static const double elevationLevel5 = ${config.elevation.level5};

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚡ ANIMATION SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  // Consistent timing for smooth, professional animations
  
  /// Fast animation (150ms) - For micro-interactions, hover states
  static const Duration durationFast = Duration(milliseconds: 150);
  
  /// Normal animation (300ms) - For standard transitions, page changes
  static const Duration durationNormal = Duration(milliseconds: 300);
  
  /// Slow animation (500ms) - For complex animations, loading states
  static const Duration durationSlow = Duration(milliseconds: 500);

  // ═══════════════════════════════════════════════════════════════════════════
  // 📈 ANIMATION CURVES
  // ═══════════════════════════════════════════════════════════════════════════
  // Predefined curves for natural motion
  
  /// Default curve - Standard ease in/out for most animations
  static const Curve curveDefault = Curves.easeInOut;
  
  /// Emphasized curve - More dramatic easing for important transitions
  static const Curve curveEmphasized = Curves.easeInOutCubicEmphasized;
  
  /// Bounce curve - Playful bouncing effect for delightful interactions
  static const Curve curveBounce = Curves.bounceOut;
  
  /// Linear curve - Constant speed for loading indicators
  static const Curve curveLinear = Curves.linear;

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎯 COMMON MEASUREMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  // Frequently used measurements for consistent implementation
  
  /// Standard button height (48px) - Meets accessibility guidelines
  static const double buttonHeight = 48.0;
  
  /// Large button height (56px) - For prominent actions
  static const double buttonHeightLarge = 56.0;
  
  /// Small button height (40px) - For compact layouts
  static const double buttonHeightSmall = 40.0;
  
  /// Text field height (56px) - Standard Material Design height
  static const double textFieldHeight = 56.0;
  
  /// App bar height (56px) - Standard Material Design app bar
  static const double appBarHeight = 56.0;
  
  /// Tab bar height (48px) - Standard Material Design tab bar
  static const double tabBarHeight = 48.0;
  
  /// Bottom navigation height (80px) - With padding and content
  static const double bottomNavHeight = 80.0;
  
  /// FAB size (56px) - Standard floating action button
  static const double fabSize = 56.0;
  
  /// Large FAB size (64px) - Extended floating action button
  static const double fabSizeLarge = 64.0;
  
  /// Avatar size (40px) - Standard user avatar
  static const double avatarSize = 40.0;
  
  /// Large avatar size (64px) - Profile or prominent display
  static const double avatarSizeLarge = 64.0;

  // ═══════════════════════════════════════════════════════════════════════════
  // 📱 RESPONSIVE BREAKPOINTS
  // ═══════════════════════════════════════════════════════════════════════════
  // Screen size breakpoints for responsive design
  
  /// Mobile breakpoint (600px) - Phone screens
  static const double breakpointMobile = 600.0;
  
  /// Tablet breakpoint (900px) - Tablet screens
  static const double breakpointTablet = 900.0;
  
  /// Desktop breakpoint (1200px) - Desktop screens
  static const double breakpointDesktop = 1200.0;

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔤 TYPOGRAPHY SCALE
  // ═══════════════════════════════════════════════════════════════════════════
  // Font sizes following Material Design 3 type scale
  
  /// Display Large (57px) - Hero text, major headlines
  static const double fontSizeDisplayLarge = 57.0;
  
  /// Display Medium (45px) - Large headers
  static const double fontSizeDisplayMedium = 45.0;
  
  /// Display Small (36px) - Section headers
  static const double fontSizeDisplaySmall = 36.0;
  
  /// Headline Large (32px) - Page titles
  static const double fontSizeHeadlineLarge = 32.0;
  
  /// Headline Medium (28px) - Card titles
  static const double fontSizeHeadlineMedium = 28.0;
  
  /// Headline Small (24px) - List headers
  static const double fontSizeHeadlineSmall = 24.0;
  
  /// Title Large (22px) - App bar titles
  static const double fontSizeTitleLarge = 22.0;
  
  /// Title Medium (16px) - Button text, tab labels
  static const double fontSizeTitleMedium = 16.0;
  
  /// Title Small (14px) - List item titles
  static const double fontSizeTitleSmall = 14.0;
  
  /// Body Large (16px) - Prominent body text
  static const double fontSizeBodyLarge = 16.0;
  
  /// Body Medium (14px) - Standard body text
  static const double fontSizeBodyMedium = 14.0;
  
  /// Body Small (12px) - Supporting text
  static const double fontSizeBodySmall = 12.0;
  
  /// Label Large (14px) - Form labels
  static const double fontSizeLabelLarge = 14.0;
  
  /// Label Medium (12px) - Caption text
  static const double fontSizeLabelMedium = 12.0;
  
  /// Label Small (11px) - Small annotations
  static const double fontSizeLabelSmall = 11.0;

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎨 HELPER METHODS
  // ═══════════════════════════════════════════════════════════════════════════
  
  /// Get responsive padding based on screen width
  static EdgeInsets getResponsivePadding(double screenWidth) {
    if (screenWidth >= breakpointDesktop) {
      return const EdgeInsets.all(spacingXXL);
    } else if (screenWidth >= breakpointTablet) {
      return const EdgeInsets.all(spacingXL);
    } else {
      return const EdgeInsets.all(spacingMD);
    }
  }
  
  /// Get responsive text size multiplier
  static double getTextSizeMultiplier(double screenWidth) {
    if (screenWidth >= breakpointDesktop) {
      return 1.1; // 10% larger on desktop
    } else if (screenWidth >= breakpointTablet) {
      return 1.05; // 5% larger on tablet
    } else {
      return 1.0; // Standard size on mobile
    }
  }
  
  /// Check if screen is mobile size
  static bool isMobile(double screenWidth) => screenWidth < breakpointMobile;
  
  /// Check if screen is tablet size
  static bool isTablet(double screenWidth) => 
      screenWidth >= breakpointMobile && screenWidth < breakpointDesktop;
  
  /// Check if screen is desktop size
  static bool isDesktop(double screenWidth) => screenWidth >= breakpointDesktop;
}
`
}

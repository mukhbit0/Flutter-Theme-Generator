import { ThemeConfig } from '../../types/theme'

/**
 * Generates the app_constants.dart file with design system constants
 * 
 * 🎯 WHY APP CONSTANTS ARE IMPORTANT:
 * 
 * 1. **CONSISTENCY**: Ensures all components use the same design tokens
 * 2. **MAINTAINABILITY**: Change spacing/radius globally by updating one file
 * 3. **DESIGN SYSTEM**: Follows Material Design principles with consistent tokens
 * 4. **RESPONSIVENESS**: Supports ScreenUtil for responsive design across devices
 * 5. **DEVELOPER EXPERIENCE**: Auto-complete helps developers use correct values
 * 6. **THEME INTEGRATION**: AppTheme.dart uses these constants instead of hardcoded values
 * 
 * Example Usage:
 * ```dart
 * Container(
 *   margin: EdgeInsets.all(AppConstants.spacingMD), // Instead of EdgeInsets.all(16)
 *   decoration: BoxDecoration(
 *     borderRadius: BorderRadius.circular(AppConstants.radiusLG), // Instead of BorderRadius.circular(16)
 *   ),
 * )
 * ```
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
  static ${useScreenUtil ? 'double get' : 'const double'} spacingXS${useScreenUtil ? ` => ${config.spacing.xs}${screenUtilSuffix}` : ` = ${config.spacing.xs}${screenUtilSuffix}`};
  
  /// Small spacing (8px) - For compact elements, form fields
  static ${useScreenUtil ? 'double get' : 'const double'} spacingSM${useScreenUtil ? ` => ${config.spacing.sm}${screenUtilSuffix}` : ` = ${config.spacing.sm}${screenUtilSuffix}`};
  
  /// Medium spacing (16px) - For cards, buttons, general content
  static ${useScreenUtil ? 'double get' : 'const double'} spacingMD${useScreenUtil ? ` => ${config.spacing.md}${screenUtilSuffix}` : ` = ${config.spacing.md}${screenUtilSuffix}`};
  
  /// Large spacing (24px) - For sections, major components
  static ${useScreenUtil ? 'double get' : 'const double'} spacingLG${useScreenUtil ? ` => ${config.spacing.lg}${screenUtilSuffix}` : ` = ${config.spacing.lg}${screenUtilSuffix}`};
  
  /// Extra large spacing (32px) - For screen sections, headers
  static ${useScreenUtil ? 'double get' : 'const double'} spacingXL${useScreenUtil ? ` => ${config.spacing.xl}${screenUtilSuffix}` : ` = ${config.spacing.xl}${screenUtilSuffix}`};
  
  /// Double extra large spacing (48px) - For major layout breaks
  static ${useScreenUtil ? 'double get' : 'const double'} spacingXXL${useScreenUtil ? ` => ${config.spacing.xxl}${screenUtilSuffix}` : ` = ${config.spacing.xxl}${screenUtilSuffix}`};

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔄 BORDER RADIUS SYSTEM  
  // ═══════════════════════════════════════════════════════════════════════════
  // Consistent corner rounding for modern, cohesive design
  
  /// Extra small radius (4px) - For subtle rounding, checkboxes
  static ${useScreenUtil ? 'double get' : 'const double'} radiusXS${useScreenUtil ? ` => ${config.borderRadius.xs}${screenUtilSuffix}` : ` = ${config.borderRadius.xs}${screenUtilSuffix}`};
  
  /// Small radius (8px) - For buttons, chips, form fields
  static ${useScreenUtil ? 'double get' : 'const double'} radiusSM${useScreenUtil ? ` => ${config.borderRadius.sm}${screenUtilSuffix}` : ` = ${config.borderRadius.sm}${screenUtilSuffix}`};
  
  /// Medium radius (12px) - For cards, containers
  static ${useScreenUtil ? 'double get' : 'const double'} radiusMD${useScreenUtil ? ` => ${config.borderRadius.md}${screenUtilSuffix}` : ` = ${config.borderRadius.md}${screenUtilSuffix}`};
  
  /// Large radius (16px) - For prominent elements, dialogs
  static ${useScreenUtil ? 'double get' : 'const double'} radiusLG${useScreenUtil ? ` => ${config.borderRadius.lg}${screenUtilSuffix}` : ` = ${config.borderRadius.lg}${screenUtilSuffix}`};
  
  /// Extra large radius (24px) - For hero elements, bottom sheets
  static ${useScreenUtil ? 'double get' : 'const double'} radiusXL${useScreenUtil ? ` => ${config.borderRadius.xl}${screenUtilSuffix}` : ` = ${config.borderRadius.xl}${screenUtilSuffix}`};
  
  /// Full radius (9999px) - For circular elements, pills
  static ${useScreenUtil ? 'double get' : 'const double'} radiusFull${useScreenUtil ? ` => ${config.borderRadius.full}${screenUtilSuffix}` : ` = ${config.borderRadius.full}${screenUtilSuffix}`};

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔲 BORDER WIDTH SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  // Consistent border widths for outlines and dividers
  
  /// Thin border (1px) - For subtle outlines, dividers
  static ${useScreenUtil ? 'double get' : 'const double'} borderWidthThin${useScreenUtil ? ' => 1.0.w' : ' = 1.0'};
  
  /// Medium border (2px) - For form fields, buttons
  static ${useScreenUtil ? 'double get' : 'const double'} borderWidthMedium${useScreenUtil ? ' => 2.0.w' : ' = 2.0'};
  
  /// Thick border (4px) - For emphasis, focus states
  static ${useScreenUtil ? 'double get' : 'const double'} borderWidthThick${useScreenUtil ? ' => 4.0.w' : ' = 4.0'};

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
  static ${useScreenUtil ? 'double get' : 'const double'} buttonHeight${useScreenUtil ? ' => 48.h' : ' = 48.0'};
  
  /// Large button height (56px) - For prominent actions
  static ${useScreenUtil ? 'double get' : 'const double'} buttonHeightLarge${useScreenUtil ? ' => 56.h' : ' = 56.0'};
  
  /// Small button height (40px) - For compact layouts
  static ${useScreenUtil ? 'double get' : 'const double'} buttonHeightSmall${useScreenUtil ? ' => 40.h' : ' = 40.0'};
  
  /// Text field height (56px) - Standard Material Design height
  static ${useScreenUtil ? 'double get' : 'const double'} textFieldHeight${useScreenUtil ? ' => 56.h' : ' = 56.0'};
  
  /// App bar height (56px) - Standard Material Design app bar
  static ${useScreenUtil ? 'double get' : 'const double'} appBarHeight${useScreenUtil ? ' => 56.h' : ' = 56.0'};
  
  /// Tab bar height (48px) - Standard Material Design tab bar
  static ${useScreenUtil ? 'double get' : 'const double'} tabBarHeight${useScreenUtil ? ' => 48.h' : ' = 48.0'};
  
  /// Bottom navigation height (80px) - With padding and content
  static ${useScreenUtil ? 'double get' : 'const double'} bottomNavHeight${useScreenUtil ? ' => 80.h' : ' = 80.0'};
  
  /// FAB size (56px) - Standard floating action button
  static ${useScreenUtil ? 'double get' : 'const double'} fabSize${useScreenUtil ? ' => 56.w' : ' = 56.0'};
  
  /// Large FAB size (64px) - Extended floating action button
  static ${useScreenUtil ? 'double get' : 'const double'} fabSizeLarge${useScreenUtil ? ' => 64.w' : ' = 64.0'};
  
  /// Avatar size (40px) - Standard user avatar
  static ${useScreenUtil ? 'double get' : 'const double'} avatarSize${useScreenUtil ? ' => 40.w' : ' = 40.0'};
  
  /// Large avatar size (64px) - Profile or prominent display
  static ${useScreenUtil ? 'double get' : 'const double'} avatarSizeLarge${useScreenUtil ? ' => 64.w' : ' = 64.0'};

  // ═══════════════════════════════════════════════════════════════════════════
  // 📱 RESPONSIVE BREAKPOINTS
  // ═══════════════════════════════════════════════════════════════════════════
  // Screen size breakpoints for responsive design
  
  /// Mobile breakpoint (600px) - Phone screens
  /// Note: Breakpoints use raw logical pixels (not ScreenUtil-scaled) for correct responsive checks
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
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeDisplayLarge${useScreenUtil ? ' => 57.sp' : ' = 57.0'};
  
  /// Display Medium (45px) - Large headers
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeDisplayMedium${useScreenUtil ? ' => 45.sp' : ' = 45.0'};
  
  /// Display Small (36px) - Section headers
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeDisplaySmall${useScreenUtil ? ' => 36.sp' : ' = 36.0'};
  
  /// Headline Large (32px) - Page titles
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeHeadlineLarge${useScreenUtil ? ' => 32.sp' : ' = 32.0'};
  
  /// Headline Medium (28px) - Card titles
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeHeadlineMedium${useScreenUtil ? ' => 28.sp' : ' = 28.0'};
  
  /// Headline Small (24px) - List headers
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeHeadlineSmall${useScreenUtil ? ' => 24.sp' : ' = 24.0'};
  
  /// Title Large (22px) - App bar titles
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeTitleLarge${useScreenUtil ? ' => 22.sp' : ' = 22.0'};
  
  /// Title Medium (16px) - Button text, tab labels
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeTitleMedium${useScreenUtil ? ' => 16.sp' : ' = 16.0'};
  
  /// Title Small (14px) - List item titles
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeTitleSmall${useScreenUtil ? ' => 14.sp' : ' = 14.0'};
  
  /// Body Large (16px) - Prominent body text
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeBodyLarge${useScreenUtil ? ' => 16.sp' : ' = 16.0'};
  
  /// Body Medium (14px) - Standard body text
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeBodyMedium${useScreenUtil ? ' => 14.sp' : ' = 14.0'};
  
  /// Body Small (12px) - Supporting text
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeBodySmall${useScreenUtil ? ' => 12.sp' : ' = 12.0'};
  
  /// Label Large (14px) - Form labels
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeLabelLarge${useScreenUtil ? ' => 14.sp' : ' = 14.0'};
  
  /// Label Medium (12px) - Caption text
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeLabelMedium${useScreenUtil ? ' => 12.sp' : ' = 12.0'};
  
  /// Label Small (11px) - Small annotations
  static ${useScreenUtil ? 'double get' : 'const double'} fontSizeLabelSmall${useScreenUtil ? ' => 11.sp' : ' = 11.0'};

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎨 HELPER METHODS
  // ═══════════════════════════════════════════════════════════════════════════
  
  /// Get responsive padding based on screen width
  static EdgeInsets getResponsivePadding(double screenWidth) {
    if (screenWidth >= breakpointDesktop) {
      return EdgeInsets.all(spacingXXL);
    } else if (screenWidth >= breakpointTablet) {
      return EdgeInsets.all(spacingXL);
    } else {
      return EdgeInsets.all(spacingMD);
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

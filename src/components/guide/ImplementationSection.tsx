interface ImplementationSectionProps {
  darkMode: boolean
}

export default function ImplementationSection({ darkMode }: ImplementationSectionProps) {
  const implementationSteps = [
    {
      step: "1",
      title: "Download Your Theme Package",
      description: "Generate and download your complete theme bundle",
      code: `// After generating your theme with enhanced features:
1. Click "Download Theme Files" button
2. Save the complete ZIP package to your computer
3. Extract the contents with all enhancements

// Your enhanced download includes:
📁 theme_package/
  ├── 📄 app_theme.dart         # Material 3 compliant theme with 6 variants
  ├── 📄 app_constants.dart     # ScreenUtil-ready design tokens
  ├── 📄 theme_extensions.dart  # Enhanced custom extensions
  ├── 📄 README.md             # Comprehensive implementation guide
  └── 📁 example/              # Complete usage examples
      ├── 📄 main.dart          # ScreenUtil integration example
      └── 📄 sample_widgets.dart # All theme variants demo`,
      language: "text"
    },
    {
      step: "2",
      title: "Project Integration",
      description: "Add theme files to your Flutter project structure",
      code: `# Enhanced project structure with ScreenUtil support:
lib/
  ├── theme/                   # Create this directory
  │   ├── app_theme.dart       # Material 3 theme with all variants
  │   ├── app_constants.dart   # ScreenUtil-ready constants (.sp, .w, .h)
  │   └── theme_extensions.dart # Enhanced custom extensions
  ├── screens/
  ├── widgets/
  └── main.dart

# Alternative structure for larger projects:
lib/
  ├── core/
  │   └── theme/
  │       ├── app_theme.dart    # Complete Material 3 implementation
  │       ├── colors.dart       # 6 theme variants (light/dark/contrast)
  │       ├── typography.dart   # ScreenUtil responsive text
  │       └── spacing.dart      # Responsive spacing constants
  └── features/

# Add ScreenUtil dependency if not already present:
dependencies:
  flutter_screenutil: ^5.9.0`,
      language: "text"
    },
    {
      step: "3",
      title: "Enhanced MaterialApp Configuration",
      description: "Apply your Material 3 theme with ScreenUtil integration",
      code: `import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'theme/app_theme.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812), // Your design reference size
      builder: (context, child) {
        return MaterialApp(
          title: 'My Enhanced Themed App',
          
          // Apply your generated Material 3 themes
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          
          // Optional: Use contrast themes for accessibility
          // theme: AppTheme.lightHighContrastTheme,
          // darkTheme: AppTheme.darkHighContrastTheme,
          
          // Automatic theme switching based on system preference
          themeMode: ThemeMode.system,
          
          home: HomeScreen(),
          debugShowCheckedModeBanner: false,
        );
      },
    );
  }
}`,
      language: "dart"
    },
    {
      step: "4",
      title: "Using Enhanced Theme in Widgets",
      description: "Access theme colors, ScreenUtil constants, and Material 3 styles",
      code: `import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'theme/app_constants.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Container(
      color: colorScheme.surface,
      padding: EdgeInsets.all(AppConstants.spacingMD),
      child: Column(
        children: [
          // M3 buttons inherit styling from AppTheme automatically
          ElevatedButton(
            onPressed: () {},
            child: Text('Themed Button'),
          ),
          FilledButton(
            onPressed: () {},
            child: Text('Filled Button'),
          ),
          Text(
            'Primary Text',
            style: theme.textTheme.headlineMedium?.copyWith(
              color: colorScheme.onSurface,
            ),
          ),
        ],
      ),
    );
  }
}`,
      language: "dart"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Enhanced Implementation Guide
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Complete integration guide for Material 3 themes with ScreenUtil responsive design, accessibility compliance, and all 6 theme variants.
        </p>
      </div>

      <div className="space-y-8">
        {implementationSteps.map((step, index) => (
          <div key={index} className={`relative ${index < implementationSteps.length - 1 ? 'pb-8' : ''}`}>
            {index < implementationSteps.length - 1 && (
              <div 
                className={`absolute left-6 top-12 w-0.5 h-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                style={{ height: 'calc(100% - 2rem)' }}
              />
            )}
            
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${darkMode ? 'bg-blue-900 text-blue-300 border-2 border-blue-700' : 'bg-blue-100 text-blue-900 border-2 border-blue-300'}`}>
                {step.step}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-base mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                  
                  <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
                    <div className={`px-4 py-2 text-xs font-medium border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'}`}>
                      {step.language === 'dart' ? 'Dart Code' : step.language === 'bash' ? 'Terminal' : 'File Structure'}
                    </div>
                    <div className="p-4 font-mono text-sm overflow-x-auto">
                      <pre className={`${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                        {step.code}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ImplementationSectionProps {
  darkMode: boolean
}

export default function ImplementationSection({ darkMode }: ImplementationSectionProps) {
  const implementationSteps = [
    {
      step: "1",
      title: "Download Your Theme Package",
      description: "Generate and download your complete theme bundle",
      code: `// After generating your theme in the preview:
1. Click "Download Theme Files" button
2. Save the ZIP file to your computer
3. Extract the contents

// Your download will include:
📁 theme_package/
  ├── 📄 app_theme.dart         # Main theme configuration
  ├── 📄 app_constants.dart     # Design tokens & constants
  ├── 📄 theme_extensions.dart  # Custom theme extensions
  ├── 📄 README.md             # Implementation guide
  └── 📁 example/              # Usage examples
      ├── 📄 main.dart
      └── 📄 sample_widgets.dart`,
      language: "text"
    },
    {
      step: "2",
      title: "Project Integration",
      description: "Add theme files to your Flutter project structure",
      code: `# Recommended project structure:
lib/
  ├── theme/                   # Create this directory
  │   ├── app_theme.dart       # Copy here
  │   ├── app_constants.dart   # Copy here
  │   └── theme_extensions.dart # Copy here
  ├── screens/
  ├── widgets/
  └── main.dart

# Alternative structure for larger projects:
lib/
  ├── core/
  │   └── theme/
  │       ├── app_theme.dart
  │       ├── colors.dart
  │       ├── typography.dart
  │       └── spacing.dart
  └── features/`,
      language: "text"
    },
    {
      step: "3",
      title: "MaterialApp Configuration",
      description: "Apply your theme to the root MaterialApp widget",
      code: `import 'package:flutter/material.dart';
import 'theme/app_theme.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Themed App',
      
      // Apply your generated themes
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      
      // Automatic theme switching based on system preference
      themeMode: ThemeMode.system,
      
      home: HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}`,
      language: "dart"
    },
    {
      step: "4",
      title: "Using Theme in Widgets",
      description: "Access theme colors and styles in your widgets",
      code: `class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Container(
      color: colorScheme.surface,
      child: Column(
        children: [
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: colorScheme.primary,
              foregroundColor: colorScheme.onPrimary,
            ),
            child: Text('Themed Button'),
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
          Implementation Guide
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Step-by-step guide to integrate your generated theme into your Flutter project.
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

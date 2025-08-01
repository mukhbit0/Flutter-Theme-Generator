import { ThemeConfig, ThemeGeneratorSettings } from '../../types/theme'

/**
 * Generate example main.dart file with ScreenUtil integration
 */
export function generateMainExample(config: ThemeConfig, settings?: ThemeGeneratorSettings): string {
  const themeName = settings?.themeName || 'CustomTheme'
  const useScreenUtil = settings?.useScreenUtil || config.settings?.useScreenUtil || false

  return `import 'package:flutter/material.dart';
${useScreenUtil ? `import 'package:flutter_screenutil/flutter_screenutil.dart';` : ''}
import 'theme/app_theme.dart';

void main() {
  runApp(const ${themeName}App());
}

class ${themeName}App extends StatelessWidget {
  const ${themeName}App({super.key});

  @override
  Widget build(BuildContext context) {
    ${useScreenUtil ? `return ScreenUtilInit(
      designSize: const Size(375, 812), // iPhone X design size
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp(
          title: '${themeName} Example',
          
          // Enhanced Material 3 theme with all variants
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          
          // Optional: Use high contrast themes for accessibility
          // theme: AppTheme.lightHighContrastTheme,
          // darkTheme: AppTheme.darkHighContrastTheme,
          
          // Automatic theme switching based on system preference
          themeMode: ThemeMode.system,
          
          home: const HomeScreen(),
          debugShowCheckedModeBanner: false,
        );
      },
    );` : `return MaterialApp(
      title: '${themeName} Example',
      
      // Enhanced Material 3 theme with all variants
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      
      // Optional: Use high contrast themes for accessibility
      // theme: AppTheme.lightHighContrastTheme,
      // darkTheme: AppTheme.darkHighContrastTheme,
      
      // Automatic theme switching based on system preference
      themeMode: ThemeMode.system,
      
      home: const HomeScreen(),
      debugShowCheckedModeBanner: false,
    );`}
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  bool _isDarkMode = false;

  final List<Widget> _screens = [
    const HomeTab(),
    const ComponentsTab(),
    const SettingsTab(),
  ];

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    ${useScreenUtil ? `final constants = AppConstants(); // ScreenUtil ready constants` : ''}

    return Scaffold(
      appBar: AppBar(
        title: Text('${themeName} Theme Demo'),
        actions: [
          IconButton(
            icon: Icon(_isDarkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: () {
              setState(() {
                _isDarkMode = !_isDarkMode;
              });
            },
            tooltip: 'Toggle theme mode',
          ),
        ],
      ),
      body: _screens[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.widgets_outlined),
            selectedIcon: Icon(Icons.widgets),
            label: 'Components',
          ),
          NavigationDestination(
            icon: Icon(Icons.settings_outlined),
            selectedIcon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}

class HomeTab extends StatelessWidget {
  const HomeTab({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;
    ${useScreenUtil ? `final constants = AppConstants();` : ''}

    return SingleChildScrollView(
      padding: EdgeInsets.all(${useScreenUtil ? 'constants.paddingLarge' : '16.0'}),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Welcome Card
          Card(
            child: Padding(
              padding: EdgeInsets.all(${useScreenUtil ? 'constants.paddingLarge' : '20.0'}),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome to ${themeName}!',
                    style: textTheme.headlineMedium?.copyWith(
                      color: colorScheme.primary,
                    ),
                  ),
                  SizedBox(height: ${useScreenUtil ? 'constants.spacingMedium' : '12.0'}),
                  Text(
                    'This is a demo app showcasing your custom Material 3 theme with all color variants and enhanced accessibility features.',
                    style: textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ),

          SizedBox(height: ${useScreenUtil ? 'constants.spacingLarge' : '24.0'}),

          // Color Showcase
          Text(
            'Color Palette',
            style: textTheme.headlineSmall,
          ),
          SizedBox(height: ${useScreenUtil ? 'constants.spacingMedium' : '16.0'}),
          
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            crossAxisSpacing: ${useScreenUtil ? 'constants.spacingMedium' : '12.0'},
            mainAxisSpacing: ${useScreenUtil ? 'constants.spacingMedium' : '12.0'},
            childAspectRatio: 3,
            children: [
              _ColorTile('Primary', colorScheme.primary),
              _ColorTile('Secondary', colorScheme.secondary),
              _ColorTile('Tertiary', colorScheme.tertiary),
              _ColorTile('Surface', colorScheme.surface),
            ],
          ),
        ],
      ),
    );
  }
}

class _ColorTile extends StatelessWidget {
  final String name;
  final Color color;

  const _ColorTile(this.name, this.color);

  @override
  Widget build(BuildContext context) {
    final isDark = color.computeLuminance() < 0.5;
    
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(${useScreenUtil ? 'AppConstants().borderRadiusMedium' : '8.0'}),
      ),
      child: Center(
        child: Text(
          name,
          style: TextStyle(
            color: isDark ? Colors.white : Colors.black,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

class ComponentsTab extends StatelessWidget {
  const ComponentsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('See sample_widgets.dart for comprehensive widget examples'),
    );
  }
}

class SettingsTab extends StatelessWidget {
  const SettingsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Settings tab - customize as needed'),
    );
  }
}
`
}

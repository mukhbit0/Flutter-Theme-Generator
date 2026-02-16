import { ThemeConfig, ThemeGeneratorSettings } from '../../types/theme'

/**
 * Generate sample widgets file demonstrating all theme variants
 */
export function generateSampleWidgetsExample(config: ThemeConfig, settings?: ThemeGeneratorSettings): string {
  const useScreenUtil = settings?.useScreenUtil || config.settings?.useScreenUtil || false

  return `import 'package:flutter/material.dart';
${useScreenUtil ? `import 'package:flutter_screenutil/flutter_screenutil.dart';` : ''}
import '../theme/app_theme.dart';
${useScreenUtil ? `import '../theme/app_constants.dart';` : ''}

/// Sample widgets demonstrating all Material 3 theme variants
class ThemeVariantDemo extends StatefulWidget {
  const ThemeVariantDemo({super.key});

  @override
  State<ThemeVariantDemo> createState() => _ThemeVariantDemoState();
}

class _ThemeVariantDemoState extends State<ThemeVariantDemo> {
  String _currentTheme = 'light';

  final Map<String, ThemeData> _themes = {
    'light': AppTheme.lightTheme,
    'lightMediumContrast': AppTheme.lightMediumContrast,
    'lightHighContrast': AppTheme.lightHighContrast,
    'dark': AppTheme.darkTheme,
    'darkMediumContrast': AppTheme.darkMediumContrast,
    'darkHighContrast': AppTheme.darkHighContrast,
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Theme Variants Demo',
      theme: _themes[_currentTheme],
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Text('Material 3 Theme Variants'),
          centerTitle: true,
          actions: [
            PopupMenuButton<String>(
              icon: Icon(Icons.palette),
              onSelected: (String theme) {
                setState(() {
                  _currentTheme = theme;
                });
              },
              itemBuilder: (BuildContext context) {
                return _themes.keys.map((String theme) {
                  return PopupMenuItem<String>(
                    value: theme,
                    child: Text(_formatThemeName(theme)),
                  );
                }).toList();
              },
            ),
          ],
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildCurrentThemeInfo(),
              SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingLG' : '24.0'}),
              _buildButtonsSection(),
              SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingLG' : '24.0'}),
              _buildCardsSection(),
              SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingLG' : '24.0'}),
              _buildFormsSection(),
              SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingLG' : '24.0'}),
              _buildProgressSection(),
              SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingLG' : '24.0'}),
              _buildTypographySection(),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Theme: \${_formatThemeName(_currentTheme)}'),
              ),
            );
          },
          child: Icon(Icons.info),
        ),
      ),
    );
  }

  Widget _buildCurrentThemeInfo() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Card(
      child: Padding(
        padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Current Theme: \${_formatThemeName(_currentTheme)}',
              style: theme.textTheme.headlineSmall,
            ),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'}),
            Text(
              'This demonstrates the Material 3 theme system with all variants including accessibility-focused contrast modes.',
              style: theme.textTheme.bodyMedium,
            ),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            Wrap(
              spacing: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'},
              children: [
                _buildColorChip('Primary', colorScheme.primary),
                _buildColorChip('Secondary', colorScheme.secondary),
                _buildColorChip('Tertiary', colorScheme.tertiary),
                _buildColorChip('Surface', colorScheme.surface),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildColorChip(String label, Color color) {
    return Chip(
      label: Text(label),
      backgroundColor: color,
      labelStyle: TextStyle(
        color: ThemeData.estimateBrightnessForColor(color) == Brightness.light
            ? Colors.black87
            : Colors.white,
        fontSize: ${useScreenUtil ? 'AppConstants.fontSizeBodySmall' : '12.0'},
      ),
    );
  }

  Widget _buildButtonsSection() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Buttons', style: Theme.of(context).textTheme.titleLarge),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            Wrap(
              spacing: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'},
              runSpacing: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'},
              children: [
                ElevatedButton(
                  onPressed: () {},
                  child: Text('Elevated'),
                ),
                FilledButton(
                  onPressed: () {},
                  child: Text('Filled'),
                ),
                OutlinedButton(
                  onPressed: () {},
                  child: Text('Outlined'),
                ),
                TextButton(
                  onPressed: () {},
                  child: Text('Text'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCardsSection() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Cards & Surfaces', style: Theme.of(context).textTheme.titleLarge),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            Row(
              children: [
                Expanded(
                  child: Card(
                    elevation: 1,
                    child: Padding(
                      padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingSM' : '12.0'}),
                      child: Column(
                        children: [
                          Icon(Icons.lightbulb_outline, size: ${useScreenUtil ? '32.w' : '32.0'}),
                          SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'}),
                          Text('Elevation 1', style: Theme.of(context).textTheme.bodySmall),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(width: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'}),
                Expanded(
                  child: Card(
                    elevation: 3,
                    child: Padding(
                      padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingSM' : '12.0'}),
                      child: Column(
                        children: [
                          Icon(Icons.star_outline, size: ${useScreenUtil ? '32.w' : '32.0'}),
                          SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'}),
                          Text('Elevation 3', style: Theme.of(context).textTheme.bodySmall),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFormsSection() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Form Controls', style: Theme.of(context).textTheme.titleLarge),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            TextField(
              decoration: InputDecoration(
                labelText: 'Text Field',
                hintText: 'Enter some text',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            Row(
              children: [
                Checkbox(value: true, onChanged: (value) {}),
                Text('Checkbox'),
                SizedBox(width: ${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
                Radio(value: 1, groupValue: 1, onChanged: (value) {}),
                Text('Radio'),
                SizedBox(width: ${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
                Switch(value: true, onChanged: (value) {}),
                Text('Switch'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressSection() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Progress Indicators', style: Theme.of(context).textTheme.titleLarge),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            LinearProgressIndicator(value: 0.7),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            Row(
              children: [
                CircularProgressIndicator(value: 0.7),
                SizedBox(width: ${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
                Expanded(
                  child: Text(
                    'Progress indicators using theme colors',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTypographySection() {
    final textTheme = Theme.of(context).textTheme;
    
    return Card(
      child: Padding(
        padding: EdgeInsets.all(${useScreenUtil ? 'AppConstants.spacingMD' : '16.0'}),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Typography Scale', style: textTheme.titleLarge),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingMD' : '12.0'}),
            Text('Display Large', style: textTheme.displayLarge),
            Text('Headline Medium', style: textTheme.headlineMedium),
            Text('Title Large', style: textTheme.titleLarge),
            Text('Body Large', style: textTheme.bodyLarge),
            Text('Body Medium', style: textTheme.bodyMedium),
            Text('Label Large', style: textTheme.labelLarge),
            SizedBox(height: ${useScreenUtil ? 'AppConstants.spacingSM' : '8.0'}),
            Text(
              'All text styles automatically adapt to the current theme variant.',
              style: textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }

  String _formatThemeName(String theme) {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'lightMediumContrast':
        return 'Light (Medium Contrast)';
      case 'lightHighContrast':
        return 'Light (High Contrast)';
      case 'dark':
        return 'Dark';
      case 'darkMediumContrast':
        return 'Dark (Medium Contrast)';
      case 'darkHighContrast':
        return 'Dark (High Contrast)';
      default:
        return theme;
    }
  }
}

/// Example usage in your main app
class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Theme Demo',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: const ThemeVariantDemo(),
      debugShowCheckedModeBanner: false,
    );
  }
}
`;
}

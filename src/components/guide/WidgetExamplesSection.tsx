interface WidgetExamplesSectionProps {
  darkMode: boolean
}

export default function WidgetExamplesSection({ darkMode }: WidgetExamplesSectionProps) {
  const examples = [
    {
      category: "Material Buttons",
      description: "All button types with theme integration and visual previews",
      widgets: [
        {
          title: "Enhanced ElevatedButton",
          description: "Material 3 primary action button with ScreenUtil responsive design",
          code: `import 'theme/app_constants.dart';

// M3 buttons inherit styling from AppTheme automatically!
// Just use them directly - no styleFrom needed:
ElevatedButton(
  onPressed: () {
    // Handle button press
  },
  child: Text('Primary Action'),
)

// For custom state-aware styling, use ButtonStyle + WidgetStateProperty:
ElevatedButton(
  onPressed: () {},
  style: ButtonStyle(
    backgroundColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.12);
      }
      return Theme.of(context).colorScheme.primary;
    }),
    padding: WidgetStateProperty.all(
      EdgeInsets.symmetric(
        horizontal: AppConstants.spacingLG,
        vertical: AppConstants.spacingMD,
      ),
    ),
    shape: WidgetStateProperty.all(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppConstants.radiusMD),
      ),
    ),
  ),
  child: Text('Custom Action'),
)`
        },
        {
          title: "OutlinedButton",
          description: "Secondary action button with border outline",
          code: `// OutlinedButton inherits M3 styling from AppTheme
OutlinedButton(
  onPressed: () {
    // Handle button press
  },
  child: Text('Secondary Action'),
)

// Custom state-aware styling:
OutlinedButton(
  onPressed: () {},
  style: ButtonStyle(
    foregroundColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.38);
      }
      return Theme.of(context).colorScheme.primary;
    }),
    side: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return BorderSide(color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.12));
      }
      return BorderSide(color: Theme.of(context).colorScheme.outline);
    }),
  ),
  child: Text('Custom Outlined'),
)`
        },
        {
          title: "TextButton",
          description: "Minimalist text-only button for tertiary actions",
          code: `// TextButton inherits M3 styling from AppTheme
TextButton(
  onPressed: () {
    // Handle button press
  },
  child: Text('Text Action'),
)

// Custom state-aware styling:
TextButton(
  onPressed: () {},
  style: ButtonStyle(
    foregroundColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) {
        return Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.38);
      }
      return Theme.of(context).colorScheme.primary;
    }),
  ),
  child: Text('Custom Text'),
)`
        },
        {
          title: "IconButton",
          description: "Circular button with icon for compact actions",
          code: `IconButton(
  onPressed: () {
    // Handle icon press
  },
  icon: Icon(
    Icons.favorite,
    color: Theme.of(context).colorScheme.primary,
  ),
  tooltip: 'Add to favorites',
)`
        },
        {
          title: "FloatingActionButton",
          description: "Prominent action button floating above content",
          code: `FloatingActionButton(
  onPressed: () {
    // Handle FAB press
  },
  backgroundColor: Theme.of(context).colorScheme.primary,
  foregroundColor: Theme.of(context).colorScheme.onPrimary,
  child: Icon(Icons.add),
)`
        }
      ]
    },
    {
      category: "Navigation Components",
      description: "App bars, navigation rails, and drawer components",
      widgets: [
        {
          title: "AppBar",
          description: "Top application bar with title and actions",
          code: `AppBar(
  title: Text('App Title'),
  backgroundColor: Theme.of(context).colorScheme.primary,
  foregroundColor: Theme.of(context).colorScheme.onPrimary,
  elevation: 4,
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {
        // Handle search
      },
    ),
    IconButton(
      icon: Icon(Icons.more_vert),
      onPressed: () {
        // Handle menu
      },
    ),
  ],
)`,
          preview: "Top bar with title, search, and menu icons"
        },
        {
          title: "BottomNavigationBar",
          description: "Bottom navigation with multiple tabs",
          code: `BottomNavigationBar(
  type: BottomNavigationBarType.fixed,
  selectedItemColor: Theme.of(context).colorScheme.primary,
  unselectedItemColor: Theme.of(context).colorScheme.outline,
  backgroundColor: Theme.of(context).colorScheme.surface,
  items: [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.search),
      label: 'Search',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.favorite),
      label: 'Favorites',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: 'Profile',
    ),
  ],
)`,
          preview: "Bottom navigation bar with 4 tabs"
        },
        {
          title: "NavigationRail",
          description: "Side navigation for larger screens",
          code: `NavigationRail(
  selectedIndex: _selectedIndex,
  onDestinationSelected: (int index) {
    setState(() {
      _selectedIndex = index;
    });
  },
  labelType: NavigationRailLabelType.all,
  backgroundColor: Theme.of(context).colorScheme.surface,
  selectedIconTheme: IconThemeData(
    color: Theme.of(context).colorScheme.primary,
  ),
  destinations: [
    NavigationRailDestination(
      icon: Icon(Icons.home_outlined),
      selectedIcon: Icon(Icons.home),
      label: Text('Home'),
    ),
    NavigationRailDestination(
      icon: Icon(Icons.search_outlined),
      selectedIcon: Icon(Icons.search),
      label: Text('Search'),
    ),
  ],
)`,
          preview: "Vertical navigation rail for desktop layouts"
        }
      ]
    },
    {
      category: "Form Controls & Input",
      description: "Text fields, dropdowns, checkboxes, and form validation",
      widgets: [
        {
          title: "TextField",
          description: "Primary text input field with decoration",
          code: `TextField(
  decoration: InputDecoration(
    labelText: 'Email Address',
    hintText: 'Enter your email',
    prefixIcon: Icon(
      Icons.email,
      color: Theme.of(context).colorScheme.primary,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(
        color: Theme.of(context).colorScheme.outline,
      ),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(
        color: Theme.of(context).colorScheme.primary,
        width: 2,
      ),
    ),
  ),
)`,
          preview: "Outlined text field with email icon and label"
        },
        {
          title: "DropdownButton",
          description: "Dropdown selection with theme colors",
          code: `DropdownButton<String>(
  value: dropdownValue,
  onChanged: (String? newValue) {
    setState(() {
      dropdownValue = newValue!;
    });
  },
  style: TextStyle(
    color: Theme.of(context).colorScheme.onSurface,
  ),
  dropdownColor: Theme.of(context).colorScheme.surface,
  items: <String>['Option 1', 'Option 2', 'Option 3']
      .map<DropdownMenuItem<String>>((String value) {
    return DropdownMenuItem<String>(
      value: value,
      child: Text(value),
    );
  }).toList(),
)`,
          preview: "Dropdown menu with selectable options"
        },
        {
          title: "Checkbox",
          description: "Themed checkbox for boolean selections",
          code: `Checkbox(
  value: isChecked,
  onChanged: (bool? value) {
    setState(() {
      isChecked = value ?? false;
    });
  },
  activeColor: Theme.of(context).colorScheme.primary,
  checkColor: Theme.of(context).colorScheme.onPrimary,
)`,
          preview: "Themed checkbox with primary color"
        },
        {
          title: "Switch",
          description: "Toggle switch with theme integration",
          code: `Switch(
  value: isSwitched,
  onChanged: (bool value) {
    setState(() {
      isSwitched = value;
    });
  },
  activeColor: Theme.of(context).colorScheme.primary,
  activeTrackColor: Theme.of(context).colorScheme.primaryContainer,
)`,
          preview: "Toggle switch with smooth animation"
        },
        {
          title: "Slider",
          description: "Range slider with theme colors",
          code: `Slider(
  value: _currentSliderValue,
  min: 0,
  max: 100,
  divisions: 10,
  label: _currentSliderValue.round().toString(),
  activeColor: Theme.of(context).colorScheme.primary,
  inactiveColor: Theme.of(context).colorScheme.outline,
  onChanged: (double value) {
    setState(() {
      _currentSliderValue = value;
    });
  },
)`,
          preview: "Horizontal slider with value indicator"
        }
      ]
    },
    {
      category: "Cards & Surfaces",
      description: "Container widgets with elevation and theming",
      widgets: [
        {
          title: "Card",
          description: "Material card with content and actions",
          code: `Card(
  color: Theme.of(context).colorScheme.surface,
  elevation: 4,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Card Title',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 8),
        Text(
          'This is the card content. It can contain any widgets.',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
        SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            TextButton(
              onPressed: () {},
              child: Text('Cancel'),
            ),
            SizedBox(width: 8),
            ElevatedButton(
              onPressed: () {},
              child: Text('Action'),
            ),
          ],
        ),
      ],
    ),
  ),
)`,
          preview: "Elevated card with title, content, and action buttons"
        },
        {
          title: "Container",
          description: "Themed container with decoration",
          code: `Container(
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Theme.of(context).colorScheme.primaryContainer,
    borderRadius: BorderRadius.circular(8),
    border: Border.all(
      color: Theme.of(context).colorScheme.outline,
      width: 1,
    ),
  ),
  child: Text(
    'Themed Container',
    style: TextStyle(
      color: Theme.of(context).colorScheme.onPrimaryContainer,
    ),
  ),
)`,
          preview: "Decorated container with border and background"
        },
        {
          title: "ListTile",
          description: "List item with leading, title, and trailing widgets",
          code: `ListTile(
  leading: CircleAvatar(
    backgroundColor: Theme.of(context).colorScheme.primary,
    child: Icon(
      Icons.person,
      color: Theme.of(context).colorScheme.onPrimary,
    ),
  ),
  title: Text(
    'List Item Title',
    style: TextStyle(
      color: Theme.of(context).colorScheme.onSurface,
    ),
  ),
  subtitle: Text(
    'Subtitle or description',
    style: TextStyle(
      color: Theme.of(context).colorScheme.onSurfaceVariant,
    ),
  ),
  trailing: Icon(
    Icons.arrow_forward_ios,
    color: Theme.of(context).colorScheme.outline,
  ),
  onTap: () {
    // Handle tap
  },
)`,
          preview: "List tile with avatar, text, and arrow icon"
        }
      ]
    },
    {
      category: "Progress Indicators",
      description: "Loading states and progress visualization",
      widgets: [
        {
          title: "CircularProgressIndicator",
          description: "Circular loading indicator",
          code: `CircularProgressIndicator(
  valueColor: AlwaysStoppedAnimation<Color>(
    Theme.of(context).colorScheme.primary,
  ),
  backgroundColor: Theme.of(context).colorScheme.outline.withOpacity(0.2),
)`,
          preview: "Spinning circular progress indicator"
        },
        {
          title: "LinearProgressIndicator",
          description: "Linear progress bar",
          code: `LinearProgressIndicator(
  value: 0.7, // 70% progress
  valueColor: AlwaysStoppedAnimation<Color>(
    Theme.of(context).colorScheme.primary,
  ),
  backgroundColor: Theme.of(context).colorScheme.outline.withOpacity(0.2),
)`,
          preview: "Horizontal progress bar showing 70% completion"
        }
      ]
    },
    {
      category: "Dialogs & Overlays",
      description: "Modal dialogs and overlay components",
      widgets: [
        {
          title: "AlertDialog",
          description: "Modal dialog for alerts and confirmations",
          code: `AlertDialog(
  backgroundColor: Theme.of(context).colorScheme.surface,
  title: Text(
    'Confirm Action',
    style: TextStyle(
      color: Theme.of(context).colorScheme.onSurface,
    ),
  ),
  content: Text(
    'Are you sure you want to proceed with this action?',
    style: TextStyle(
      color: Theme.of(context).colorScheme.onSurfaceVariant,
    ),
  ),
  actions: [
    TextButton(
      onPressed: () => Navigator.pop(context),
      child: Text('Cancel'),
    ),
    ElevatedButton(
      onPressed: () {
        // Handle confirm
        Navigator.pop(context);
      },
      child: Text('Confirm'),
    ),
  ],
)`,
          preview: "Alert dialog with title, content, and action buttons"
        },
        {
          title: "SnackBar",
          description: "Temporary message overlay",
          code: `SnackBar(
  content: Text(
    'Action completed successfully!',
    style: TextStyle(
      color: Theme.of(context).colorScheme.onInverseSurface,
    ),
  ),
  backgroundColor: Theme.of(context).colorScheme.inverseSurface,
  action: SnackBarAction(
    label: 'Undo',
    textColor: Theme.of(context).colorScheme.primary,
    onPressed: () {
      // Handle undo
    },
  ),
)`,
          preview: "Bottom snackbar with message and action button"
        }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Material 3 Widget Examples
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Complete Material 3 Flutter widgets with ScreenUtil integration, enhanced theme support, and accessibility compliance examples.
        </p>
      </div>

      <div className="space-y-12">
        {examples.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-6">
            {/* Category Header */}
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'}`}>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                {category.category}
              </h3>
              <p className={`text-base ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                {category.description}
              </p>
            </div>

            {/* Widget Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {category.widgets.map((widget, widgetIndex) => (
                <div key={widgetIndex} className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
                  {/* Widget Header */}
                  <div className="mb-4">
                    <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {widget.title}
                    </h4>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {widget.description}
                    </p>
                    
                    {/* Visual Widget Preview */}
                    <div className={`p-4 rounded-lg border mb-4 ${darkMode ? 'bg-gray-900/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-center">
                        {widget.title === 'ElevatedButton' && (
                          <button className={`px-6 py-3 rounded-lg font-medium shadow-lg transition-all ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                            Primary Action
                          </button>
                        )}
                        {widget.title === 'OutlinedButton' && (
                          <button className={`px-6 py-3 rounded-lg font-medium border-2 transition-all ${darkMode ? 'border-blue-500 text-blue-400 hover:bg-blue-900/20' : 'border-blue-500 text-blue-600 hover:bg-blue-50'}`}>
                            Secondary Action
                          </button>
                        )}
                        {widget.title === 'TextButton' && (
                          <button className={`px-6 py-3 rounded-lg font-medium transition-all ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'}`}>
                            Text Action
                          </button>
                        )}
                        {widget.title === 'IconButton' && (
                          <button className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'}`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                        {widget.title === 'FloatingActionButton' && (
                          <button className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        )}
                        {widget.title === 'AppBar' && (
                          <div className={`w-full max-w-sm rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-blue-800' : 'bg-blue-600'}`}>
                            <div className="flex items-center justify-between px-4 py-3 text-white">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <span className="font-medium">App Title</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        {widget.title === 'BottomNavigationBar' && (
                          <div className={`w-full max-w-sm rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                            <div className="flex items-center justify-around py-3">
                              {['Home', 'Search', 'Favorites', 'Profile'].map((item, idx) => (
                                <div key={item} className={`flex flex-col items-center space-y-1 ${idx === 0 ? (darkMode ? 'text-blue-400' : 'text-blue-600') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-xs">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {widget.title === 'NavigationRail' && (
                          <div className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                            <div className="flex flex-col items-center py-4 space-y-4 px-3">
                              {['Home', 'Search'].map((item, idx) => (
                                <div key={item} className={`flex flex-col items-center space-y-1 p-2 rounded ${idx === 0 ? (darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600') : (darkMode ? 'text-gray-500 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-50')}`}>
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-xs">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {widget.title === 'TextField' && (
                          <div className="w-full max-w-sm">
                            <div className={`relative rounded-lg border-2 ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'} transition-colors focus-within:border-blue-500`}>
                              <div className="flex items-center px-3 py-3">
                                <svg className={`w-5 h-5 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input 
                                  type="text" 
                                  placeholder="Enter your email"
                                  className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                                />
                              </div>
                              <label className={`absolute -top-2 left-3 px-1 text-xs ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-white text-blue-500'}`}>
                                Email Address
                              </label>
                            </div>
                          </div>
                        )}
                        {widget.title === 'DropdownButton' && (
                          <div className={`w-full max-w-sm rounded-lg border px-4 py-3 flex items-center justify-between cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
                            <span>Option 1</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                        {widget.title === 'Checkbox' && (
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${darkMode ? 'border-blue-400 bg-blue-600' : 'border-blue-500 bg-blue-500'}`}>
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Checkbox Option</span>
                          </label>
                        )}
                        {widget.title === 'Switch' && (
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <div className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                              <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform"></div>
                            </div>
                            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Toggle Switch</span>
                          </label>
                        )}
                        {widget.title === 'Slider' && (
                          <div className="w-full max-w-sm">
                            <div className={`relative h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                              <div className={`absolute left-0 top-0 h-2 rounded-full w-3/5 ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
                              <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full shadow ${darkMode ? 'bg-blue-500 border-2 border-white' : 'bg-blue-500 border-2 border-white'}`} style={{ left: '60%', marginLeft: '-8px' }}></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>0</span>
                              <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>60</span>
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>100</span>
                            </div>
                          </div>
                        )}
                        {widget.title === 'Card' && (
                          <div className={`w-full max-w-sm rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                            <div className="p-6">
                              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Card Title
                              </h3>
                              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                This is the card content with some description text.
                              </p>
                              <div className="flex justify-end space-x-2">
                                <button className={`px-3 py-1 text-sm ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} rounded`}>
                                  Cancel
                                </button>
                                <button className={`px-4 py-1 text-sm text-white rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
                                  Action
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        {widget.title === 'Container' && (
                          <div className={`w-full max-w-sm p-4 rounded-lg border-2 ${darkMode ? 'bg-blue-900/20 border-blue-700/50 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                            <span className="text-sm font-medium">Themed Container</span>
                          </div>
                        )}
                        {widget.title === 'ListTile' && (
                          <div className={`w-full max-w-sm p-4 rounded-lg flex items-center space-x-3 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>List Item Title</h4>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subtitle or description</p>
                            </div>
                            <svg className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                        {widget.title === 'CircularProgressIndicator' && (
                          <div className="flex items-center justify-center">
                            <div className={`w-8 h-8 border-4 border-t-transparent rounded-full animate-spin ${darkMode ? 'border-blue-400' : 'border-blue-500'}`}></div>
                          </div>
                        )}
                        {widget.title === 'LinearProgressIndicator' && (
                          <div className="w-full max-w-sm">
                            <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                              <div className={`h-full w-3/4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'} transition-all duration-300`}></div>
                            </div>
                            <p className={`text-xs mt-1 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>70% Complete</p>
                          </div>
                        )}
                        {widget.title === 'AlertDialog' && (
                          <div className={`w-full max-w-sm rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                            <div className="p-6">
                              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Confirm Action
                              </h3>
                              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Are you sure you want to proceed?
                              </p>
                              <div className="flex justify-end space-x-2">
                                <button className={`px-3 py-1 text-sm ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} rounded`}>
                                  Cancel
                                </button>
                                <button className={`px-4 py-1 text-sm text-white rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        {widget.title === 'SnackBar' && (
                          <div className={`w-full max-w-sm rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'}`}>
                            <div className="flex items-center justify-between p-4">
                              <span className="text-sm">Action completed successfully!</span>
                              <button className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-300'}`}>
                                Undo
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className={`rounded-lg ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'} overflow-hidden`}>
                    <div className={`px-4 py-2 text-xs font-medium border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'}`}>
                      Flutter Dart Code
                    </div>
                    <div className="p-4 font-mono text-xs overflow-x-auto">
                      <pre className={`${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                        {widget.code}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Tips Section */}
      <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-700/50' : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
          💡 Widget Integration Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              Theme Access
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Use Theme.of(context).colorScheme to access theme colors in any widget.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              Consistency
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Always use theme colors instead of hardcoded values for better consistency.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              Accessibility
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Theme colors ensure proper contrast ratios for accessibility compliance.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              Dark Mode
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Using theme colors automatically supports both light and dark modes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

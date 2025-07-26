interface ThemePreviewSectionProps {
  darkMode: boolean
}

export default function ThemePreviewSection({ darkMode }: ThemePreviewSectionProps) {
  const previewFeatures = [
    {
      title: "🎨 Live Color Preview",
      description: "Real-time color changes as you adjust theme settings",
      details: [
        "Instant visual feedback for color modifications",
        "Preview all color variants (primary, secondary, accent)",
        "See color relationships and harmonies",
        "Test color accessibility and contrast ratios"
      ]
    },
    {
      title: "🌙 Dark/Light Mode Toggle",
      description: "Preview your theme in both light and dark modes",
      details: [
        "Seamless switching between modes",
        "Automatic color inversion and adaptation",
        "Consistent design language across modes",
        "Accessibility compliance in both themes"
      ]
    },
    {
      title: "📱 Interactive Widget Showcase",
      description: "See your theme applied to real Flutter widgets",
      details: [
        "Material Design buttons and controls",
        "Navigation components (AppBar, BottomNav)",
        "Form elements (TextField, Dropdown, Checkbox)",
        "Cards, dialogs, and surface elements"
      ]
    },
    {
      title: "✍️ Typography Preview",
      description: "Complete text style hierarchy with your theme",
      details: [
        "Display Large, Medium, Small variants",
        "Headline and Title text styles",
        "Body and Label text variations",
        "Custom font family integration"
      ]
    },
    {
      title: "🎛️ Interactive Components",
      description: "Test component states and interactions",
      details: [
        "Button hover and pressed states",
        "Form validation and error states",
        "Loading and disabled component states",
        "Focus indicators and accessibility"
      ]
    }
  ]

  const checklistItems = [
    {
      category: "Color Harmony",
      items: [
        "Primary colors complement each other",
        "Sufficient contrast for text readability",
        "Consistent color temperature across palette",
        "Brand colors accurately represented"
      ]
    },
    {
      category: "Accessibility",
      items: [
        "Text contrast ratio meets WCAG AA standards (4.5:1)",
        "Interactive elements have clear focus indicators",
        "Color is not the only way to convey information",
        "UI elements are distinguishable in both light/dark modes"
      ]
    },
    {
      category: "Visual Consistency",
      items: [
        "Button styles are consistent across the app",
        "Typography hierarchy is clear and readable",
        "Spacing and padding feel balanced",
        "Surface elevations create proper depth"
      ]
    },
    {
      category: "Brand Alignment",
      items: [
        "Colors reflect your brand identity",
        "Overall feel matches brand personality",
        "Logo colors integrate well with theme",
        "Design language supports brand values"
      ]
    }
  ]

  const previewModes = [
    {
      mode: "🎯 Component Focus",
      description: "Isolated widget testing",
      use: "Test individual components like buttons, cards, and form elements in isolation to ensure proper theming."
    },
    {
      mode: "📄 Screen Layout",
      description: "Full screen composition",
      use: "Preview complete screen layouts to see how components work together and maintain visual hierarchy."
    },
    {
      mode: "🔄 State Variations",
      description: "Interactive state testing",
      use: "Test hover, pressed, focused, and disabled states to ensure consistent behavior across all interactions."
    },
    {
      mode: "📊 Data Visualization",
      description: "Charts and graphics preview",
      use: "See how your theme colors work with data visualization components like charts, graphs, and progress indicators."
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Theme Preview Guide
        </h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Master the theme preview system to perfect your Flutter app design before implementation.
        </p>
      </div>

      {/* Preview Features */}
      <div className="space-y-6">
        <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Preview Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewFeatures.map((feature, index) => (
            <div key={index} className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'}`}>
              <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h4>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
              <ul className={`space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-2">
                    <span className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modes */}
      <div className="space-y-6">
        <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Preview Modes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewModes.map((mode, index) => (
            <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                {mode.mode}
              </h4>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {mode.description}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-medium">Use case: </span>
                {mode.use}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Checklist */}
      <div className="space-y-6">
        <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Design Quality Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklistItems.map((category, index) => (
            <div key={index} className={`p-6 rounded-xl border ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700/50' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                {category.category}
              </h4>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <label key={itemIndex} className="flex items-start space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className={`mt-1 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                    <span className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-700/50' : 'bg-gradient-to-r from-green-50 to-teal-50 border border-green-200'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
          💡 Pro Preview Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              🔍 Detail Focus
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Zoom into specific components to check pixel-perfect alignment and spacing.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              🌈 Color Context
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Test colors against different backgrounds to ensure they work in all contexts.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              📱 Device Testing
            </h4>
            <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-700'}`}>
              Consider how the theme will look on different screen sizes and densities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

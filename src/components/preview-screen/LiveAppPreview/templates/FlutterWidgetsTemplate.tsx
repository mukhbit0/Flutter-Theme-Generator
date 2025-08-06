interface FlutterWidgetsTemplateProps {
  theme: any
  darkMode: boolean
  onInteraction: (action: string, data?: any) => void
}

export default function FlutterWidgetsTemplate({ theme, darkMode, onInteraction }: FlutterWidgetsTemplateProps) {
  const bgColor = darkMode ? theme.surface : theme.surfaceVariant

  const handleButtonPress = (buttonType: string) => {
    onInteraction('button_press', { buttonType })
  }

  const handleTabPress = (tab: string) => {
    onInteraction('tab_press', { tab })
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: bgColor }}>
      {/* App Bar - Fixed Header */}
      <div 
        className="flex-shrink-0 px-4 py-3 shadow-sm"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.onPrimary + '20' }}
            >
              <svg className="w-5 h-5" style={{ color: theme.onPrimary }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold" style={{ color: theme.onPrimary }}>
              Flutter App
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleButtonPress('search')}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black hover:bg-opacity-10"
              style={{ color: theme.onPrimary }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => handleButtonPress('more')}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black hover:bg-opacity-10"
              style={{ color: theme.onPrimary }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar - Fixed */}
      <div 
        className="flex-shrink-0 border-b"
        style={{ 
          backgroundColor: theme.surface,
          borderColor: theme.outlineVariant
        }}
      >
        <div className="flex">
          {['Home', 'Explore', 'Profile'].map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabPress(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                index === 0 ? 'border-b-2' : ''
              }`}
              style={{
                color: index === 0 ? theme.primary : theme.onSurfaceVariant,
                borderColor: index === 0 ? theme.primary : 'transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Welcome Section */}
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.primaryContainer }}
          >
            <h2 className="text-lg font-bold mb-2" style={{ color: theme.onPrimaryContainer }}>
              Welcome to Flutter!
            </h2>
            <p className="text-sm" style={{ color: theme.onPrimaryContainer }}>
              Experience the beauty of Material Design 3 themes
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold" style={{ color: theme.onSurface }}>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleButtonPress('elevated')}
                className="p-3 rounded-lg shadow-sm transition-shadow hover:shadow-md"
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.onPrimary
                }}
              >
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Create</span>
                </div>
              </button>
              
              <button
                onClick={() => handleButtonPress('outlined')}
                className="p-3 rounded-lg border transition-colors hover:bg-opacity-10"
                style={{ 
                  borderColor: theme.outline,
                  color: theme.primary,
                  backgroundColor: 'transparent'
                }}
              >
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full border border-current flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Browse</span>
                </div>
              </button>
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold" style={{ color: theme.onSurface }}>
              Recent Items
            </h3>
            <div className="space-y-2">
              {[
                { title: 'Flutter Documentation', subtitle: 'Learn Flutter development', icon: '📚' },
                { title: 'Material Design 3', subtitle: 'Design system guidelines', icon: '🎨' },
                { title: 'Dart Language', subtitle: 'Programming language for Flutter', icon: '⚡' },
                { title: 'Widget Catalog', subtitle: 'Explore Flutter widgets', icon: '🧩' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonPress(`list_item_${index}`)}
                  className="w-full p-3 rounded-lg transition-colors hover:bg-opacity-10 hover:bg-gray-500"
                  style={{ backgroundColor: theme.surfaceContainer }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: theme.secondaryContainer }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm" style={{ color: theme.onSurface }}>
                        {item.title}
                      </div>
                      <div className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                        {item.subtitle}
                      </div>
                    </div>
                    <svg 
                      className="w-5 h-5" 
                      style={{ color: theme.onSurfaceVariant }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Section */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold" style={{ color: theme.onSurface }}>
              Featured Content
            </h3>
            <div 
              className="p-4 rounded-lg shadow-sm"
              style={{ backgroundColor: theme.surfaceContainerHigh }}
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: theme.tertiaryContainer }}
                >
                  <svg 
                    className="w-6 h-6" 
                    style={{ color: theme.onTertiaryContainer }}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1" style={{ color: theme.onSurface }}>
                    Theme Generator Ready
                  </h4>
                  <p className="text-xs mb-3" style={{ color: theme.onSurfaceVariant }}>
                    Your Flutter theme has been generated successfully with Material Design 3 colors and components.
                  </p>
                  <button
                    onClick={() => handleButtonPress('card_action')}
                    className="px-4 py-2 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: theme.tertiary,
                      color: theme.onTertiary
                    }}
                  >
                    Download Theme
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold" style={{ color: theme.onSurface }}>
              Input Examples
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1" style={{ color: theme.onSurfaceVariant }}>
                  Text Field
                </label>
                <input
                  type="text"
                  placeholder="Enter your text here..."
                  className="w-full p-3 rounded-lg border text-sm"
                  style={{
                    backgroundColor: theme.surfaceContainerHighest,
                    borderColor: theme.outline,
                    color: theme.onSurface
                  }}
                  onFocus={() => onInteraction('input_focus', { field: 'text' })}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  style={{ accentColor: theme.primary }}
                  onChange={() => onInteraction('checkbox_toggle')}
                />
                <label className="text-sm" style={{ color: theme.onSurface }}>
                  Enable notifications
                </label>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-3">
            <h3 className="text-md font-semibold" style={{ color: theme.onSurface }}>
              Progress & Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-2" style={{ color: theme.onSurfaceVariant }}>
                  <span>Theme Generation</span>
                  <span>85%</span>
                </div>
                <div 
                  className="w-full h-2 rounded-full"
                  style={{ backgroundColor: theme.surfaceContainerHigh }}
                >
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: theme.primary,
                      width: '85%'
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: `${theme.primary} transparent ${theme.primary} ${theme.primary}` }}
                />
                <span className="text-sm" style={{ color: theme.onSurfaceVariant }}>
                  Processing theme colors...
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="h-20" />
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div 
        className="flex-shrink-0 border-t"
        style={{ 
          backgroundColor: theme.surface,
          borderColor: theme.outlineVariant
        }}
      >
        <div className="flex justify-around py-2">
          {[
            { icon: '🏠', label: 'Home', active: true },
            { icon: '🔍', label: 'Search', active: false },
            { icon: '💖', label: 'Favorites', active: false },
            { icon: '👤', label: 'Profile', active: false }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleButtonPress(`nav_${item.label.toLowerCase()}`)}
              className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors"
              style={{
                color: item.active ? theme.primary : theme.onSurfaceVariant
              }}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

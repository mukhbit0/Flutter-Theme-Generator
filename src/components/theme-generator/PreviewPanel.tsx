import { ThemeGeneratorSettings } from '../../types/theme'

interface PreviewPanelProps {
  settings: ThemeGeneratorSettings
  isGenerating: boolean
  onGenerate: () => void
  onSettingsChange: (updates: Partial<ThemeGeneratorSettings>) => void
  darkMode: boolean
}

export default function PreviewPanel({ settings, isGenerating, onGenerate, onSettingsChange, darkMode }: PreviewPanelProps) {
  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Preview
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {settings.baseColors && Object.entries(settings.baseColors).map(([name, color]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-full h-12 rounded-lg shadow-sm border border-gray-200 mb-2"
                  style={{ backgroundColor: color }}
                />
                <span className={`text-xs capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {name}
                </span>
              </div>
            ))}
          </div>
          
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              'Generate & Preview'
            )}
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          What You'll Get
        </h3>
        
        <div className="space-y-3">
          {[
            'app_theme.dart - Main theme file',
            'app_constants.dart - Design tokens',
            'theme_extensions.dart - Helper extensions',
            'README.md - Usage documentation'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Variants Section */}
      <div className={`${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="mb-4">
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Theme Variants
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose which variants to generate
          </p>
        </div>
        
        {(() => {
          const variants = [
            { key: 'lightMode', label: 'Light', color: 'from-blue-400 to-blue-600' },
            { key: 'lightMedium', label: 'Light Medium', color: 'from-indigo-400 to-indigo-600' },
            { key: 'lightHigh', label: 'Light High', color: 'from-purple-400 to-purple-600' },
            { key: 'darkMode', label: 'Dark', color: 'from-gray-500 to-gray-700' },
            { key: 'darkMedium', label: 'Dark Medium', color: 'from-gray-600 to-slate-700' },
            { key: 'darkHigh', label: 'Dark High', color: 'from-slate-700 to-black' }
          ] as const

          const enabledCount = Object.values(settings.themeVariants).filter(v => v).length

          const handleVariantChange = (key: keyof ThemeGeneratorSettings['themeVariants'], value: boolean) => {
            const currentVariants = settings.themeVariants
            const updatedVariants = { ...currentVariants, [key]: value }
            
            // Check if at least one variant is still enabled
            const hasEnabledVariant = Object.values(updatedVariants).some(v => v)
            
            // If trying to disable the last variant, prevent it
            if (!hasEnabledVariant) {
              return
            }
            
            onSettingsChange({ themeVariants: updatedVariants })
          }

          return (
            <div className="space-y-3">
              {variants.map((variant) => {
                const isEnabled = settings.themeVariants[variant.key]
                const isLastEnabled = enabledCount === 1 && isEnabled
                
                return (
                  <div key={variant.key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => handleVariantChange(variant.key, e.target.checked)}
                      disabled={isLastEnabled}
                      className={`w-4 h-4 rounded border-2 focus:ring-2 focus:ring-offset-2 transition-colors ${
                        isEnabled
                          ? 'text-blue-600 bg-blue-50 border-blue-300 focus:ring-blue-500'
                          : darkMode
                            ? 'text-gray-600 bg-gray-700 border-gray-600 focus:ring-gray-500'
                            : 'text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500'
                      } ${isLastEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        isEnabled 
                          ? darkMode ? 'text-white' : 'text-gray-900'
                          : darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {variant.label}
                      </span>
                      {isEnabled && (
                        <div className={`w-6 h-3 rounded-full bg-gradient-to-r ${variant.color}`} />
                      )}
                    </div>
                  </div>
                )
              })}
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {enabledCount} variant{enabledCount !== 1 ? 's' : ''} selected
                </span>
              </div>
              
              {enabledCount === 1 && (
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-amber-900/30 border border-amber-700/50' : 'bg-amber-50 border border-amber-200'
                }`}>
                  <span className={`text-xs ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                    At least one variant must be enabled
                  </span>
                </div>
              )}
            </div>
          )
        })()}
      </div>
    </div>
  )
}

import { ThemeGeneratorSettings } from '../../types/theme'

interface PreviewPanelProps {
  settings: ThemeGeneratorSettings
  isGenerating: boolean
  onGenerate: () => void
  darkMode: boolean
}

export default function PreviewPanel({ settings, isGenerating, onGenerate, darkMode }: PreviewPanelProps) {
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
    </div>
  )
}

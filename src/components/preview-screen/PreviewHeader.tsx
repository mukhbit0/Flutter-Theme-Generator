import { useNavigate } from 'react-router-dom'
import { PreviewHeaderProps, PreviewMode } from './PreviewScreenTypes'
import { ThemeGeneratorSettings } from '../../types/theme'


export default function PreviewHeader({
  darkMode,
  previewMode,
  setPreviewMode,
  onBack,
  onDownload,
  isDownloading,
  settings
}: PreviewHeaderProps) {
  const navigate = useNavigate()
  const allModeOptions: { value: PreviewMode; label: string; group: 'light' | 'dark'; variantKey: keyof ThemeGeneratorSettings['themeVariants'] }[] = [
    { value: 'light', label: 'Light', group: 'light', variantKey: 'lightMode' },
    { value: 'lightMediumContrast', label: 'Light Medium', group: 'light', variantKey: 'lightMedium' },
    { value: 'lightHighContrast', label: 'Light High', group: 'light', variantKey: 'lightHigh' },
    { value: 'dark', label: 'Dark', group: 'dark', variantKey: 'darkMode' },
    { value: 'darkMediumContrast', label: 'Dark Medium', group: 'dark', variantKey: 'darkMedium' },
    { value: 'darkHighContrast', label: 'Dark High', group: 'dark', variantKey: 'darkHigh' },
  ]

  // Filter mode options based on enabled theme variants
  const modeOptions = allModeOptions.filter(option => {
    if (!settings?.themeVariants) return true // Show all if no settings
    return settings.themeVariants[option.variantKey as keyof typeof settings.themeVariants]
  })

  return (
    <div className={`${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'
      } backdrop-blur-xl border-b sticky top-0 z-10 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className={`p-2.5 rounded-full transition-all duration-300 ${darkMode
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Theme Preview
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Visualize your theme across components
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Mode Toggle */}
            <div className={`flex items-center p-1.5 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
              {modeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPreviewMode(option.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${previewMode === option.value
                    ? option.group === 'light'
                      ? 'bg-white text-gray-900 shadow-md transform scale-105'
                      : 'bg-gray-700 text-white shadow-md transform scale-105'
                    : darkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto md:ml-0">
              {/* View Mockups Button */}
              <button
                onClick={() => navigate('/implementation')}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Mockups</span>
              </button>

              {/* Download Button */}
              <button
                onClick={onDownload}
                disabled={isDownloading}
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

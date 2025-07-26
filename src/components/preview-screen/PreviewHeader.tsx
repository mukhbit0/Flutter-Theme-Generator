import { PreviewHeaderProps } from './PreviewScreenTypes'

export default function PreviewHeader({
  darkMode,
  previewMode,
  setPreviewMode,
  onBack,
  onDownload,
  isDownloading
}: PreviewHeaderProps) {
  return (
    <div className={`${
      darkMode ? 'bg-gray-800/80' : 'bg-white/80'
    } backdrop-blur-lg border-b ${
      darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
    } sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Theme Preview
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Comprehensive preview of your Flutter theme across all widget types
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme Mode Toggle */}
            <div className={`flex items-center space-x-2 p-1 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => setPreviewMode('light')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  previewMode === 'light'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : darkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setPreviewMode('dark')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  previewMode === 'dark'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : darkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dark
              </button>
            </div>

            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isDownloading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </div>
              ) : (
                'Download Theme Files'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

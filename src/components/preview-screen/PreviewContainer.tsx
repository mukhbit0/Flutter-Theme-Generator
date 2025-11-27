import WidgetPreviews from './WidgetPreviews'
import { PreviewContainerProps } from './PreviewScreenTypes'
import { PreviewErrorBoundary } from './ErrorBoundary'
import SharingPanel from '../SharingPanel'

export default function PreviewContainer({ currentColors, previewMode, darkMode, settings }: PreviewContainerProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Flutter Theme Preview
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Comprehensive preview of your Flutter theme across all Material Design 3 widgets
            </p>
          </div>
          
          {/* Elegant Share Button */}
          <div className="flex-shrink-0 ml-4">
            <SharingPanel
              buttonClassName="group relative px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              settings={settings}
            />
          </div>
        </div>
      </div>

      {/* Widget Previews with Error Boundary */}
      <PreviewErrorBoundary darkMode={darkMode}>
        <WidgetPreviews currentColors={currentColors} previewMode={previewMode} darkMode={darkMode} />
      </PreviewErrorBoundary>
    </div>
  )
}

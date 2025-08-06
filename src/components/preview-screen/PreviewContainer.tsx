import WidgetPreviews from './WidgetPreviews'
import { PreviewContainerProps } from './PreviewScreenTypes'
import { PreviewErrorBoundary } from './ErrorBoundary'

export default function PreviewContainer({ currentColors, previewMode, darkMode }: PreviewContainerProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Flutter Theme Preview
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Comprehensive preview of your Flutter theme across all Material Design 3 widgets
          </p>
        </div>
      </div>

      {/* Widget Previews with Error Boundary */}
      <PreviewErrorBoundary darkMode={darkMode}>
        <WidgetPreviews currentColors={currentColors} previewMode={previewMode} darkMode={darkMode} />
      </PreviewErrorBoundary>
    </div>
  )
}

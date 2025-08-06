import { useState } from 'react'
import WidgetPreviews from './WidgetPreviews'
import { LiveAppPreview } from './LiveAppPreview'
import { PreviewContainerProps } from './PreviewScreenTypes'

type ViewMode = 'widgets' | 'liveApp'

export default function PreviewContainer({ currentColors, previewMode, darkMode }: PreviewContainerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('widgets')

  const handleAppInteraction = (action: string, data?: any) => {
    console.log('App interaction:', action, data)
  }

  // Remove the derived isDarkMode, use the passed darkMode prop instead

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`} >
            Live App Preview
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {viewMode === 'widgets' 
              ? 'CSS-based Flutter widget showcase' 
              : 'Real Flutter app running in iframe with live theme sync'
            }
          </p>
        </div>
        
        <div 
          className="flex p-1 rounded-lg border"
          style={{ 
            backgroundColor: darkMode ? '#374151' : '#f3f4f6',
            borderColor: darkMode ? '#4b5563' : '#d1d5db'
          }}
        >
          <button
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'widgets' ? 'shadow-sm' : darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
            style={{
              backgroundColor: viewMode === 'widgets' ? (darkMode ? '#1f2937' : '#374151') : 'transparent',
              color: viewMode === 'widgets' ? '#ffffff' : darkMode ? '#e5e7eb' : '#374151'
            }}
            onClick={() => setViewMode('widgets')}
          >
            Widgets
          </button>
          <button
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'liveApp' ? 'shadow-sm' : darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
            style={{
              backgroundColor: viewMode === 'liveApp' ? (darkMode ? '#1f2937' : '#374151') : 'transparent',
              color: viewMode === 'liveApp' ? '#ffffff' : darkMode ? '#e5e7eb' : '#374151'
            }}
            onClick={() => setViewMode('liveApp')}
          >
            Flutter
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'widgets' ? (
        <WidgetPreviews currentColors={currentColors} previewMode={previewMode} darkMode={darkMode} />
      ) : (
        <div 
          className="rounded-xl border overflow-hidden"
          style={{ 
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            borderColor: darkMode ? '#374151' : '#e5e7eb'
          }}
        >
          <LiveAppPreview
            theme={currentColors}
            darkMode={darkMode}
            onInteraction={handleAppInteraction}
          />
        </div>
      )}
    </div>
  )
}

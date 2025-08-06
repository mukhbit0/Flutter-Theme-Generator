import { useState } from 'react'
import { AppTemplateType, APP_TEMPLATES } from './templates'
import DeviceFrame from './DeviceFrame'

interface LiveAppPreviewProps {
  theme: any
  darkMode: boolean
  onInteraction?: (action: string, data?: any) => void
  className?: string
}

export default function LiveAppPreview({ 
  theme, 
  darkMode, 
  onInteraction,
  className = '' 
}: LiveAppPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<AppTemplateType>('realapp')

  const handleInteraction = (action: string, data?: any) => {
    onInteraction?.(action, { 
      ...data, 
      template: selectedTemplate,
      timestamp: Date.now() 
    })
  }

  const bgColor = darkMode ? '#1f2937' : '#ffffff'
  const cardColor = darkMode ? '#374151' : '#f9fafb'
  const textColor = darkMode ? '#e5e7eb' : '#374151'
  const borderColor = darkMode ? '#4b5563' : '#e5e7eb'

  return (
    <div 
      className={`w-full h-full flex flex-col rounded-xl shadow-lg overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Header Controls */}
      <div 
        className="p-6 border-b"
        style={{ 
          backgroundColor: cardColor,
          borderColor: borderColor
        }}
      >
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium" style={{ color: textColor }}>
              App Template
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(APP_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  className={`px-4 py-3 rounded-lg border text-left font-medium transition-all duration-200 ${
                    selectedTemplate === key ? 'shadow-sm' : 'hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: selectedTemplate === key 
                      ? (darkMode ? '#4f46e5' : '#6366f1') 
                      : 'transparent',
                    color: selectedTemplate === key 
                      ? '#ffffff' 
                      : textColor,
                    borderColor: selectedTemplate === key 
                      ? (darkMode ? '#4f46e5' : '#6366f1')
                      : borderColor
                  }}
                  onClick={() => setSelectedTemplate(key as AppTemplateType)}
                >
                  <span className="mr-2">{template.icon}</span>
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div 
        className="flex-1 p-6 overflow-auto"
        style={{ backgroundColor: bgColor }}
      >
        <div className="w-full h-full flex items-start justify-center">
          <DeviceFrame theme={theme} darkMode={darkMode}>
            {(() => {
              const TemplateComponent = APP_TEMPLATES[selectedTemplate].component
              return (
                <TemplateComponent
                  theme={theme}
                  darkMode={darkMode}
                  onInteraction={handleInteraction}
                />
              )
            })()}
          </DeviceFrame>
        </div>
      </div>

      {/* Status Bar */}
      <div 
        className="p-4 border-t"
        style={{ 
          backgroundColor: cardColor,
          borderColor: borderColor
        }}
      >
        <div className="flex items-center justify-between text-sm">
          <div style={{ color: textColor }}>
            <span className="font-medium">Preview:</span> {APP_TEMPLATES[selectedTemplate].name}
          </div>
          <div style={{ color: textColor }}>
            Real Flutter app with interactive functionality
          </div>
        </div>
      </div>
    </div>
  )
}

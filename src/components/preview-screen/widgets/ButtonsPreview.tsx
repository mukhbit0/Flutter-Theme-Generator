import { PreviewWidget } from '../PreviewWidget'
import { WidgetPreviewProps } from '../PreviewScreenTypes'

export default function ButtonsPreview({ currentColors, previewMode }: WidgetPreviewProps) {
  return (
    <PreviewWidget title="Material Buttons" previewMode={previewMode} themeColors={currentColors}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Elevated Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Elevated Buttons</h4>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ 
                backgroundColor: currentColors.primary,
                color: currentColors.onPrimary
              }}
            >
              Primary Elevated
            </button>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ 
                backgroundColor: currentColors.secondary,
                color: currentColors.onSecondary
              }}
            >
              Secondary Elevated
            </button>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium shadow-sm opacity-50 cursor-not-allowed"
              style={{ 
                backgroundColor: currentColors.outline,
                color: currentColors.onSurface
              }}
            >
              Disabled
            </button>
          </div>
          
          {/* Outlined Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Outlined Buttons</h4>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium border-2 hover:bg-opacity-10 transition-all duration-200"
              style={{ 
                borderColor: currentColors.primary,
                color: currentColors.primary,
                backgroundColor: 'transparent'
              }}
            >
              Primary Outline
            </button>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium border-2 hover:bg-opacity-10 transition-all duration-200"
              style={{ 
                borderColor: currentColors.secondary,
                color: currentColors.secondary,
                backgroundColor: 'transparent'
              }}
            >
              Secondary Outline
            </button>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium border-2 opacity-50 cursor-not-allowed"
              style={{ 
                borderColor: currentColors.outline,
                color: currentColors.onSurface,
                backgroundColor: 'transparent'
              }}
            >
              Disabled Outline
            </button>
          </div>
          
          {/* Text Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Text Buttons</h4>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium hover:bg-opacity-10 transition-all duration-200"
              style={{ 
                color: currentColors.primary,
                backgroundColor: 'transparent'
              }}
            >
              Primary Text
            </button>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium hover:bg-opacity-10 transition-all duration-200"
              style={{ 
                color: currentColors.secondary,
                backgroundColor: 'transparent'
              }}
            >
              Secondary Text
            </button>
            <button 
              className="w-full px-4 py-3 rounded-lg font-medium opacity-50 cursor-not-allowed"
              style={{ 
                color: currentColors.onSurface,
                backgroundColor: 'transparent'
              }}
            >
              Disabled Text
            </button>
          </div>
        </div>
        
        {/* Floating Action Buttons */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3" style={{ color: currentColors.onSurface }}>Floating Action Buttons</h4>
          <div className="flex space-x-4">
            <button 
              className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              style={{ 
                backgroundColor: currentColors.primary,
                color: currentColors.onPrimary
              }}
            >
              <span className="text-xl">+</span>
            </button>
            <button 
              className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              style={{ 
                backgroundColor: currentColors.secondary,
                color: currentColors.onSecondary
              }}
            >
              <span className="text-lg">✎</span>
            </button>
            <button 
              className="w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              style={{ 
                backgroundColor: currentColors.primaryVariant,
                color: currentColors.onPrimary
              }}
            >
              <span className="text-sm">↗</span>
            </button>
          </div>
        </div>
      </div>
    </PreviewWidget>
  )
}

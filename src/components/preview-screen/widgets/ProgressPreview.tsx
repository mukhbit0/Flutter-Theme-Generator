import { PreviewWidget } from '../PreviewWidget'

interface ProgressPreviewProps {
  currentColors: any
  previewMode: 'light' | 'dark'
}

export default function ProgressPreview({ currentColors, previewMode }: ProgressPreviewProps) {
  return (
    <PreviewWidget title="Progress Indicators" previewMode={previewMode} themeColors={currentColors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Progress Bars */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Progress Bars</h4>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: currentColors.onSurface }}>
                Upload Progress
              </span>
              <span className="text-sm" style={{ color: currentColors.onSurface }}>
                75%
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: (currentColors.outline as string) + '30' }}>
              <div className="h-full w-3/4 rounded-full transition-all duration-300" style={{ backgroundColor: currentColors.primary }}>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: currentColors.onSurface }}>
                Download Progress
              </span>
              <span className="text-sm" style={{ color: currentColors.onSurface }}>
                45%
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: (currentColors.outline as string) + '30' }}>
              <div className="h-full w-2/5 rounded-full transition-all duration-300" style={{ backgroundColor: currentColors.secondary }}>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Indicators */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Loading Indicators</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: currentColors.primary }}></div>
              <span className="text-sm" style={{ color: currentColors.onSurface }}>Loading...</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: currentColors.primary, animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: currentColors.primary, animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: currentColors.primary, animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm" style={{ color: currentColors.onSurface }}>Processing...</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewWidget>
  )
}

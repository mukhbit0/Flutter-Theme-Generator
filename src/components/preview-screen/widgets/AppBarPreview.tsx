import { PreviewWidget } from '../PreviewWidget'
import { WidgetPreviewProps } from '../PreviewScreenTypes'

export default function AppBarPreview({ currentColors, previewMode }: WidgetPreviewProps) {
  return (
    <PreviewWidget title="App Bar & Navigation" previewMode={previewMode} themeColors={currentColors}>
      <div className="space-y-4">
        <div 
          className="p-4 rounded-lg flex items-center justify-between shadow-sm"
          style={{ backgroundColor: currentColors.primary }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded" style={{ backgroundColor: (currentColors.onPrimary as string) + '20' }}>
              <svg className="w-full h-full p-1" fill={currentColors.onPrimary as string} viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </div>
            <span 
              className="font-semibold text-lg"
              style={{ color: currentColors.onPrimary }}
            >
              My Flutter App
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: (currentColors.onPrimary as string) + '20' }}>
              <span style={{ color: currentColors.onPrimary }}>🔍</span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: (currentColors.onPrimary as string) + '20' }}>
              <span style={{ color: currentColors.onPrimary }}>⚙️</span>
            </div>
          </div>
        </div>
        
        {/* Tab Bar */}
        <div className="flex border-b" style={{ borderColor: currentColors.outline }}>
          {["Home", "Explore", "Library", "Profile"].map((tab, index) => (
            <button key={index} className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
              index === 0 ? 'border-current' : 'border-transparent'
            }`} style={{ 
              color: index === 0 ? currentColors.primary : currentColors.onSurface,
              borderBottomColor: index === 0 ? currentColors.primary : 'transparent'
            }}>
              {tab}
            </button>
          ))}
        </div>
      </div>
    </PreviewWidget>
  )
}

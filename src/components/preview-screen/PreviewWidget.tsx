import { PreviewWidgetProps } from './PreviewScreenTypes'

export function PreviewWidget({ title, children, previewMode, themeColors }: PreviewWidgetProps) {
  return (
    <div 
      className={`rounded-xl p-6 border transition-all duration-300 shadow-lg backdrop-blur-sm`}
      style={{
        backgroundColor: previewMode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)',
        borderColor: previewMode === 'light' ? 'rgba(229, 231, 235, 0.5)' : 'rgba(75, 85, 99, 0.5)',
        color: themeColors.onSurface
      }}
    >
      <h3 
        className={`text-lg font-semibold mb-4`}
        style={{ color: themeColors.onSurface }}
      >
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

import { PreviewWidgetProps } from './PreviewScreenTypes'

export function PreviewWidget({ title, children, previewMode, themeColors }: PreviewWidgetProps) {
  // Determine if it's a light variant (including contrast modes)
  const isLightVariant = previewMode.startsWith('light')
  
  return (
    <div 
      className={`rounded-xl p-6 border shadow-lg backdrop-blur-sm`}
      style={{
        backgroundColor: isLightVariant ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)',
        borderColor: isLightVariant ? 'rgba(229, 231, 235, 0.5)' : 'rgba(75, 85, 99, 0.5)',
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

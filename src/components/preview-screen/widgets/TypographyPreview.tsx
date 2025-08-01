import { PreviewWidget } from '../PreviewWidget'
import { WidgetPreviewProps } from '../PreviewScreenTypes'

export default function TypographyPreview({ currentColors, previewMode }: WidgetPreviewProps) {
  return (
    <PreviewWidget title="Typography Styles" previewMode={previewMode} themeColors={currentColors}>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-4" style={{ color: currentColors.onSurface }}>Text Hierarchy</h4>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold" style={{ color: currentColors.onSurface }}>
              Display Large Text
            </h1>
            <h2 className="text-3xl font-bold" style={{ color: currentColors.onSurface }}>
              Display Medium Text
            </h2>
            <h3 className="text-2xl font-bold" style={{ color: currentColors.onSurface }}>
              Display Small Text
            </h3>
            <h4 className="text-xl font-semibold" style={{ color: currentColors.onSurface }}>
              Headline Large
            </h4>
            <h5 className="text-lg font-semibold" style={{ color: currentColors.onSurface }}>
              Headline Medium
            </h5>
            <h6 className="text-base font-semibold" style={{ color: currentColors.onSurface }}>
              Headline Small
            </h6>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-4" style={{ color: currentColors.onSurface }}>Body Text & Links</h4>
          <div className="space-y-3">
            <p className="text-lg" style={{ color: currentColors.onSurface }}>
              Body Large - This is the primary body text style used for longer content and reading.
            </p>
            <p className="text-base" style={{ color: currentColors.onSurface }}>
              Body Medium - This is the standard body text for most content in your app.
            </p>
            <p className="text-sm" style={{ color: currentColors.onSurface }}>
              Body Small - This is used for secondary information and captions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="font-medium hover:underline" style={{ color: currentColors.primary }}>
                Primary Link
              </a>
              <a href="#" className="font-medium hover:underline" style={{ color: currentColors.secondary }}>
                Secondary Link
              </a>
              <span className="font-medium" style={{ color: currentColors.error }}>
                Error Text
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-4" style={{ color: currentColors.onSurface }}>Labels & Captions</h4>
          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: currentColors.onSurface }}>
              Label Large
            </div>
            <div className="text-xs font-semibold" style={{ color: currentColors.onSurface }}>
              Label Small
            </div>
            <div className="text-xs opacity-70" style={{ color: currentColors.onSurface }}>
              Caption Text - Used for very small supporting text
            </div>
          </div>
        </div>
      </div>
    </PreviewWidget>
  )
}

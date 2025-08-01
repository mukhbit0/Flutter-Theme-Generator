import { PreviewWidget } from '../PreviewWidget'
import { WidgetPreviewProps } from '../PreviewScreenTypes'

export default function FormControlsPreview({ currentColors, previewMode }: WidgetPreviewProps) {
  return (
    <PreviewWidget title="Form Controls & Input" previewMode={previewMode} themeColors={currentColors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Text Fields */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Text Fields</h4>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: currentColors.onSurface }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
              style={{
                borderColor: currentColors.outline,
                backgroundColor: currentColors.surface,
                color: currentColors.onSurface
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: currentColors.onSurface }}>
              Password (Focused)
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
              style={{
                borderColor: currentColors.primary,
                backgroundColor: currentColors.surface,
                color: currentColors.onSurface,
                boxShadow: `0 0 0 2px ${(currentColors.primary as string)}20`
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: currentColors.error }}>
              Error Field
            </label>
            <input
              type="text"
              placeholder="This field has an error"
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
              style={{
                borderColor: currentColors.error,
                backgroundColor: currentColors.surface,
                color: currentColors.onSurface
              }}
            />
            <p className="text-sm mt-1" style={{ color: currentColors.error }}>
              This field is required
            </p>
          </div>
        </div>

        {/* Switches & Checkboxes */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Switches & Checkboxes</h4>
          
          {/* Switches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: currentColors.onSurface }}>
                Enable notifications
              </label>
              <div className="relative">
                <div className="w-12 h-6 rounded-full shadow-inner transition-all duration-200" style={{ backgroundColor: currentColors.primary }}>
                  <div className="absolute w-4 h-4 bg-white rounded-full shadow-md top-1 right-1 transition-all duration-200"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: currentColors.onSurface }}>
                Dark mode
              </label>
              <div className="relative">
                <div className="w-12 h-6 rounded-full shadow-inner transition-all duration-200" style={{ backgroundColor: currentColors.outline }}>
                  <div className="absolute w-4 h-4 bg-white rounded-full shadow-md top-1 left-1 transition-all duration-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ 
                borderColor: currentColors.primary,
                backgroundColor: currentColors.primary 
              }}>
                <span className="text-xs" style={{ color: currentColors.onPrimary }}>✓</span>
              </div>
              <label className="text-sm" style={{ color: currentColors.onSurface }}>
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded border-2" style={{ borderColor: currentColors.outline }}>
              </div>
              <label className="text-sm" style={{ color: currentColors.onSurface }}>
                Subscribe to newsletter
              </label>
            </div>
            
            {/* Radio Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Payment Method</p>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ 
                  borderColor: currentColors.primary 
                }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentColors.primary }}></div>
                </div>
                <label className="text-sm" style={{ color: currentColors.onSurface }}>
                  Credit Card
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: currentColors.outline }}>
                </div>
                <label className="text-sm" style={{ color: currentColors.onSurface }}>
                  PayPal
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewWidget>
  )
}

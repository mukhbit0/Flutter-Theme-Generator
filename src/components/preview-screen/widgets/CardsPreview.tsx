import { PreviewWidget } from '../PreviewWidget'

interface CardsPreviewProps {
  currentColors: any
  previewMode: 'light' | 'dark'
}

export default function CardsPreview({ currentColors, previewMode }: CardsPreviewProps) {
  return (
    <PreviewWidget title="Cards & Content Containers" previewMode={previewMode} themeColors={currentColors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Basic Cards */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>Material Cards</h4>
          <div className="p-4 rounded-lg shadow-sm border" style={{ 
            backgroundColor: currentColors.surface,
            borderColor: currentColors.outline 
          }}>
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: currentColors.primary }}>
                <span style={{ color: currentColors.onPrimary }}>📝</span>
              </div>
              <div>
                <h5 className="font-semibold" style={{ color: currentColors.onSurface }}>
                  Card Title
                </h5>
                <p className="text-sm opacity-70" style={{ color: currentColors.onSurface }}>
                  2 hours ago
                </p>
              </div>
            </div>
            <p className="text-sm mb-3" style={{ color: currentColors.onSurface }}>
              This is a basic card with some content to show how text looks with the current theme.
            </p>
            <div className="flex space-x-2">
              <button className="text-sm font-medium" style={{ color: currentColors.primary }}>
                Like
              </button>
              <button className="text-sm font-medium" style={{ color: currentColors.primary }}>
                Share
              </button>
              <button className="text-sm font-medium" style={{ color: currentColors.primary }}>
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* List Items */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>List Items</h4>
          <div className="space-y-1">
            {[
              { title: "John Doe", subtitle: "Software Engineer", avatar: "👨‍💻" },
              { title: "Jane Smith", subtitle: "UI/UX Designer", avatar: "👩‍🎨" },
              { title: "Mike Johnson", subtitle: "Product Manager", avatar: "👨‍💼" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-50 transition-all duration-200 cursor-pointer" style={{ 
                backgroundColor: index === 0 ? (currentColors.primaryVariant as string) + '20' : 'transparent'
              }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ 
                  backgroundColor: currentColors.secondary 
                }}>
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <h6 className="font-medium" style={{ color: currentColors.onSurface }}>
                    {item.title}
                  </h6>
                  <p className="text-sm opacity-70" style={{ color: currentColors.onSurface }}>
                    {item.subtitle}
                  </p>
                </div>
                <div className="text-sm" style={{ color: currentColors.outline }}>
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWidget>
  )
}

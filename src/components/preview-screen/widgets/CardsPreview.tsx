import { PreviewWidget } from '../PreviewWidget'
import { WidgetPreviewProps } from '../PreviewScreenTypes'
import { SAMPLE_DATA } from '../constants'
import { Tooltip } from '../Tooltip'

export default function CardsPreview({ currentColors, previewMode }: WidgetPreviewProps) {
  const isDarkMode = previewMode.includes('dark')
  
  return (
    <PreviewWidget title="Cards & Content Containers" previewMode={previewMode} themeColors={currentColors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Material Cards with Real Content */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>
            Material Cards
          </h4>
          {SAMPLE_DATA.CARD_CONTENT.slice(0, 2).map((card, index) => (
            <article 
              key={index}
              className="p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md" 
              style={{ 
                backgroundColor: currentColors.surface,
                borderColor: currentColors.outline 
              }}
              role="article"
              aria-labelledby={`card-title-${index}`}
            >
              <header className="flex items-start space-x-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: currentColors.primary }}
                  aria-hidden="true"
                >
                  <span style={{ color: currentColors.onPrimary }}>📝</span>
                </div>
                <div className="flex-1">
                  <h5 
                    id={`card-title-${index}`}
                    className="font-semibold" 
                    style={{ color: currentColors.onSurface }}
                  >
                    {card.title}
                  </h5>
                  <p className="text-sm opacity-70" style={{ color: currentColors.onSurface }}>
                    {card.subtitle} • {card.timestamp}
                  </p>
                </div>
                <Tooltip content="More options" darkMode={isDarkMode}>
                  <button 
                    className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    aria-label="More options"
                  >
                    <span style={{ color: currentColors.onSurfaceVariant }}>⋯</span>
                  </button>
                </Tooltip>
              </header>
              
              <p className="text-sm mb-4 leading-relaxed" style={{ color: currentColors.onSurface }}>
                {card.content}
              </p>
              
              <footer className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <Tooltip content="Like this post" darkMode={isDarkMode}>
                    <button 
                      className="flex items-center space-x-1 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded transition-colors" 
                      style={{ color: currentColors.primary }}
                      aria-label={`Like post: ${card.title}`}
                    >
                      <span>👍</span>
                      <span>{card.reactions}</span>
                    </button>
                  </Tooltip>
                  <Tooltip content="View comments" darkMode={isDarkMode}>
                    <button 
                      className="flex items-center space-x-1 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded transition-colors" 
                      style={{ color: currentColors.primary }}
                      aria-label={`View ${card.comments} comments`}
                    >
                      <span>💬</span>
                      <span>{card.comments}</span>
                    </button>
                  </Tooltip>
                  <Tooltip content="Share post" darkMode={isDarkMode}>
                    <button 
                      className="text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded transition-colors" 
                      style={{ color: currentColors.primary }}
                      aria-label="Share post"
                    >
                      Share
                    </button>
                  </Tooltip>
                </div>
                <time 
                  className="text-xs" 
                  style={{ color: currentColors.onSurfaceVariant }}
                  dateTime="2024-01-01"
                >
                  {card.timestamp}
                </time>
              </footer>
            </article>
          ))}
        </div>

        {/* Enhanced List Items */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium" style={{ color: currentColors.onSurface }}>
            List Items
          </h4>
          <div 
            className="rounded-lg border overflow-hidden"
            style={{ 
              backgroundColor: currentColors.surface,
              borderColor: currentColors.outline 
            }}
            role="list"
            aria-label="Team members"
          >
            {SAMPLE_DATA.USER_PROFILES.map((user, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 border-b last:border-b-0 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer group" 
                style={{ 
                  borderColor: currentColors.outline + '40',
                  backgroundColor: index === 0 ? (currentColors.primaryContainer as string) + '20' : 'transparent'
                }}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    // Handle selection
                  }
                }}
                aria-label={`${user.name}, ${user.role}, ${user.status}`}
              >
                <div className="relative">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-105" 
                    style={{ backgroundColor: currentColors.secondary }}
                    aria-hidden="true"
                  >
                    {user.avatar}
                  </div>
                  {/* Status indicator */}
                  <div 
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ borderColor: currentColors.surface }}
                    aria-label={`Status: ${user.status}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="font-medium truncate" style={{ color: currentColors.onSurface }}>
                    {user.name}
                  </h6>
                  <p className="text-sm opacity-70 truncate" style={{ color: currentColors.onSurface }}>
                    {user.role}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Tooltip content="Send message" darkMode={isDarkMode}>
                    <button 
                      className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                      style={{ color: currentColors.primary }}
                      aria-label={`Send message to ${user.name}`}
                    >
                      💬
                    </button>
                  </Tooltip>
                  <div className="text-sm opacity-50 transition-opacity group-hover:opacity-100" style={{ color: currentColors.outline }}>
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWidget>
  )
}

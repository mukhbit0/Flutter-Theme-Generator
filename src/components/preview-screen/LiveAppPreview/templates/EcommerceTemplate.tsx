import { useState } from 'react'
import { AppTemplateProps, InteractionState } from '../types'

export default function EcommerceTemplate({ theme, darkMode, onInteraction }: AppTemplateProps) {
  const [interactions, setInteractions] = useState<InteractionState>({
    buttonPressed: false,
    formFocused: null,
    drawerOpen: false,
    modalOpen: false,
    notifications: []
  })

  const handleButtonPress = (buttonType: string) => {
    setInteractions(prev => ({ ...prev, buttonPressed: true }))
    onInteraction?.(buttonType, { timestamp: Date.now() })
    
    // Add success notification
    const notification = {
      id: Date.now().toString(),
      message: `${buttonType} pressed!`,
      type: 'success' as const
    }
    
    setInteractions(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification]
    }))

    // Reset button press state and remove notification
    setTimeout(() => {
      setInteractions(prev => ({ ...prev, buttonPressed: false }))
    }, 200)
    
    setTimeout(() => {
      setInteractions(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== notification.id)
      }))
    }, 3000)
  }

  const bgColor = darkMode ? theme.surface : theme.surface
  const textColor = darkMode ? theme.onSurface : theme.onSurface
  const cardColor = darkMode ? theme.surfaceContainer : theme.surfaceContainer

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* App Bar */}
      <div 
        className="h-14 flex items-center justify-between px-4 shadow-sm"
        style={{ backgroundColor: theme.primary }}
      >
        <button 
          className="p-2 rounded-full transition-all duration-200 hover:bg-black/10"
          onClick={() => setInteractions(prev => ({ ...prev, drawerOpen: !prev.drawerOpen }))}
        >
          <svg className="w-6 h-6" style={{ color: theme.onPrimary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-lg font-semibold" style={{ color: theme.onPrimary }}>
          ShopApp
        </h1>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full transition-all duration-200 hover:bg-black/10">
            <svg className="w-6 h-6" style={{ color: theme.onPrimary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-full transition-all duration-200 hover:bg-black/10 relative">
            <svg className="w-6 h-6" style={{ color: theme.onPrimary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 10M7 13l2.5-7m0 0h10m-10 0l2.5 7" />
            </svg>
            <div 
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ backgroundColor: theme.secondary, color: theme.onSecondary }}
            >
              2
            </div>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3">
        <div className="flex space-x-3 overflow-x-auto">
          {['Electronics', 'Clothing', 'Home', 'Sports'].map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                index === 0 ? 'shadow-md' : 'border'
              }`}
              style={{
                backgroundColor: index === 0 ? theme.primaryContainer : 'transparent',
                color: index === 0 ? theme.onPrimaryContainer : theme.onSurface,
                borderColor: index === 0 ? 'transparent' : theme.outline
              }}
              onClick={() => handleButtonPress(`Category: ${category}`)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 px-4 pb-20 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md"
              style={{ 
                backgroundColor: cardColor,
                borderColor: theme.outline + '20'
              }}
            >
              {/* Product Image Placeholder */}
              <div 
                className="h-32 flex items-center justify-center"
                style={{ backgroundColor: theme.surfaceContainerHigh }}
              >
                <svg className="w-12 h-12" style={{ color: theme.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium mb-1" style={{ color: theme.onSurface }}>
                  Product {index + 1}
                </h3>
                <p className="text-xs mb-2" style={{ color: theme.onSurfaceVariant }}>
                  High quality item with great features
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: theme.primary }}>
                    ${(Math.random() * 100 + 20).toFixed(0)}
                  </span>
                  <button
                    className={`p-2 rounded-full transition-all duration-200 ${
                      interactions.buttonPressed ? 'scale-95' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: theme.primary }}
                    onClick={() => handleButtonPress('Add to Cart')}
                  >
                    <svg className="w-4 h-4" style={{ color: theme.onPrimary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-around border-t"
        style={{ 
          backgroundColor: cardColor,
          borderColor: theme.outline + '30'
        }}
      >
        {[
          { icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', label: 'Home', active: true },
          { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search', active: false },
          { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Favorites', active: false },
          { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Profile', active: false }
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center space-y-1 p-2 transition-all duration-200"
            onClick={() => handleButtonPress(`Navigate: ${item.label}`)}
          >
            <svg 
              className="w-6 h-6" 
              style={{ color: item.active ? theme.primary : theme.onSurfaceVariant }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span 
              className="text-xs" 
              style={{ color: item.active ? theme.primary : theme.onSurfaceVariant }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        className={`absolute bottom-20 right-4 w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
          interactions.buttonPressed ? 'scale-95' : 'hover:scale-105'
        }`}
        style={{ backgroundColor: theme.secondary }}
        onClick={() => handleButtonPress('Quick Action')}
      >
        <svg className="w-6 h-6 mx-auto" style={{ color: theme.onSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 10M7 13l2.5-7m0 0h10m-10 0l2.5 7" />
        </svg>
      </button>

      {/* Notifications */}
      <div className="absolute top-16 right-4 space-y-2 z-50">
        {interactions.notifications.map((notification) => (
          <div
            key={notification.id}
            className="px-4 py-2 rounded-lg shadow-lg border animate-slide-in-right"
            style={{
              backgroundColor: theme.inverseSurface,
              color: theme.inverseOnSurface,
              borderColor: theme.outline + '30'
            }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Side Drawer Overlay */}
      {interactions.drawerOpen && (
        <div 
          className="absolute inset-0 bg-black/50 z-40"
          onClick={() => setInteractions(prev => ({ ...prev, drawerOpen: false }))}
        >
          <div 
            className="w-72 h-full shadow-xl"
            style={{ backgroundColor: cardColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: theme.onSurface }}>
                Menu
              </h2>
              <nav className="space-y-2">
                {['Orders', 'Wishlist', 'Settings', 'Help', 'Logout'].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left p-3 rounded-lg transition-colors hover:bg-black/5"
                    style={{ color: theme.onSurface }}
                    onClick={() => {
                      handleButtonPress(`Menu: ${item}`)
                      setInteractions(prev => ({ ...prev, drawerOpen: false }))
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

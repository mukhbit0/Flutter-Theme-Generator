import { useState, useEffect, useRef } from 'react'

interface RealFlutterAppProps {
  theme: any
  darkMode: boolean
  onInteraction?: (action: string, data?: any) => void
}

// Convert hex color to 0xFF format for Flutter
function hexToFlutterColor(hex: string): string {
  if (!hex) return '0xFF000000'
  const cleanHex = hex.replace('#', '')
  return `0xFF${cleanHex}`
}

// Generate complete Flutter theme data structure
function generateFlutterThemeData(theme: any, isDark: boolean) {
  return {
    brightness: isDark ? 'dark' : 'light',
    primary: hexToFlutterColor(theme.primary),
    onPrimary: hexToFlutterColor(theme.onPrimary),
    primaryContainer: hexToFlutterColor(theme.primaryContainer),
    onPrimaryContainer: hexToFlutterColor(theme.onPrimaryContainer),
    secondary: hexToFlutterColor(theme.secondary),
    onSecondary: hexToFlutterColor(theme.onSecondary),
    secondaryContainer: hexToFlutterColor(theme.secondaryContainer),
    onSecondaryContainer: hexToFlutterColor(theme.onSecondaryContainer),
    tertiary: hexToFlutterColor(theme.tertiary),
    onTertiary: hexToFlutterColor(theme.onTertiary),
    tertiaryContainer: hexToFlutterColor(theme.tertiaryContainer),
    onTertiaryContainer: hexToFlutterColor(theme.onTertiaryContainer),
    error: hexToFlutterColor(theme.error),
    onError: hexToFlutterColor(theme.onError),
    errorContainer: hexToFlutterColor(theme.errorContainer),
    onErrorContainer: hexToFlutterColor(theme.onErrorContainer),
    surface: hexToFlutterColor(theme.surface),
    onSurface: hexToFlutterColor(theme.onSurface),
    onSurfaceVariant: hexToFlutterColor(theme.onSurfaceVariant),
    surfaceDim: hexToFlutterColor(theme.surfaceDim),
    surfaceBright: hexToFlutterColor(theme.surfaceBright),
    surfaceContainerLowest: hexToFlutterColor(theme.surfaceContainerLowest),
    surfaceContainerLow: hexToFlutterColor(theme.surfaceContainerLow),
    surfaceContainer: hexToFlutterColor(theme.surfaceContainer),
    surfaceContainerHigh: hexToFlutterColor(theme.surfaceContainerHigh),
    surfaceContainerHighest: hexToFlutterColor(theme.surfaceContainerHighest),
    background: hexToFlutterColor(theme.background),
    onBackground: hexToFlutterColor(theme.onBackground),
    outline: hexToFlutterColor(theme.outline),
    outlineVariant: hexToFlutterColor(theme.outlineVariant),
    shadow: hexToFlutterColor(theme.shadow),
    scrim: hexToFlutterColor(theme.scrim),
    inverseSurface: hexToFlutterColor(theme.inverseSurface),
    inverseOnSurface: hexToFlutterColor(theme.inverseOnSurface),
    inversePrimary: hexToFlutterColor(theme.inversePrimary),
    primaryFixed: hexToFlutterColor(theme.primaryFixed),
    onPrimaryFixed: hexToFlutterColor(theme.onPrimaryFixed),
    primaryFixedDim: hexToFlutterColor(theme.primaryFixedDim),
    onPrimaryFixedVariant: hexToFlutterColor(theme.onPrimaryFixedVariant),
    secondaryFixed: hexToFlutterColor(theme.secondaryFixed),
    onSecondaryFixed: hexToFlutterColor(theme.onSecondaryFixed),
    secondaryFixedDim: hexToFlutterColor(theme.secondaryFixedDim),
    onSecondaryFixedVariant: hexToFlutterColor(theme.onSecondaryFixedVariant),
    tertiaryFixed: hexToFlutterColor(theme.tertiaryFixed),
    onTertiaryFixed: hexToFlutterColor(theme.onTertiaryFixed),
    tertiaryFixedDim: hexToFlutterColor(theme.tertiaryFixedDim),
    onTertiaryFixedVariant: hexToFlutterColor(theme.onTertiaryFixedVariant)
  }
}

export default function RealFlutterApp({ theme, darkMode, onInteraction }: RealFlutterAppProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Send theme updates to the Flutter app
    if (iframeRef.current && !isLoading) {
      try {
        const flutterWindow = iframeRef.current.contentWindow
        if (flutterWindow) {
          // Generate complete Flutter theme data structure
          const completeThemeData = generateFlutterThemeData(theme, darkMode)
          
          // Send theme data to Flutter app via postMessage
          const themeMessage = {
            type: 'UPDATE_THEME',
            payload: {
              colorScheme: completeThemeData,
              isDark: darkMode,
              timestamp: Date.now()
            }
          }
          
          // Convert to JSON string to avoid type casting issues in Flutter
          flutterWindow.postMessage(JSON.stringify(themeMessage), '*')
          onInteraction?.('theme_update', themeMessage.payload)
        }
      } catch (err) {
        console.warn('Could not send theme to Flutter app:', err)
      }
    }
  }, [theme, darkMode, isLoading, onInteraction])

  // Handle scroll delegation from iframe to parent
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      console.log('Wheel event captured over iframe area:', e.deltaY)
      // Always prevent parent scrolling when scrolling over the iframe area
      e.preventDefault()
      e.stopPropagation()
    }

    const handleScroll = (e: Event) => {
      console.log('Scroll event captured over iframe area')
      // Prevent any scroll events from bubbling up
      e.preventDefault()
      e.stopPropagation()
    }

    const handleTouchStart = (_e: TouchEvent) => {
      // Capture touch start but don't need to track position
    }

    const handleTouchMove = (e: TouchEvent) => {
      console.log('Touch move captured over iframe area')
      // Always prevent parent scrolling for touch events over the iframe area
      e.preventDefault()
      e.stopPropagation()
    }

    // Also prevent any mouse-based scrolling
    const handleMouseWheel = (e: Event) => {
      console.log('Mouse wheel event captured')
      e.preventDefault()
      e.stopPropagation()
    }

    const container = containerRef.current
    const iframe = iframeRef.current
    const iframeContainer = iframeContainerRef.current
    
    if (container) {
      // Add multiple event listeners to catch all scroll types on main container
      container.addEventListener('wheel', handleWheel, { passive: false })
      container.addEventListener('scroll', handleScroll, { passive: false })
      container.addEventListener('mousewheel', handleMouseWheel, { passive: false }) // Legacy
      container.addEventListener('DOMMouseScroll', handleMouseWheel, { passive: false }) // Firefox legacy
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    if (iframeContainer) {
      // Add event listeners to the iframe container div (where users typically scroll)
      iframeContainer.addEventListener('wheel', handleWheel, { passive: false })
      iframeContainer.addEventListener('scroll', handleScroll, { passive: false })
      iframeContainer.addEventListener('mousewheel', handleMouseWheel, { passive: false })
      iframeContainer.addEventListener('DOMMouseScroll', handleMouseWheel, { passive: false })
      iframeContainer.addEventListener('touchstart', handleTouchStart, { passive: true })
      iframeContainer.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    if (iframe) {
      // Also add event listeners directly to the iframe to catch events that might bypass the container
      iframe.addEventListener('wheel', handleWheel, { passive: false })
      iframe.addEventListener('scroll', handleScroll, { passive: false })
      iframe.addEventListener('mousewheel', handleMouseWheel, { passive: false })
      iframe.addEventListener('DOMMouseScroll', handleMouseWheel, { passive: false })
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('scroll', handleScroll)
        container.removeEventListener('mousewheel', handleMouseWheel)
        container.removeEventListener('DOMMouseScroll', handleMouseWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
      }
      if (iframeContainer) {
        iframeContainer.removeEventListener('wheel', handleWheel)
        iframeContainer.removeEventListener('scroll', handleScroll)
        iframeContainer.removeEventListener('mousewheel', handleMouseWheel)
        iframeContainer.removeEventListener('DOMMouseScroll', handleMouseWheel)
        iframeContainer.removeEventListener('touchstart', handleTouchStart)
        iframeContainer.removeEventListener('touchmove', handleTouchMove)
      }
      if (iframe) {
        iframe.removeEventListener('wheel', handleWheel)
        iframe.removeEventListener('scroll', handleScroll)
        iframe.removeEventListener('mousewheel', handleMouseWheel)
        iframe.removeEventListener('DOMMouseScroll', handleMouseWheel)
      }
    }
  }, [])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setError(null)
    onInteraction?.('flutter_app_loaded', { timestamp: Date.now() })
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError('Failed to load Flutter app. Make sure the Flutter app is running on http://localhost:8080')
    onInteraction?.('flutter_app_error', { error: 'Load failed' })
  }

  return (
    <div 
      ref={containerRef}
      className="h-full w-full flex flex-col overflow-hidden relative"
      style={{ 
        backgroundColor: theme.background,
        overscrollBehavior: 'contain' 
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="p-4 rounded-lg shadow-lg"
            style={{ backgroundColor: theme.surface }}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="animate-spin rounded-full h-6 w-6 border-2 border-b-transparent"
                style={{ borderColor: theme.primary }}
              ></div>
              <div>
                <p className="font-medium text-sm" style={{ color: theme.onSurface }}>
                  Loading Flutter App...
                </p>
                <p className="text-xs" style={{ color: theme.onSurfaceVariant }}>
                  Real Flutter components
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="p-4 rounded-lg shadow-lg max-w-xs text-center"
            style={{ backgroundColor: theme.errorContainer }}
          >
            <div className="text-2xl mb-2">⚠️</div>
            <h3 className="font-bold text-sm mb-2" style={{ color: theme.onErrorContainer }}>
              Flutter App Unavailable
            </h3>
            <p className="text-xs mb-3" style={{ color: theme.onErrorContainer }}>
              {error}
            </p>
            <button
              className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
              style={{ 
                backgroundColor: theme.primary,
                color: theme.onPrimary
              }}
              onClick={() => {
                setError(null)
                setIsLoading(true)
                if (iframeRef.current) {
                  iframeRef.current.src = iframeRef.current.src // Reload iframe
                }
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Compact Flutter App Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ 
          backgroundColor: theme.surface,
          borderColor: theme.outline + '20'
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="text-lg">🎯</div>
          <div>
            <h3 className="font-semibold text-sm" style={{ color: theme.onSurface }}>
              Flutter App
            </h3>
            <p className="text-xs" style={{ color: theme.onSurfaceVariant }}>
              Live Material 3 preview
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div 
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: isLoading ? theme.tertiary : theme.primary }}
          ></div>
          <span className="text-xs font-medium" style={{ color: theme.onSurfaceVariant }}>
            {isLoading ? 'Loading...' : 'Live'}
          </span>
        </div>
      </div>

      {/* Flutter App Iframe - Scaled for mobile-like view */}
      <div 
        ref={iframeContainerRef}
        className="flex-1 relative overflow-hidden" 
        style={{ overscrollBehavior: 'contain' }}
      >
        <iframe
          ref={iframeRef}
          src="http://localhost:8080"
          className="w-full h-full border-0"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Flutter Theme Preview App"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          style={{
            backgroundColor: theme.background,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            transform: 'scale(0.8)', // Scale down for mobile-like view
            transformOrigin: 'top left',
            width: '125%', // Compensate for scaling
            height: '125%',
            overscrollBehavior: 'contain' // Prevent scroll chaining
          }}
        />
      </div>

      {/* Compact Status Bar */}
      <div 
        className="px-3 py-1 border-t text-xs"
        style={{ 
          backgroundColor: theme.surfaceVariant,
          borderColor: theme.outline + '20',
          color: theme.onSurfaceVariant
        }}
      >
        <div className="flex items-center justify-between">
          <span>Flutter 3.27.0</span>
          <span>Real-time sync</span>
        </div>
      </div>
    </div>
  )
}

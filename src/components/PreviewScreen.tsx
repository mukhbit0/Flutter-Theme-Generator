import { useState, useEffect } from 'react'
import { downloadThemeFiles } from '../utils/FileDownloader'
import { PreviewScreenProps, PreviewMode } from './preview-screen/PreviewScreenTypes'
import PreviewHeader from './preview-screen/PreviewHeader'
import ColorPalette from './preview-screen/ColorPalette'
import WidgetPreviews from './preview-screen/WidgetPreviews'
import { ThemeConfig } from '../types/theme'

export default function PreviewScreen({ themeConfig, settings, onBack, darkMode }: PreviewScreenProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light')
  const [isDownloading, setIsDownloading] = useState(false)
  const [modifiedThemeConfig, setModifiedThemeConfig] = useState<ThemeConfig>(themeConfig)

  // Auto-select first available theme variant on mount or settings change
  useEffect(() => {
    if (settings?.themeVariants) {
      const variantMap: Record<keyof typeof settings.themeVariants, PreviewMode> = {
        lightMode: 'light',
        lightMedium: 'lightMediumContrast',
        lightHigh: 'lightHighContrast',
        darkMode: 'dark',
        darkMedium: 'darkMediumContrast',
        darkHigh: 'darkHighContrast'
      }

      const currentVariantKey = Object.entries(variantMap).find(([_, mode]) => mode === previewMode)?.[0]
      const isCurrentModeEnabled = currentVariantKey && settings.themeVariants[currentVariantKey as keyof typeof settings.themeVariants]

      if (!isCurrentModeEnabled) {
        // Find first enabled variant
        const firstEnabledVariant = Object.entries(settings.themeVariants).find(([_, enabled]) => enabled)?.[0]
        if (firstEnabledVariant) {
          const newMode = variantMap[firstEnabledVariant as keyof typeof variantMap]
          setPreviewMode(newMode)
        }
      }
    }
  }, [settings, previewMode])

  // Get current colors based on preview mode (independent of site-wide dark mode)
  const getCurrentColors = () => {
    let colors;
    switch (previewMode) {
      case 'light':
        colors = modifiedThemeConfig.colors.light
        break
      case 'lightMediumContrast':
        colors = modifiedThemeConfig.colors.lightMediumContrast
        if (!colors) {
          console.warn('lightMediumContrast colors not found, falling back to light')
          colors = modifiedThemeConfig.colors.light
        }
        break
      case 'lightHighContrast':
        colors = modifiedThemeConfig.colors.lightHighContrast
        if (!colors) {
          console.warn('lightHighContrast colors not found, falling back to light')
          colors = modifiedThemeConfig.colors.light
        }
        break
      case 'dark':
        colors = modifiedThemeConfig.colors.dark
        break
      case 'darkMediumContrast':
        colors = modifiedThemeConfig.colors.darkMediumContrast
        if (!colors) {
          console.warn('darkMediumContrast colors not found, falling back to dark')
          colors = modifiedThemeConfig.colors.dark
        }
        break
      case 'darkHighContrast':
        colors = modifiedThemeConfig.colors.darkHighContrast
        if (!colors) {
          console.warn('darkHighContrast colors not found, falling back to dark')
          colors = modifiedThemeConfig.colors.dark
        }
        break
      default:
        colors = modifiedThemeConfig.colors.light
    }
    
    console.log(`Preview mode: ${previewMode}`, colors)
    return colors
  }

  const currentColors = getCurrentColors()

  // Safety check for colors
  if (!currentColors) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`text-6xl mb-4`}>🎨</div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Invalid Theme Configuration
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
            The theme configuration seems to be missing or invalid.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Go Back to Editor
          </button>
        </div>
      </div>
    )
  }

  const handleColorChange = (colorName: string, newColor: string) => {
    const getCurrentModeKey = () => {
      switch (previewMode) {
        case 'light':
        case 'lightMediumContrast':
        case 'lightHighContrast':
          return previewMode
        case 'dark':
        case 'darkMediumContrast':
        case 'darkHighContrast':
          return previewMode
        default:
          return 'light'
      }
    }

    setModifiedThemeConfig((prev: ThemeConfig) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [getCurrentModeKey()]: {
          ...prev.colors[getCurrentModeKey() as keyof typeof prev.colors],
          [colorName]: newColor
        }
      }
    }))
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      await downloadThemeFiles(modifiedThemeConfig, settings || undefined)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div 
      className={`min-h-screen transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      {/* Header */}
      <PreviewHeader
        darkMode={darkMode}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        onBack={onBack}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        settings={settings}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Color Palette Sidebar */}
          <div className="lg:col-span-1">
            <ColorPalette 
              currentColors={currentColors} 
              darkMode={darkMode} 
              onColorChange={handleColorChange}
              isEditable={true}
            />
          </div>

          {/* Widget Previews */}
          <div className="lg:col-span-3">
            <WidgetPreviews currentColors={currentColors} previewMode={previewMode} />
          </div>
        </div>
      </div>
    </div>
  )
}

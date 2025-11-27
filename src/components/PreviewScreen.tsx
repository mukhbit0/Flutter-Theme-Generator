import { useState, useEffect } from 'react'
import { Snackbar } from './Snackbar'
import { ShareThemeComponent } from './ShareThemeComponent'
import { downloadThemeFiles } from '../utils/FileDownloader'
import { PreviewScreenProps, PreviewMode } from './preview-screen/PreviewScreenTypes'
import PreviewHeader from './preview-screen/PreviewHeader'
import ColorPalette from './preview-screen/ColorPalette'
import PreviewContainer from './preview-screen/PreviewContainer'
import { ThemeConfig } from '../types/theme'
import { useTheme } from '../contexts/ThemeContext'

import { useAuth } from '../contexts/AuthContext'
import { themeService } from '../services/ThemeService'
import { useNavigate } from 'react-router-dom'

export default function PreviewScreen({ themeConfig, settings, onBack, darkMode }: PreviewScreenProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light')
  const [isDownloading, setIsDownloading] = useState(false)
  const [modifiedThemeConfig, setModifiedThemeConfig] = useState<ThemeConfig>(themeConfig)
  const { setThemeConfig } = useTheme()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  // Update theme context when themeConfig prop changes
  useEffect(() => {
    setThemeConfig(themeConfig)
    setModifiedThemeConfig(themeConfig)
  }, [themeConfig, setThemeConfig])

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

  const [snackbar, setSnackbar] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    isOpen: false,
    message: '',
    type: 'success'
  });
  const [savedThemeId, setSavedThemeId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setSnackbar({ isOpen: true, message, type });
  };

  const handleSave = async () => {
    if (!currentUser) {
      if (window.confirm('You need to be logged in to save themes. Would you like to log in now?')) {
        navigate('/login');
      }
      return;
    }

    // If already saved, unsave (delete)
    if (savedThemeId) {
      if (window.confirm('Are you sure you want to unsave (delete) this theme?')) {
        try {
          const result = await themeService.deleteTheme(currentUser.uid, savedThemeId);
          if (result.success) {
            setSavedThemeId(null);
            showSnackbar('Theme unsaved', 'info');
          } else {
            showSnackbar('Failed to unsave theme', 'error');
          }
        } catch (error) {
          showSnackbar('Error unsaving theme', 'error');
        }
      }
      return;
    }

    const themeName = prompt('Enter a name for your theme:', settings?.themeName || 'My Theme');
    if (!themeName) return;

    try {
      const result = await themeService.saveTheme(currentUser.uid, themeName, modifiedThemeConfig);
      if (result.success && result.id) {
        setSavedThemeId(result.id);
        showSnackbar('Theme saved successfully!', 'success');
      } else {
        showSnackbar('Failed to save theme: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Error saving theme:', error);
      showSnackbar('An error occurred while saving the theme.', 'error');
    }
  };

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
      className={`min-h-screen transition-all duration-300 ${darkMode
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
        onSave={handleSave}
        onShare={() => setIsShareModalOpen(true)}
        isDownloading={isDownloading}
        settings={settings}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Color Palette Sidebar - Optimized width */}
          <div className="xl:col-span-2 lg:col-span-1">
            <ColorPalette
              currentColors={currentColors}
              darkMode={darkMode}
              onColorChange={handleColorChange}
              isEditable={true}
            />
          </div>

          {/* Preview Content - More space allocated */}
          <div className="xl:col-span-5 lg:col-span-3">
            <PreviewContainer
              currentColors={currentColors}
              previewMode={previewMode}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ShareThemeComponent
              themeConfig={modifiedThemeConfig}
              themeName={settings?.themeName || 'My Theme'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * SharedThemeViewer - Complete shared theme viewing experience
 * Beautiful, robust, and feature-rich theme presentation
 */

import React, { useState, useEffect } from 'react'
import { BannerAd } from './ads'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  Download,
  Copy,
  Eye,
  Calendar,
  Tag,
  Palette,
  Code,
  Heart,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { sharingService, ShareableTheme } from '../services/SharingService'
import { downloadThemeFiles } from '../utils/FileDownloader'
import ColorPalette from './preview-screen/ColorPalette'
import WidgetPreviews from './preview-screen/WidgetPreviews'
import { useDarkMode } from '../contexts/DarkModeContext'
import CommentsSection from './gallery/CommentsSection'

interface SharedThemeViewerProps { }

interface ViewerState {
  theme: ShareableTheme | null
  loading: boolean
  error: string | null
  liked: boolean
  likeCount: number
  downloadCount: number
  previewMode: 'light' | 'dark' | 'lightMediumContrast' | 'lightHighContrast' | 'darkMediumContrast' | 'darkHighContrast'
  copySuccess: boolean
  downloading: boolean
}

export const SharedThemeViewer: React.FC<SharedThemeViewerProps> = () => {
  const { shareId } = useParams<{ shareId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode } = useDarkMode()
  const { currentUser } = useAuth()
  const [state, setState] = useState<ViewerState>({
    theme: null,
    loading: true,
    error: null,
    liked: false,
    likeCount: 0,
    downloadCount: 0,
    previewMode: darkMode ? 'dark' : 'light',
    copySuccess: false,
    downloading: false
  })

  // Sync preview mode with dark mode
  useEffect(() => {
    setState(prev => ({
      ...prev,
      previewMode: darkMode ? 'dark' : 'light'
    }))
  }, [darkMode])

  // Get available theme modes from the theme config
  // Uses both colors availability AND settings.themeVariants to determine available modes
  const getAvailableThemeModes = () => {
    if (!state.theme?.themeConfig.colors) return ['light']

    const colors = state.theme.themeConfig.colors
    const variants = state.theme.themeConfig.settings?.themeVariants
    const modes: string[] = []

    // Map settings variant keys to color keys
    const variantMap: Record<string, string> = {
      lightMode: 'light',
      lightMedium: 'lightMediumContrast',
      lightHigh: 'lightHighContrast',
      darkMode: 'dark',
      darkMedium: 'darkMediumContrast',
      darkHigh: 'darkHighContrast'
    }

    // If settings.themeVariants exists, use it to filter modes
    if (variants) {
      Object.entries(variantMap).forEach(([settingKey, colorKey]) => {
        if (variants[settingKey as keyof typeof variants] && colors[colorKey as keyof typeof colors]) {
          modes.push(colorKey)
        }
      })
    } else {
      // Fallback: check colors directly if no settings
      if (colors.light) modes.push('light')
      if (colors.lightMediumContrast) modes.push('lightMediumContrast')
      if (colors.lightHighContrast) modes.push('lightHighContrast')
      if (colors.dark) modes.push('dark')
      if (colors.darkMediumContrast) modes.push('darkMediumContrast')
      if (colors.darkHighContrast) modes.push('darkHighContrast')
    }

    // Ensure at least one mode is available
    return modes.length > 0 ? modes : ['light']
  }

  // Load shared theme
  useEffect(() => {
    const loadSharedTheme = async () => {
      if (!shareId) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Invalid share link - missing theme ID'
        }))
        return
      }

      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        const theme = await sharingService.getSharedTheme(shareId)

        if (!theme) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Theme not found or has expired'
          }))
          return
        }

        // Determine initial preview mode based on available variants and user preference
        let initialMode: any = darkMode ? 'dark' : 'light'
        const variants = theme.themeConfig.settings?.themeVariants

        if (variants) {
          const variantMap: Record<string, string> = {
            lightMode: 'light',
            lightMedium: 'lightMediumContrast',
            lightHigh: 'lightHighContrast',
            darkMode: 'dark',
            darkMedium: 'darkMediumContrast',
            darkHigh: 'darkHighContrast'
          }

          // Check if preferred mode is enabled
          const preferredKey = Object.entries(variantMap).find(([_, mode]) => mode === initialMode)?.[0]
          const isPreferredEnabled = preferredKey && variants[preferredKey as keyof typeof variants]

          if (!isPreferredEnabled) {
            // Fallback to first enabled variant
            const firstEnabled = Object.entries(variants).find(([_, enabled]) => enabled)?.[0]
            if (firstEnabled && variantMap[firstEnabled]) {
              initialMode = variantMap[firstEnabled]
            }
          }
        }

        setState(prev => ({
          ...prev,
          theme,
          downloadCount: theme.views,
          loading: false,
          previewMode: initialMode
        }))
        console.log('[SharedThemeViewer] Loaded theme:', theme);
        console.log('[SharedThemeViewer] Theme colors:', theme.themeConfig.colors);
        console.log('[SharedThemeViewer] Light primary:', theme.themeConfig.colors?.light?.primary);
        console.log('[SharedThemeViewer] Dark primary:', theme.themeConfig.colors?.dark?.primary);
        console.log('[SharedThemeViewer] Settings:', theme.themeConfig.settings);
        console.log('[SharedThemeViewer] Initial mode:', initialMode);
      } catch (error) {
        console.error('Error loading shared theme:', error)
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load shared theme'
        }))
      }
    }

    loadSharedTheme()
  }, [shareId, darkMode])

  // Load like status
  useEffect(() => {
    const loadLikeStatus = async () => {
      if (!shareId) return;
      try {
        const status = await sharingService.getLikeStatus(shareId, currentUser?.uid);
        setState(prev => ({
          ...prev,
          liked: status.liked,
          likeCount: status.likes
        }));
      } catch (error) {
        console.error('Failed to load like status:', error);
      }
    }
    loadLikeStatus()
  }, [shareId, currentUser])

  // Handle like
  const handleLike = async () => {
    if (!shareId) return;

    if (!currentUser) {
      if (confirm('Please log in to like this theme. Go to login page?')) {
        navigate('/login');
      }
      return;
    }

    // Optimistic update
    const wasLiked = state.liked;
    setState(prev => ({
      ...prev,
      liked: !wasLiked,
      likeCount: wasLiked ? prev.likeCount - 1 : prev.likeCount + 1
    }));

    try {
      const result = await sharingService.toggleLike(shareId, currentUser.uid);
      if (result.success) {
        // Update with actual server state to be sure
        setState(prev => ({
          ...prev,
          liked: result.liked,
          likeCount: result.likes
        }));
      } else {
        // Revert on failure
        setState(prev => ({
          ...prev,
          liked: wasLiked,
          likeCount: wasLiked ? prev.likeCount : prev.likeCount // Revert count
        }));
      }
    } catch (error) {
      console.error('Like failed:', error);
      // Revert on error
      setState(prev => ({
        ...prev,
        liked: wasLiked,
        likeCount: wasLiked ? prev.likeCount : prev.likeCount
      }));
    }
  }

  // Handle download
  const handleDownload = async () => {
    if (!state.theme) return

    try {
      setState(prev => ({ ...prev, downloading: true }))
      await downloadThemeFiles(state.theme.themeConfig)

      // Increment download count (views in this case, or we could add a separate download counter in DB later)
      // For now, we just increment the local state to show feedback
      setState(prev => ({
        ...prev,
        downloadCount: prev.downloadCount + 1,
        downloading: false
      }))
    } catch (error) {
      console.error('Download failed:', error)
      setState(prev => ({ ...prev, downloading: false }))
    }
  }

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      await sharingService.copyToClipboard(window.location.href)
      setState(prev => ({ ...prev, copySuccess: true }))
      setTimeout(() => setState(prev => ({ ...prev, copySuccess: false })), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }
  // Get current colors based on preview mode
  const getCurrentColors = () => {
    if (!state.theme) return null

    const { colors } = state.theme.themeConfig
    switch (state.previewMode) {
      case 'light':
        return colors.light
      case 'lightMediumContrast':
        return colors.lightMediumContrast || colors.light
      case 'lightHighContrast':
        return colors.lightHighContrast || colors.lightMediumContrast || colors.light
      case 'dark':
        return colors.dark
      case 'darkMediumContrast':
        return colors.darkMediumContrast || colors.dark
      case 'darkHighContrast':
        return colors.darkHighContrast || colors.darkMediumContrast || colors.dark
      default:
        console.log('[SharedThemeViewer] Defaulting to light mode colors');
        return colors.light
    }
  }

  // Loading state
  if (state.loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Loading Shared Theme...
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Preparing your beautiful theme preview
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (state.error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-500'
            }`} />
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Theme Not Found
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {state.error}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Create Your Own Theme
            </button>
            <button
              onClick={() => window.history.back()}
              className={`w-full px-6 py-3 border rounded-lg font-medium transition-colors ${darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!state.theme) return null

  const currentColors = getCurrentColors()
  const { theme } = state

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>

      {/* Hero Header */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-lg border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8">

          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                if (location.state?.from === 'gallery') {
                  navigate('/gallery');
                } else {
                  navigate('/');
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-600'
                }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{location.state?.from === 'gallery' ? 'Back to Gallery' : 'Create Your Theme'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`p-2 rounded-lg transition-colors ${state.liked
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : darkMode
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                  }`}
              >
                <Heart className={`w-5 h-5 ${state.liked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${state.copySuccess
                  ? 'bg-green-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                {state.copySuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Theme Info */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
                  }`}>
                  <Palette className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {theme.name}
                  </h1>
                  {theme.isPublic && (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 mt-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Public Theme</span>
                    </div>
                  )}
                </div>
              </div>

              {theme.description && (
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {theme.description}
                </p>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6">
                {theme.authorPhotoUrl ? (
                  <img src={theme.authorPhotoUrl} alt={theme.authorName} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {theme.authorName ? theme.authorName.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created by</p>
                  <p className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {theme.authorName || 'Anonymous'}
                  </p>
                </div>
              </div>

              {/* Theme Meta */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white/70'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      Created
                    </span>
                  </div>
                  <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {new Date(theme.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white/70'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      Views
                    </span>
                  </div>
                  <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {state.downloadCount}
                  </span>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white/70'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      Likes
                    </span>
                  </div>
                  <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {state.likeCount}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {theme.tags && theme.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      Tags
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {theme.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  disabled={state.downloading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {state.downloading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Downloading...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Theme
                    </div>
                  )}
                </button>

                <button
                  onClick={() => navigate(`/preview?editShared=${shareId}&returnTo=/shared/${shareId}`)}
                  className={`px-6 py-3 border-2 font-semibold rounded-lg transition-all duration-300 ${darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Code className="w-5 h-5" />
                    Edit Theme
                  </div>
                </button>
              </div>
            </div>

            {/* Color Preview */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/30' : 'bg-white/70'
              } backdrop-blur-sm border ${darkMode ? 'border-gray-600/50' : 'border-gray-200/50'
              }`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Color Palette Preview
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {currentColors && Object.entries(currentColors).slice(0, 9).map(([name, color]) => (
                  <div key={name} className="text-center">
                    <div
                      className="w-full h-12 rounded-lg shadow-md mb-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      {name.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad between hero and controls */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
        <BannerAd darkMode={darkMode} />
      </div>

      {/* Controls Bar */}
      <div className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-lg border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">

            {/* Preview Mode Selector */}
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                Theme Mode:
              </span>
              <div className={`flex items-center space-x-1 p-1 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                {getAvailableThemeModes().map((mode) => {
                  const modeLabels: Record<string, string> = {
                    'light': 'Light',
                    'lightMediumContrast': 'Light Medium',
                    'lightHighContrast': 'Light High',
                    'dark': 'Dark',
                    'darkMediumContrast': 'Dark Medium',
                    'darkHighContrast': 'Dark High'
                  }

                  return (
                    <button
                      key={mode}
                      onClick={() => setState(prev => ({
                        ...prev,
                        previewMode: mode as any
                      }))}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap ${state.previewMode === mode
                        ? mode.includes('dark')
                          ? 'bg-gray-800 text-white shadow-sm'
                          : 'bg-white text-gray-900 shadow-sm'
                        : darkMode
                          ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                        }`}
                    >
                      {modeLabels[mode] || mode}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid gap-8 xl:grid-cols-7 lg:grid-cols-4">

          {/* Color Palette Sidebar */}
          <div className="xl:col-span-2 lg:col-span-1">
            <div className={`sticky top-24 p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'
              } backdrop-blur-sm border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Complete Color Palette
              </h3>
              {currentColors && (
                <ColorPalette
                  currentColors={currentColors}
                  darkMode={darkMode}
                  onColorChange={() => { }} // Read-only
                  isEditable={false}
                />
              )}
            </div>
          </div>

          {/* Widget Previews */}
          <div className="xl:col-span-5 lg:col-span-3">
            <div className="max-w-none mx-auto">
              {currentColors && (
                <WidgetPreviews
                  currentColors={currentColors}
                  previewMode={state.previewMode}
                  darkMode={darkMode}
                />
              )}
            </div>

            {/* Comments Section */}
            <CommentsSection themeId={shareId!} darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-lg border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Love this theme?
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Create your own beautiful Flutter themes with our generator
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Create Your Theme
            </button>
          </div>
        </div>
      </footer>
    </div >
  )
}

export default SharedThemeViewer

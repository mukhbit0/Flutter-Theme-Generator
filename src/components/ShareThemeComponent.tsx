/**
 * ShareThemeComponent - Modular sharing interface
 * Completely isolated component with built-in error handling
 */

import React, { useState, useCallback, useEffect } from 'react'
import { sharingService, ShareOptions, ShareResult, ShareableTheme } from '../services/SharingService'
import { ThemeConfig } from '../types/theme'
import { Share2, Copy, Eye, EyeOff, Trash2, Clock, Tag, AlertCircle, CheckCircle, Globe, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface ShareThemeComponentProps {
  themeConfig: ThemeConfig
  settings?: any
  themeName?: string
  className?: string
}

interface ShareState {
  isSharing: boolean
  shareResult: ShareResult | null
  showHistory: boolean
  myThemes: ShareableTheme[]
  error: string | null
  copySuccess: boolean
}

export const ShareThemeComponent: React.FC<ShareThemeComponentProps> = ({
  themeConfig,
  settings,
  themeName = 'My Theme',
  className = ''
}) => {
  const { currentUser } = useAuth();
  const [state, setState] = useState<ShareState>({
    isSharing: false,
    shareResult: null,
    showHistory: false,
    myThemes: [],
    error: null,
    copySuccess: false
  })

  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    name: themeName,
    description: '',
    isPublic: false, // Default to private
    expirationDays: undefined,
    tags: []
  })

  const [newTag, setNewTag] = useState('')

  // Load user's shared themes on mount
  useEffect(() => {
    const loadThemes = async () => {
      try {
        if (sharingService.isAvailable()) {
          const themes = await sharingService.getMySharedThemes(currentUser?.uid || '')
          setState(prev => ({ ...prev, myThemes: themes }))
        }
      } catch (error) {
        console.error('Error loading shared themes:', error)
      }
    }
    loadThemes()
  }, [currentUser])

  // Handle sharing theme
  const handleShare = useCallback(async (isPublic: boolean) => {
    if (!sharingService.isAvailable()) {
      setState(prev => ({
        ...prev,
        error: 'Sharing is not available. Please check your browser settings.'
      }))
      return
    }

    setState(prev => ({ ...prev, isSharing: true, error: null }))

    try {
      // Merge settings into themeConfig if provided
      const configToShare = {
        ...themeConfig,
        settings: settings ? {
          useScreenUtil: settings.useScreenUtil,
          themeVariants: settings.themeVariants
        } : themeConfig.settings
      };

      console.log('[ShareThemeComponent] Sharing theme config:', configToShare);

      const optionsWithUser: ShareOptions = {
        ...shareOptions,
        isPublic,
        userId: currentUser?.uid,
        authorName: currentUser?.displayName || 'Anonymous',
        authorPhotoUrl: currentUser?.photoURL || undefined
      };

      const result = await sharingService.shareTheme(configToShare, optionsWithUser)

      if (result.success && result.shareId) {
        // Refresh themes list
        const themes = await sharingService.getMySharedThemes(currentUser?.uid || '')
        setState(prev => ({
          ...prev,
          shareResult: result,
          myThemes: themes,
          isSharing: false,
          error: null
        }))
      } else {
        setState(prev => ({
          ...prev,
          error: result.error || 'Failed to share theme',
          isSharing: false
        }))
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isSharing: false
      }))
    }
  }, [themeConfig, shareOptions, currentUser, settings])

  // Handle copy to clipboard
  const handleCopy = useCallback(async (text: string) => {
    try {
      const success = await sharingService.copyToClipboard(text)
      if (success) {
        setState(prev => ({ ...prev, copySuccess: true }))
        setTimeout(() => {
          setState(prev => ({ ...prev, copySuccess: false }))
        }, 2000)
      }
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }, [])

  // Handle delete theme
  const handleDelete = useCallback(async (shareId: string) => {
    if (!currentUser) return;
    try {
      const success = await sharingService.deleteSharedTheme(shareId, currentUser.uid)
      if (success) {
        const themes = await sharingService.getMySharedThemes(currentUser.uid)
        setState(prev => ({ ...prev, myThemes: themes }))
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }, [currentUser])

  // Add tag
  const addTag = useCallback(() => {
    if (newTag.trim() && !shareOptions.tags?.includes(newTag.trim())) {
      setShareOptions((prev: ShareOptions) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }))
      setNewTag('')
    }
  }, [newTag, shareOptions.tags])

  // Remove tag
  const removeTag = useCallback((tagToRemove: string) => {
    setShareOptions((prev: ShareOptions) => ({
      ...prev,
      tags: prev.tags?.filter((tag: string) => tag !== tagToRemove) || []
    }))
  }, [])

  // Error boundary fallback
  if (!sharingService.isAvailable()) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Sharing Unavailable</span>
        </div>
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">
          Theme sharing is currently unavailable. Please check your browser settings and try again.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Theme</h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Error Display */}
        {state.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Error</span>
            </div>
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{state.error}</p>
          </div>
        )}

        {/* Share Success */}
        {state.shareResult?.success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Theme Shared Successfully!</span>
            </div>

            <div className="space-y-3">
              {/* Share URL */}
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                  Share URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={state.shareResult.shareUrl || ''}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 rounded-md text-sm font-mono text-gray-900 dark:text-gray-100"
                  />
                  <button
                    onClick={() => handleCopy(state.shareResult?.shareUrl || '')}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center gap-1"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                    {state.copySuccess ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              {state.shareResult.qrCode && (
                <div>
                  <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    QR Code
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={state.shareResult.qrCode}
                      alt="QR Code for theme sharing"
                      className="w-24 h-24 rounded-lg border border-green-300 dark:border-green-600"
                    />
                    <div className="text-sm text-green-600 dark:text-green-400">
                      <p>Scan this QR code to quickly access the shared theme on mobile devices.</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setState(prev => ({ ...prev, shareResult: null }))}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                Share another theme
              </button>
            </div>
          </div>
        )}

        {/* Share Form */}
        {!state.shareResult?.success && (
          <div className="space-y-4">
            {/* Theme Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Theme Name *
              </label>
              <input
                type="text"
                value={shareOptions.name}
                onChange={(e) => setShareOptions((prev: ShareOptions) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter theme name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={shareOptions.description || ''}
                onChange={(e) => setShareOptions((prev: ShareOptions) => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Describe your theme (optional)"
                rows={3}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {shareOptions.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  placeholder="Add tag"
                />
                <button
                  onClick={addTag}
                  disabled={!newTag.trim()}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expiration (Optional)
              </label>
              <select
                value={shareOptions.expirationDays || ''}
                onChange={(e) => setShareOptions((prev: ShareOptions) => ({
                  ...prev,
                  expirationDays: e.target.value ? parseInt(e.target.value) : undefined
                }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Never expires</option>
                <option value="1">1 day</option>
                <option value="7">1 week</option>
                <option value="30">1 month</option>
                <option value="90">3 months</option>
                <option value="365">1 year</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Private Share */}
              <button
                onClick={() => handleShare(false)}
                disabled={state.isSharing || !shareOptions.name.trim()}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-md transition-colors font-medium flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600"
              >
                {state.isSharing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                Get Private Link
              </button>

              {/* Public Publish */}
              <button
                onClick={() => handleShare(true)}
                disabled={state.isSharing || !shareOptions.name.trim() || !currentUser}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium flex items-center justify-center gap-2"
                title={!currentUser ? "Log in to publish to the gallery" : "Publish to public gallery"}
              >
                {state.isSharing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Globe className="w-4 h-4" />
                )}
                Publish to Gallery
              </button>
            </div>

            {!currentUser && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                You must be logged in to publish themes to the public gallery.
              </p>
            )}
          </div>
        )}

        {/* My Shared Themes */}
        <div>
          <button
            onClick={() => setState(prev => ({ ...prev, showHistory: !prev.showHistory }))}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Clock className="w-4 h-4" />
            My Shared Themes ({state.myThemes.length})
            <span className={`transform transition-transform ${state.showHistory ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {state.showHistory && (
            <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
              {state.myThemes.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No shared themes yet
                </p>
              ) : (
                state.myThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {theme.name}
                        </h4>
                        {theme.isPublic ? (
                          <Globe className="w-3 h-3 text-green-600" />
                        ) : (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Created {new Date(theme.createdAt).toLocaleDateString()}
                        {theme.views > 0 && ` • ${theme.views} views`}
                        {theme.likes !== undefined && theme.likes > 0 && ` • ${theme.likes} likes`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(`${window.location.origin}/shared/${theme.id}`)}
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Copy share link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(theme.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete shared theme"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default ShareThemeComponent

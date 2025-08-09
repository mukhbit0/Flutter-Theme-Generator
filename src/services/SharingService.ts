/**
 * SharingService - Completely isolated sharing functionality
 * This service handles all sharing operations without affecting other parts of the app
 */

import { ThemeConfig } from '../types/theme'

export interface ShareableTheme {
  id: string
  name: string
  description?: string
  themeConfig: ThemeConfig
  createdAt: string
  expiresAt?: string
  isPublic: boolean
  downloadCount: number
  tags?: string[]
}

export interface ShareOptions {
  name: string
  description?: string
  isPublic: boolean
  expirationDays?: number
  tags?: string[]
}

export interface ShareResult {
  success: boolean
  shareId?: string
  shareUrl?: string
  qrCode?: string
  error?: string
}

class SharingService {
  private readonly baseUrl = window.location.origin // Use current origin for development
  private readonly localStorageKey = 'flutter_theme_generator_shared_themes'
  private readonly maxLocalThemes = 10

  /**
   * Share a theme and get a shareable link
   */
  async shareTheme(themeConfig: ThemeConfig, options: ShareOptions): Promise<ShareResult> {
    try {
      // For now, use local storage simulation
      // In production, this would call your API
      const shareId = this.generateShareId()
      const shareUrl = `${this.baseUrl}/shared/${shareId}`
      
      const shareableTheme: ShareableTheme = {
        id: shareId,
        name: options.name,
        description: options.description,
        themeConfig,
        createdAt: new Date().toISOString(),
        expiresAt: options.expirationDays 
          ? new Date(Date.now() + options.expirationDays * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
        isPublic: options.isPublic,
        downloadCount: 0,
        tags: options.tags || []
      }

      // Store locally (simulate API)
      await this.storeThemeLocally(shareableTheme)
      
      // Generate QR code data URL
      const qrCode = await this.generateQRCode(shareUrl)

      return {
        success: true,
        shareId,
        shareUrl,
        qrCode
      }
    } catch (error) {
      console.error('[SharingService] Error sharing theme:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Retrieve a shared theme by ID
   */
  async getSharedTheme(shareId: string): Promise<ShareableTheme | null> {
    try {
      // Simulate API call with local storage
      const themes = this.getLocalThemes()
      const theme = themes.find(t => t.id === shareId)
      
      if (!theme) {
        return null
      }

      // Check expiration
      if (theme.expiresAt && new Date() > new Date(theme.expiresAt)) {
        await this.deleteSharedTheme(shareId)
        return null
      }

      return theme
    } catch (error) {
      console.error('[SharingService] Error retrieving shared theme:', error)
      return null
    }
  }

  /**
   * Get user's shared themes
   */
  getMySharedThemes(): ShareableTheme[] {
    try {
      return this.getLocalThemes()
    } catch (error) {
      console.error('[SharingService] Error getting user themes:', error)
      return []
    }
  }

  /**
   * Delete a shared theme
   */
  async deleteSharedTheme(shareId: string): Promise<boolean> {
    try {
      const themes = this.getLocalThemes()
      const filteredThemes = themes.filter(t => t.id !== shareId)
      localStorage.setItem(this.localStorageKey, JSON.stringify(filteredThemes))
      return true
    } catch (error) {
      console.error('[SharingService] Error deleting shared theme:', error)
      return false
    }
  }

  /**
   * Copy share URL to clipboard
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const success = document.execCommand('copy')
        document.body.removeChild(textArea)
        return success
      }
    } catch (error) {
      console.error('[SharingService] Error copying to clipboard:', error)
      return false
    }
  }

  /**
   * Generate a unique share ID
   */
  private generateShareId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * Store theme locally (simulates API storage)
   */
  private async storeThemeLocally(theme: ShareableTheme): Promise<void> {
    const themes = this.getLocalThemes()
    themes.unshift(theme) // Add to beginning
    
    // Keep only the latest themes to avoid storage bloat
    const trimmedThemes = themes.slice(0, this.maxLocalThemes)
    
    localStorage.setItem(this.localStorageKey, JSON.stringify(trimmedThemes))
  }

  /**
   * Get themes from local storage
   */
  private getLocalThemes(): ShareableTheme[] {
    try {
      const stored = localStorage.getItem(this.localStorageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('[SharingService] Error parsing stored themes:', error)
      return []
    }
  }

  /**
   * Generate QR code for share URL
   */
  private async generateQRCode(url: string): Promise<string> {
    try {
      // Simple QR code generation using a service
      // In production, you might want to use a proper QR code library
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
      return qrUrl
    } catch (error) {
      console.error('[SharingService] Error generating QR code:', error)
      return ''
    }
  }

  /**
   * Validate if sharing service is available
   */
  isAvailable(): boolean {
    try {
      // Check if localStorage is available
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Get sharing statistics
   */
  getStats(): { totalShares: number; publicShares: number; privateShares: number } {
    try {
      const themes = this.getLocalThemes()
      return {
        totalShares: themes.length,
        publicShares: themes.filter(t => t.isPublic).length,
        privateShares: themes.filter(t => !t.isPublic).length
      }
    } catch (error) {
      return { totalShares: 0, publicShares: 0, privateShares: 0 }
    }
  }
}

// Export singleton instance
export const sharingService = new SharingService()
export default SharingService

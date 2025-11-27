/**
 * SharingService - Handles theme sharing via API
 */

import { ThemeConfig } from '../types/theme'

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:8787';

export interface ShareableTheme {
  id: string
  name: string
  description?: string
  themeConfig: ThemeConfig
  createdAt: string
  expiresAt?: string
  isPublic: boolean
  views: number
  tags?: string[]
}

export interface ShareOptions {
  name: string
  description?: string
  isPublic: boolean
  expirationDays?: number
  tags?: string[]
  userId?: string
}

export interface ShareResult {
  success: boolean
  shareId?: string
  shareUrl?: string
  qrCode?: string
  error?: string
}

class SharingService {
  private readonly baseUrl = window.location.origin

  /**
   * Share a theme and get a shareable link
   */
  async shareTheme(themeConfig: ThemeConfig, options: ShareOptions): Promise<ShareResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/themes/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: options.userId,
          themeConfig,
          name: options.name,
          description: options.description,
          isPublic: options.isPublic,
          tags: options.tags,
          expirationDays: options.expirationDays
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to share theme');
      }

      const shareId = data.shareId;
      const shareUrl = `${this.baseUrl}/shared/${shareId}`;

      // Generate QR code data URL
      const qrCode = await this.generateQRCode(shareUrl);

      return {
        success: true,
        shareId,
        shareUrl,
        qrCode
      };
    } catch (error) {
      console.error('[SharingService] Error sharing theme:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Retrieve a shared theme by ID
   */
  async getSharedTheme(shareId: string): Promise<ShareableTheme | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/themes/share/${shareId}`);
      const data = await response.json();

      if (!data.success || !data.theme) {
        return null;
      }

      return {
        id: data.theme.id,
        name: data.theme.name,
        description: data.theme.description,
        themeConfig: data.theme.config,
        createdAt: data.theme.created_at,
        expiresAt: data.theme.expires_at,
        isPublic: data.theme.isPublic,
        views: data.theme.views,
        tags: data.theme.tags
      };
    } catch (error) {
      console.error('[SharingService] Error retrieving shared theme:', error);
      return null;
    }
  }

  /**
   * Get user's shared themes
   */
  async getMySharedThemes(userId: string): Promise<ShareableTheme[]> {
    try {
      if (!userId) return [];

      const response = await fetch(`${API_BASE_URL}/api/themes/shared?userId=${userId}`);
      const data = await response.json();

      if (!data.success || !data.themes) {
        return [];
      }

      return data.themes;
    } catch (error) {
      console.error('[SharingService] Error getting user themes:', error);
      return [];
    }
  }

  /**
   * Delete a shared theme
   */
  async deleteSharedTheme(shareId: string, userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/themes/share/${shareId}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete shared theme');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('[SharingService] Error deleting shared theme:', error);
      return false;
    }
  }

  /**
   * Copy share URL to clipboard
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
      }
    } catch (error) {
      console.error('[SharingService] Error copying to clipboard:', error);
      return false;
    }
  }

  /**
   * Generate QR code for share URL
   */
  private async generateQRCode(url: string): Promise<string> {
    try {
      // Simple QR code generation using a service
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
      return qrUrl;
    } catch (error) {
      console.error('[SharingService] Error generating QR code:', error);
      return '';
    }
  }

  /**
   * Validate if sharing service is available
   */
  isAvailable(): boolean {
    return true; // API is always available
  }

  /**
   * Get sharing statistics (Stubbed for now as we don't have a global stats endpoint)
   */
  getStats(): { totalShares: number; publicShares: number; privateShares: number } {
    return { totalShares: 0, publicShares: 0, privateShares: 0 };
  }
}

// Export singleton instance
export const sharingService = new SharingService();
export default SharingService;

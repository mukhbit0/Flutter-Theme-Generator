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
  likes?: number
  tags?: string[]
  authorName?: string
  authorPhotoUrl?: string
}

export interface ShareOptions {
  name: string
  description?: string
  isPublic: boolean
  expirationDays?: number
  tags?: string[]
  userId?: string
  authorName?: string
  authorPhotoUrl?: string
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
   * Check if sharing service is available
   */
  isAvailable(): boolean {
    return true;
  }

  /**
   * Share a theme and get a shareable link
   */
  async shareTheme(themeConfig: ThemeConfig, options: ShareOptions): Promise<ShareResult> {
    try {
      console.log('[SharingService] shareTheme called with config:', themeConfig);
      console.log('[SharingService] Light primary:', themeConfig.colors?.light?.primary);

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
          expirationDays: options.expirationDays,
          authorName: options.authorName,
          authorPhotoUrl: options.authorPhotoUrl
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

      console.log('[SharingService] getSharedTheme response:', data.theme);
      console.log('[SharingService] Fetched config:', data.theme.config);
      console.log('[SharingService] Fetched light primary:', data.theme.config?.colors?.light?.primary);

      return {
        id: data.theme.id,
        name: data.theme.name,
        description: data.theme.description,
        themeConfig: data.theme.config,
        createdAt: data.theme.created_at,
        expiresAt: data.theme.expires_at,
        isPublic: data.theme.isPublic,
        views: data.theme.views,
        tags: data.theme.tags,
        authorName: data.theme.authorName,
        authorPhotoUrl: data.theme.authorPhotoUrl
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

      return data.themes.map((theme: any) => ({
        id: theme.shareId,
        name: theme.themeName,
        description: theme.description,
        themeConfig: theme.config, // Note: backend might not return full config in list
        createdAt: theme.createdAt,
        views: theme.views,
        likes: theme.likes,
        isPublic: theme.isPublic,
        tags: theme.tags,
        authorName: theme.authorName,
        authorPhotoUrl: theme.authorPhotoUrl
      }));
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
  /**
   * Get gallery themes with pagination and filtering
   */
  async getGalleryThemes(page = 1, limit = 12, sort = 'newest', search = ''): Promise<{ themes: any[], pagination: any }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        search
      });

      const response = await fetch(`${API_BASE_URL}/api/gallery?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch gallery themes');
      }

      return {
        themes: data.themes,
        pagination: data.pagination
      };
    } catch (error) {
      console.error('[SharingService] Error fetching gallery:', error);
      return { themes: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } };
    }
  }

  /**
   * Get comments for a theme
   */
  async getComments(themeId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${themeId}`);
      const data = await response.json();

      if (!data.success) {
        return [];
      }

      return data.comments;
    } catch (error) {
      console.error('[SharingService] Error fetching comments:', error);
      return [];
    }
  }

  /**
   * Add a comment
   */
  async addComment(themeId: string, userId: string, userName: string, content: string, parentId?: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, userId, userName, content, parentId })
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('[SharingService] Error adding comment:', error);
      return false;
    }
  }

  /**
   * Delete a comment
   */
  async deleteComment(commentId: string, userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}?userId=${userId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('[SharingService] Error deleting comment:', error);
      return false;
    }
  }

  /**
   * Toggle like on a theme
   */
  async toggleLike(themeId: string, userId: string): Promise<{ success: boolean, liked: boolean, likes: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, userId })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      return { success: true, liked: data.liked, likes: data.likes };
    } catch (error) {
      console.error('[SharingService] Error toggling like:', error);
      return { success: false, liked: false, likes: 0 };
    }
  }

  /**
   * Get like status for a theme
   */
  async getLikeStatus(themeId: string, userId?: string): Promise<{ likes: number, liked: boolean }> {
    try {
      let url = `${API_BASE_URL}/api/likes/${themeId}`;
      if (userId) {
        url += `?userId=${userId}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) return { likes: 0, liked: false };

      return { likes: data.likes, liked: data.liked };
    } catch (error) {
      console.error('[SharingService] Error getting like status:', error);
      return { likes: 0, liked: false };
    }
  }
}

// Export singleton instance
export const sharingService = new SharingService();
export default SharingService;

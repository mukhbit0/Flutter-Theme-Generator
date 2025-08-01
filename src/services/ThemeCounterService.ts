/**
 * Service to track and manage theme generation counter using Cloudflare D1 Database
 */
export class ThemeCounterService {
  private static readonly API_BASE_URL = '/api'; // Use our own API
  private static readonly TIMEOUT_MS = 5000; // Increased timeout for database ops
  private static readonly FALLBACK_COUNT = 12847;
  private static readonly GROWTH_RATE_PER_DAY = 45; // Estimated themes per day

  private static lastKnownCount: number | null = null;
  private static lastUpdateTime: number | null = null;

  /**
   * Get the current theme generation count
   */
  static async getGlobalCount(): Promise<number> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const response = await fetch(`${this.API_BASE_URL}/counter`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && typeof data.count === 'number') {
        this.lastKnownCount = data.count;
        this.lastUpdateTime = Date.now();
        
        // Store in localStorage for fallback
        localStorage.setItem('flutter-theme-counter-last-known', data.count.toString());
        localStorage.setItem('flutter-theme-counter-last-update', Date.now().toString());
        
        return data.count;
      } else {
        throw new Error('Invalid response format from counter API');
      }

    } catch (error) {
      console.warn('Failed to fetch counter from database, using fallback:', error);
      return this.getFallbackCount();
    }
  }

  /**
   * Increment the theme generation count
   */
  static async incrementGlobalCount(): Promise<number> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const response = await fetch(`${this.API_BASE_URL}/counter/increment`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && typeof data.count === 'number') {
        this.lastKnownCount = data.count;
        this.lastUpdateTime = Date.now();
        
        // Store in localStorage for fallback
        localStorage.setItem('flutter-theme-counter-last-known', data.count.toString());
        localStorage.setItem('flutter-theme-counter-last-update', Date.now().toString());
        
        return data.count;
      } else {
        throw new Error('Invalid response format from increment API');
      }

    } catch (error) {
      console.warn('Failed to increment counter in database, using fallback:', error);
      // Return incremented fallback count
      const fallbackCount = this.getFallbackCount();
      const incrementedCount = fallbackCount + 1;
      
      // Update local fallback
      localStorage.setItem('flutter-theme-counter-fallback-count', incrementedCount.toString());
      localStorage.setItem('flutter-theme-counter-fallback-update', Date.now().toString());
      
      return incrementedCount;
    }
  }

  /**
   * Record a new theme generation
   */
  static async recordThemeGeneration(): Promise<{global: number}> {
    const globalCount = await this.incrementGlobalCount();
    
    return {
      global: globalCount
    };
  }

  /**
   * Get fallback count with estimated growth
   */
  private static getFallbackCount(): number {
    // First try to use in-memory cache
    if (this.lastKnownCount !== null && this.lastUpdateTime !== null) {
      const daysSinceUpdate = (Date.now() - this.lastUpdateTime) / (1000 * 60 * 60 * 24);
      const estimatedGrowth = Math.floor(daysSinceUpdate * this.GROWTH_RATE_PER_DAY);
      return this.lastKnownCount + estimatedGrowth;
    }

    // Try localStorage cache
    const lastKnown = localStorage.getItem('flutter-theme-counter-last-known');
    const lastUpdate = localStorage.getItem('flutter-theme-counter-last-update');
    
    if (lastKnown && lastUpdate) {
      const count = parseInt(lastKnown, 10);
      const updateTime = parseInt(lastUpdate, 10);
      const daysSinceUpdate = (Date.now() - updateTime) / (1000 * 60 * 60 * 24);
      const estimatedGrowth = Math.floor(daysSinceUpdate * this.GROWTH_RATE_PER_DAY);
      return count + estimatedGrowth;
    }

    // Try fallback count from local storage
    const fallbackCount = localStorage.getItem('flutter-theme-counter-fallback-count');
    const fallbackUpdate = localStorage.getItem('flutter-theme-counter-fallback-update');
    
    if (fallbackCount && fallbackUpdate) {
      const count = parseInt(fallbackCount, 10);
      const updateTime = parseInt(fallbackUpdate, 10);
      const daysSinceUpdate = (Date.now() - updateTime) / (1000 * 60 * 60 * 24);
      const estimatedGrowth = Math.floor(daysSinceUpdate * this.GROWTH_RATE_PER_DAY);
      return count + estimatedGrowth;
    }

    // Calculate estimated growth since initial deployment (Aug 1, 2025)
    const deploymentDate = new Date('2025-08-01').getTime();
    const daysSinceDeployment = (Date.now() - deploymentDate) / (1000 * 60 * 60 * 24);
    const estimatedTotal = this.FALLBACK_COUNT + Math.floor(daysSinceDeployment * this.GROWTH_RATE_PER_DAY);
    
    return Math.max(estimatedTotal, this.FALLBACK_COUNT);
  }

  /**
   * Format count for display (e.g., 1234 -> "1.2K")
   */
  static formatCount(count: number): string {
    if (count < 1000) {
      return count.toString();
    } else if (count < 1000000) {
      return (count / 1000).toFixed(1) + 'K';
    } else {
      return (count / 1000000).toFixed(1) + 'M';
    }
  }

  // Legacy methods for backward compatibility
  static getLocalCount(): number {
    return 0; // Not used anymore
  }

  static incrementLocalCount(): number {
    return 0; // Not used anymore
  }
}

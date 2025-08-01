/**
 * Service to track and manage theme generation counter
 */
export class ThemeCounterService {
  private static readonly COUNTER_KEY = 'flutter_theme_generator_count';
  private static readonly API_ENDPOINT = 'https://api.countapi.xyz/hit/flutter-theme-generator/themes';
  private static readonly BASE_COUNT = 150; // Start counter from 150

  /**
   * Get the current theme generation count from local storage
   */
  static getLocalCount(): number {
    const count = localStorage.getItem(this.COUNTER_KEY);
    return count ? parseInt(count, 10) : 0;
  }

  /**
   * Increment the local theme generation count
   */
  static incrementLocalCount(): number {
    const currentCount = this.getLocalCount();
    const newCount = currentCount + 1;
    localStorage.setItem(this.COUNTER_KEY, newCount.toString());
    return newCount;
  }

  /**
   * Get the global theme generation count from external API
   */
  static async getGlobalCount(): Promise<number> {
    try {
      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      const response = await fetch('https://api.countapi.xyz/get/flutter-theme-generator/themes', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const externalCount = data.value || 0;
      
      // Store the successful fetch timestamp
      localStorage.setItem('flutter-theme-counter-last-fetch', Date.now().toString());
      
      return externalCount + this.BASE_COUNT;
    } catch (error) {
      console.warn('Failed to fetch global count, using fallback:', error);
      
      // Try to get a cached local count or use base count
      const localCount = this.getLocalCount();
      const lastFetch = localStorage.getItem('flutter-theme-counter-last-fetch');
      
      // If we haven't fetched successfully in the last 24 hours, add some estimated growth
      if (lastFetch) {
        const daysSinceLastFetch = (Date.now() - parseInt(lastFetch)) / (1000 * 60 * 60 * 24);
        const estimatedGrowth = Math.floor(daysSinceLastFetch * 2); // Estimate 2 themes per day
        return this.BASE_COUNT + localCount + estimatedGrowth;
      }
      
      return this.BASE_COUNT + localCount;
    }
  }

  /**
   * Increment the global theme generation count
   */
  static async incrementGlobalCount(): Promise<number> {
    try {
      // Add timeout for increment as well
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(this.API_ENDPOINT, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const newCount = (data.value || 0) + this.BASE_COUNT;
      
      // Update the successful fetch timestamp
      localStorage.setItem('flutter-theme-counter-last-fetch', Date.now().toString());
      
      return newCount;
    } catch (error) {
      console.warn('Failed to increment global count, updating locally:', error);
      
      // Fallback to local increment
      const currentLocal = this.getLocalCount();
      const newLocal = currentLocal + 1;
      localStorage.setItem('flutter-theme-counter-local', newLocal.toString());
      
      return this.BASE_COUNT + newLocal;
    }
  }

  /**
   * Record a new theme generation (both local and global)
   */
  static async recordThemeGeneration(): Promise<{local: number, global: number}> {
    const localCount = this.incrementLocalCount();
    const globalCount = await this.incrementGlobalCount();
    
    return {
      local: localCount,
      global: globalCount
    };
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
}

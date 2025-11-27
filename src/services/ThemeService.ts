import { ThemeConfig } from '../types/theme';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:8787';

export interface SavedTheme {
    id: string;
    user_id: string;
    name: string;
    config: ThemeConfig;
    created_at: string;
}

interface RawSavedTheme extends Omit<SavedTheme, 'config'> {
    config: string | ThemeConfig;
}

export const themeService = {
    async saveTheme(userId: string, name: string, themeConfig: ThemeConfig): Promise<{ success: boolean; id?: string; error?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/themes/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, name, themeConfig }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving theme:', error);
            return { success: false, error: 'Failed to save theme' };
        }
    },

    async getUserThemes(userId: string): Promise<{ success: boolean; themes?: SavedTheme[]; error?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/themes/list?userId=${userId}`);
            const data = await response.json();

            if (data.success && data.themes) {
                // Parse the config string back to object
                data.themes = data.themes.map((theme: RawSavedTheme) => ({
                    ...theme,
                    config: typeof theme.config === 'string' ? JSON.parse(theme.config) : theme.config
                }));
            }

            return data;
        } catch (error) {
            console.error('Error fetching themes:', error);
            return { success: false, error: 'Failed to fetch themes' };
        }
    },

    async deleteTheme(userId: string, themeId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/themes/delete?id=${themeId}&userId=${userId}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting theme:', error);
            return { success: false, error: 'Failed to delete theme' };
        }
    },

    async saveSharedThemeReference(userId: string, shareId: string, themeName: string): Promise<{ success: boolean; error?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/themes/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, shareId, themeName }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving shared theme reference:', error);
            return { success: false, error: 'Failed to save shared theme reference' };
        }
    },

    async getUserSharedThemes(userId: string): Promise<{ success: boolean; themes?: any[]; error?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/themes/shared?userId=${userId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching shared themes:', error);
            return { success: false, error: 'Failed to fetch shared themes' };
        }
    }
};

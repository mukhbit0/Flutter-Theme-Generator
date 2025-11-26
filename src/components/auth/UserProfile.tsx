import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { themeService, SavedTheme } from '../../services/ThemeService';
import { useNavigate } from 'react-router-dom';

export const UserProfile: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const [themes, setThemes] = useState<SavedTheme[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            loadThemes();
        }
    }, [currentUser]);

    const loadThemes = async () => {
        if (!currentUser) return;
        setLoading(true);
        const result = await themeService.getUserThemes(currentUser.uid);
        if (result.success && result.themes) {
            setThemes(result.themes);
        }
        setLoading(false);
    };

    const handleDelete = async (themeId: string) => {
        if (!currentUser || !window.confirm('Are you sure you want to delete this theme?')) return;

        const result = await themeService.deleteTheme(currentUser.uid, themeId);
        if (result.success) {
            setThemes(themes.filter(t => t.id !== themeId));
        }
    };

    const handleLoadTheme = (theme: SavedTheme) => {
        // Navigate to preview with the theme config
        // We might need a way to pass this state. For now, let's use navigation state or local storage
        // But wait, the app uses URL params or state for preview.
        // Let's navigate to preview and pass state if possible, or maybe generator with state.
        // Actually, the App.tsx handles preview with state.
        // Let's try navigating to generator and pre-populating.
        // Or better, navigate to preview directly.
        // Since we don't have a global store for "current theme" that persists across refreshes easily without URL,
        // we might need to update how we load themes.
        // For now, let's just log it.
        console.log("Load theme:", theme);
        // TODO: Implement loading theme into generator/preview
        alert("Loading themes is coming soon! (Need to wire up state)");
    };

    if (!currentUser) {
        return <div className="p-8 text-center">Please log in to view your profile.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                        <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Saved Themes</h2>

                {loading ? (
                    <div className="text-center py-8">Loading themes...</div>
                ) : themes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        You haven't saved any themes yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {themes.map(theme => (
                            <div key={theme.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700/50">
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{theme.name}</h3>
                                <p className="text-xs text-gray-500 mb-4">
                                    {new Date(theme.created_at).toLocaleDateString()}
                                </p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleLoadTheme(theme)}
                                        className="flex-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200"
                                    >
                                        Load
                                    </button>
                                    <button
                                        onClick={() => handleDelete(theme.id)}
                                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

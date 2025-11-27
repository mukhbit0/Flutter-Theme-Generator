import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { themeService, SavedTheme } from '../../services/ThemeService';
import { sharingService } from '../../services/SharingService';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useNavigate } from 'react-router-dom';

export const UserProfile: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const { darkMode } = useDarkMode();
    const [themes, setThemes] = useState<SavedTheme[]>([]);
    const [sharedThemes, setSharedThemes] = useState<any[]>([]);
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

        // Load saved themes
        const savedResult = await themeService.getUserThemes(currentUser.uid);
        if (savedResult.success && savedResult.themes) {
            setThemes(savedResult.themes);
        }

        // Load shared themes
        const sharedResult = await themeService.getUserSharedThemes(currentUser.uid);
        if (sharedResult.success && sharedResult.themes) {
            setSharedThemes(sharedResult.themes);
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

    const handleDeleteShared = async (shareId: string) => {
        if (!currentUser || !window.confirm('Are you sure you want to delete this shared theme?')) return;

        const success = await sharingService.deleteSharedTheme(shareId, currentUser.uid);
        if (success) {
            setSharedThemes(sharedThemes.filter(t => t.shareId !== shareId));
        } else {
            alert('Failed to delete shared theme');
        }
    };

    const handleLoadTheme = (theme: SavedTheme) => {
        // Navigate to preview with the theme config to load it
        // We use the 'editShared' parameter logic but for personal themes
        // Ideally we should have a cleaner way, but for now we can pass state
        // or just navigate to generator with state.

        // Let's use the generator route with state, assuming ThemeGeneratorComponent handles it.
        // Actually, looking at App.tsx, the best way is to use the 'preview' route 
        // if we want to visualize it first, or 'generator' to edit.

        // Let's go to generator to allow editing.
        // We need to pass the theme config.
        // Since we don't have a direct "load" prop in the URL for generator, 
        // we might need to use a shared context or local storage.
        // HOWEVER, App.tsx has a 'preview' route that takes state.

        // Let's try navigating to /preview with state, and from there user can "Edit".
        // Create a default settings object since it's not saved with the theme
        const defaultSettings = {
            themeName: theme.name,
            packageName: 'com.example.app',
            customColors: [],
            generateMaterialYou: false,
            includeExtensions: true,
            includeAnimations: true,
            useScreenUtil: false,
            themeVariants: {
                lightMode: true,
                lightMedium: false,
                lightHigh: false,
                darkMode: true,
                darkMedium: false,
                darkHigh: false
            }
        };

        navigate('/preview', {
            state: {
                themeConfig: theme.config,
                settings: defaultSettings
            }
        });
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    if (!currentUser) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <p>Please log in to view your profile.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Header />

            <div className="flex-1 relative overflow-hidden">
                {/* Background Assets */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src="/assets/images/auth-bg.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30 blur-sm"
                    />
                    <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/90' : 'bg-white/80'} mix-blend-overlay`}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    {/* Profile Header Card */}
                    <div className={`rounded-3xl shadow-xl p-8 mb-12 backdrop-blur-xl ${darkMode ? 'bg-gray-800/60 border border-gray-700/50' : 'bg-white/70 border border-white/50'}`}>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg ${darkMode ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'}`}>
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        currentUser.email?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {currentUser.displayName || 'User Profile'}
                                    </h1>
                                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {currentUser.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${darkMode
                                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                                    : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Saved Themes Section */}
                    <div className="mb-8">
                        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Saved Themes
                        </h2>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : themes.length === 0 ? (
                            <div className={`text-center py-16 rounded-3xl border-2 border-dashed ${darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-300 bg-gray-50/50'}`}>
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>No themes saved yet</h3>
                                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start creating amazing themes to see them here!</p>
                                <button
                                    onClick={() => navigate('/generator')}
                                    className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                    Create New Theme
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {themes.map(theme => (
                                    <div
                                        key={theme.id}
                                        className={`group relative rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800/60 border border-gray-700 hover:border-indigo-500/50' : 'bg-white border border-gray-200 hover:border-indigo-300'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {theme.name}
                                                </h3>
                                                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Created {new Date(theme.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex space-x-1">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.config.colors.light.primary }}></div>
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.config.colors.light.secondary }}></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mt-6">
                                            <button
                                                onClick={() => handleLoadTheme(theme)}
                                                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${darkMode
                                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                                            >
                                                Load Theme
                                            </button>
                                            <button
                                                onClick={() => handleDelete(theme.id)}
                                                className={`p-2 rounded-lg transition-colors ${darkMode
                                                    ? 'text-red-400 hover:bg-red-900/30'
                                                    : 'text-red-500 hover:bg-red-50'}`}
                                                title="Delete Theme"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Shared Themes Section */}
                    <div className="mb-8">
                        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Shared Themes
                        </h2>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : sharedThemes.length === 0 ? (
                            <div className={`text-center py-16 rounded-3xl border-2 border-dashed ${darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-300 bg-gray-50/50'}`}>
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </div>
                                <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>No themes shared yet</h3>
                                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Share your themes with the world!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sharedThemes.map(theme => (
                                    <div
                                        key={theme.shareId}
                                        className={`group relative rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800/60 border border-gray-700 hover:border-blue-500/50' : 'bg-white border border-gray-200 hover:border-blue-300'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {theme.themeName || 'Untitled Theme'}
                                                </h3>
                                                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    Shared on {new Date(theme.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mt-6">
                                            <button
                                                onClick={() => window.open(`${window.location.origin}/shared/${theme.shareId}`, '_blank')}
                                                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${darkMode
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                                            >
                                                View Link
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${window.location.origin}/shared/${theme.shareId}`);
                                                    alert('Link copied to clipboard!');
                                                }}
                                                className={`p-2 rounded-lg transition-colors ${darkMode
                                                    ? 'text-gray-400 hover:bg-gray-700'
                                                    : 'text-gray-500 hover:bg-gray-100'}`}
                                                title="Copy Link"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteShared(theme.shareId)}
                                                className={`p-2 rounded-lg transition-colors ${darkMode
                                                    ? 'text-red-400 hover:bg-red-900/30'
                                                    : 'text-red-500 hover:bg-red-50'}`}
                                                title="Delete Shared Theme"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer darkMode={darkMode} />
        </div>
    );
};

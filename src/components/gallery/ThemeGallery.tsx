import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft, Loader2 } from 'lucide-react';
import { sharingService } from '../../services/SharingService';
import ThemeCard from './ThemeCard';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { GridAd } from '../ads';

const ThemeGallery: React.FC = () => {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();

    const [themes, setThemes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState('newest');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to first page on search change
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        loadThemes();
    }, [page, sort, debouncedSearch]);

    const loadThemes = async () => {
        setLoading(true);
        try {
            const data = await sharingService.getGalleryThemes(page, 12, sort, debouncedSearch);
            setThemes(data.themes);
            setTotalPages(data.pagination.pages);
        } catch (error) {
            console.error('Failed to load gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`sticky top-0 z-30 backdrop-blur-lg border-b ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Theme Gallery
                            </h1>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search */}
                            <div className="relative">
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                <input
                                    type="text"
                                    placeholder="Search themes..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={`pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-all ${darkMode
                                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                        }`}
                                />
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                <select
                                    value={sort}
                                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                                    className={`pl-10 pr-8 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all ${darkMode
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        }`}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="popular">Most Popular</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : themes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {themes.map((theme, index) => (
                                <React.Fragment key={theme.id}>
                                    {index > 0 && index % 4 === 0 && (
                                        <GridAd darkMode={darkMode} />
                                    )}
                                    <ThemeCard theme={theme} darkMode={darkMode} />
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${darkMode
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 border border-gray-200'
                                        }`}
                                >
                                    Previous
                                </button>
                                <span className={`flex items-center px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${darkMode
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 border border-gray-200'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            No themes found
                        </h3>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeGallery;

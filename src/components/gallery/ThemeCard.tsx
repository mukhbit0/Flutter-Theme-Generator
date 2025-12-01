import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Heart, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ThemeCardProps {
    theme: {
        id: string;
        name: string;
        description?: string;
        views: number;
        likes: number;
        createdAt: string;
        themeColors?: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
        tags?: string[];
    };
    darkMode: boolean;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, darkMode }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/shared/${theme.id}`, { state: { from: 'gallery' } })}
            className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${darkMode
                ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50'
                : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
        >
            {/* Color Preview Header */}
            <div className="h-32 relative overflow-hidden">
                <div className="absolute inset-0 flex">
                    <div className="flex-1" style={{ backgroundColor: theme.themeColors?.primary || '#3b82f6' }} />
                    <div className="flex-1" style={{ backgroundColor: theme.themeColors?.secondary || '#6366f1' }} />
                    <div className="flex-1" style={{ backgroundColor: theme.themeColors?.tertiary || '#8b5cf6' }} />
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className={`text-lg font-bold mb-2 truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {theme.name}
                </h3>

                <p className={`text-sm mb-4 line-clamp-2 h-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {theme.description || 'No description provided.'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 h-6 overflow-hidden">
                    {theme.tags?.slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer Stats */}
                <div className={`flex items-center justify-between text-xs font-medium pt-4 border-t ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'
                    }`}>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {theme.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            {theme.likes}
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDistanceToNow(new Date(theme.createdAt), { addSuffix: true })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ThemeCard;

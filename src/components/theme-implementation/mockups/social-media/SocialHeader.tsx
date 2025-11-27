import { ThemeColors } from '../../../../types/theme';
import { ViewType } from './BottomNav';
import { HeartIcon } from '../../../common/icons';

interface SocialHeaderProps {
    colors: ThemeColors;
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    notificationCount?: number;
}

export default function SocialHeader({
    colors,
    currentView,
    onViewChange,
    notificationCount = 3,
}: SocialHeaderProps) {
    const getTitle = () => {
        switch (currentView) {
            case 'explore': return 'Explore';
            case 'reels': return 'Reels';
            case 'notifications': return 'Activity';
            case 'messages': return 'Messages';
            case 'profile': return 'Profile';
            default: return null;
        }
    };

    const title = getTitle();

    // Reels view has no header
    if (currentView === 'reels') {
        return null;
    }

    return (
        <header 
            className="px-4 py-3 flex justify-between items-center border-b"
            style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.outline 
            }}
        >
            {title ? (
                // Simple title header for other views
                <h1 style={{ color: colors.onSurface }} className="font-bold text-xl">{title}</h1>
            ) : (
                // Logo for feed
                <div className="flex items-center">
                    <svg 
                        className="w-7 h-7 mr-1" 
                        style={{ color: colors.onSurface }} 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                    >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span 
                        style={{ color: colors.onSurface }} 
                        className="text-2xl font-semibold tracking-tight"
                    >
                        Instagram
                    </span>
                    <svg 
                        className="w-4 h-4 ml-1" 
                        style={{ color: colors.onSurface }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            )}

            <div className="flex items-center space-x-5">
                <button 
                    onClick={() => onViewChange('notifications')}
                    className="relative hover:opacity-70 transition-opacity"
                    aria-label="Notifications"
                >
                    <HeartIcon 
                        className="w-7 h-7" 
                        style={{ color: colors.onSurface }}
                        filled={currentView === 'notifications'}
                    />
                    {notificationCount > 0 && currentView !== 'notifications' && (
                        <span 
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                            style={{ backgroundColor: colors.error, color: 'white' }}
                        >
                            {notificationCount}
                        </span>
                    )}
                </button>
                <button 
                    onClick={() => onViewChange('messages')}
                    className="relative hover:opacity-70 transition-opacity"
                    aria-label="Messages"
                >
                    <svg 
                        className="w-7 h-7" 
                        style={{ color: colors.onSurface }} 
                        fill={currentView === 'messages' ? 'currentColor' : 'none'}
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={currentView === 'messages' ? 0 : 2} 
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                        />
                    </svg>
                    <span 
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                        style={{ backgroundColor: colors.error, color: 'white' }}
                    >
                        2
                    </span>
                </button>
            </div>
        </header>
    );
}

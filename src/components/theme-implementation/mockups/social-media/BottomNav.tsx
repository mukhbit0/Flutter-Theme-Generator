import { ThemeColors } from '../../../../types/theme';
import { currentUserAvatar } from '../../../../data/socialMediaData';
import { HomeIcon, SearchIcon, PlusIcon, PlayIcon } from '../../../common/icons';

export type ViewType = 'feed' | 'explore' | 'reels' | 'notifications' | 'messages' | 'profile';

interface BottomNavProps {
    colors: ThemeColors;
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export default function BottomNav({
    colors,
    currentView,
    onViewChange,
}: BottomNavProps) {
    return (
        <nav 
            className="flex justify-around items-center py-2 border-t"
            style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.outline 
            }}
        >
            <button 
                onClick={() => onViewChange('feed')}
                className="p-2 transition-transform hover:scale-110"
                aria-label="Home"
                aria-current={currentView === 'feed' ? 'page' : undefined}
            >
                <HomeIcon 
                    className="w-7 h-7" 
                    style={{ color: colors.onSurface }}
                    filled={currentView === 'feed'}
                />
            </button>

            <button 
                onClick={() => onViewChange('explore')}
                className="p-2 transition-transform hover:scale-110"
                aria-label="Explore"
                aria-current={currentView === 'explore' ? 'page' : undefined}
            >
                <SearchIcon 
                    className="w-7 h-7" 
                    style={{ color: colors.onSurface }}
                    filled={currentView === 'explore'}
                />
            </button>

            <button 
                className="p-2 transition-transform hover:scale-110"
                aria-label="Create"
            >
                <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ border: `2px solid ${colors.onSurface}` }}
                >
                    <PlusIcon className="w-5 h-5" style={{ color: colors.onSurface }} />
                </div>
            </button>

            <button 
                onClick={() => onViewChange('reels')}
                className="p-2 transition-transform hover:scale-110"
                aria-label="Reels"
                aria-current={currentView === 'reels' ? 'page' : undefined}
            >
                <PlayIcon 
                    className="w-7 h-7" 
                    style={{ color: colors.onSurface }}
                    filled={currentView === 'reels'}
                />
            </button>

            <button 
                onClick={() => onViewChange('profile')}
                className="p-2 transition-transform hover:scale-110"
                aria-label="Profile"
                aria-current={currentView === 'profile' ? 'page' : undefined}
            >
                <div 
                    className={`w-7 h-7 rounded-full overflow-hidden ${currentView === 'profile' ? 'ring-2 ring-current' : ''}`}
                    style={{ 
                        color: colors.onSurface,
                        border: currentView === 'profile' ? `2px solid ${colors.onSurface}` : 'none'
                    }}
                >
                    <img 
                        src={currentUserAvatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </button>
        </nav>
    );
}

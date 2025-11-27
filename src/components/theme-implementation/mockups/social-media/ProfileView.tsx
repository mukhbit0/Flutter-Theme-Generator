import { ThemeColors } from '../../../../types/theme';
import { ProfileHighlight, currentUserAvatar, profileGridImages } from '../../../../data/socialMediaData';
import { GridIcon, TagIcon, MenuIcon } from '../../../common/icons';

interface ProfileViewProps {
    colors: ThemeColors;
    profileHighlights: ProfileHighlight[];
    profileTab: 'posts' | 'reels' | 'tagged';
    onTabChange: (tab: 'posts' | 'reels' | 'tagged') => void;
}

export default function ProfileView({
    colors,
    profileHighlights,
    profileTab,
    onTabChange,
}: ProfileViewProps) {
    return (
        <div className="pb-4">
            {/* Profile Header */}
            <div className="px-4 pt-4 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">your_username</span>
                    <svg className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="hover:opacity-70 transition-opacity" aria-label="Create">
                        <svg className="w-6 h-6" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    <button className="hover:opacity-70 transition-opacity" aria-label="Menu">
                        <MenuIcon className="w-6 h-6" style={{ color: colors.onSurface }} />
                    </button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 pt-4">
                <div className="flex items-start">
                    {/* Avatar */}
                    <div className="relative mr-6">
                        <div 
                            className="p-[3px] rounded-full"
                            style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.tertiary})` }}
                        >
                            <div className="p-[2px] rounded-full" style={{ backgroundColor: colors.background }}>
                                <img 
                                    src={currentUserAvatar} 
                                    alt="Profile" 
                                    className="w-20 h-20 rounded-full object-cover" 
                                />
                            </div>
                        </div>
                        <button 
                            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center border-2"
                            style={{ backgroundColor: colors.primary, borderColor: colors.background }}
                            aria-label="Add story"
                        >
                            <svg className="w-4 h-4" style={{ color: colors.onPrimary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex justify-around pt-3">
                        <div className="text-center">
                            <div style={{ color: colors.onSurface }} className="font-bold text-lg">142</div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs">Posts</div>
                        </div>
                        <div className="text-center cursor-pointer hover:opacity-80">
                            <div style={{ color: colors.onSurface }} className="font-bold text-lg">5.2K</div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs">Followers</div>
                        </div>
                        <div className="text-center cursor-pointer hover:opacity-80">
                            <div style={{ color: colors.onSurface }} className="font-bold text-lg">892</div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs">Following</div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                    <div style={{ color: colors.onSurface }} className="font-bold text-sm">Your Name</div>
                    <div style={{ color: colors.onSurfaceVariant }} className="text-xs mb-1">Digital Creator</div>
                    <div style={{ color: colors.onSurface }} className="text-sm leading-relaxed">
                        ✨ Creating beautiful digital experiences<br />
                        📱 UI/UX Designer & Developer<br />
                        🌍 Based in San Francisco
                    </div>
                    <a 
                        href="#" 
                        style={{ color: colors.primary }} 
                        className="text-sm font-medium block mt-1 hover:underline"
                    >
                        yourwebsite.com
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                    <button 
                        className="flex-1 py-2 rounded-lg font-bold text-sm transition-colors hover:opacity-90"
                        style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }}
                    >
                        Edit profile
                    </button>
                    <button 
                        className="flex-1 py-2 rounded-lg font-bold text-sm transition-colors hover:opacity-90"
                        style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }}
                    >
                        Share profile
                    </button>
                    <button 
                        className="w-10 py-2 rounded-lg transition-colors hover:opacity-90 flex items-center justify-center"
                        style={{ backgroundColor: colors.surfaceContainer }}
                        aria-label="Discover people"
                    >
                        <svg className="w-5 h-5" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 px-4">
                <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
                    {profileHighlights.map((highlight) => (
                        <div key={highlight.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
                            <div 
                                className="w-16 h-16 rounded-full p-[2px]"
                                style={{ border: `2px solid ${colors.outline}` }}
                            >
                                <img 
                                    src={highlight.cover} 
                                    alt={highlight.title} 
                                    className="w-full h-full rounded-full object-cover" 
                                />
                            </div>
                            <span style={{ color: colors.onSurface }} className="text-xs font-medium truncate max-w-[4rem]">
                                {highlight.title}
                            </span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ border: `2px solid ${colors.outline}` }}
                        >
                            <svg className="w-6 h-6" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span style={{ color: colors.onSurface }} className="text-xs font-medium">New</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex border-t" style={{ borderColor: colors.outline }}>
                <button 
                    onClick={() => onTabChange('posts')}
                    className={`flex-1 py-3 flex justify-center transition-colors ${profileTab === 'posts' ? 'border-b-2' : ''}`}
                    style={{ borderColor: profileTab === 'posts' ? colors.onSurface : 'transparent' }}
                    aria-label="Posts"
                >
                    <GridIcon 
                        className="w-6 h-6" 
                        style={{ color: profileTab === 'posts' ? colors.onSurface : colors.onSurfaceVariant }} 
                    />
                </button>
                <button 
                    onClick={() => onTabChange('reels')}
                    className={`flex-1 py-3 flex justify-center transition-colors ${profileTab === 'reels' ? 'border-b-2' : ''}`}
                    style={{ borderColor: profileTab === 'reels' ? colors.onSurface : 'transparent' }}
                    aria-label="Reels"
                >
                    <svg 
                        className="w-6 h-6" 
                        style={{ color: profileTab === 'reels' ? colors.onSurface : colors.onSurfaceVariant }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button 
                    onClick={() => onTabChange('tagged')}
                    className={`flex-1 py-3 flex justify-center transition-colors ${profileTab === 'tagged' ? 'border-b-2' : ''}`}
                    style={{ borderColor: profileTab === 'tagged' ? colors.onSurface : 'transparent' }}
                    aria-label="Tagged"
                >
                    <TagIcon 
                        className="w-6 h-6" 
                        style={{ color: profileTab === 'tagged' ? colors.onSurface : colors.onSurfaceVariant }} 
                    />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-0.5">
                {profileTab === 'posts' && profileGridImages.map((img, index) => (
                    <div key={index} className="aspect-square relative cursor-pointer group overflow-hidden">
                        <img 
                            src={img} 
                            alt={`Post ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            loading="lazy"
                        />
                        {index % 4 === 0 && (
                            <div className="absolute top-2 right-2">
                                <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
                {profileTab === 'reels' && (
                    <div className="col-span-3 py-12 text-center">
                        <svg className="w-12 h-12 mx-auto mb-3" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p style={{ color: colors.onSurfaceVariant }} className="text-sm">No reels yet</p>
                    </div>
                )}
                {profileTab === 'tagged' && (
                    <div className="col-span-3 py-12 text-center">
                        <svg className="w-12 h-12 mx-auto mb-3" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <p style={{ color: colors.onSurfaceVariant }} className="text-sm">No tagged photos</p>
                    </div>
                )}
            </div>
        </div>
    );
}

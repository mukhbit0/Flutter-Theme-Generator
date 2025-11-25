import { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type SocialView = 'feed' | 'profile';

export default function SocialMediaMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<SocialView>('feed');

    const posts = [
        { id: 1, user: 'alex_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', likes: 1240, caption: 'Adventure awaits! 🏔️', verified: true, location: 'Swiss Alps' },
        { id: 2, user: 'foodie_jane', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80', likes: 856, caption: 'Best brunch ever 🥑', verified: false, location: 'Downtown Cafe' },
        { id: 3, user: 'tech_guru', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', likes: 2430, caption: 'The future is here. #tech #innovation', verified: true, sponsored: true },
    ];

    const stories = [
        { id: 1, user: 'Your Story', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', active: false },
        { id: 2, user: 'mike_d', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', active: true },
        { id: 3, user: 'sarah_j', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', active: true },
        { id: 4, user: 'chris_p', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', active: true },
        { id: 5, user: 'em_w', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', active: true },
    ];

    const VerifiedBadge = () => (
        <svg className="w-3.5 h-3.5 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    );

    const renderFeed = () => (
        <div className="space-y-4 pb-4">
            {/* Stories */}
            <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4 pt-2">
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <div className={`p-[2px] rounded-full ${story.active ? '' : 'opacity-80'}`} style={{ background: story.active ? `linear-gradient(45deg, ${colors.primary}, ${colors.tertiary})` : 'transparent' }}>
                            <div className="p-[2px] rounded-full bg-white dark:bg-black" style={{ backgroundColor: colors.background }}>
                                <img src={story.image} alt={story.user} className="w-16 h-16 rounded-full object-cover border-2 border-transparent" />
                            </div>
                        </div>
                        <span style={{ color: colors.onSurface }} className="text-xs font-medium">{story.user}</span>
                    </div>
                ))}
            </div>

            {/* Posts */}
            {posts.map((post) => (
                <div key={post.id} style={{ backgroundColor: colors.surface }} className="border-t border-b border-gray-100 dark:border-gray-800 pb-2">
                    <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-transparent" />
                                {post.id === 1 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <span style={{ color: colors.onSurface }} className="text-sm font-bold mr-1">{post.user}</span>
                                    {post.verified && <VerifiedBadge />}
                                </div>
                                {post.sponsored ? (
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">Sponsored</span>
                                ) : (
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">{post.location}</span>
                                )}
                            </div>
                        </div>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </div>

                    <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-700 relative">
                        <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                        {post.sponsored && (
                            <div className="absolute bottom-4 left-0 right-0 px-4">
                                <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-lg flex justify-between items-center">
                                    <span className="font-bold text-sm">Learn More</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3">
                        <div className="flex justify-between mb-3">
                            <div className="flex space-x-4">
                                <button className="hover:scale-110 transition-transform">
                                    <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                                <button className="hover:scale-110 transition-transform">
                                    <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                </button>
                                <button className="hover:scale-110 transition-transform">
                                    <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </button>
                            </div>
                            <button className="hover:scale-110 transition-transform">
                                <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            </button>
                        </div>
                        <div style={{ color: colors.onSurface }} className="font-bold text-sm mb-1">{post.likes.toLocaleString()} likes</div>
                        <div className="text-sm leading-relaxed">
                            <span style={{ color: colors.onSurface }} className="font-bold mr-2">{post.user}</span>
                            <span style={{ color: colors.onSurface }}>{post.caption}</span>
                        </div>
                        <div style={{ color: colors.onSurfaceVariant }} className="text-xs mt-2 uppercase tracking-wide opacity-70">2 hours ago</div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderProfile = () => (
        <div className="space-y-6">
            <div className="px-4 pt-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="w-24 h-24 rounded-full p-[3px]" style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}>
                        <div className="w-full h-full rounded-full p-[3px] bg-white dark:bg-black" style={{ backgroundColor: colors.background }}>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-around text-center ml-4">
                        <div>
                            <div style={{ color: colors.onSurface }} className="font-bold text-xl">124</div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Posts</div>
                        </div>
                        <div>
                            <div style={{ color: colors.onSurface }} className="font-bold text-xl">4.5k</div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Followers</div>
                        </div>
                        <div>
                            <div style={{ color: colors.onSurface }} className="font-bold text-xl">342</div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Following</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center">
                        <span style={{ color: colors.onSurface }} className="font-bold text-lg mr-1">Jessica Smith</span>
                        <VerifiedBadge />
                    </div>
                    <div style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Digital Creator 📸 | Travel & Lifestyle ✈️</div>
                    <div style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Capturing moments around the world 🌍</div>
                    <div style={{ color: colors.primary }} className="text-sm font-bold mt-1">www.jessica-smith.com</div>
                </div>

                <div className="flex space-x-2 mt-6">
                    <button style={{ backgroundColor: colors.primary, color: colors.onPrimary }} className="flex-1 py-2 rounded-lg text-sm font-bold shadow-sm">Follow</button>
                    <button style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }} className="flex-1 py-2 rounded-lg text-sm font-bold">Message</button>
                    <button style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }} className="p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </div>

            {/* Highlights */}
            <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4">
                {['Travel', 'Food', 'Life', 'Work', 'Pets'].map((item, i) => (
                    <div key={item} className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700">
                            <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=100&q=80`} alt={item} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span style={{ color: colors.onSurface }} className="text-xs font-medium">{item}</span>
                    </div>
                ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 relative group cursor-pointer">
                        <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=300&q=80`} alt="Post" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white font-bold">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                1.2k
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full relative">
            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div style={{ color: colors.onSurface }} className="font-bold text-xl font-serif tracking-wide">SocialApp</div>
                <div className="flex items-center space-x-5">
                    <svg style={{ color: colors.onSurface }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <div className="relative">
                        <svg style={{ color: colors.onSurface }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        <span style={{ backgroundColor: colors.error, color: colors.onError }} className="absolute -top-1.5 -right-1.5 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">3</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-0 overflow-y-auto no-scrollbar">
                {currentView === 'feed' && renderFeed()}
                {currentView === 'profile' && renderProfile()}
            </div>

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-3 px-6 flex justify-between items-center">
                <div
                    onClick={() => setCurrentView('feed')}
                    style={{ color: currentView === 'feed' ? colors.primary : colors.onSurfaceVariant }}
                    className="cursor-pointer hover:scale-110 transition-transform"
                >
                    <svg className="w-7 h-7" fill={currentView === 'feed' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <div style={{ color: colors.onSurfaceVariant }} className="cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div style={{ color: colors.onSurfaceVariant }} className="cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div style={{ color: colors.onSurfaceVariant }} className="cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <div
                    onClick={() => setCurrentView('profile')}
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 cursor-pointer hover:scale-110 transition-transform ${currentView === 'profile' ? 'border-current' : 'border-transparent'}`}
                    style={{ borderColor: currentView === 'profile' ? colors.primary : 'transparent' }}
                >
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

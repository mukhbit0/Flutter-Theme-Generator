import { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type SocialView = 'feed' | 'explore' | 'reels' | 'notifications' | 'messages' | 'profile';

interface Post {
    id: number;
    user: string;
    avatar: string;
    image: string;
    likes: number;
    caption: string;
    verified: boolean;
    location?: string;
    sponsored?: boolean;
    comments?: number;
    shares?: number;
}

interface Story {
    id: number;
    user: string;
    image: string;
    active: boolean;
    live?: boolean;
}

interface Message {
    id: number;
    user: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    verified?: boolean;
}

interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'tag';
    user: string;
    avatar: string;
    text: string;
    time: string;
    image?: string;
    followed?: boolean;
}

interface Reel {
    id: number;
    user: string;
    avatar: string;
    video: string;
    thumbnail: string;
    likes: string;
    comments: string;
    shares: string;
    caption: string;
    music: string;
    verified?: boolean;
}

export default function SocialMediaMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<SocialView>('feed');
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
    const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
    const [activeReelIndex, setActiveReelIndex] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [activeStory, setActiveStory] = useState<number | null>(null);
    const [profileTab, setProfileTab] = useState<'posts' | 'reels' | 'tagged'>('posts');

    const posts: Post[] = [
        { id: 1, user: 'alex_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', likes: 1240, caption: 'Adventure awaits! 🏔️', verified: true, location: 'Swiss Alps', comments: 89, shares: 23 },
        { id: 2, user: 'foodie_jane', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80', likes: 856, caption: 'Best brunch ever 🥑', verified: false, location: 'Downtown Cafe', comments: 42, shares: 12 },
        { id: 3, user: 'tech_guru', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', likes: 2430, caption: 'The future is here. #tech #innovation', verified: true, sponsored: true, comments: 156, shares: 78 },
    ];

    const stories: Story[] = [
        { id: 1, user: 'Your Story', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', active: false },
        { id: 2, user: 'mike_d', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', active: true, live: true },
        { id: 3, user: 'sarah_j', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', active: true },
        { id: 4, user: 'chris_p', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', active: true },
        { id: 5, user: 'em_w', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', active: true },
    ];

    const messages: Message[] = [
        { id: 1, user: 'mike_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', lastMessage: 'Hey! Did you see the new design?', time: '2m', unread: 3, online: true, verified: true },
        { id: 2, user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', lastMessage: 'That looks amazing! 🔥', time: '15m', unread: 0, online: true },
        { id: 3, user: 'alex_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', lastMessage: 'When are you coming to the meetup?', time: '1h', unread: 1, online: false, verified: true },
        { id: 4, user: 'emma_wilson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', lastMessage: 'Sure, let me check my schedule', time: '3h', unread: 0, online: false },
        { id: 5, user: 'tech_guru', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', lastMessage: 'Sent you the files 📁', time: '5h', unread: 0, online: true, verified: true },
        { id: 6, user: 'lisa_art', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80', lastMessage: 'Thanks for the feedback!', time: '1d', unread: 0, online: false },
    ];

    const notifications: Notification[] = [
        { id: 1, type: 'like', user: 'mike_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'liked your photo', time: '2m', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=100&q=80' },
        { id: 2, type: 'follow', user: 'new_user_2024', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=100&q=80', text: 'started following you', time: '15m', followed: false },
        { id: 3, type: 'comment', user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', text: 'commented: "This is beautiful! 😍"', time: '1h', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=100&q=80' },
        { id: 4, type: 'mention', user: 'alex_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', text: 'mentioned you in a comment', time: '2h', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80' },
        { id: 5, type: 'follow', user: 'creative_studio', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', text: 'started following you', time: '3h', followed: true },
        { id: 6, type: 'like', user: 'foodie_jane', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'and 23 others liked your reel', time: '5h', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80' },
        { id: 7, type: 'tag', user: 'emma_wilson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', text: 'tagged you in a post', time: '1d', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80' },
    ];

    const reels: Reel[] = [
        { id: 1, user: 'dance_queen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', video: '', thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80', likes: '45.2K', comments: '1.2K', shares: '890', caption: 'New dance challenge! Try it 💃 #viral #dance', music: '♪ Original Sound - dance_queen', verified: true },
        { id: 2, user: 'cooking_master', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', video: '', thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', likes: '23.8K', comments: '567', shares: '1.1K', caption: 'Easy 5-min pasta recipe 🍝 Save for later!', music: '♪ Cooking Vibes - Lofi Beats' },
        { id: 3, user: 'travel_addict', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', video: '', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80', likes: '89.5K', comments: '2.3K', shares: '5.6K', caption: 'POV: You discover a hidden waterfall 🌊', music: '♪ Adventure Awaits - Epic Music', verified: true },
    ];

    const exploreCategories = ['For You', 'Travel', 'Food', 'Fashion', 'Tech', 'Art', 'Music', 'Sports'];
    const [activeCategory, setActiveCategory] = useState('For You');

    const exploreGrid = [
        { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=400&q=80', span: 'col-span-1 row-span-2' },
        { id: 2, type: 'reel', src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80', views: '1.2M', span: 'col-span-1 row-span-1' },
        { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', span: 'col-span-1 row-span-1' },
        { id: 4, type: 'reel', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80', views: '890K', span: 'col-span-1 row-span-1' },
        { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80', span: 'col-span-1 row-span-1' },
        { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=80', span: 'col-span-1 row-span-2' },
        { id: 7, type: 'reel', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80', views: '2.5M', span: 'col-span-1 row-span-1' },
        { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80', span: 'col-span-1 row-span-1' },
        { id: 9, type: 'image', src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80', span: 'col-span-1 row-span-1' },
    ];

    const toggleLike = (postId: number) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) newSet.delete(postId);
            else newSet.add(postId);
            return newSet;
        });
    };

    const toggleSave = (postId: number) => {
        setSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) newSet.delete(postId);
            else newSet.add(postId);
            return newSet;
        });
    };

    const toggleFollow = (userId: string) => {
        setFollowedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) newSet.delete(userId);
            else newSet.add(userId);
            return newSet;
        });
    };

    const VerifiedBadge = () => (
        <svg className="w-3.5 h-3.5 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    );

    // Story Viewer Modal
    const renderStoryViewer = () => {
        if (activeStory === null) return null;
        const story = stories.find(s => s.id === activeStory);
        if (!story) return null;

        return (
            <div className="absolute inset-0 z-50 bg-black flex flex-col">
                {/* Progress bars */}
                <div className="flex space-x-1 p-2">
                    {stories.filter(s => s.active).map((_, i) => (
                        <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                            <div className={`h-full bg-white ${i === 0 ? 'w-full animate-pulse' : 'w-0'}`} />
                        </div>
                    ))}
                </div>
                
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center space-x-3">
                        <img src={story.image} alt={story.user} className="w-8 h-8 rounded-full object-cover ring-2 ring-white" />
                        <span className="text-white font-semibold text-sm">{story.user}</span>
                        <span className="text-white/60 text-xs">2h</span>
                    </div>
                    <button onClick={() => setActiveStory(null)} className="text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Story Content */}
                <div className="flex-1 flex items-center justify-center">
                    <img src={story.image} alt="Story" className="max-w-full max-h-full object-contain" />
                </div>

                {/* Story Actions */}
                <div className="p-4 flex items-center space-x-3">
                    <input 
                        type="text" 
                        placeholder="Send message..." 
                        className="flex-1 bg-transparent border border-white/30 rounded-full px-4 py-2 text-white text-sm placeholder-white/50"
                    />
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
            </div>
        );
    };

    // Comments Modal
    const renderCommentsModal = () => {
        if (!showComments) return null;
        
        const comments = [
            { id: 1, user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', text: 'This is amazing! 😍', time: '2h', likes: 24 },
            { id: 2, user: 'mike_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'Incredible shot! Where is this?', time: '1h', likes: 12 },
            { id: 3, user: 'travel_lover', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', text: 'Adding this to my bucket list 🗒️', time: '45m', likes: 8 },
        ];

        return (
            <div className="absolute inset-0 z-50 flex flex-col" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: colors.outlineVariant }}>
                    <span style={{ color: colors.onSurface }} className="font-bold">Comments</span>
                    <button onClick={() => setShowComments(false)}>
                        <svg style={{ color: colors.onSurface }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex space-x-3">
                            <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full object-cover" />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <span style={{ color: colors.onSurface }} className="font-semibold text-sm">{comment.user}</span>
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">{comment.time}</span>
                                </div>
                                <p style={{ color: colors.onSurface }} className="text-sm mt-1">{comment.text}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">{comment.likes} likes</span>
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs font-semibold cursor-pointer">Reply</span>
                                </div>
                            </div>
                            <svg style={{ color: colors.onSurfaceVariant }} className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex items-center space-x-3" style={{ borderColor: colors.outlineVariant }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="You" className="w-8 h-8 rounded-full object-cover" />
                    <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="flex-1 bg-transparent text-sm outline-none"
                        style={{ color: colors.onSurface }}
                    />
                    <span style={{ color: colors.primary }} className="font-semibold text-sm cursor-pointer">Post</span>
                </div>
            </div>
        );
    };

    const renderFeed = () => (
        <div className="space-y-4 pb-4">
            {/* Stories */}
            <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4 pt-2">
                {stories.map((story) => (
                    <div 
                        key={story.id} 
                        className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer"
                        onClick={() => story.active && setActiveStory(story.id)}
                    >
                        <div className={`p-[2px] rounded-full relative ${story.active ? '' : 'opacity-80'}`} style={{ background: story.active ? `linear-gradient(45deg, ${colors.primary}, ${colors.tertiary})` : 'transparent' }}>
                            <div className="p-[2px] rounded-full bg-white dark:bg-black" style={{ backgroundColor: colors.background }}>
                                <img src={story.image} alt={story.user} className="w-16 h-16 rounded-full object-cover border-2 border-transparent" />
                            </div>
                            {story.live && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Live
                                </div>
                            )}
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
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </div>

                    <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-700 relative" onDoubleClick={() => toggleLike(post.id)}>
                        <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                        {post.sponsored && (
                            <div className="absolute bottom-4 left-0 right-0 px-4">
                                <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-lg flex justify-between items-center">
                                    <span className="font-bold text-sm">Learn More</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        )}
                        {likedPosts.has(post.id) && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <svg className="w-20 h-20 text-red-500 animate-ping" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                            </div>
                        )}
                    </div>

                    <div className="p-3">
                        <div className="flex justify-between mb-3">
                            <div className="flex space-x-4">
                                <button className="hover:scale-110 transition-transform" onClick={() => toggleLike(post.id)}>
                                    <svg style={{ color: likedPosts.has(post.id) ? colors.error : colors.onSurface }} className="w-7 h-7" fill={likedPosts.has(post.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                                <button className="hover:scale-110 transition-transform" onClick={() => setShowComments(true)}>
                                    <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                </button>
                                <button className="hover:scale-110 transition-transform">
                                    <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </button>
                            </div>
                            <button className="hover:scale-110 transition-transform" onClick={() => toggleSave(post.id)}>
                                <svg style={{ color: colors.onSurface }} className="w-7 h-7" fill={savedPosts.has(post.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            </button>
                        </div>
                        <div style={{ color: colors.onSurface }} className="font-bold text-sm mb-1">{(post.likes + (likedPosts.has(post.id) ? 1 : 0)).toLocaleString()} likes</div>
                        <div className="text-sm leading-relaxed">
                            <span style={{ color: colors.onSurface }} className="font-bold mr-2">{post.user}</span>
                            <span style={{ color: colors.onSurface }}>{post.caption}</span>
                        </div>
                        {post.comments && (
                            <button onClick={() => setShowComments(true)} style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">
                                View all {post.comments} comments
                            </button>
                        )}
                        <div style={{ color: colors.onSurfaceVariant }} className="text-xs mt-2 uppercase tracking-wide opacity-70">2 hours ago</div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderExplore = () => (
        <div className="flex flex-col h-full">
            {/* Search Bar */}
            <div className="px-4 py-2">
                <div className="flex items-center space-x-3 px-4 py-2.5 rounded-xl" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                    <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: colors.onSurface }}
                    />
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex space-x-2 overflow-x-auto pb-3 px-4 no-scrollbar">
                {exploreCategories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? 'shadow-md' : ''}`}
                        style={{ 
                            backgroundColor: activeCategory === cat ? colors.primary : colors.surfaceContainerHighest,
                            color: activeCategory === cat ? colors.onPrimary : colors.onSurfaceVariant
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Explore Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-3 gap-0.5">
                    {exploreGrid.map(item => (
                        <div key={item.id} className={`${item.span} aspect-square relative group cursor-pointer overflow-hidden`}>
                            <img src={item.src} alt="Explore" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            {item.type === 'reel' && (
                                <>
                                    <div className="absolute top-2 right-2">
                                        <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" /></svg>
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs font-semibold drop-shadow-lg">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                                        <span>{item.views}</span>
                                    </div>
                                </>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderReels = () => (
        <div className="relative h-full bg-black overflow-hidden">
            {/* Reel Content */}
            <div className="absolute inset-0">
                <img 
                    src={reels[activeReelIndex].thumbnail} 
                    alt="Reel" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </div>

            {/* Reel Navigation Indicators */}
            <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1.5 z-10">
                {reels.map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-all ${i === activeReelIndex ? 'bg-white w-6' : 'bg-white/40'}`}
                        onClick={() => setActiveReelIndex(i)}
                    />
                ))}
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-3 bottom-28 flex flex-col items-center space-y-5 z-10">
                <div className="relative">
                    <img 
                        src={reels[activeReelIndex].avatar} 
                        alt="User" 
                        className="w-11 h-11 rounded-full border-2 border-white object-cover"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: colors.primary }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    </div>
                </div>
                
                <div className="flex flex-col items-center">
                    <button className="text-white hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                    </button>
                    <span className="text-white text-xs font-semibold mt-1">{reels[activeReelIndex].likes}</span>
                </div>

                <div className="flex flex-col items-center">
                    <button className="text-white hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </button>
                    <span className="text-white text-xs font-semibold mt-1">{reels[activeReelIndex].comments}</span>
                </div>

                <div className="flex flex-col items-center">
                    <button className="text-white hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                    <span className="text-white text-xs font-semibold mt-1">{reels[activeReelIndex].shares}</span>
                </div>

                <button className="text-white hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </button>

                <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden">
                    <img src={reels[activeReelIndex].thumbnail} alt="Music" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-3 right-16 z-10">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white font-bold text-sm">{reels[activeReelIndex].user}</span>
                    {reels[activeReelIndex].verified && <VerifiedBadge />}
                    <button 
                        className="px-3 py-0.5 rounded border border-white text-white text-xs font-semibold"
                        onClick={() => toggleFollow(reels[activeReelIndex].user)}
                    >
                        {followedUsers.has(reels[activeReelIndex].user) ? 'Following' : 'Follow'}
                    </button>
                </div>
                <p className="text-white text-sm line-clamp-2">{reels[activeReelIndex].caption}</p>
                <div className="flex items-center space-x-2 mt-2">
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" /></svg>
                    </div>
                    <span className="text-white text-xs">{reels[activeReelIndex].music}</span>
                </div>
            </div>

            {/* Tap Zones for Navigation */}
            <div className="absolute inset-y-0 left-0 w-1/3 z-20" onClick={() => setActiveReelIndex(prev => Math.max(0, prev - 1))} />
            <div className="absolute inset-y-0 right-0 w-1/3 z-20" onClick={() => setActiveReelIndex(prev => Math.min(reels.length - 1, prev + 1))} />
        </div>
    );

    const renderNotifications = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: colors.surface }}>
                <span style={{ color: colors.onSurface }} className="font-bold text-lg">Activity</span>
            </div>

            {/* Notification Sections */}
            <div className="flex-1 overflow-y-auto no-scrollbar" style={{ backgroundColor: colors.background }}>
                {/* Today */}
                <div className="px-4 py-2">
                    <span style={{ color: colors.onSurface }} className="font-bold text-sm">Today</span>
                </div>
                
                {notifications.slice(0, 3).map(notif => (
                    <div 
                        key={notif.id} 
                        className="flex items-center px-4 py-3 space-x-3"
                        style={{ backgroundColor: notif.type === 'follow' && !notif.followed ? colors.surfaceContainerLowest : 'transparent' }}
                    >
                        <div className="relative">
                            <img src={notif.avatar} alt={notif.user} className="w-11 h-11 rounded-full object-cover" />
                            {notif.type === 'like' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                </div>
                            )}
                            {notif.type === 'comment' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                                    <svg className="w-3 h-3" style={{ color: colors.onPrimary }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                                </div>
                            )}
                            {notif.type === 'follow' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
                                    <svg className="w-3 h-3" style={{ color: colors.onSecondary }} fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm">
                                <span style={{ color: colors.onSurface }} className="font-semibold">{notif.user}</span>
                                <span style={{ color: colors.onSurfaceVariant }}> {notif.text}</span>
                                <span style={{ color: colors.onSurfaceVariant }} className="opacity-60"> {notif.time}</span>
                            </p>
                        </div>
                        {notif.image && (
                            <img src={notif.image} alt="Post" className="w-11 h-11 rounded object-cover" />
                        )}
                        {notif.type === 'follow' && (
                            <button 
                                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                style={{ 
                                    backgroundColor: notif.followed ? colors.surfaceContainerHighest : colors.primary,
                                    color: notif.followed ? colors.onSurface : colors.onPrimary
                                }}
                                onClick={() => toggleFollow(notif.user)}
                            >
                                {followedUsers.has(notif.user) || notif.followed ? 'Following' : 'Follow'}
                            </button>
                        )}
                    </div>
                ))}

                {/* This Week */}
                <div className="px-4 py-2 mt-2">
                    <span style={{ color: colors.onSurface }} className="font-bold text-sm">This Week</span>
                </div>
                
                {notifications.slice(3).map(notif => (
                    <div 
                        key={notif.id} 
                        className="flex items-center px-4 py-3 space-x-3"
                    >
                        <div className="relative">
                            <img src={notif.avatar} alt={notif.user} className="w-11 h-11 rounded-full object-cover" />
                            {notif.type === 'mention' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">@</span>
                                </div>
                            )}
                            {notif.type === 'tag' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                                </div>
                            )}
                            {notif.type === 'like' && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm">
                                <span style={{ color: colors.onSurface }} className="font-semibold">{notif.user}</span>
                                <span style={{ color: colors.onSurfaceVariant }}> {notif.text}</span>
                                <span style={{ color: colors.onSurfaceVariant }} className="opacity-60"> {notif.time}</span>
                            </p>
                        </div>
                        {notif.image && (
                            <img src={notif.image} alt="Post" className="w-11 h-11 rounded object-cover" />
                        )}
                        {notif.type === 'follow' && (
                            <button 
                                className="px-4 py-1.5 rounded-lg text-xs font-semibold"
                                style={{ 
                                    backgroundColor: notif.followed ? colors.surfaceContainerHighest : colors.primary,
                                    color: notif.followed ? colors.onSurface : colors.onPrimary
                                }}
                            >
                                {notif.followed ? 'Following' : 'Follow'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMessages = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center space-x-3">
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">jessica_smith</span>
                    <svg className="w-4 h-4" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className="flex items-center space-x-4">
                    <svg style={{ color: colors.onSurface }} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <svg style={{ color: colors.onSurface }} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center space-x-3 px-4 py-2 rounded-xl" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                    <svg style={{ color: colors.onSurfaceVariant }} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: colors.onSurface }}
                    />
                </div>
            </div>

            {/* Messages Tabs */}
            <div className="flex px-4 py-2 border-b" style={{ backgroundColor: colors.surface, borderColor: colors.outlineVariant }}>
                <button className="flex-1 py-2 text-sm font-semibold border-b-2" style={{ color: colors.onSurface, borderColor: colors.primary }}>
                    Primary
                </button>
                <button className="flex-1 py-2 text-sm font-medium" style={{ color: colors.onSurfaceVariant }}>
                    General
                </button>
                <button className="flex-1 py-2 text-sm font-medium relative" style={{ color: colors.onSurfaceVariant }}>
                    Requests
                    <span className="absolute top-1 right-4 w-2 h-2 rounded-full" style={{ backgroundColor: colors.error }} />
                </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto no-scrollbar" style={{ backgroundColor: colors.background }}>
                {/* Notes Section */}
                <div className="px-4 py-3 flex items-center space-x-3 border-b" style={{ borderColor: colors.outlineVariant }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </div>
                    <div>
                        <span style={{ color: colors.onSurface }} className="font-semibold text-sm">Your note</span>
                        <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Share a thought...</p>
                    </div>
                </div>

                {messages.map(msg => (
                    <div key={msg.id} className="flex items-center px-4 py-3 space-x-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="relative">
                            <img src={msg.avatar} alt={msg.user} className="w-14 h-14 rounded-full object-cover" />
                            {msg.online && (
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2" style={{ borderColor: colors.background }} />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                                <span style={{ color: msg.unread > 0 ? colors.onSurface : colors.onSurfaceVariant }} className={`text-sm ${msg.unread > 0 ? 'font-bold' : ''}`}>{msg.user}</span>
                                {msg.verified && <VerifiedBadge />}
                            </div>
                            <p className={`text-sm truncate ${msg.unread > 0 ? 'font-semibold' : ''}`} style={{ color: msg.unread > 0 ? colors.onSurface : colors.onSurfaceVariant }}>
                                {msg.lastMessage}
                            </p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <span style={{ color: colors.onSurfaceVariant }} className="text-xs">{msg.time}</span>
                            {msg.unread > 0 && (
                                <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: colors.primary, color: colors.onPrimary }}>
                                    {msg.unread}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProfile = () => {
        return (
            <div className="space-y-4">
                <div className="px-4 pt-2">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-20 h-20 rounded-full p-[3px]" style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}>
                            <div className="w-full h-full rounded-full p-[3px] bg-white dark:bg-black" style={{ backgroundColor: colors.background }}>
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 flex justify-around text-center ml-4">
                            <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                <div style={{ color: colors.onSurface }} className="font-bold text-xl">124</div>
                                <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Posts</div>
                            </div>
                            <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                <div style={{ color: colors.onSurface }} className="font-bold text-xl">4.5k</div>
                                <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Followers</div>
                            </div>
                            <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                <div style={{ color: colors.onSurface }} className="font-bold text-xl">342</div>
                                <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Following</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <span style={{ color: colors.onSurface }} className="font-bold text-base mr-1">Jessica Smith</span>
                            <VerifiedBadge />
                        </div>
                        <div style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Digital Creator 📸 | Travel & Lifestyle ✈️</div>
                        <div style={{ color: colors.onSurfaceVariant }} className="text-sm">Capturing moments around the world 🌍</div>
                        <div style={{ color: colors.primary }} className="text-sm font-bold mt-1">www.jessica-smith.com</div>
                        
                        {/* Followed by */}
                        <div className="flex items-center mt-3 space-x-2">
                            <div className="flex -space-x-2">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80" className="w-5 h-5 rounded-full border border-white" alt="" />
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80" className="w-5 h-5 rounded-full border border-white" alt="" />
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&q=80" className="w-5 h-5 rounded-full border border-white" alt="" />
                            </div>
                            <span style={{ color: colors.onSurfaceVariant }} className="text-xs">Followed by <span className="font-semibold">mike_design</span> + 12 more</span>
                        </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                        <button style={{ backgroundColor: colors.primary, color: colors.onPrimary }} className="flex-1 py-2 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">Follow</button>
                        <button 
                            style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }} 
                            className="flex-1 py-2 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
                            onClick={() => setCurrentView('messages')}
                        >
                            Message
                        </button>
                        <button style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }} className="p-2 rounded-lg hover:opacity-80 transition-opacity">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </button>
                    </div>
                </div>

                {/* Highlights */}
                <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4">
                    {[
                        { name: 'Travel', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Food', img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Life', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Work', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Pets', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80' },
                        { name: 'New', img: '' },
                    ].map((item) => (
                        <div key={item.name} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
                            <div className="w-16 h-16 rounded-full p-0.5 border border-gray-200 dark:border-gray-700" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                                {item.img ? (
                                    <img src={item.img} alt={item.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <div className="w-full h-full rounded-full flex items-center justify-center">
                                        <svg style={{ color: colors.onSurfaceVariant }} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </div>
                                )}
                            </div>
                            <span style={{ color: colors.onSurface }} className="text-xs font-medium">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Profile Tabs */}
                <div className="flex border-t" style={{ borderColor: colors.outlineVariant }}>
                    <button 
                        onClick={() => setProfileTab('posts')}
                        className="flex-1 py-3 flex justify-center border-b-2 transition-all"
                        style={{ borderColor: profileTab === 'posts' ? colors.onSurface : 'transparent' }}
                    >
                        <svg style={{ color: profileTab === 'posts' ? colors.onSurface : colors.onSurfaceVariant }} className="w-6 h-6" fill={profileTab === 'posts' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </button>
                    <button 
                        onClick={() => setProfileTab('reels')}
                        className="flex-1 py-3 flex justify-center border-b-2 transition-all"
                        style={{ borderColor: profileTab === 'reels' ? colors.onSurface : 'transparent' }}
                    >
                        <svg style={{ color: profileTab === 'reels' ? colors.onSurface : colors.onSurfaceVariant }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                    <button 
                        onClick={() => setProfileTab('tagged')}
                        className="flex-1 py-3 flex justify-center border-b-2 transition-all"
                        style={{ borderColor: profileTab === 'tagged' ? colors.onSurface : 'transparent' }}
                    >
                        <svg style={{ color: profileTab === 'tagged' ? colors.onSurface : colors.onSurfaceVariant }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
                    </button>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-3 gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 relative group cursor-pointer overflow-hidden">
                            <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=300&q=80`} alt="Post" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            {profileTab === 'reels' && i <= 3 && (
                                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs font-semibold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                                    <span>{(Math.random() * 100).toFixed(0)}K</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white font-bold">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                    {(Math.random() * 5).toFixed(1)}k
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                                    {Math.floor(Math.random() * 100)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Get app bar title based on view
    const getAppBarContent = () => {
        switch (currentView) {
            case 'reels':
                return null; // Reels has no app bar
            case 'messages':
                return null; // Messages has its own header
            case 'notifications':
                return null; // Notifications has its own header
            case 'profile':
                return (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-1">
                            <span style={{ color: colors.onSurface }} className="font-bold text-lg">jessica_smith</span>
                            <VerifiedBadge />
                            <svg className="w-4 h-4" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <div className="flex items-center space-x-5">
                            <svg style={{ color: colors.onSurface }} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            <svg style={{ color: colors.onSurface }} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        <div style={{ color: colors.onSurface }} className="font-bold text-xl font-serif tracking-wide">SocialApp</div>
                        <div className="flex items-center space-x-5">
                            <svg style={{ color: colors.onSurface }} className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            <div className="relative cursor-pointer" onClick={() => setCurrentView('messages')}>
                                <svg style={{ color: colors.onSurface }} className="w-6 h-6 hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                <span style={{ backgroundColor: colors.error, color: colors.onError }} className="absolute -top-1.5 -right-1.5 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">3</span>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Story Viewer Overlay */}
            {renderStoryViewer()}
            
            {/* Comments Modal Overlay */}
            {renderCommentsModal()}

            {/* App Bar - conditional based on view */}
            {currentView !== 'reels' && currentView !== 'messages' && currentView !== 'notifications' && (
                <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                    {getAppBarContent()}
                </div>
            )}

            {/* Content */}
            <div style={{ backgroundColor: currentView === 'reels' ? '#000' : colors.background }} className="flex-1 p-0 overflow-y-auto no-scrollbar">
                {currentView === 'feed' && renderFeed()}
                {currentView === 'explore' && renderExplore()}
                {currentView === 'reels' && renderReels()}
                {currentView === 'notifications' && renderNotifications()}
                {currentView === 'messages' && renderMessages()}
                {currentView === 'profile' && renderProfile()}
            </div>

            {/* Bottom Nav - hide for reels */}
            {currentView !== 'reels' && (
                <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2.5 px-5 flex justify-between items-center">
                    {/* Home */}
                    <div
                        onClick={() => setCurrentView('feed')}
                        style={{ color: currentView === 'feed' ? colors.primary : colors.onSurfaceVariant }}
                        className="cursor-pointer hover:scale-110 transition-transform p-1"
                    >
                        <svg className="w-7 h-7" fill={currentView === 'feed' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </div>
                    
                    {/* Explore/Search */}
                    <div
                        onClick={() => setCurrentView('explore')}
                        style={{ color: currentView === 'explore' ? colors.primary : colors.onSurfaceVariant }}
                        className="cursor-pointer hover:scale-110 transition-transform p-1"
                    >
                        <svg className="w-7 h-7" fill={currentView === 'explore' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    
                    {/* Create/Add - Opens Reels for now */}
                    <div
                        onClick={() => setCurrentView('reels')}
                        style={{ color: colors.onSurfaceVariant }}
                        className="cursor-pointer hover:scale-110 transition-transform p-1"
                    >
                        <div className="p-1.5 rounded-lg border-2" style={{ borderColor: colors.onSurfaceVariant }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                    </div>
                    
                    {/* Notifications */}
                    <div
                        onClick={() => setCurrentView('notifications')}
                        style={{ color: currentView === 'notifications' ? colors.primary : colors.onSurfaceVariant }}
                        className="cursor-pointer hover:scale-110 transition-transform p-1 relative"
                    >
                        <svg className="w-7 h-7" fill={currentView === 'notifications' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: colors.error }} />
                    </div>
                    
                    {/* Profile */}
                    <div
                        onClick={() => setCurrentView('profile')}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 cursor-pointer hover:scale-110 transition-transform`}
                        style={{ borderColor: currentView === 'profile' ? colors.primary : 'transparent' }}
                    >
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            )}

            {/* Reels Bottom Nav */}
            {currentView === 'reels' && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-2.5 px-5 flex justify-between items-center z-30">
                    <div onClick={() => setCurrentView('feed')} className="cursor-pointer hover:scale-110 transition-transform p-1">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </div>
                    <div onClick={() => setCurrentView('explore')} className="cursor-pointer hover:scale-110 transition-transform p-1">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <div className="cursor-pointer hover:scale-110 transition-transform p-1">
                        <div className="p-1.5 rounded-lg border-2 border-white">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                    </div>
                    <div className="cursor-pointer hover:scale-110 transition-transform p-1">
                        <svg className="w-7 h-7 text-white" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    <div onClick={() => setCurrentView('profile')} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================
// Social Media Mockup Data Types & Mock Data
// ==========================================

export interface Post {
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

export interface Story {
    id: number;
    user: string;
    image: string;
    active: boolean;
    live?: boolean;
}

export interface Message {
    id: number;
    user: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    verified?: boolean;
}

export interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'tag';
    user: string;
    avatar: string;
    action: string;
    time: string;
    postImage?: string;
    isNew?: boolean;
    verified?: boolean;
}

export interface Reel {
    id: number;
    user: string;
    avatar: string;
    video: string;
    thumbnail: string;
    likes: number;
    comments: number;
    shares: number;
    description: string;
    music: string;
    verified?: boolean;
}

export interface ExploreItem {
    id: number;
    type: 'image' | 'reel' | 'video' | 'carousel';
    image: string;
    likes: number;
    comments: number;
    span: string;
}

export interface Comment {
    id: number;
    user: string;
    avatar: string;
    text: string;
    time: string;
    likes: number;
    verified?: boolean;
    replies?: Comment[];
}

export interface ProfileHighlight {
    id: number;
    title: string;
    cover: string;
}

// ==========================================
// Mock Data
// ==========================================

export const posts: Post[] = [
    { 
        id: 1, 
        user: 'alex_travels', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', 
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', 
        likes: 1240, 
        caption: 'Adventure awaits! 🏔️', 
        verified: true, 
        location: 'Swiss Alps', 
        comments: 89, 
        shares: 23 
    },
    { 
        id: 2, 
        user: 'foodie_jane', 
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', 
        image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80', 
        likes: 856, 
        caption: 'Best brunch ever 🥑', 
        verified: false, 
        location: 'Downtown Cafe', 
        comments: 42, 
        shares: 12 
    },
    { 
        id: 3, 
        user: 'tech_guru', 
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', 
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', 
        likes: 2430, 
        caption: 'The future is here. #tech #innovation', 
        verified: true, 
        sponsored: true, 
        comments: 156, 
        shares: 78 
    },
];

export const stories: Story[] = [
    { id: 1, user: 'Your Story', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', active: false },
    { id: 2, user: 'mike_d', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', active: true, live: true },
    { id: 3, user: 'sarah_j', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', active: true },
    { id: 4, user: 'chris_p', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', active: true },
    { id: 5, user: 'em_w', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', active: true },
];

export const messages: Message[] = [
    { id: 1, user: 'mike_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', lastMessage: 'Hey! Did you see the new design?', time: '2m', unread: 3, online: true, verified: true },
    { id: 2, user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', lastMessage: 'That looks amazing! 🔥', time: '15m', unread: 0, online: true },
    { id: 3, user: 'alex_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', lastMessage: 'When are you coming to the meetup?', time: '1h', unread: 1, online: false, verified: true },
    { id: 4, user: 'emma_wilson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', lastMessage: 'Sure, let me check my schedule', time: '3h', unread: 0, online: false },
    { id: 5, user: 'tech_guru', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', lastMessage: 'Sent you the files 📁', time: '5h', unread: 0, online: true, verified: true },
    { id: 6, user: 'lisa_art', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80', lastMessage: 'Thanks for the feedback!', time: '1d', unread: 0, online: false },
];

export const notifications: Notification[] = [
    { id: 1, type: 'like', user: 'mike_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', action: 'liked your photo', time: '2m', postImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=100&q=80', isNew: true },
    { id: 2, type: 'follow', user: 'new_user_2024', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=100&q=80', action: 'started following you', time: '15m', isNew: true },
    { id: 3, type: 'comment', user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', action: 'commented: "This is beautiful! 😍"', time: '1h', postImage: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=100&q=80', verified: true },
    { id: 4, type: 'mention', user: 'alex_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', action: 'mentioned you in a comment', time: '2d', postImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80', verified: true },
    { id: 5, type: 'follow', user: 'creative_studio', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', action: 'started following you', time: '3d' },
    { id: 6, type: 'like', user: 'foodie_jane', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', action: 'and 23 others liked your reel', time: '5d', postImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80' },
    { id: 7, type: 'tag', user: 'emma_wilson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', action: 'tagged you in a post', time: '1w', postImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80' },
];

export const reels: Reel[] = [
    { 
        id: 1, 
        user: 'dance_queen', 
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', 
        video: '', 
        thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80', 
        likes: 45200, 
        comments: 1200, 
        shares: 890, 
        description: 'New dance challenge! Try it 💃 #viral #dance', 
        music: '♪ Original Sound - dance_queen', 
        verified: true 
    },
    { 
        id: 2, 
        user: 'cooking_master', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', 
        video: '', 
        thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
        likes: 23800, 
        comments: 567, 
        shares: 1100, 
        description: 'Easy 5-min pasta recipe 🍝 Save for later!', 
        music: '♪ Cooking Vibes - Lofi Beats' 
    },
    { 
        id: 3, 
        user: 'travel_addict', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', 
        video: '', 
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80', 
        likes: 89500, 
        comments: 2300, 
        shares: 5600, 
        description: 'POV: You discover a hidden waterfall 🌊', 
        music: '♪ Adventure Awaits - Epic Music', 
        verified: true 
    },
];

export const exploreCategories = ['For You', 'Travel', 'Food', 'Fashion', 'Tech', 'Art', 'Music', 'Sports'];

export const exploreGrid: ExploreItem[] = [
    { id: 1, type: 'image', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=400&q=80', likes: 12500, comments: 234, span: 'col-span-1 row-span-2' },
    { id: 2, type: 'video', image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80', likes: 45200, comments: 1200, span: 'col-span-1 row-span-1' },
    { id: 3, type: 'image', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', likes: 8900, comments: 156, span: 'col-span-1 row-span-1' },
    { id: 4, type: 'video', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80', likes: 89500, comments: 2300, span: 'col-span-1 row-span-1' },
    { id: 5, type: 'carousel', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80', likes: 5600, comments: 89, span: 'col-span-1 row-span-1' },
    { id: 6, type: 'image', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=80', likes: 15800, comments: 345, span: 'col-span-1 row-span-2' },
    { id: 7, type: 'video', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80', likes: 250000, comments: 5600, span: 'col-span-1 row-span-1' },
    { id: 8, type: 'carousel', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80', likes: 7200, comments: 123, span: 'col-span-1 row-span-1' },
    { id: 9, type: 'image', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80', likes: 3400, comments: 67, span: 'col-span-1 row-span-1' },
];

export const mockComments: Comment[] = [
    { id: 1, user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', text: 'This is amazing! 😍', time: '2h', likes: 24 },
    { id: 2, user: 'mike_design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'Incredible shot! Where is this?', time: '1h', likes: 12 },
    { id: 3, user: 'travel_lover', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', text: 'Adding this to my bucket list 🗒️', time: '45m', likes: 8 },
];

export const profileHighlights: ProfileHighlight[] = [
    { id: 1, title: 'Travel', cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=100&q=80' },
    { id: 2, title: 'Food', cover: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=100&q=80' },
    { id: 3, title: 'Life', cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80' },
    { id: 4, title: 'Work', cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80' },
    { id: 5, title: 'Pets', cover: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80' },
];

export const currentUserAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';

// Profile Grid Images
export const profileGridImages = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80',
];

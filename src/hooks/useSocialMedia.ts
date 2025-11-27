import { useState, useCallback } from 'react';

export type SocialView = 'feed' | 'explore' | 'reels' | 'notifications' | 'messages' | 'profile';
export type ProfileTab = 'posts' | 'reels' | 'tagged';

export interface SocialMediaState {
    currentView: SocialView;
    likedPosts: Set<number>;
    savedPosts: Set<number>;
    followedUsers: Set<string>;
    activeReelIndex: number;
    showComments: boolean;
    activeStory: number | null;
    profileTab: ProfileTab;
    activeCategory: string;
}

export interface SocialMediaActions {
    setCurrentView: (view: SocialView) => void;
    setActiveReelIndex: (index: number) => void;
    setShowComments: (show: boolean) => void;
    setActiveStory: (id: number | null) => void;
    setProfileTab: (tab: ProfileTab) => void;
    setActiveCategory: (category: string) => void;
    toggleLike: (postId: number) => void;
    toggleSave: (postId: number) => void;
    toggleFollow: (userId: string) => void;
    isLiked: (id: number) => boolean;
    isSaved: (id: number) => boolean;
    isFollowing: (id: string) => boolean;
    nextReel: () => void;
    prevReel: () => void;
}

export function useSocialMedia(): SocialMediaState & SocialMediaActions {
    const [currentView, setCurrentView] = useState<SocialView>('feed');
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
    const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
    const [activeReelIndex, setActiveReelIndex] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [activeStory, setActiveStory] = useState<number | null>(null);
    const [profileTab, setProfileTab] = useState<ProfileTab>('posts');
    const [activeCategory, setActiveCategory] = useState('For You');

    const toggleLike = useCallback((postId: number) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) newSet.delete(postId);
            else newSet.add(postId);
            return newSet;
        });
    }, []);

    const toggleSave = useCallback((postId: number) => {
        setSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) newSet.delete(postId);
            else newSet.add(postId);
            return newSet;
        });
    }, []);

    const toggleFollow = useCallback((userId: string) => {
        setFollowedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) newSet.delete(userId);
            else newSet.add(userId);
            return newSet;
        });
    }, []);

    const nextReel = useCallback(() => {
        setActiveReelIndex(prev => prev + 1);
    }, []);

    const prevReel = useCallback(() => {
        setActiveReelIndex(prev => Math.max(0, prev - 1));
    }, []);

    return {
        // State
        currentView,
        likedPosts,
        savedPosts,
        followedUsers,
        activeReelIndex,
        showComments,
        activeStory,
        profileTab,
        activeCategory,
        // Setters
        setCurrentView,
        setActiveReelIndex,
        setShowComments,
        setActiveStory,
        setProfileTab,
        setActiveCategory,
        // Actions
        toggleLike,
        toggleSave,
        toggleFollow,
        isLiked: (id: number) => likedPosts.has(id),
        isSaved: (id: number) => savedPosts.has(id),
        isFollowing: (id: string) => followedUsers.has(id),
        nextReel,
        prevReel,
    };
}

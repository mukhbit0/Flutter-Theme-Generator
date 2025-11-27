import { ThemeColors } from '../../../types/theme';
import { useSocialMedia } from '../../../hooks';
import { posts, stories, messages, notifications, reels, exploreCategories, exploreGrid, profileHighlights } from '../../../data/socialMediaData';

// Import modular components
import {
    FeedView,
    ExploreView,
    ReelsView,
    MessagesView,
    NotificationsView,
    ProfileView,
    StoryViewer,
    CommentsModal,
    BottomNav,
    SocialHeader,
} from './social-media';

interface MockupProps {
    colors: ThemeColors;
}

/**
 * SocialMediaMockup - A comprehensive social media app mockup demonstrating theme colors
 * 
 * Features:
 * - Feed view with stories and posts
 * - Explore view with search and grid
 * - Reels view with video player UI
 * - Messages view with chat list
 * - Notifications view with activity
 * - Profile view with highlights and grid
 * - Interactive elements (likes, saves, follows)
 * - Story viewer modal
 * - Comments modal
 */
export default function SocialMediaMockup({ colors }: MockupProps) {
    const {
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
        // Actions
        setCurrentView,
        toggleLike,
        toggleSave,
        toggleFollow,
        nextReel,
        prevReel,
        setShowComments,
        setActiveStory,
        setProfileTab,
        setActiveCategory,
    } = useSocialMedia();

    // Render current view
    const renderView = () => {
        switch (currentView) {
            case 'feed':
                return (
                    <FeedView
                        colors={colors}
                        posts={posts}
                        stories={stories}
                        likedPosts={likedPosts}
                        savedPosts={savedPosts}
                        onToggleLike={toggleLike}
                        onToggleSave={toggleSave}
                        onOpenStory={setActiveStory}
                        onOpenComments={() => setShowComments(true)}
                    />
                );
            
            case 'explore':
                return (
                    <ExploreView
                        colors={colors}
                        exploreGrid={exploreGrid}
                        exploreCategories={exploreCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                );
            
            case 'reels':
                return (
                    <ReelsView
                        colors={colors}
                        reels={reels}
                        likedPosts={likedPosts}
                        followedUsers={followedUsers}
                        activeReelIndex={activeReelIndex}
                        onToggleLike={toggleLike}
                        onToggleFollow={toggleFollow}
                        onNextReel={nextReel}
                        onPrevReel={prevReel}
                    />
                );
            
            case 'messages':
                return (
                    <MessagesView
                        colors={colors}
                        messages={messages}
                    />
                );
            
            case 'notifications':
                return (
                    <NotificationsView
                        colors={colors}
                        notifications={notifications}
                        followedUsers={followedUsers}
                        onToggleFollow={toggleFollow}
                    />
                );
            
            case 'profile':
                return (
                    <ProfileView
                        colors={colors}
                        profileHighlights={profileHighlights}
                        profileTab={profileTab}
                        onTabChange={setProfileTab}
                    />
                );
            
            default:
                return null;
        }
    };

    return (
        <div 
            className="h-full flex flex-col overflow-hidden relative"
            style={{ backgroundColor: colors.background }}
        >
            {/* Header - hidden for reels */}
            <SocialHeader
                colors={colors}
                currentView={currentView}
                onViewChange={setCurrentView}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
                {renderView()}
            </main>

            {/* Bottom Navigation - hidden for reels */}
            {currentView !== 'reels' && (
                <BottomNav
                    colors={colors}
                    currentView={currentView}
                    onViewChange={setCurrentView}
                />
            )}

            {/* Story Viewer Modal */}
            {activeStory !== null && (
                <StoryViewer
                    stories={stories}
                    activeStoryId={activeStory}
                    onClose={() => setActiveStory(null)}
                />
            )}

            {/* Comments Modal */}
            {showComments && (
                <CommentsModal
                    colors={colors}
                    onClose={() => setShowComments(false)}
                />
            )}
        </div>
    );
}

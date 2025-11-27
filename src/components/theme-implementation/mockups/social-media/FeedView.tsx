import { ThemeColors } from '../../../../types/theme';
import { Post, Story } from '../../../../data/socialMediaData';
import { VerifiedBadge } from '../../../common';
import { HeartIcon, CommentIcon, ShareIcon, BookmarkIcon, MoreIcon } from '../../../common/icons';

interface FeedViewProps {
    colors: ThemeColors;
    posts: Post[];
    stories: Story[];
    likedPosts: Set<number>;
    savedPosts: Set<number>;
    onToggleLike: (id: number) => void;
    onToggleSave: (id: number) => void;
    onOpenStory: (id: number) => void;
    onOpenComments: () => void;
}

export default function FeedView({
    colors,
    posts,
    stories,
    likedPosts,
    savedPosts,
    onToggleLike,
    onToggleSave,
    onOpenStory,
    onOpenComments,
}: FeedViewProps) {
    return (
        <div className="space-y-4 pb-4">
            {/* Stories Row */}
            <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar px-4 pt-2">
                {stories.map((story) => (
                    <div 
                        key={story.id} 
                        className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer"
                        onClick={() => story.active && onOpenStory(story.id)}
                    >
                        <div 
                            className={`p-[2px] rounded-full relative ${story.active ? '' : 'opacity-80'}`} 
                            style={{ background: story.active ? `linear-gradient(45deg, ${colors.primary}, ${colors.tertiary})` : 'transparent' }}
                        >
                            <div className="p-[2px] rounded-full" style={{ backgroundColor: colors.background }}>
                                <img 
                                    src={story.image} 
                                    alt={story.user} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-transparent" 
                                    loading="lazy"
                                />
                            </div>
                            {story.live && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Live
                                </div>
                            )}
                        </div>
                        <span style={{ color: colors.onSurface }} className="text-xs font-medium truncate max-w-[4.5rem]">
                            {story.user}
                        </span>
                    </div>
                ))}
            </div>

            {/* Posts */}
            {posts.map((post) => (
                <article 
                    key={post.id} 
                    style={{ backgroundColor: colors.surface }} 
                    className="border-t border-b"
                >
                    {/* Post Header */}
                    <header className="p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img 
                                    src={post.avatar} 
                                    alt={post.user} 
                                    className="w-10 h-10 rounded-full object-cover" 
                                    loading="lazy" 
                                />
                                {post.id === 1 && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <span style={{ color: colors.onSurface }} className="text-sm font-bold">{post.user}</span>
                                    {post.verified && <VerifiedBadge />}
                                </div>
                                <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                                    {post.sponsored ? 'Sponsored' : post.location}
                                </span>
                            </div>
                        </div>
                        <MoreIcon className="w-5 h-5 cursor-pointer" style={{ color: colors.onSurfaceVariant }} />
                    </header>

                    {/* Post Image */}
                    <div 
                        className="aspect-[4/5] relative cursor-pointer" 
                        onDoubleClick={() => onToggleLike(post.id)}
                    >
                        <img 
                            src={post.image} 
                            alt="Post" 
                            className="w-full h-full object-cover" 
                            loading="lazy" 
                        />
                        {post.sponsored && (
                            <div className="absolute bottom-4 left-0 right-0 px-4">
                                <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-lg flex justify-between items-center">
                                    <span className="font-bold text-sm">Learn More</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        {likedPosts.has(post.id) && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <HeartIcon className="w-20 h-20 text-red-500 animate-ping" filled />
                            </div>
                        )}
                    </div>

                    {/* Post Actions */}
                    <footer className="p-3">
                        <div className="flex justify-between mb-3">
                            <div className="flex space-x-4">
                                <button 
                                    className="hover:scale-110 transition-transform" 
                                    onClick={() => onToggleLike(post.id)}
                                    aria-label={likedPosts.has(post.id) ? 'Unlike' : 'Like'}
                                >
                                    <HeartIcon 
                                        className="w-7 h-7" 
                                        style={{ color: likedPosts.has(post.id) ? colors.error : colors.onSurface }} 
                                        filled={likedPosts.has(post.id)} 
                                    />
                                </button>
                                <button 
                                    className="hover:scale-110 transition-transform" 
                                    onClick={onOpenComments}
                                    aria-label="Comments"
                                >
                                    <CommentIcon className="w-7 h-7" style={{ color: colors.onSurface }} />
                                </button>
                                <button className="hover:scale-110 transition-transform" aria-label="Share">
                                    <ShareIcon className="w-7 h-7" style={{ color: colors.onSurface }} />
                                </button>
                            </div>
                            <button 
                                className="hover:scale-110 transition-transform" 
                                onClick={() => onToggleSave(post.id)}
                                aria-label={savedPosts.has(post.id) ? 'Unsave' : 'Save'}
                            >
                                <BookmarkIcon 
                                    className="w-7 h-7" 
                                    style={{ color: colors.onSurface }} 
                                    filled={savedPosts.has(post.id)} 
                                />
                            </button>
                        </div>
                        
                        <div style={{ color: colors.onSurface }} className="font-bold text-sm mb-1">
                            {(post.likes + (likedPosts.has(post.id) ? 1 : 0)).toLocaleString()} likes
                        </div>
                        
                        <p className="text-sm leading-relaxed">
                            <span style={{ color: colors.onSurface }} className="font-bold mr-2">{post.user}</span>
                            <span style={{ color: colors.onSurface }}>{post.caption}</span>
                        </p>
                        
                        {post.comments && (
                            <button 
                                onClick={onOpenComments} 
                                style={{ color: colors.onSurfaceVariant }} 
                                className="text-sm mt-1 hover:opacity-80"
                            >
                                View all {post.comments} comments
                            </button>
                        )}
                        
                        <div style={{ color: colors.onSurfaceVariant }} className="text-xs mt-2 uppercase tracking-wide opacity-70">
                            2 hours ago
                        </div>
                    </footer>
                </article>
            ))}
        </div>
    );
}

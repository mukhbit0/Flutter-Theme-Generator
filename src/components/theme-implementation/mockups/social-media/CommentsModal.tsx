import { useState } from 'react';
import { ThemeColors } from '../../../../types/theme';
import { Comment, mockComments } from '../../../../data/socialMediaData';
import { Avatar, VerifiedBadge } from '../../../common';
import { HeartIcon, CloseIcon } from '../../../common/icons';

interface CommentsModalProps {
    colors: ThemeColors;
    onClose: () => void;
}

export default function CommentsModal({
    colors,
    onClose,
}: CommentsModalProps) {
    const [comments, setComments] = useState<Comment[]>(mockComments);
    const [newComment, setNewComment] = useState('');
    const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

    const handleLikeComment = (id: number) => {
        setLikedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;
        
        const comment: Comment = {
            id: comments.length + 1,
            user: 'your_username',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
            text: newComment,
            time: 'Just now',
            likes: 0,
        };
        
        setComments([comment, ...comments]);
        setNewComment('');
    };

    return (
        <div 
            className="absolute inset-0 z-50 flex flex-col"
            style={{ backgroundColor: colors.background }}
        >
            {/* Header */}
            <div 
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: colors.outline }}
            >
                <div className="w-10" />
                <span style={{ color: colors.onSurface }} className="font-bold">Comments</span>
                <button onClick={onClose} aria-label="Close">
                    <CloseIcon className="w-6 h-6" style={{ color: colors.onSurface }} />
                </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                        <Avatar 
                            src={comment.avatar}
                            alt={comment.user}
                            size="sm"
                        />
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span 
                                        style={{ color: colors.onSurface }} 
                                        className="text-sm font-semibold mr-2"
                                    >
                                        {comment.user}
                                    </span>
                                    {comment.verified && <VerifiedBadge size="xs" />}
                                    <span style={{ color: colors.onSurface }} className="text-sm">
                                        {comment.text}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleLikeComment(comment.id)}
                                    className="ml-2 flex-shrink-0"
                                    aria-label={likedComments.has(comment.id) ? 'Unlike' : 'Like'}
                                >
                                    <HeartIcon 
                                        className="w-4 h-4"
                                        style={{ color: likedComments.has(comment.id) ? colors.error : colors.onSurfaceVariant }}
                                        filled={likedComments.has(comment.id)}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center space-x-3 mt-1">
                                <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                                    {comment.time}
                                </span>
                                <button style={{ color: colors.onSurfaceVariant }} className="text-xs font-semibold">
                                    {comment.likes + (likedComments.has(comment.id) ? 1 : 0)} likes
                                </button>
                                <button style={{ color: colors.onSurfaceVariant }} className="text-xs font-semibold">
                                    Reply
                                </button>
                            </div>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-3 space-y-3">
                                    <button 
                                        style={{ color: colors.onSurfaceVariant }} 
                                        className="text-xs font-medium flex items-center space-x-2"
                                    >
                                        <div className="w-6 h-[1px]" style={{ backgroundColor: colors.outline }} />
                                        <span>View {comment.replies.length} replies</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Comment */}
            <div 
                className="px-4 py-3 border-t flex items-center space-x-3"
                style={{ borderColor: colors.outline }}
            >
                <Avatar 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                    alt="You"
                    size="sm"
                />
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: colors.onSurface }}
                />
                <div className="flex items-center space-x-2">
                    <button className="text-lg">❤️</button>
                    <button className="text-lg">🙌</button>
                    <button 
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        style={{ color: newComment.trim() ? colors.primary : colors.onSurfaceVariant }}
                        className="font-semibold text-sm disabled:opacity-50"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

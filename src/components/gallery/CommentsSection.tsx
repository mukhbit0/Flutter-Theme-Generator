import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { sharingService } from '../../services/SharingService';
import { MessageSquare, Trash2, Send, User, Reply, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
    id: string;
    theme_id: string;
    user_id: string;
    user_name: string;
    content: string;
    parent_id?: string;
    created_at: string;
    replies?: Comment[];
}

interface CommentsSectionProps {
    themeId: string;
    darkMode: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ themeId, darkMode }) => {
    const { currentUser } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        loadComments();
    }, [themeId]);

    const loadComments = async () => {
        try {
            setLoading(true);
            const data = await sharingService.getComments(themeId);

            // Organize comments into threads
            const commentMap = new Map<string, Comment>();
            const rootComments: Comment[] = [];

            // First pass: Create map and identify root comments
            data.forEach((comment: Comment) => {
                comment.replies = [];
                commentMap.set(comment.id, comment);
            });

            // Second pass: Link replies to parents
            data.forEach((comment: Comment) => {
                if (comment.parent_id) {
                    const parent = commentMap.get(comment.parent_id);
                    if (parent) {
                        parent.replies?.push(comment);
                        // Sort replies by date (oldest first)
                        parent.replies?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                    }
                } else {
                    rootComments.push(comment);
                }
            });

            // Sort root comments by date (newest first)
            rootComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            setComments(rootComments);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
        e.preventDefault();
        const content = parentId ? replyContent : newComment;

        if (!currentUser || !content.trim()) return;

        try {
            setSubmitting(true);
            const success = await sharingService.addComment(
                themeId,
                currentUser.uid,
                currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
                content.trim(),
                parentId
            );

            if (success) {
                if (parentId) {
                    setReplyContent('');
                    setReplyingTo(null);
                } else {
                    setNewComment('');
                }
                loadComments();
            }
        } catch (error) {
            console.error('Failed to add comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!currentUser) return;
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            const success = await sharingService.deleteComment(commentId, currentUser.uid);
            if (success) {
                loadComments(); // Reload to handle nested deletion correctly
            }
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
        <div className={`flex gap-4 group ${isReply ? 'mt-4 ml-12' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                <span className="font-semibold text-sm">{comment.user_name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
                <div className={`p-4 rounded-xl rounded-tl-none ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {comment.user_name}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                    </div>
                    <p className={`text-sm whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {comment.content}
                    </p>
                </div>

                <div className="flex items-center gap-4 mt-2">
                    {currentUser && (
                        <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className={`text-xs font-medium flex items-center gap-1 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'}`}
                        >
                            <Reply className="w-3 h-3" />
                            Reply
                        </button>
                    )}

                    {currentUser && currentUser.uid === comment.user_id && (
                        <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-3 h-3" />
                            Delete
                        </button>
                    )}
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                    <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4 flex gap-3">
                        <div className="flex-1">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder={`Reply to ${comment.user_name}...`}
                                className={`w-full p-3 rounded-xl border transition-all resize-none focus:ring-2 focus:ring-blue-500 outline-none ${darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                                    }`}
                                rows={2}
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent('');
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !replyContent.trim()}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {submitting ? (
                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-3 h-3" />
                                    )}
                                    Reply
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="space-y-4">
                        {comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className={`mt-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-sm border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <MessageSquare className="w-5 h-5" />
                Comments ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
            </h3>

            {/* Main Comment Form */}
            {currentUser ? (
                <form onSubmit={(e) => handleSubmit(e)} className="mb-8">
                    <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-600'}`}>
                            <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your thoughts..."
                                className={`w-full p-3 rounded-xl border transition-all resize-none focus:ring-2 focus:ring-blue-500 outline-none ${darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                                    }`}
                                rows={3}
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={submitting || !newComment.trim()}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {submitting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className={`p-4 rounded-xl mb-8 text-center ${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to leave a comment.
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-8">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                ) : (
                    <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;

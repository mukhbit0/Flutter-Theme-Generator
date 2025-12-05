import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lightbulb, AlertCircle, MessageCircle, ArrowLeft, Loader2, ThumbsUp, Send, X, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Suggestion {
    id: string;
    type: 'bug' | 'feature' | 'other';
    content: string;
    user_id: string;
    created_at: string;
    status: string;
    votes: number;
    has_voted: boolean;
}

export const FeedbackBoard = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'trending' | 'newest' | 'resolved'>('trending');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [type, setType] = useState<'bug' | 'feature' | 'other'>('feature');
    const [content, setContent] = useState('');
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Simple admin check (hardcoded email for now or check your user object if you have roles)
    // You mentioned "i the admin", so we can add your email here to enable admin features
    const isAdmin = currentUser?.email === 'arslan@gmail.com' || currentUser?.email === 'admin@gmail.com';

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            let sort = 'created_at';
            let status = 'pending';

            if (activeTab === 'trending') {
                sort = 'votes';
                status = 'pending';
            } else if (activeTab === 'newest') {
                sort = 'created_at';
                status = 'pending';
            } else if (activeTab === 'resolved') {
                status = 'resolved';
            }

            const url = new URL('/api/suggestions', window.location.origin);
            url.searchParams.set('sort', sort);
            url.searchParams.set('status', status);
            url.searchParams.set('limit', '100');
            if (currentUser) {
                url.searchParams.set('userId', currentUser.uid);
            }

            const response = await fetch(url.toString());
            if (response.ok) {
                const data = await response.json();
                if (data.results) {
                    setSuggestions(data.results);
                }
            }
        } catch (error) {
            console.error("Failed to fetch suggestions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, [activeTab, currentUser]);

    const handleVote = async (id: string, currentHasVoted: boolean) => {
        if (!currentUser) {
            alert("Please login to vote!");
            return;
        }

        // Optimistic update
        setSuggestions(prev => prev.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    votes: currentHasVoted ? Math.max(0, s.votes - 1) : s.votes + 1,
                    has_voted: !currentHasVoted
                };
            }
            return s;
        }));

        try {
            const response = await fetch('/api/suggestions/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ suggestionId: id, userId: currentUser.uid })
            });

            if (!response.ok) {
                // Revert on failure
                fetchSuggestions();
            }
        } catch (error) {
            console.error("Vote failed", error);
            fetchSuggestions();
        }
    };

    const handleResolve = async (id: string) => {
        if (!currentUser) return;
        try {
            const response = await fetch(`/api/suggestions/${id}/resolve`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ suggestionId: id, status: 'resolved', userId: currentUser.uid })
            });

            if (response.ok) {
                // Refresh list
                fetchSuggestions();
            }
        } catch (error) {
            console.error("Resolve failed", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!currentUser || !window.confirm('Are you sure you want to delete this feedback?')) return;
        try {
            const response = await fetch(`/api/suggestions/${id}?userId=${currentUser.uid}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchSuggestions();
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !currentUser) return;

        setFormStatus('submitting');
        try {
            const response = await fetch('/api/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, content, userId: currentUser.uid })
            });

            if (!response.ok) throw new Error('Failed');

            setFormStatus('success');
            setContent('');
            setTimeout(() => {
                setFormStatus('idle');
                setIsModalOpen(false);
                fetchSuggestions(); // Refresh list to show new item
            }, 1500);
        } catch (error) {
            setFormStatus('error');
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'bug': return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'feature': return <Lightbulb className="w-5 h-5 text-blue-500" />;
            default: return <MessageCircle className="w-5 h-5 text-purple-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                                Community Feedback
                            </h1>
                            <p className="text-gray-400 text-sm">Help shape the future of Flutter Theme Generator</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (!currentUser) navigate('/login');
                            else setIsModalOpen(true);
                        }}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>Submit Feedback</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/10 pb-1">
                    <button
                        onClick={() => setActiveTab('trending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'trending' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Top Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('newest')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'newest' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Newest
                    </button>
                    <button
                        onClick={() => setActiveTab('resolved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'resolved' ? 'bg-green-500/10 text-green-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Check className="w-4 h-4" />
                        Resolved
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {suggestions.map((item) => (
                            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex gap-4 transition-all hover:bg-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {/* Vote Column */}
                                <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                                    <button
                                        onClick={() => handleVote(item.id, item.has_voted)}
                                        className={`p-2 rounded-xl transition-all ${item.has_voted
                                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <ThumbsUp className={`w-5 h-5 ${item.has_voted ? 'fill-current' : ''}`} />
                                    </button>
                                    <span className={`font-bold ${item.has_voted ? 'text-indigo-400' : 'text-gray-400'}`}>
                                        {item.votes || 0}
                                    </span>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(item.type)}
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${item.type === 'bug' ? 'border-red-500/30 bg-red-500/10 text-red-400' :
                                                item.type === 'feature' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' :
                                                    'border-purple-500/30 bg-purple-500/10 text-purple-400'
                                                }`}>
                                                {item.type}
                                            </span>
                                            <span className="text-xs text-gray-500">{formatDate(item.created_at)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {/* Resolution Control: Admin OR Author */}
                                            {((currentUser && item.user_id === currentUser.uid) || isAdmin) && item.status !== 'resolved' && (
                                                <button
                                                    onClick={() => handleResolve(item.id)}
                                                    className="text-xs bg-green-900/30 text-green-400 border border-green-500/30 px-3 py-1 rounded-full hover:bg-green-500/20 transition-colors"
                                                >
                                                    Mark Resolved
                                                </button>
                                            )}

                                            {/* Delete Control: Admin OR Author */}
                                            {((currentUser && item.user_id === currentUser.uid) || isAdmin) && (
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}

                                            {item.status === 'resolved' && (
                                                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
                                                    <Check className="w-3 h-3" /> Resolved
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap word-break-break-word">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {suggestions.length === 0 && (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-400 mb-2">No feedback found</h3>
                                <p className="text-gray-500">Be the first to submit a suggestion!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Submit Modal (Reused Logic) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6">Submit Feedback</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {(['feature', 'bug', 'other'] as const).map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setType(t)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${type === t ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                    >
                                        {t === 'feature' ? <Lightbulb className="w-5 h-5 mb-1" /> : t === 'bug' ? <AlertCircle className="w-5 h-5 mb-1" /> : <MessageCircle className="w-5 h-5 mb-1" />}
                                        <span className="text-xs capitalize">{t}</span>
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Describe your idea or issue..."
                                className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                required
                            />
                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {formStatus === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit</>}
                            </button>
                            {formStatus === 'success' && <p className="text-green-400 text-sm text-center">Submitted successfully!</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

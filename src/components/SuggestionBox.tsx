import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, AlertCircle, Lightbulb, MessageCircle, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SuggestionBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<'bug' | 'feature' | 'other'>('feature');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        if (!currentUser) {
            setStatus('error');
            return;
        }

        setStatus('submitting');
        try {
            const userId = currentUser.uid;

            const response = await fetch('/api/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, content, userId })
            });

            if (!response.ok) throw new Error('Failed to submit');

            setStatus('success');
            setContent('');
            setTimeout(() => {
                setStatus('idle');
                setIsOpen(false);
            }, 2000);
        } catch (error) {
            console.error('Error submitting suggestion:', error);
            setStatus('error');
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 md:bottom-6 md:right-24 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all group"
                title="Submit Feedback"
            >
                <MessageSquarePlus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-1">Feedback</h2>
                        <p className="text-gray-400 text-sm mb-6">Help us improve the Flutter Theme Generator.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setType('feature')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${type === 'feature'
                                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <Lightbulb className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-medium">Feature</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('bug')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${type === 'bug'
                                        ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <AlertCircle className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-medium">Bug</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('other')}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${type === 'other'
                                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <MessageCircle className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-medium">Other</span>
                                </button>
                            </div>

                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={type === 'bug' ? "Describe the bug and how to reproduce it..." : type === 'feature' ? "What feature would you like to see?" : "Tell us what's on your mind..."}
                                className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                required
                            />

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : status === 'success' ? (
                                    <span>Sent Successfully!</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Submit Feedback</span>
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-400 text-xs text-center animate-pulse">Failed to send feedback. Please try again.</p>
                            )}
                        </form>

                        {!currentUser && (
                            <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
                                <Lock className="w-12 h-12 text-gray-500 mb-4" />
                                <h3 className="text-white font-bold mb-2">Login Required</h3>
                                <p className="text-gray-400 text-sm mb-6">Please sign in to submit feedback and suggestions.</p>
                                <button
                                    onClick={() => { setIsOpen(false); navigate('/login'); }}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                                >
                                    Login Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

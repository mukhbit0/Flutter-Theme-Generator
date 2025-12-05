import React, { useState, useEffect, useRef } from 'react';
import { getFirebaseDb } from '../firebase/config';
import { ref, onChildAdded, push, serverTimestamp, query, limitToLast, orderByChild } from 'firebase/database';
import { MessageCircle, X, Send, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Creating dependency to AuthContext if available, or fallback

// Simple types for chat message
interface ChatMessage {
    id: string;
    text: string;
    userId: string;
    userName: string;
    timestamp: number;
    color?: string;
}

const AVATAR_COLORS = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500',
    'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-sky-500', 'bg-blue-500',
    'bg-indigo-500', 'bg-violet-500', 'bg-purple-500',
    'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'
];

export const WorldChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnecting, setIsConnecting] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auth
    const { currentUser } = useAuth();

    // Chat User State (derived from auth user)
    const [userProfile, setUserProfile] = useState<{ id: string, name: string, color: string } | null>(null);

    useEffect(() => {
        if (currentUser) {
            // Use real user data
            const storedColor = localStorage.getItem(`chat_color_${currentUser.uid}`) || AVATAR_COLORS[Math.abs(currentUser.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % AVATAR_COLORS.length];

            setUserProfile({
                id: currentUser.uid,
                name: currentUser.displayName || 'User',
                color: storedColor
            });
        } else {
            setUserProfile(null);
        }
    }, [currentUser]);

    // Firebase Connection
    useEffect(() => {
        if (!isOpen) return;

        let unsubscribe: (() => void) | undefined;

        const connectToChat = async () => {
            try {
                const db = getFirebaseDb();
                const messagesRef = ref(db, 'messages');
                const recentMessagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(50));

                setIsConnecting(false);

                // Listen for new messages
                const handleNewMessage = (snapshot: any) => {
                    const data = snapshot.val();
                    if (data) {
                        setMessages(prev => {
                            // Avoid duplicates
                            if (prev.some(m => m.id === snapshot.key)) return prev;
                            const newMsg = { id: snapshot.key as string, ...data };
                            return [...prev, newMsg].sort((a, b) => a.timestamp - b.timestamp);
                        });
                        scrollToBottom();
                    }
                };

                const unsub = onChildAdded(recentMessagesQuery, handleNewMessage);
                unsubscribe = () => {
                    // Firebase Unsubscribe is handled by the SDK usually, but `onChildAdded` returns the unsubscribe function in newer modular SDKs? 
                    // Verify: onChildAdded returns Unsubscribe function.
                    unsub();
                };

            } catch (error) {
                console.error("Error connecting to chat:", error);
                setIsConnecting(false);
            }
        };

        connectToChat();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [isOpen]);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !userProfile) return;

        try {
            const db = getFirebaseDb();
            const messagesRef = ref(db, 'messages');

            await push(messagesRef, {
                text: newMessage.trim(),
                userId: userProfile.id,
                userName: userProfile.name,
                timestamp: serverTimestamp(),
                color: userProfile.color
            });

            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all group"
                title="World Chat"
            >
                <Globe className="w-6 h-6 text-white animate-pulse-slow" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-[60] bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-indigo-400" />
                            <div>
                                <h3 className="text-white font-bold text-sm">World Chat</h3>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-gray-400">Live</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20"
                    >
                        {isConnecting ? (
                            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                <span className="animate-pulse">Connecting to world...</span>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm gap-2">
                                <MessageCircle className="w-8 h-8 opacity-20" />
                                <p>No messages yet. Say hello!</p>
                            </div>
                        ) : (
                            messages.map((msg) => {
                                const isMe = userProfile && msg.userId === userProfile.id;
                                return (
                                    <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${msg.color || 'bg-gray-500'}`}>
                                            {msg.userName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                                            <span className="text-[10px] text-gray-500 mb-1 px-1">{msg.userName}</span>
                                            <div className={`px-3 py-2 rounded-2xl text-sm ${isMe
                                                ? 'bg-indigo-600 text-white rounded-tr-sm'
                                                : 'bg-white/10 text-gray-200 rounded-tl-sm'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    {userProfile ? (
                        <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    ) : (
                        <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400 mb-2">Login to chat with the world</p>
                            <a href="/login" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Click here to Login</a>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

import { ThemeColors } from '../../../../types/theme';
import { Message } from '../../../../data/socialMediaData';
import { Avatar, VerifiedBadge } from '../../../common';

interface MessagesViewProps {
    colors: ThemeColors;
    messages: Message[];
}

export default function MessagesView({
    colors,
    messages,
}: MessagesViewProps) {
    return (
        <div className="pb-4">
            {/* Header Actions */}
            <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: colors.outline }}>
                <div className="flex items-center space-x-2">
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">your_username</span>
                    <svg className="w-4 h-4" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="hover:opacity-70 transition-opacity" aria-label="Video call">
                        <svg className="w-6 h-6" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                    <button className="hover:opacity-70 transition-opacity" aria-label="New message">
                        <svg className="w-6 h-6" style={{ color: colors.onSurface }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="p-4">
                <div 
                    style={{ backgroundColor: colors.surfaceContainer }} 
                    className="rounded-xl px-4 py-3 flex items-center space-x-3"
                >
                    <svg className="w-5 h-5" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span style={{ color: colors.onSurfaceVariant }} className="text-sm">Search</span>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 flex space-x-2 mb-2">
                <button 
                    style={{ backgroundColor: colors.primary, color: colors.onPrimary }} 
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                >
                    Primary
                </button>
                <button 
                    style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }} 
                    className="px-4 py-2 rounded-full text-sm font-medium"
                >
                    General
                </button>
                <button 
                    style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }} 
                    className="px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1"
                >
                    <span>Requests</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.error }} />
                </button>
            </div>

            {/* Notes Section */}
            <div className="px-4 py-3 flex space-x-4 overflow-x-auto no-scrollbar">
                <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.surfaceContainer, border: `2px dashed ${colors.outline}` }}
                    >
                        <svg className="w-6 h-6" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">Your note</span>
                </div>
                {messages.slice(0, 4).map((msg) => (
                    <div key={`note-${msg.id}`} className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <div className="relative">
                            <img 
                                src={msg.avatar} 
                                alt={msg.user} 
                                className="w-14 h-14 rounded-full object-cover" 
                            />
                            <div 
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-medium shadow-md"
                                style={{ backgroundColor: colors.surface, color: colors.onSurface }}
                            >
                                👋
                            </div>
                        </div>
                        <span style={{ color: colors.onSurfaceVariant }} className="text-xs truncate max-w-[3.5rem]">
                            {msg.user.split(' ')[0]}
                        </span>
                    </div>
                ))}
            </div>

            {/* Messages Section */}
            <div className="px-4 pt-2">
                <h3 style={{ color: colors.onSurface }} className="font-bold text-sm mb-3">Messages</h3>
                <div className="space-y-1">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className="flex items-center p-3 rounded-xl cursor-pointer hover:opacity-90 transition-all"
                            style={{ backgroundColor: msg.unread ? `${colors.primary}10` : 'transparent' }}
                        >
                            <div className="relative mr-3">
                                <Avatar 
                                    src={msg.avatar} 
                                    alt={msg.user}
                                    size="lg"
                                    online={msg.online}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                    <span 
                                        style={{ color: colors.onSurface }} 
                                        className={`text-sm truncate ${msg.unread ? 'font-bold' : 'font-medium'}`}
                                    >
                                        {msg.user}
                                    </span>
                                    {msg.verified && <VerifiedBadge size="xs" className="ml-1" />}
                                </div>
                                <div className="flex items-center mt-0.5">
                                    <span 
                                        style={{ color: msg.unread ? colors.onSurface : colors.onSurfaceVariant }} 
                                        className={`text-xs truncate flex-1 ${msg.unread ? 'font-medium' : ''}`}
                                    >
                                        {msg.lastMessage}
                                    </span>
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs ml-2 flex-shrink-0">
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                            {msg.unread && (
                                <div 
                                    className="w-3 h-3 rounded-full ml-2" 
                                    style={{ backgroundColor: colors.primary }} 
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Section */}
            <div className="px-4 pt-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold text-sm">Suggested</h3>
                    <button style={{ color: colors.primary }} className="text-sm font-semibold">See All</button>
                </div>
                <div className="space-y-3">
                    {['Design Inspiration', 'Tech News'].map((name, i) => (
                        <div key={name} className="flex items-center">
                            <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                                style={{ backgroundColor: i === 0 ? '#E91E63' : '#2196F3' }}
                            >
                                <span className="text-white font-bold">{name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                                <span style={{ color: colors.onSurface }} className="text-sm font-medium block">{name}</span>
                                <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                                    {i === 0 ? 'UI/UX Design Community' : 'Tech & Gadgets'}
                                </span>
                            </div>
                            <button 
                                style={{ backgroundColor: colors.primary, color: colors.onPrimary }} 
                                className="px-4 py-1.5 rounded-lg text-xs font-bold"
                            >
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

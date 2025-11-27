import { ThemeColors } from '../../../../types/theme';
import { Notification } from '../../../../data/socialMediaData';
import { Avatar, VerifiedBadge } from '../../../common';
import { UserAddIcon } from '../../../common/icons';

interface NotificationsViewProps {
    colors: ThemeColors;
    notifications: Notification[];
    followedUsers: Set<string>;
    onToggleFollow: (user: string) => void;
}

export default function NotificationsView({
    colors,
    notifications,
    followedUsers,
    onToggleFollow,
}: NotificationsViewProps) {
    const todayNotifications = notifications.filter(n => n.time.includes('h') || n.time.includes('m'));
    const weekNotifications = notifications.filter(n => n.time.includes('d'));
    const olderNotifications = notifications.filter(n => n.time.includes('w'));

    const renderNotification = (notification: Notification) => (
        <div 
            key={notification.id} 
            className={`flex items-center p-3 rounded-xl transition-colors ${
                notification.isNew ? '' : ''
            }`}
            style={{ backgroundColor: notification.isNew ? `${colors.primary}08` : 'transparent' }}
        >
            <div className="relative mr-3">
                <Avatar 
                    src={notification.avatar}
                    alt={notification.user}
                    size="md"
                />
                {notification.type === 'follow' && (
                    <div 
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <UserAddIcon className="w-3 h-3 text-white" />
                    </div>
                )}
                {notification.type === 'like' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                )}
                {notification.type === 'comment' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                        </svg>
                    </div>
                )}
                {notification.type === 'mention' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">@</span>
                    </div>
                )}
            </div>
            
            <div className="flex-1 min-w-0">
                <p className="text-sm leading-tight">
                    <span style={{ color: colors.onSurface }} className="font-bold">
                        {notification.user}
                    </span>
                    {notification.verified && <VerifiedBadge size="xs" className="inline mx-0.5" />}
                    <span style={{ color: colors.onSurface }}> {notification.action}</span>
                    <span style={{ color: colors.onSurfaceVariant }} className="ml-1">{notification.time}</span>
                </p>
            </div>
            
            {notification.type === 'follow' && (
                <button 
                    onClick={() => onToggleFollow(notification.user)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ml-2"
                    style={{ 
                        backgroundColor: followedUsers.has(notification.user) ? colors.surfaceContainer : colors.primary,
                        color: followedUsers.has(notification.user) ? colors.onSurface : colors.onPrimary
                    }}
                >
                    {followedUsers.has(notification.user) ? 'Following' : 'Follow'}
                </button>
            )}
            
            {(notification.type === 'like' || notification.type === 'comment' || notification.type === 'mention') && notification.postImage && (
                <img 
                    src={notification.postImage} 
                    alt="Post" 
                    className="w-12 h-12 rounded-lg object-cover ml-2" 
                />
            )}
        </div>
    );

    return (
        <div className="pb-4">
            {/* Follow Requests Banner */}
            <div 
                className="mx-4 mt-4 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.surfaceContainer }}
            >
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div 
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 bg-gradient-to-br from-purple-400 to-pink-500"
                                    style={{ borderColor: colors.surfaceContainer }}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <span style={{ color: colors.onSurface }} className="font-bold text-sm block">Follow Requests</span>
                        <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                            user123 + 2 others
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: colors.error, color: 'white' }}
                    >
                        3
                    </div>
                    <svg className="w-5 h-5" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Today */}
            {todayNotifications.length > 0 && (
                <div className="px-4 pt-6">
                    <h3 style={{ color: colors.onSurface }} className="font-bold text-sm mb-2">Today</h3>
                    <div className="space-y-1">
                        {todayNotifications.map(renderNotification)}
                    </div>
                </div>
            )}

            {/* This Week */}
            {weekNotifications.length > 0 && (
                <div className="px-4 pt-6">
                    <h3 style={{ color: colors.onSurface }} className="font-bold text-sm mb-2">This Week</h3>
                    <div className="space-y-1">
                        {weekNotifications.map(renderNotification)}
                    </div>
                </div>
            )}

            {/* Earlier */}
            {olderNotifications.length > 0 && (
                <div className="px-4 pt-6">
                    <h3 style={{ color: colors.onSurface }} className="font-bold text-sm mb-2">Earlier</h3>
                    <div className="space-y-1">
                        {olderNotifications.map(renderNotification)}
                    </div>
                </div>
            )}

            {/* Suggested for You */}
            <div className="px-4 pt-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold text-sm">Suggested for you</h3>
                    <button style={{ color: colors.primary }} className="text-sm font-semibold">See All</button>
                </div>
                <div className="space-y-3">
                    {[
                        { name: 'creative_studio', followers: '10.2K', mutual: 5 },
                        { name: 'design_daily', followers: '25.8K', mutual: 3 },
                    ].map((suggestion) => (
                        <div key={suggestion.name} className="flex items-center">
                            <div 
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-3"
                            />
                            <div className="flex-1">
                                <span style={{ color: colors.onSurface }} className="text-sm font-bold block">
                                    {suggestion.name}
                                </span>
                                <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                                    {suggestion.followers} followers · {suggestion.mutual} mutual
                                </span>
                            </div>
                            <button 
                                style={{ backgroundColor: colors.primary, color: colors.onPrimary }} 
                                className="px-4 py-1.5 rounded-lg text-xs font-bold"
                            >
                                Follow
                            </button>
                            <button className="ml-2 p-1" aria-label="Close">
                                <svg className="w-4 h-4" style={{ color: colors.onSurfaceVariant }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

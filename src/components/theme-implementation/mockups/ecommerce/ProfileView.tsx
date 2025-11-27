import { ThemeColors } from '../../../../types/theme';

interface ProfileViewProps {
    colors: ThemeColors;
    onBack: () => void;
    onViewOrders: () => void;
    onViewWishlist: () => void;
}

interface MenuItem {
    icon: JSX.Element;
    label: string;
    subtitle?: string;
    badge?: string;
    onClick?: () => void;
}

export default function ProfileView({
    colors,
    onBack,
    onViewOrders,
    onViewWishlist,
}: ProfileViewProps) {
    const menuItems: MenuItem[] = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            label: 'My Orders',
            subtitle: '2 active orders',
            onClick: onViewOrders,
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            label: 'Wishlist',
            badge: '12',
            onClick: onViewWishlist,
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Shipping Addresses',
            subtitle: '3 addresses',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            label: 'Payment Methods',
            subtitle: 'Visa •••• 4242',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
            ),
            label: 'Promo Codes',
            badge: '3 available',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Settings',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Help & Support',
        },
    ];

    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button onClick={onBack} style={{ color: colors.onSurface }} aria-label="Go back">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">My Account</h2>
            </div>

            {/* Profile Card */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: colors.primaryContainer }}>
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-3" style={{ borderColor: colors.primary }}>
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-1">
                        <p style={{ color: colors.onPrimaryContainer }} className="font-bold text-lg">Emma Wilson</p>
                        <p style={{ color: colors.onPrimaryContainer }} className="text-sm opacity-80">emma.wilson@email.com</p>
                        <div className="flex items-center space-x-1 mt-1">
                            <div className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: colors.primary, color: colors.onPrimary }}>
                                Gold Member
                            </div>
                        </div>
                    </div>
                    <button style={{ color: colors.onPrimaryContainer }} aria-label="Edit profile">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { value: '12', label: 'Orders' },
                    { value: '$2,459', label: 'Total Spent' },
                    { value: '345', label: 'Points' },
                ].map((stat, index) => (
                    <div 
                        key={index} 
                        className="rounded-xl p-3 text-center"
                        style={{ backgroundColor: colors.surfaceContainerLow }}
                    >
                        <p style={{ color: colors.primary }} className="font-bold text-lg">{stat.value}</p>
                        <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.onClick}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl transition-colors"
                        style={{ backgroundColor: colors.surfaceContainerLow }}
                    >
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }}
                        >
                            {item.icon}
                        </div>
                        <div className="flex-1 text-left">
                            <p style={{ color: colors.onSurface }} className="font-medium">{item.label}</p>
                            {item.subtitle && (
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{item.subtitle}</p>
                            )}
                        </div>
                        {item.badge && (
                            <span 
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }}
                            >
                                {item.badge}
                            </span>
                        )}
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                ))}
            </div>

            {/* Sign Out Button */}
            <button
                className="w-full py-3 rounded-xl font-medium border-2"
                style={{ borderColor: colors.error, color: colors.error }}
            >
                Sign Out
            </button>
        </div>
    );
}

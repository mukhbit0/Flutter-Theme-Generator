import { ThemeColors } from '../../../../types/theme';
import { profileMenuItems } from '../../../../data/fitnessData';

interface ProfileViewProps {
    colors: ThemeColors;
}

export default function ProfileView({ colors }: ProfileViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Profile Header */}
            <div className="text-center">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 mx-auto" style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button style={{ backgroundColor: colors.primary }} className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                </div>
                <h2 style={{ color: colors.onSurface }} className="text-xl font-bold mt-3">Alex Johnson</h2>
                <p style={{ color: colors.onSurfaceVariant }} className="text-sm">Fitness Enthusiast</p>
            </div>

            {/* Stats */}
            <div className="flex justify-around p-4 rounded-2xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="text-center">
                    <p style={{ color: colors.onSurface }} className="text-xl font-bold">156</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Workouts</p>
                </div>
                <div className="w-px h-12" style={{ backgroundColor: colors.outline }}></div>
                <div className="text-center">
                    <p style={{ color: colors.onSurface }} className="text-xl font-bold">48.5k</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Calories</p>
                </div>
                <div className="w-px h-12" style={{ backgroundColor: colors.outline }}></div>
                <div className="text-center">
                    <p style={{ color: colors.onSurface }} className="text-xl font-bold">24</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Achievements</p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
                {profileMenuItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all active:scale-[0.98]" style={{ backgroundColor: colors.surfaceContainerLow }}>
                        <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                                <p style={{ color: colors.onSurface }} className="font-medium">{item.label}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{item.desc}</p>
                            </div>
                        </div>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                ))}
            </div>

            <button style={{ backgroundColor: colors.errorContainer, color: colors.onErrorContainer }} className="w-full py-3 rounded-xl font-medium">
                Log Out
            </button>
        </div>
    );
}

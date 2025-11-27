import { ThemeColors } from '../../../../types/theme';
import { recentActivities, monthlyData, months, getActivityIcon } from '../../../../data/fitnessData';

interface ActivityViewProps {
    colors: ThemeColors;
}

export default function ActivityView({ colors }: ActivityViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Activity</h2>
                <select 
                    className="px-3 py-1 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.primaryContainer }}>
                    <p style={{ color: colors.onPrimaryContainer }} className="text-xs opacity-80">Total Workouts</p>
                    <p style={{ color: colors.onPrimaryContainer }} className="text-2xl font-bold">24</p>
                    <p style={{ color: colors.onPrimaryContainer }} className="text-xs opacity-80 mt-1">+12% from last week</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.secondaryContainer }}>
                    <p style={{ color: colors.onSecondaryContainer }} className="text-xs opacity-80">Calories Burned</p>
                    <p style={{ color: colors.onSecondaryContainer }} className="text-2xl font-bold">12.4k</p>
                    <p style={{ color: colors.onSecondaryContainer }} className="text-xs opacity-80 mt-1">+8% from last week</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.tertiaryContainer }}>
                    <p style={{ color: colors.onTertiaryContainer }} className="text-xs opacity-80">Active Minutes</p>
                    <p style={{ color: colors.onTertiaryContainer }} className="text-2xl font-bold">340</p>
                    <p style={{ color: colors.onTertiaryContainer }} className="text-xs opacity-80 mt-1">+5% from last week</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs opacity-80">Avg Heart Rate</p>
                    <p style={{ color: colors.onSurface }} className="text-2xl font-bold">72 bpm</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs opacity-80 mt-1">Normal range</p>
                </div>
            </div>

            {/* Activity Chart */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <h3 style={{ color: colors.onSurface }} className="font-bold mb-4">Monthly Overview</h3>
                <div className="flex justify-between items-end h-32 px-2">
                    {monthlyData.map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div 
                                className="w-4 rounded-t-full transition-all duration-500"
                                style={{ 
                                    height: `${value}%`,
                                    backgroundColor: index === 7 ? colors.primary : colors.primaryContainer
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between px-2 mt-2">
                    {months.map((month, index) => (
                        <span key={index} style={{ color: colors.onSurfaceVariant }} className="text-[8px]">{month}</span>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            <div>
                <h3 style={{ color: colors.onSurface }} className="font-bold mb-3">Recent Activities</h3>
                <div className="space-y-2">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                            <div className="flex items-center space-x-3">
                                <div style={{ backgroundColor: colors.primaryContainer }} className="w-10 h-10 rounded-full flex items-center justify-center">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div>
                                    <p style={{ color: colors.onSurface }} className="font-medium text-sm">{activity.type}</p>
                                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{activity.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p style={{ color: colors.onSurface }} className="text-sm font-medium">{activity.time}</p>
                                <p style={{ color: colors.primary }} className="text-xs">{activity.cal} kcal</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type FitnessView = 'dashboard' | 'workout' | 'profile' | 'activity';

export default function FitnessMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<FitnessView>('dashboard');
    const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

    const stats = {
        calories: 1847,
        caloriesGoal: 2500,
        steps: 8432,
        stepsGoal: 10000,
        water: 6,
        waterGoal: 8,
        sleep: 7.5,
        sleepGoal: 8,
    };

    const workouts = [
        { id: 1, name: 'Morning Run', type: 'Cardio', duration: '30 min', calories: 320, icon: '🏃', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=300&q=80', difficulty: 'Medium' },
        { id: 2, name: 'HIIT Training', type: 'Strength', duration: '25 min', calories: 280, icon: '💪', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80', difficulty: 'Hard' },
        { id: 3, name: 'Yoga Flow', type: 'Flexibility', duration: '45 min', calories: 150, icon: '🧘', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80', difficulty: 'Easy' },
        { id: 4, name: 'Swimming', type: 'Cardio', duration: '40 min', calories: 400, icon: '🏊', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=300&q=80', difficulty: 'Medium' },
    ];

    const weeklyActivity = [
        { day: 'Mon', value: 75 },
        { day: 'Tue', value: 90 },
        { day: 'Wed', value: 60 },
        { day: 'Thu', value: 85 },
        { day: 'Fri', value: 70 },
        { day: 'Sat', value: 95 },
        { day: 'Sun', value: 40 },
    ];

    const achievements = [
        { id: 1, name: '7 Day Streak', icon: '🔥', unlocked: true },
        { id: 2, name: '10K Steps', icon: '👟', unlocked: true },
        { id: 3, name: 'Early Bird', icon: '🌅', unlocked: false },
        { id: 4, name: 'Marathon', icon: '🏅', unlocked: false },
    ];

    const CircularProgress = ({ value, max, size = 80, strokeWidth = 8, color }: { value: number; max: number; size?: number; strokeWidth?: number; color: string }) => {
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const progress = Math.min(value / max, 1);
        const offset = circumference - progress * circumference;

        return (
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={colors.surfaceContainerHighest}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
            </svg>
        );
    };

    const renderDashboard = () => (
        <div className="space-y-5 pb-4">
            {/* Greeting */}
            <div className="flex justify-between items-center">
                <div>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm">Welcome back,</p>
                    <h2 style={{ color: colors.onSurface }} className="text-xl font-bold">Alex! 💪</h2>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2" style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}>
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Today's Goal Card */}
            <div 
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.tertiary} 100%)` }}
            >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -mr-10 -mt-10 bg-white"></div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-white/80 text-sm mb-1">Today's Goal</p>
                        <p className="text-white text-3xl font-bold">{Math.round((stats.calories / stats.caloriesGoal) * 100)}%</p>
                        <p className="text-white/70 text-xs mt-1">{stats.calories} / {stats.caloriesGoal} kcal</p>
                    </div>
                    <div className="relative">
                        <CircularProgress value={stats.calories} max={stats.caloriesGoal} size={90} strokeWidth={10} color="white" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-2xl">🔥</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: colors.surfaceContainerLow }}>
                    <div className="relative w-14 h-14 mx-auto mb-2">
                        <CircularProgress value={stats.steps} max={stats.stepsGoal} size={56} strokeWidth={6} color={colors.primary} />
                        <span className="absolute inset-0 flex items-center justify-center text-lg">👟</span>
                    </div>
                    <p style={{ color: colors.onSurface }} className="text-sm font-bold">{(stats.steps / 1000).toFixed(1)}k</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">Steps</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: colors.surfaceContainerLow }}>
                    <div className="relative w-14 h-14 mx-auto mb-2">
                        <CircularProgress value={stats.water} max={stats.waterGoal} size={56} strokeWidth={6} color={colors.secondary} />
                        <span className="absolute inset-0 flex items-center justify-center text-lg">💧</span>
                    </div>
                    <p style={{ color: colors.onSurface }} className="text-sm font-bold">{stats.water}/{stats.waterGoal}</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">Glasses</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: colors.surfaceContainerLow }}>
                    <div className="relative w-14 h-14 mx-auto mb-2">
                        <CircularProgress value={stats.sleep} max={stats.sleepGoal} size={56} strokeWidth={6} color={colors.tertiary} />
                        <span className="absolute inset-0 flex items-center justify-center text-lg">😴</span>
                    </div>
                    <p style={{ color: colors.onSurface }} className="text-sm font-bold">{stats.sleep}h</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">Sleep</p>
                </div>
            </div>

            {/* Weekly Activity */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Weekly Activity</h3>
                    <span style={{ color: colors.primary }} className="text-xs font-medium">This Week</span>
                </div>
                <div className="flex justify-between items-end h-24">
                    {weeklyActivity.map((day, index) => (
                        <div key={day.day} className="flex flex-col items-center">
                            <div 
                                className="w-6 rounded-full mb-2 transition-all duration-300"
                                style={{ 
                                    height: `${day.value}%`,
                                    backgroundColor: index === 5 ? colors.primary : colors.primaryContainer
                                }}
                            ></div>
                            <span style={{ color: index === 5 ? colors.primary : colors.onSurfaceVariant }} className="text-[10px] font-medium">{day.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Start Workouts */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Quick Start</h3>
                    <button onClick={() => setCurrentView('workout')} style={{ color: colors.primary }} className="text-sm font-medium">See all</button>
                </div>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {workouts.slice(0, 3).map((workout) => (
                        <div
                            key={workout.id}
                            onClick={() => { setSelectedWorkout(workout.id); setCurrentView('workout'); }}
                            className="flex-shrink-0 w-36 rounded-xl overflow-hidden cursor-pointer transform transition-transform active:scale-95"
                            style={{ backgroundColor: colors.surface }}
                        >
                            <div className="h-24 relative">
                                <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="absolute bottom-2 left-2 text-white text-xl">{workout.icon}</span>
                            </div>
                            <div className="p-2">
                                <p style={{ color: colors.onSurface }} className="text-xs font-bold truncate">{workout.name}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">{workout.duration} • {workout.calories} kcal</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Achievements</h3>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">2/4</span>
                </div>
                <div className="flex space-x-3">
                    {achievements.map((achievement) => (
                        <div 
                            key={achievement.id}
                            className={`flex-1 p-3 rounded-xl text-center transition-all ${achievement.unlocked ? '' : 'opacity-40'}`}
                            style={{ backgroundColor: achievement.unlocked ? colors.primaryContainer : colors.surfaceContainerHighest }}
                        >
                            <span className="text-2xl">{achievement.icon}</span>
                            <p style={{ color: achievement.unlocked ? colors.onPrimaryContainer : colors.onSurfaceVariant }} className="text-[10px] font-medium mt-1">{achievement.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderWorkout = () => (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => { setCurrentView('dashboard'); setSelectedWorkout(null); }}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                    className="p-2 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Workouts</h2>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {['All', 'Cardio', 'Strength', 'Flexibility', 'HIIT'].map((cat, index) => (
                    <button
                        key={cat}
                        className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                        style={{ 
                            backgroundColor: index === 0 ? colors.primary : colors.surfaceContainerHighest,
                            color: index === 0 ? colors.onPrimary : colors.onSurfaceVariant
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Workout List */}
            <div className="space-y-3">
                {workouts.map((workout) => (
                    <div
                        key={workout.id}
                        onClick={() => setSelectedWorkout(workout.id)}
                        className="flex rounded-xl overflow-hidden cursor-pointer transition-all active:scale-[0.98]"
                        style={{ backgroundColor: colors.surfaceContainerLow }}
                    >
                        <div className="w-24 h-24 flex-shrink-0">
                            <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-3 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <p style={{ color: colors.onSurface }} className="font-bold">{workout.name}</p>
                                    <span className="text-lg">{workout.icon}</span>
                                </div>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{workout.type}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span style={{ color: colors.onSurfaceVariant }} className="text-xs">⏱ {workout.duration}</span>
                                <span style={{ color: colors.onSurfaceVariant }} className="text-xs">🔥 {workout.calories} kcal</span>
                                <span 
                                    className="text-[10px] px-2 py-0.5 rounded-full"
                                    style={{ 
                                        backgroundColor: workout.difficulty === 'Easy' ? colors.secondaryContainer : 
                                                        workout.difficulty === 'Medium' ? colors.tertiaryContainer : colors.errorContainer,
                                        color: workout.difficulty === 'Easy' ? colors.onSecondaryContainer : 
                                               workout.difficulty === 'Medium' ? colors.onTertiaryContainer : colors.onErrorContainer
                                    }}
                                >
                                    {workout.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Start Workout Button */}
            {selectedWorkout && (
                <button
                    style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                    className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform flex items-center justify-center space-x-2"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    <span>Start Workout</span>
                </button>
            )}
        </div>
    );

    const renderActivity = () => (
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
                    {[65, 80, 45, 90, 70, 85, 60, 95, 75, 88, 50, 78].map((value, index) => (
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
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, index) => (
                        <span key={index} style={{ color: colors.onSurfaceVariant }} className="text-[8px]">{month}</span>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            <div>
                <h3 style={{ color: colors.onSurface }} className="font-bold mb-3">Recent Activities</h3>
                <div className="space-y-2">
                    {[
                        { type: 'Running', time: '32 min', cal: 320, date: 'Today, 7:30 AM' },
                        { type: 'Cycling', time: '45 min', cal: 280, date: 'Yesterday, 6:00 PM' },
                        { type: 'Swimming', time: '30 min', cal: 250, date: '2 days ago' },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                            <div className="flex items-center space-x-3">
                                <div style={{ backgroundColor: colors.primaryContainer }} className="w-10 h-10 rounded-full flex items-center justify-center">
                                    {activity.type === 'Running' ? '🏃' : activity.type === 'Cycling' ? '🚴' : '🏊'}
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

    const renderProfile = () => (
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
                {[
                    { icon: '⚙️', label: 'Settings', desc: 'App preferences' },
                    { icon: '🎯', label: 'Goals', desc: 'Set your targets' },
                    { icon: '📊', label: 'Statistics', desc: 'View your progress' },
                    { icon: '🔔', label: 'Notifications', desc: 'Manage alerts' },
                    { icon: '❓', label: 'Help & Support', desc: 'Get assistance' },
                ].map((item, index) => (
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

    return (
        <div className="flex flex-col h-full relative">
            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-2">
                    <div style={{ backgroundColor: colors.primaryContainer }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-lg">💪</span>
                    </div>
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">FitLife</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button style={{ color: colors.onSurfaceVariant }} className="p-2 relative">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span style={{ backgroundColor: colors.error }} className="absolute top-1 right-1 w-2 h-2 rounded-full"></span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                {currentView === 'dashboard' && renderDashboard()}
                {currentView === 'workout' && renderWorkout()}
                {currentView === 'activity' && renderActivity()}
                {currentView === 'profile' && renderProfile()}
            </div>

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2 px-4 flex justify-around items-center">
                {[
                    { view: 'dashboard' as FitnessView, icon: '🏠', label: 'Home' },
                    { view: 'workout' as FitnessView, icon: '🏋️', label: 'Workouts' },
                    { view: 'activity' as FitnessView, icon: '📊', label: 'Activity' },
                    { view: 'profile' as FitnessView, icon: '👤', label: 'Profile' },
                ].map((item) => (
                    <button
                        key={item.view}
                        onClick={() => setCurrentView(item.view)}
                        className="flex flex-col items-center p-2"
                        style={{ color: currentView === item.view ? colors.primary : colors.onSurfaceVariant }}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

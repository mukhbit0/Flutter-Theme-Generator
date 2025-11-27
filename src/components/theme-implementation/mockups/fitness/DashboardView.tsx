import { ThemeColors } from '../../../../types/theme';
import { Stats, Workout, WeeklyActivity, Achievement, weeklyActivity, achievements } from '../../../../data/fitnessData';
import { FitnessView } from '../../../../hooks/useFitness';
import CircularProgress from './CircularProgress';

interface DashboardViewProps {
    colors: ThemeColors;
    stats: Stats;
    workouts: Workout[];
    onNavigate: (view: FitnessView) => void;
    onSelectWorkout: (id: number) => void;
}

export default function DashboardView({
    colors,
    stats,
    workouts,
    onNavigate,
    onSelectWorkout,
}: DashboardViewProps) {
    return (
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
                        <CircularProgress value={stats.calories} max={stats.caloriesGoal} size={90} strokeWidth={10} color="white" bgColor="rgba(255,255,255,0.3)" />
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
                        <CircularProgress value={stats.steps} max={stats.stepsGoal} size={56} strokeWidth={6} color={colors.primary} bgColor={colors.surfaceContainerHighest} />
                        <span className="absolute inset-0 flex items-center justify-center text-lg">👟</span>
                    </div>
                    <p style={{ color: colors.onSurface }} className="text-sm font-bold">{(stats.steps / 1000).toFixed(1)}k</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">Steps</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: colors.surfaceContainerLow }}>
                    <div className="relative w-14 h-14 mx-auto mb-2">
                        <CircularProgress value={stats.water} max={stats.waterGoal} size={56} strokeWidth={6} color={colors.secondary} bgColor={colors.surfaceContainerHighest} />
                        <span className="absolute inset-0 flex items-center justify-center text-lg">💧</span>
                    </div>
                    <p style={{ color: colors.onSurface }} className="text-sm font-bold">{stats.water}/{stats.waterGoal}</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">Glasses</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: colors.surfaceContainerLow }}>
                    <div className="relative w-14 h-14 mx-auto mb-2">
                        <CircularProgress value={stats.sleep} max={stats.sleepGoal} size={56} strokeWidth={6} color={colors.tertiary} bgColor={colors.surfaceContainerHighest} />
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
                    <button onClick={() => onNavigate('workout')} style={{ color: colors.primary }} className="text-sm font-medium">See all</button>
                </div>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {workouts.slice(0, 3).map((workout) => (
                        <div
                            key={workout.id}
                            onClick={() => { onSelectWorkout(workout.id); onNavigate('workout'); }}
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
}

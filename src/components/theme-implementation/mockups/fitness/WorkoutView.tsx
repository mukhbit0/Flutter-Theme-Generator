import { ThemeColors } from '../../../../types/theme';
import { Workout, workoutCategories } from '../../../../data/fitnessData';
import { FitnessView } from '../../../../hooks/useFitness';

interface WorkoutViewProps {
    colors: ThemeColors;
    workouts: Workout[];
    selectedWorkout: number | null;
    onSelectWorkout: (id: number) => void;
    onNavigate: (view: FitnessView) => void;
}

export default function WorkoutView({
    colors,
    workouts,
    selectedWorkout,
    onSelectWorkout,
    onNavigate,
}: WorkoutViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => { onNavigate('dashboard'); }}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                    className="p-2 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Workouts</h2>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {workoutCategories.map((cat, index) => (
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
                        onClick={() => onSelectWorkout(workout.id)}
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
}

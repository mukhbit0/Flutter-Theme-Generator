import { ThemeColors } from '../../../types/theme';
import { useFitness, FitnessView } from '../../../hooks/useFitness';
import { DashboardView, WorkoutView, ActivityView, ProfileView } from './fitness';

interface MockupProps {
    colors: ThemeColors;
}

export default function FitnessMockup({ colors }: MockupProps) {
    const {
        currentView,
        setCurrentView,
        selectedWorkout,
        setSelectedWorkout,
        stats,
        workouts,
    } = useFitness();

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <DashboardView
                        colors={colors}
                        stats={stats}
                        workouts={workouts}
                        onNavigate={setCurrentView}
                        onSelectWorkout={setSelectedWorkout}
                    />
                );
            case 'workout':
                return (
                    <WorkoutView
                        colors={colors}
                        workouts={workouts}
                        selectedWorkout={selectedWorkout}
                        onSelectWorkout={setSelectedWorkout}
                        onNavigate={setCurrentView}
                    />
                );
            case 'activity':
                return <ActivityView colors={colors} />;
            case 'profile':
                return <ProfileView colors={colors} />;
            default:
                return null;
        }
    };

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
                {renderContent()}
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

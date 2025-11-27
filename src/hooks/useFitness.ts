import { useState } from 'react';
import { Stats, Workout, defaultStats, workouts } from '../data/fitnessData';

export type FitnessView = 'dashboard' | 'workout' | 'profile' | 'activity';

export interface UseFitnessReturn {
    currentView: FitnessView;
    setCurrentView: (view: FitnessView) => void;
    selectedWorkout: number | null;
    setSelectedWorkout: (id: number | null) => void;
    stats: Stats;
    workouts: Workout[];
}

export function useFitness(): UseFitnessReturn {
    const [currentView, setCurrentView] = useState<FitnessView>('dashboard');
    const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

    return {
        currentView,
        setCurrentView,
        selectedWorkout,
        setSelectedWorkout,
        stats: defaultStats,
        workouts,
    };
}

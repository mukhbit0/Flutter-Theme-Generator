export interface Stats {
    calories: number;
    caloriesGoal: number;
    steps: number;
    stepsGoal: number;
    water: number;
    waterGoal: number;
    sleep: number;
    sleepGoal: number;
}

export interface Workout {
    id: number;
    name: string;
    type: string;
    duration: string;
    calories: number;
    icon: string;
    image: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface WeeklyActivity {
    day: string;
    value: number;
}

export interface Achievement {
    id: number;
    name: string;
    icon: string;
    unlocked: boolean;
}

export interface Activity {
    type: string;
    time: string;
    cal: number;
    date: string;
}

export interface MenuItem {
    icon: string;
    label: string;
    desc: string;
}

export const defaultStats: Stats = {
    calories: 1847,
    caloriesGoal: 2500,
    steps: 8432,
    stepsGoal: 10000,
    water: 6,
    waterGoal: 8,
    sleep: 7.5,
    sleepGoal: 8,
};

export const workouts: Workout[] = [
    { id: 1, name: 'Morning Run', type: 'Cardio', duration: '30 min', calories: 320, icon: '🏃', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=300&q=80', difficulty: 'Medium' },
    { id: 2, name: 'HIIT Training', type: 'Strength', duration: '25 min', calories: 280, icon: '💪', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80', difficulty: 'Hard' },
    { id: 3, name: 'Yoga Flow', type: 'Flexibility', duration: '45 min', calories: 150, icon: '🧘', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80', difficulty: 'Easy' },
    { id: 4, name: 'Swimming', type: 'Cardio', duration: '40 min', calories: 400, icon: '🏊', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=300&q=80', difficulty: 'Medium' },
];

export const weeklyActivity: WeeklyActivity[] = [
    { day: 'Mon', value: 75 },
    { day: 'Tue', value: 90 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 95 },
    { day: 'Sun', value: 40 },
];

export const achievements: Achievement[] = [
    { id: 1, name: '7 Day Streak', icon: '🔥', unlocked: true },
    { id: 2, name: '10K Steps', icon: '👟', unlocked: true },
    { id: 3, name: 'Early Bird', icon: '🌅', unlocked: false },
    { id: 4, name: 'Marathon', icon: '🏅', unlocked: false },
];

export const recentActivities: Activity[] = [
    { type: 'Running', time: '32 min', cal: 320, date: 'Today, 7:30 AM' },
    { type: 'Cycling', time: '45 min', cal: 280, date: 'Yesterday, 6:00 PM' },
    { type: 'Swimming', time: '30 min', cal: 250, date: '2 days ago' },
];

export const profileMenuItems: MenuItem[] = [
    { icon: '⚙️', label: 'Settings', desc: 'App preferences' },
    { icon: '🎯', label: 'Goals', desc: 'Set your targets' },
    { icon: '📊', label: 'Statistics', desc: 'View your progress' },
    { icon: '🔔', label: 'Notifications', desc: 'Manage alerts' },
    { icon: '❓', label: 'Help & Support', desc: 'Get assistance' },
];

export const monthlyData = [65, 80, 45, 90, 70, 85, 60, 95, 75, 88, 50, 78];
export const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
export const workoutCategories = ['All', 'Cardio', 'Strength', 'Flexibility', 'HIIT'];

export const getActivityIcon = (type: string): string => {
    switch (type) {
        case 'Running': return '🏃';
        case 'Cycling': return '🚴';
        case 'Swimming': return '🏊';
        default: return '💪';
    }
};

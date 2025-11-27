import { ThemeColors } from '../types/theme';

export interface Card {
    id: number;
    type: string;
    number: string;
    balance: number;
    color: string;
}

export interface Transaction {
    id: number;
    name: string;
    category: string;
    amount: number;
    icon: string;
    date: string;
}

export interface QuickAction {
    icon: string;
    label: string;
    action: () => void;
}

export interface Contact {
    name: string;
    avatar: string;
}

export const getCards = (colors: ThemeColors): Card[] => [
    { id: 1, type: 'Visa', number: '•••• 4582', balance: 12458.50, color: colors.primary },
    { id: 2, type: 'Mastercard', number: '•••• 7891', balance: 3250.00, color: colors.tertiary },
];

export const transactions: Transaction[] = [
    { id: 1, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, icon: '🎬', date: 'Today' },
    { id: 2, name: 'Salary Deposit', category: 'Income', amount: 4500.00, icon: '💰', date: 'Today' },
    { id: 3, name: 'Amazon Purchase', category: 'Shopping', amount: -89.99, icon: '📦', date: 'Yesterday' },
    { id: 4, name: 'Uber Ride', category: 'Transport', amount: -24.50, icon: '🚗', date: 'Yesterday' },
    { id: 5, name: 'Coffee Shop', category: 'Food & Drink', amount: -6.50, icon: '☕', date: '2 days ago' },
    { id: 6, name: 'Transfer from John', category: 'Transfer', amount: 150.00, icon: '💸', date: '3 days ago' },
];

export const contacts: Contact[] = [
    { name: 'John D.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { name: 'Mike R.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Emma W.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
];

export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const formatBalance = (balance: number): string => {
    return '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
};

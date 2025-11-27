import { useState } from 'react';
import { ThemeColors } from '../types/theme';
import { Card, Transaction, Contact, getCards, transactions, contacts } from '../data/bankingData';

export type BankingView = 'home' | 'transfer' | 'cards' | 'history';

export interface UseBankingReturn {
    currentView: BankingView;
    setCurrentView: (view: BankingView) => void;
    selectedCard: number;
    setSelectedCard: (index: number) => void;
    transferAmount: string;
    setTransferAmount: (amount: string) => void;
    cards: Card[];
    transactions: Transaction[];
    contacts: Contact[];
    quickActions: { icon: string; label: string; action: () => void }[];
}

export function useBanking(colors: ThemeColors): UseBankingReturn {
    const [currentView, setCurrentView] = useState<BankingView>('home');
    const [selectedCard, setSelectedCard] = useState(0);
    const [transferAmount, setTransferAmount] = useState('');

    const cards = getCards(colors);

    const quickActions = [
        { icon: '📤', label: 'Send', action: () => setCurrentView('transfer') },
        { icon: '📥', label: 'Request', action: () => {} },
        { icon: '💳', label: 'Cards', action: () => setCurrentView('cards') },
        { icon: '📊', label: 'Analytics', action: () => {} },
    ];

    return {
        currentView,
        setCurrentView,
        selectedCard,
        setSelectedCard,
        transferAmount,
        setTransferAmount,
        cards,
        transactions,
        contacts,
        quickActions,
    };
}

import { ThemeColors } from '../../../types/theme';
import { useBanking } from '../../../hooks/useBanking';
import { HomeView, TransferView, CardsView, HistoryView } from './banking';

interface MockupProps {
    colors: ThemeColors;
}

export default function BankingMockup({ colors }: MockupProps) {
    const {
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
    } = useBanking(colors);

    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <HomeView
                        colors={colors}
                        cards={cards}
                        transactions={transactions}
                        contacts={contacts}
                        quickActions={quickActions}
                        selectedCard={selectedCard}
                        onSelectCard={setSelectedCard}
                        onNavigate={setCurrentView}
                    />
                );
            case 'transfer':
                return (
                    <TransferView
                        colors={colors}
                        contacts={contacts}
                        transferAmount={transferAmount}
                        onTransferAmountChange={setTransferAmount}
                        onNavigate={setCurrentView}
                    />
                );
            case 'cards':
                return (
                    <CardsView
                        colors={colors}
                        cards={cards}
                        onNavigate={setCurrentView}
                    />
                );
            case 'history':
                return (
                    <HistoryView
                        colors={colors}
                        transactions={transactions}
                        onNavigate={setCurrentView}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-2">
                    <div style={{ backgroundColor: colors.primary }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">WalletPay</span>
                </div>
                <div className="flex items-center space-x-3">
                    <button style={{ color: colors.onSurfaceVariant }} className="p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                {renderContent()}
            </div>

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2 px-6 flex justify-between items-center">
                <button
                    onClick={() => setCurrentView('home')}
                    style={{ color: currentView === 'home' ? colors.primary : colors.onSurfaceVariant }}
                    className="flex flex-col items-center p-2"
                >
                    <svg className="w-6 h-6" fill={currentView === 'home' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-[10px] font-medium mt-0.5">Home</span>
                </button>
                <button
                    onClick={() => setCurrentView('history')}
                    style={{ color: currentView === 'history' ? colors.primary : colors.onSurfaceVariant }}
                    className="flex flex-col items-center p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    <span className="text-[10px] font-medium mt-0.5">History</span>
                </button>
                <button
                    onClick={() => setCurrentView('transfer')}
                    style={{ backgroundColor: colors.primary }}
                    className="w-14 h-14 rounded-full flex items-center justify-center -mt-6 shadow-lg"
                >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
                <button
                    onClick={() => setCurrentView('cards')}
                    style={{ color: currentView === 'cards' ? colors.primary : colors.onSurfaceVariant }}
                    className="flex flex-col items-center p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span className="text-[10px] font-medium mt-0.5">Cards</span>
                </button>
                <button style={{ color: colors.onSurfaceVariant }} className="flex flex-col items-center p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-[10px] font-medium mt-0.5">Profile</span>
                </button>
            </div>
        </div>
    );
}

import { ThemeColors } from '../../../../types/theme';
import { Card, formatBalance } from '../../../../data/bankingData';
import { BankingView } from '../../../../hooks/useBanking';

interface CardsViewProps {
    colors: ThemeColors;
    cards: Card[];
    onNavigate: (view: BankingView) => void;
}

export default function CardsView({
    colors,
    cards,
    onNavigate,
}: CardsViewProps) {
    return (
        <div className="space-y-6 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => onNavigate('home')}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                    className="p-2 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">My Cards</h2>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="w-full h-48 rounded-2xl p-5 relative overflow-hidden"
                        style={{ 
                            background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                        }}
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -mr-16 -mt-16" style={{ backgroundColor: 'white' }}></div>
                        
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <p className="text-white/70 text-xs font-medium mb-1">Current Balance</p>
                                <p className="text-white text-3xl font-bold">{formatBalance(card.balance)}</p>
                            </div>
                            <div className="text-white text-lg font-bold">{card.type}</div>
                        </div>
                        
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Card Number</p>
                                <p className="text-white font-mono">•••• •••• •••• {card.number.slice(-4)}</p>
                            </div>
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Expires</p>
                                <p className="text-white font-mono">12/26</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    style={{ backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer }}
                    className="py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span>Lock Card</span>
                </button>
                <button
                    style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }}
                    className="py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
}

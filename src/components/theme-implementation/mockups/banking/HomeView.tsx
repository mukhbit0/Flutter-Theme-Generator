import { ThemeColors } from '../../../../types/theme';
import { Card, Transaction, Contact, formatBalance } from '../../../../data/bankingData';
import { BankingView } from '../../../../hooks/useBanking';

interface HomeViewProps {
    colors: ThemeColors;
    cards: Card[];
    transactions: Transaction[];
    contacts: Contact[];
    quickActions: { icon: string; label: string; action: () => void }[];
    selectedCard: number;
    onSelectCard: (index: number) => void;
    onNavigate: (view: BankingView) => void;
}

export default function HomeView({
    colors,
    cards,
    transactions,
    contacts,
    quickActions,
    selectedCard,
    onSelectCard,
    onNavigate,
}: HomeViewProps) {
    return (
        <div className="space-y-6 pb-4">
            {/* Greeting */}
            <div className="flex justify-between items-center">
                <div>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm">Good morning,</p>
                    <h2 style={{ color: colors.onSurface }} className="text-xl font-bold">Alex Johnson</h2>
                </div>
                <div className="relative">
                    <div style={{ backgroundColor: colors.surfaceContainerHighest }} className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div style={{ backgroundColor: colors.tertiary }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">2</span>
                    </div>
                </div>
            </div>

            {/* Card Carousel */}
            <div className="relative">
                <div className="overflow-x-auto no-scrollbar pb-2">
                    <div className="flex space-x-4">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                onClick={() => onSelectCard(index)}
                                className="flex-shrink-0 w-64 h-40 rounded-2xl p-5 relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                                style={{ 
                                    background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -mr-10 -mt-10" style={{ backgroundColor: 'white' }}></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 -ml-10 -mb-10" style={{ backgroundColor: 'white' }}></div>
                                
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-white/70 text-xs font-medium">Current Balance</p>
                                        <p className="text-white text-2xl font-bold">{formatBalance(card.balance)}</p>
                                    </div>
                                    <div className="text-white/90 text-sm font-bold">{card.type}</div>
                                </div>
                                
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white/70 text-[10px] uppercase tracking-wider">Card Number</p>
                                        <p className="text-white font-mono text-sm">{card.number}</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <div className="w-6 h-6 rounded-full bg-white/30"></div>
                                        <div className="w-6 h-6 rounded-full bg-white/20 -ml-3"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Add Card Button */}
                        <div 
                            className="flex-shrink-0 w-64 h-40 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all hover:border-solid"
                            style={{ borderColor: colors.outline }}
                        >
                            <div className="text-center">
                                <div style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }} className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                </div>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-sm font-medium">Add New Card</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Card Indicators */}
                <div className="flex justify-center space-x-2 mt-3">
                    {cards.map((_, index) => (
                        <div 
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${selectedCard === index ? 'w-6' : 'w-1.5'}`}
                            style={{ backgroundColor: selectedCard === index ? colors.primary : colors.outline }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.action}
                        className="flex flex-col items-center p-3 rounded-2xl transition-all active:scale-95"
                        style={{ backgroundColor: colors.surfaceContainerHighest }}
                    >
                        <span className="text-2xl mb-1">{action.icon}</span>
                        <span style={{ color: colors.onSurface }} className="text-xs font-medium">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Send to Contacts */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Send to</h3>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">See all</span>
                </div>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar">
                    {contacts.map((contact, index) => (
                        <div key={index} className="flex flex-col items-center flex-shrink-0">
                            <div className="w-14 h-14 rounded-full overflow-hidden mb-1 ring-2 ring-offset-2" style={{ '--tw-ring-color': colors.primaryContainer } as React.CSSProperties}>
                                <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                            </div>
                            <span style={{ color: colors.onSurfaceVariant }} className="text-xs">{contact.name}</span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div style={{ backgroundColor: colors.primaryContainer }} className="w-14 h-14 rounded-full flex items-center justify-center mb-1">
                            <svg style={{ color: colors.onPrimaryContainer }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <span style={{ color: colors.onSurfaceVariant }} className="text-xs">Add</span>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Recent Transactions</h3>
                    <button 
                        onClick={() => onNavigate('history')}
                        style={{ color: colors.primary }} 
                        className="text-sm font-medium"
                    >
                        See all
                    </button>
                </div>
                <div className="space-y-3">
                    {transactions.slice(0, 4).map((tx) => (
                        <div 
                            key={tx.id} 
                            className="flex items-center justify-between p-3 rounded-xl"
                            style={{ backgroundColor: colors.surfaceContainerLow }}
                        >
                            <div className="flex items-center space-x-3">
                                <div style={{ backgroundColor: colors.surfaceContainerHighest }} className="w-10 h-10 rounded-full flex items-center justify-center text-lg">
                                    {tx.icon}
                                </div>
                                <div>
                                    <p style={{ color: colors.onSurface }} className="font-medium text-sm">{tx.name}</p>
                                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{tx.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold text-sm ${tx.amount > 0 ? 'text-green-500' : ''}`} style={{ color: tx.amount > 0 ? undefined : colors.onSurface }}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-[10px]">{tx.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

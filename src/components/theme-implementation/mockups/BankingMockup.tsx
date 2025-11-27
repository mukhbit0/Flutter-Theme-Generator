import { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type BankingView = 'home' | 'transfer' | 'cards' | 'history';

export default function BankingMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<BankingView>('home');
    const [selectedCard, setSelectedCard] = useState(0);
    const [transferAmount, setTransferAmount] = useState('');

    const cards = [
        { id: 1, type: 'Visa', number: '•••• 4582', balance: 12458.50, color: colors.primary },
        { id: 2, type: 'Mastercard', number: '•••• 7891', balance: 3250.00, color: colors.tertiary },
    ];

    const transactions = [
        { id: 1, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, icon: '🎬', date: 'Today' },
        { id: 2, name: 'Salary Deposit', category: 'Income', amount: 4500.00, icon: '💰', date: 'Today' },
        { id: 3, name: 'Amazon Purchase', category: 'Shopping', amount: -89.99, icon: '📦', date: 'Yesterday' },
        { id: 4, name: 'Uber Ride', category: 'Transport', amount: -24.50, icon: '🚗', date: 'Yesterday' },
        { id: 5, name: 'Coffee Shop', category: 'Food & Drink', amount: -6.50, icon: '☕', date: '2 days ago' },
        { id: 6, name: 'Transfer from John', category: 'Transfer', amount: 150.00, icon: '💸', date: '3 days ago' },
    ];

    const quickActions = [
        { icon: '📤', label: 'Send', action: () => setCurrentView('transfer') },
        { icon: '📥', label: 'Request', action: () => {} },
        { icon: '💳', label: 'Cards', action: () => setCurrentView('cards') },
        { icon: '📊', label: 'Analytics', action: () => {} },
    ];

    const contacts = [
        { name: 'John D.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
        { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
        { name: 'Mike R.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
        { name: 'Emma W.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
    ];

    const renderHome = () => (
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
                                onClick={() => setSelectedCard(index)}
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
                                        <p className="text-white text-2xl font-bold">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
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
                        onClick={() => setCurrentView('history')}
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

    const renderTransfer = () => (
        <div className="space-y-6 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setCurrentView('home')}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                    className="p-2 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Send Money</h2>
            </div>

            {/* Select Recipient */}
            <div>
                <label style={{ color: colors.onSurfaceVariant }} className="text-sm font-medium mb-2 block">Select Recipient</label>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {contacts.map((contact, index) => (
                        <div key={index} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
                            <div className={`w-16 h-16 rounded-full overflow-hidden mb-1 border-3 transition-all`} style={{ borderColor: index === 0 ? colors.primary : 'transparent', borderWidth: index === 0 ? 3 : 0 }}>
                                <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                            </div>
                            <span style={{ color: index === 0 ? colors.primary : colors.onSurfaceVariant }} className="text-xs font-medium">{contact.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Amount Input */}
            <div className="text-center py-8">
                <label style={{ color: colors.onSurfaceVariant }} className="text-sm font-medium mb-4 block">Enter Amount</label>
                <div className="flex items-center justify-center">
                    <span style={{ color: colors.onSurface }} className="text-4xl font-bold mr-1">$</span>
                    <input
                        type="text"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="0.00"
                        className="text-5xl font-bold bg-transparent border-none outline-none text-center w-40"
                        style={{ color: colors.onSurface }}
                    />
                </div>
                <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-2">Available: $12,458.50</p>
            </div>

            {/* Quick Amounts */}
            <div className="flex justify-center space-x-3">
                {['50', '100', '250', '500'].map((amount) => (
                    <button
                        key={amount}
                        onClick={() => setTransferAmount(amount)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                        style={{ 
                            backgroundColor: transferAmount === amount ? colors.primary : colors.surfaceContainerHighest,
                            color: transferAmount === amount ? colors.onPrimary : colors.onSurfaceVariant 
                        }}
                    >
                        ${amount}
                    </button>
                ))}
            </div>

            {/* Note */}
            <div>
                <label style={{ color: colors.onSurfaceVariant }} className="text-sm font-medium mb-2 block">Add Note (Optional)</label>
                <input
                    type="text"
                    placeholder="What's this for?"
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all"
                    style={{ 
                        backgroundColor: colors.surfaceContainerLow,
                        borderColor: colors.outline,
                        color: colors.onSurface
                    }}
                />
            </div>

            {/* Send Button */}
            <button
                style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform mt-4"
            >
                Send Money
            </button>
        </div>
    );

    const renderCards = () => (
        <div className="space-y-6 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setCurrentView('home')}
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
                                <p className="text-white text-3xl font-bold">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
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

    const renderHistory = () => (
        <div className="space-y-4 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setCurrentView('home')}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                    className="p-2 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Transaction History</h2>
            </div>

            {/* Filter Chips */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {['All', 'Income', 'Expense', 'Transfer'].map((filter, index) => (
                    <button
                        key={filter}
                        className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                        style={{ 
                            backgroundColor: index === 0 ? colors.primary : colors.surfaceContainerHighest,
                            color: index === 0 ? colors.onPrimary : colors.onSurfaceVariant
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Transactions List */}
            <div className="space-y-2">
                {transactions.map((tx) => (
                    <div 
                        key={tx.id} 
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{ backgroundColor: colors.surfaceContainerLow }}
                    >
                        <div className="flex items-center space-x-3">
                            <div style={{ backgroundColor: colors.surfaceContainerHighest }} className="w-12 h-12 rounded-full flex items-center justify-center text-xl">
                                {tx.icon}
                            </div>
                            <div>
                                <p style={{ color: colors.onSurface }} className="font-medium">{tx.name}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{tx.category} • {tx.date}</p>
                            </div>
                        </div>
                        <p className={`font-bold ${tx.amount > 0 ? 'text-green-500' : ''}`} style={{ color: tx.amount > 0 ? undefined : colors.onSurface }}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

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
                {currentView === 'home' && renderHome()}
                {currentView === 'transfer' && renderTransfer()}
                {currentView === 'cards' && renderCards()}
                {currentView === 'history' && renderHistory()}
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

import { ThemeColors } from '../../../../types/theme';
import { Transaction } from '../../../../data/bankingData';
import { BankingView } from '../../../../hooks/useBanking';

interface HistoryViewProps {
    colors: ThemeColors;
    transactions: Transaction[];
    onNavigate: (view: BankingView) => void;
}

export default function HistoryView({
    colors,
    transactions,
    onNavigate,
}: HistoryViewProps) {
    return (
        <div className="space-y-4 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => onNavigate('home')}
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
}

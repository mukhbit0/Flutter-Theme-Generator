import { ThemeColors } from '../../../../types/theme';
import { Contact } from '../../../../data/bankingData';
import { BankingView } from '../../../../hooks/useBanking';

interface TransferViewProps {
    colors: ThemeColors;
    contacts: Contact[];
    transferAmount: string;
    onTransferAmountChange: (amount: string) => void;
    onNavigate: (view: BankingView) => void;
}

export default function TransferView({
    colors,
    contacts,
    transferAmount,
    onTransferAmountChange,
    onNavigate,
}: TransferViewProps) {
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
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Send Money</h2>
            </div>

            {/* Select Recipient */}
            <div>
                <label style={{ color: colors.onSurfaceVariant }} className="text-sm font-medium mb-2 block">Select Recipient</label>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {contacts.map((contact, index) => (
                        <div key={index} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
                            <div className={`w-16 h-16 rounded-full overflow-hidden mb-1 transition-all`} style={{ borderColor: index === 0 ? colors.primary : 'transparent', borderWidth: index === 0 ? 3 : 0 }}>
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
                        onChange={(e) => onTransferAmountChange(e.target.value.replace(/[^0-9.]/g, ''))}
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
                        onClick={() => onTransferAmountChange(amount)}
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
}

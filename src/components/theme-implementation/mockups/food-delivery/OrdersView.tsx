import { ThemeColors } from '../../../../types/theme';
import { orderSteps, pastOrders } from '../../../../data/foodDeliveryData';

interface OrdersViewProps {
    colors: ThemeColors;
}

export default function OrdersView({ colors }: OrdersViewProps) {
    return (
        <div className="space-y-5 pb-4">
            <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">My Orders</h2>

            {/* Tabs */}
            <div className="flex space-x-2 p-1 rounded-xl" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                {['Active', 'Completed'].map((tab, index) => (
                    <button
                        key={tab}
                        className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{ 
                            backgroundColor: index === 0 ? colors.surface : 'transparent',
                            color: index === 0 ? colors.primary : colors.onSurfaceVariant
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Active Order */}
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="p-4 border-b" style={{ borderColor: colors.outline }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p style={{ color: colors.onSurface }} className="font-bold">Pizza Palace</p>
                            <p style={{ color: colors.onSurfaceVariant }} className="text-xs mt-1">Order #12345</p>
                        </div>
                        <span 
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: colors.tertiaryContainer, color: colors.onTertiaryContainer }}
                        >
                            In Progress
                        </span>
                    </div>
                </div>
                {/* Progress Steps */}
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        {orderSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div 
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                                    style={{ 
                                        backgroundColor: step.done ? colors.primary : colors.surfaceContainerHighest,
                                        color: step.done ? colors.onPrimary : colors.onSurfaceVariant
                                    }}
                                >
                                    {step.icon}
                                </div>
                                <p style={{ color: step.done ? colors.primary : colors.onSurfaceVariant }} className="text-[10px] mt-1 text-center">{step.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-2 px-5">
                        {[1, 2, 3].map((_, index) => (
                            <div 
                                key={index}
                                className="flex-1 h-1 rounded-full mx-1"
                                style={{ backgroundColor: index < 2 ? colors.primary : colors.surfaceContainerHighest }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t" style={{ borderColor: colors.outline }}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Driver" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p style={{ color: colors.onSurface }} className="font-medium text-sm">John D.</p>
                            <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Your delivery partner</p>
                        </div>
                        <button style={{ backgroundColor: colors.primaryContainer }} className="w-10 h-10 rounded-full flex items-center justify-center">
                            <svg style={{ color: colors.primary }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </button>
                        <button style={{ backgroundColor: colors.secondaryContainer }} className="w-10 h-10 rounded-full flex items-center justify-center">
                            <svg style={{ color: colors.secondary }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Past Orders */}
            <div className="space-y-3">
                {pastOrders.map((order, index) => (
                    <div key={index} className="p-4 rounded-xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p style={{ color: colors.onSurface }} className="font-bold">{order.name}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs mt-1">{order.items}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs mt-1">{order.date}</p>
                            </div>
                            <div className="text-right">
                                <p style={{ color: colors.primary }} className="font-bold">{order.total}</p>
                                <span 
                                    className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                                    style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }}
                                >
                                    Delivered
                                </span>
                            </div>
                        </div>
                        <button
                            className="w-full mt-3 py-2 rounded-lg text-sm font-medium border"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                            Reorder
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

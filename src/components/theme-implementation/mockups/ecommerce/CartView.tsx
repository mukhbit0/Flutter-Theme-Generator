import { ThemeColors } from '../../../../types/theme';
import { CartItem } from '../../../../data/ecommerceData';

interface CartViewProps {
    colors: ThemeColors;
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    cartTax: number;
    cartGrandTotal: number;
    onBack: () => void;
    onUpdateQuantity: (index: number, delta: number) => void;
    onRemoveItem: (index: number) => void;
    onStartShopping: () => void;
}

export default function CartView({
    colors,
    cartItems,
    cartCount,
    cartTotal,
    cartTax,
    cartGrandTotal,
    onBack,
    onUpdateQuantity,
    onRemoveItem,
    onStartShopping,
}: CartViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button onClick={onBack} style={{ color: colors.onSurface }} aria-label="Go back">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-10">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p style={{ color: colors.onSurface }} className="font-bold text-lg">Your cart is empty</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Add items to get started</p>
                    <button
                        onClick={onStartShopping}
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                        className="mt-4 px-6 py-3 rounded-xl font-medium"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="space-y-3">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex space-x-3 p-3 rounded-xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p style={{ color: colors.onSurface }} className="font-bold text-sm">{item.product.name}</p>
                                            <p style={{ color: colors.onSurfaceVariant }} className="text-xs mt-0.5">
                                                Size: {item.selectedSize} • <span className="inline-block w-2 h-2 rounded-full align-middle" style={{ backgroundColor: item.selectedColor }}></span>
                                            </p>
                                        </div>
                                        <button onClick={() => onRemoveItem(index)} style={{ color: colors.error }} aria-label="Remove item">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span style={{ color: colors.primary }} className="font-bold">${item.product.price * item.quantity}</span>
                                        <div className="flex items-center space-x-2 rounded-lg px-2 py-1" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                                            <button 
                                                onClick={() => onUpdateQuantity(index, -1)} 
                                                style={{ color: colors.onSurface }} 
                                                className="w-6 h-6 flex items-center justify-center font-bold"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span style={{ color: colors.onSurface }} className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => onUpdateQuantity(index, 1)} 
                                                style={{ color: colors.onSurface }} 
                                                className="w-6 h-6 flex items-center justify-center font-bold"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Promo Code */}
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            placeholder="Enter promo code" 
                            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                        />
                        <button style={{ backgroundColor: colors.secondary, color: colors.onSecondary }} className="px-4 rounded-xl font-medium text-sm">
                            Apply
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: colors.surfaceContainerLow }}>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: colors.onSurfaceVariant }}>Subtotal</span>
                            <span style={{ color: colors.onSurface }} className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: colors.onSurfaceVariant }}>Shipping</span>
                            <span style={{ color: colors.primary }} className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: colors.onSurfaceVariant }}>Tax</span>
                            <span style={{ color: colors.onSurface }} className="font-medium">${cartTax.toFixed(2)}</span>
                        </div>
                        <div className="h-px" style={{ backgroundColor: colors.outline }}></div>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurface }} className="font-bold">Total</span>
                            <span style={{ color: colors.primary }} className="font-bold text-xl">${cartGrandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                        className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform"
                    >
                        Checkout • ${cartGrandTotal.toFixed(2)}
                    </button>
                </>
            )}
        </div>
    );
}

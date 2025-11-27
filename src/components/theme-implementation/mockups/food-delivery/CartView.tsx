import { ThemeColors } from '../../../../types/theme';
import { CartItem, MenuItem, calculateTax, calculateTotal } from '../../../../data/foodDeliveryData';
import { FoodView } from '../../../../hooks/useFoodDelivery';

interface CartViewProps {
    colors: ThemeColors;
    cartItems: CartItem[];
    cartTotal: number;
    onNavigate: (view: FoodView) => void;
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: number) => void;
    clearCartItem: (itemId: number) => void;
}

export default function CartView({
    colors,
    cartItems,
    cartTotal,
    onNavigate,
    addToCart,
    removeFromCart,
    clearCartItem,
}: CartViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => onNavigate('home')}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                    className="p-2 rounded-full"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">My Cart</h2>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-10">
                    <span className="text-6xl">🛒</span>
                    <p style={{ color: colors.onSurface }} className="font-bold mt-4">Your cart is empty</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Add some delicious food!</p>
                    <button
                        onClick={() => onNavigate('home')}
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                        className="mt-4 px-6 py-3 rounded-xl font-medium"
                    >
                        Browse Restaurants
                    </button>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="space-y-3">
                        {cartItems.map(({ item, quantity }) => (
                            <div
                                key={item.id}
                                className="flex rounded-xl overflow-hidden"
                                style={{ backgroundColor: colors.surfaceContainerLow }}
                            >
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 p-3 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <p style={{ color: colors.onSurface }} className="font-bold text-sm">{item.name}</p>
                                        <button onClick={() => clearCartItem(item.id)}>
                                            <svg style={{ color: colors.error }} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span style={{ color: colors.primary }} className="font-bold">${(item.price * quantity).toFixed(2)}</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                                style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                                            >
                                                -
                                            </button>
                                            <span style={{ color: colors.onSurface }} className="font-medium text-sm w-6 text-center">{quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                                style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
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
                        <h3 style={{ color: colors.onSurface }} className="font-bold">Order Summary</h3>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurfaceVariant }} className="text-sm">Subtotal</span>
                            <span style={{ color: colors.onSurface }} className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurfaceVariant }} className="text-sm">Delivery Fee</span>
                            <span style={{ color: colors.primary }} className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurfaceVariant }} className="text-sm">Tax</span>
                            <span style={{ color: colors.onSurface }} className="font-medium">${calculateTax(cartTotal).toFixed(2)}</span>
                        </div>
                        <div className="h-px" style={{ backgroundColor: colors.outline }}></div>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurface }} className="font-bold">Total</span>
                            <span style={{ color: colors.primary }} className="font-bold text-lg">${calculateTotal(cartTotal).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                        className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform"
                    >
                        Checkout • ${calculateTotal(cartTotal).toFixed(2)}
                    </button>
                </>
            )}
        </div>
    );
}

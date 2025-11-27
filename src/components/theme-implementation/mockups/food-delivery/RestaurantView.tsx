import { ThemeColors } from '../../../../types/theme';
import { Restaurant, MenuItem, restaurants, menuItems, menuCategories } from '../../../../data/foodDeliveryData';
import { FoodView } from '../../../../hooks/useFoodDelivery';

interface RestaurantViewProps {
    colors: ThemeColors;
    selectedRestaurantId: number | null;
    onNavigate: (view: FoodView) => void;
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: number) => void;
    getCartItemQuantity: (itemId: number) => number;
}

export default function RestaurantView({
    colors,
    selectedRestaurantId,
    onNavigate,
    addToCart,
    removeFromCart,
    getCartItemQuantity,
}: RestaurantViewProps) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurantId);
    if (!restaurant) return null;

    return (
        <div className="pb-4">
            {/* Header Image */}
            <div className="relative h-40 -mx-4 -mt-4">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                    onClick={() => onNavigate('home')}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                >
                    <svg style={{ color: colors.onSurface }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                >
                    <svg style={{ color: colors.error }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
            </div>

            {/* Restaurant Info */}
            <div className="mt-4 space-y-4">
                <div>
                    <h2 style={{ color: colors.onSurface }} className="text-xl font-bold">{restaurant.name}</h2>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm">{restaurant.cuisine}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span style={{ color: colors.onSurface }} className="font-medium">{restaurant.rating}</span>
                        <span style={{ color: colors.onSurfaceVariant }} className="text-sm">(200+)</span>
                    </div>
                    <span style={{ color: colors.outline }}>•</span>
                    <span style={{ color: colors.onSurfaceVariant }} className="text-sm">🕐 {restaurant.time}</span>
                    <span style={{ color: colors.outline }}>•</span>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">{restaurant.deliveryFee}</span>
                </div>
            </div>

            {/* Menu Categories */}
            <div className="flex space-x-2 mt-5 overflow-x-auto no-scrollbar">
                {menuCategories.map((cat, index) => (
                    <button
                        key={cat}
                        className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                        style={{ 
                            backgroundColor: index === 0 ? colors.primary : colors.surfaceContainerHighest,
                            color: index === 0 ? colors.onPrimary : colors.onSurfaceVariant
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Items */}
            <div className="mt-5 space-y-3">
                {menuItems.map((item) => {
                    const quantity = getCartItemQuantity(item.id);
                    return (
                        <div
                            key={item.id}
                            className="flex rounded-xl overflow-hidden"
                            style={{ backgroundColor: colors.surfaceContainerLow }}
                        >
                            <div className="w-24 h-24 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 p-3 flex flex-col justify-between">
                                <div>
                                    <p style={{ color: colors.onSurface }} className="font-bold text-sm">{item.name}</p>
                                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs line-clamp-1">{item.description}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span style={{ color: colors.primary }} className="font-bold">${item.price.toFixed(2)}</span>
                                    {quantity > 0 ? (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                                            >
                                                -
                                            </button>
                                            <span style={{ color: colors.onSurface }} className="font-medium text-sm">{quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="px-4 py-1.5 rounded-full text-xs font-medium"
                                            style={{ backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer }}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

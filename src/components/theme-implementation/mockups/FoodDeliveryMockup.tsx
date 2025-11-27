import { ThemeColors } from '../../../types/theme';
import { useFoodDelivery, FoodView } from '../../../hooks/useFoodDelivery';
import { HomeView, RestaurantView, CartView, OrdersView } from './food-delivery';

interface MockupProps {
    colors: ThemeColors;
}

export default function FoodDeliveryMockup({ colors }: MockupProps) {
    const {
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedRestaurant,
        setSelectedRestaurant,
        cartItems,
        addToCart,
        removeFromCart,
        clearCartItem,
        cartTotal,
        cartCount,
        getCartItemQuantity,
    } = useFoodDelivery();

    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <HomeView
                        colors={colors}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        onSelectRestaurant={setSelectedRestaurant}
                        onNavigate={setCurrentView}
                    />
                );
            case 'restaurant':
                return (
                    <RestaurantView
                        colors={colors}
                        selectedRestaurantId={selectedRestaurant}
                        onNavigate={setCurrentView}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        getCartItemQuantity={getCartItemQuantity}
                    />
                );
            case 'cart':
                return (
                    <CartView
                        colors={colors}
                        cartItems={cartItems}
                        cartTotal={cartTotal}
                        onNavigate={setCurrentView}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        clearCartItem={clearCartItem}
                    />
                );
            case 'orders':
                return <OrdersView colors={colors} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl">🍔</span>
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">Foodie</span>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                {renderContent()}
            </div>

            {/* Cart Floating Button */}
            {cartCount > 0 && currentView !== 'cart' && (
                <button
                    onClick={() => setCurrentView('cart')}
                    style={{ backgroundColor: colors.primary }}
                    className="absolute bottom-20 right-4 px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
                >
                    <svg style={{ color: colors.onPrimary }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span style={{ color: colors.onPrimary }} className="font-bold">{cartCount}</span>
                </button>
            )}

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2 px-4 flex justify-around items-center">
                {[
                    { view: 'home' as FoodView, icon: '🏠', label: 'Home' },
                    { view: 'orders' as FoodView, icon: '📋', label: 'Orders' },
                    { view: 'cart' as FoodView, icon: '🛒', label: 'Cart' },
                    { view: 'home' as FoodView, icon: '👤', label: 'Profile' },
                ].map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentView(item.view)}
                        className="flex flex-col items-center p-2 relative"
                        style={{ color: currentView === item.view ? colors.primary : colors.onSurfaceVariant }}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.view === 'cart' && cartCount > 0 && (
                            <span style={{ backgroundColor: colors.error }} className="absolute -top-0.5 right-1 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center">{cartCount}</span>
                        )}
                        <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

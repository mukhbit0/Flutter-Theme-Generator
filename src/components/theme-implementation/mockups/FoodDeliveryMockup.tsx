import { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type FoodView = 'home' | 'restaurant' | 'cart' | 'orders';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    time: string;
    category: string;
}

export default function FoodDeliveryMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<FoodView>('home');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<{ item: MenuItem; quantity: number }[]>([]);

    const categories = [
        { name: 'All', icon: '🍽️' },
        { name: 'Pizza', icon: '🍕' },
        { name: 'Burger', icon: '🍔' },
        { name: 'Sushi', icon: '🍣' },
        { name: 'Chinese', icon: '🥡' },
        { name: 'Indian', icon: '🍛' },
        { name: 'Dessert', icon: '🍰' },
    ];

    const restaurants = [
        { 
            id: 1, 
            name: 'Pizza Palace', 
            cuisine: 'Italian', 
            rating: 4.8, 
            time: '20-30 min', 
            deliveryFee: 'Free', 
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
            featured: true
        },
        { 
            id: 2, 
            name: 'Burger Barn', 
            cuisine: 'American', 
            rating: 4.5, 
            time: '15-25 min', 
            deliveryFee: '$2.99', 
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
            featured: true
        },
        { 
            id: 3, 
            name: 'Sakura Sushi', 
            cuisine: 'Japanese', 
            rating: 4.9, 
            time: '25-35 min', 
            deliveryFee: '$3.99', 
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
            featured: false
        },
        { 
            id: 4, 
            name: 'Dragon Garden', 
            cuisine: 'Chinese', 
            rating: 4.6, 
            time: '20-30 min', 
            deliveryFee: '$1.99', 
            image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80',
            featured: false
        },
    ];

    const menuItems: MenuItem[] = [
        { id: 1, name: 'Margherita Pizza', price: 14.99, description: 'Fresh tomatoes, mozzarella, basil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80', rating: 4.8, time: '20 min', category: 'Pizza' },
        { id: 2, name: 'Pepperoni Pizza', price: 16.99, description: 'Classic pepperoni, cheese blend', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80', rating: 4.7, time: '20 min', category: 'Pizza' },
        { id: 3, name: 'BBQ Chicken', price: 17.99, description: 'BBQ sauce, grilled chicken, onions', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80', rating: 4.6, time: '25 min', category: 'Pizza' },
        { id: 4, name: 'Caesar Salad', price: 9.99, description: 'Romaine, parmesan, croutons', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300&q=80', rating: 4.4, time: '10 min', category: 'Salad' },
        { id: 5, name: 'Garlic Bread', price: 5.99, description: 'Crispy garlic butter bread', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?auto=format&fit=crop&w=300&q=80', rating: 4.5, time: '10 min', category: 'Sides' },
        { id: 6, name: 'Tiramisu', price: 7.99, description: 'Classic Italian dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80', rating: 4.9, time: '5 min', category: 'Dessert' },
    ];

    const addToCart = (item: MenuItem) => {
        const existingItem = cartItems.find(ci => ci.item.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(ci => 
                ci.item.id === item.id 
                    ? { ...ci, quantity: ci.quantity + 1 }
                    : ci
            ));
        } else {
            setCartItems([...cartItems, { item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId: number) => {
        const existingItem = cartItems.find(ci => ci.item.id === itemId);
        if (existingItem && existingItem.quantity > 1) {
            setCartItems(cartItems.map(ci => 
                ci.item.id === itemId 
                    ? { ...ci, quantity: ci.quantity - 1 }
                    : ci
            ));
        } else {
            setCartItems(cartItems.filter(ci => ci.item.id !== itemId));
        }
    };

    const cartTotal = cartItems.reduce((total, ci) => total + ci.item.price * ci.quantity, 0);
    const cartCount = cartItems.reduce((count, ci) => count + ci.quantity, 0);

    const renderHome = () => (
        <div className="space-y-5 pb-4">
            {/* Location & Search */}
            <div className="flex justify-between items-center">
                <div>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Deliver to</p>
                    <div className="flex items-center space-x-1">
                        <svg style={{ color: colors.primary }} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                        <span style={{ color: colors.onSurface }} className="font-medium text-sm">123 Main Street</span>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex space-x-2">
                <div 
                    className="flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: colors.surfaceContainerHighest }}
                >
                    <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="Search restaurants, dishes..." 
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: colors.onSurface }}
                    />
                </div>
                <button style={{ backgroundColor: colors.primary }} className="p-3 rounded-xl">
                    <svg style={{ color: colors.onPrimary }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </button>
            </div>

            {/* Promo Banner */}
            <div 
                className="rounded-2xl p-4 relative overflow-hidden h-32"
                style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.tertiary} 100%)` }}
            >
                <div className="absolute right-0 bottom-0 w-32 h-32">
                    <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80" alt="Pizza" className="w-full h-full object-contain" style={{ transform: 'rotate(15deg) translateY(10px)' }} />
                </div>
                <div className="relative z-10">
                    <span className="text-white/80 text-xs">Special Offer</span>
                    <h3 className="text-white text-xl font-bold">30% OFF</h3>
                    <p className="text-white/80 text-xs">On your first order</p>
                    <button className="mt-2 px-4 py-1.5 bg-white rounded-full text-xs font-medium" style={{ color: colors.primary }}>
                        Order Now
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Categories</h3>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">See All</span>
                </div>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className="flex flex-col items-center space-y-2 flex-shrink-0"
                        >
                            <div 
                                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
                                style={{ 
                                    backgroundColor: selectedCategory === cat.name ? colors.primary : colors.surfaceContainerLow,
                                }}
                            >
                                <span className="text-2xl">{cat.icon}</span>
                            </div>
                            <span 
                                className="text-xs font-medium"
                                style={{ color: selectedCategory === cat.name ? colors.primary : colors.onSurfaceVariant }}
                            >
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Restaurants */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 style={{ color: colors.onSurface }} className="font-bold">Featured</h3>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">See All</span>
                </div>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {restaurants.filter(r => r.featured).map((restaurant) => (
                        <div
                            key={restaurant.id}
                            onClick={() => { setSelectedRestaurant(restaurant.id); setCurrentView('restaurant'); }}
                            className="flex-shrink-0 w-48 rounded-xl overflow-hidden cursor-pointer shadow-sm"
                            style={{ backgroundColor: colors.surface }}
                        >
                            <div className="h-28 relative">
                                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1" style={{ backgroundColor: colors.surface }}>
                                    <span className="text-yellow-500">★</span>
                                    <span style={{ color: colors.onSurface }}>{restaurant.rating}</span>
                                </div>
                            </div>
                            <div className="p-3">
                                <p style={{ color: colors.onSurface }} className="font-bold text-sm">{restaurant.name}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{restaurant.cuisine}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">🕐 {restaurant.time}</span>
                                    <span style={{ color: colors.primary }} className="text-xs font-medium">{restaurant.deliveryFee}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Restaurants */}
            <div>
                <h3 style={{ color: colors.onSurface }} className="font-bold mb-3">Nearby</h3>
                <div className="space-y-3">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            onClick={() => { setSelectedRestaurant(restaurant.id); setCurrentView('restaurant'); }}
                            className="flex rounded-xl overflow-hidden cursor-pointer transition-all active:scale-[0.98]"
                            style={{ backgroundColor: colors.surfaceContainerLow }}
                        >
                            <div className="w-24 h-24 flex-shrink-0">
                                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 p-3 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <p style={{ color: colors.onSurface }} className="font-bold text-sm">{restaurant.name}</p>
                                        <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primaryContainer }}>
                                            <span className="text-yellow-500 text-xs">★</span>
                                            <span style={{ color: colors.onPrimaryContainer }} className="text-xs font-medium">{restaurant.rating}</span>
                                        </div>
                                    </div>
                                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{restaurant.cuisine}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">🕐 {restaurant.time}</span>
                                    <span style={{ color: colors.primary }} className="text-xs font-medium">{restaurant.deliveryFee}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderRestaurant = () => {
        const restaurant = restaurants.find(r => r.id === selectedRestaurant);
        if (!restaurant) return null;

        return (
            <div className="pb-4">
                {/* Header Image */}
                <div className="relative h-40 -mx-4 -mt-4">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <button
                        onClick={() => setCurrentView('home')}
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
                    {['Popular', 'Pizza', 'Salad', 'Sides', 'Dessert', 'Drinks'].map((cat, index) => (
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
                        const cartItem = cartItems.find(ci => ci.item.id === item.id);
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
                                        {cartItem ? (
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-7 h-7 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ color: colors.onSurface }} className="font-medium text-sm">{cartItem.quantity}</span>
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
    };

    const renderCart = () => (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setCurrentView('home')}
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
                        onClick={() => setCurrentView('home')}
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
                                        <button onClick={() => setCartItems(cartItems.filter(ci => ci.item.id !== item.id))}>
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
                            <span style={{ color: colors.onSurface }} className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="h-px" style={{ backgroundColor: colors.outline }}></div>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurface }} className="font-bold">Total</span>
                            <span style={{ color: colors.primary }} className="font-bold text-lg">${(cartTotal * 1.08).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                        className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform"
                    >
                        Checkout • ${(cartTotal * 1.08).toFixed(2)}
                    </button>
                </>
            )}
        </div>
    );

    const renderOrders = () => (
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
                        {[
                            { icon: '✓', label: 'Confirmed', done: true },
                            { icon: '👨‍🍳', label: 'Preparing', done: true },
                            { icon: '🚗', label: 'On the way', done: false },
                            { icon: '🏠', label: 'Delivered', done: false },
                        ].map((step, index) => (
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
                {[
                    { name: 'Burger Barn', items: '2x Cheeseburger, 1x Fries', total: '$24.99', date: 'Yesterday' },
                    { name: 'Sakura Sushi', items: '1x Dragon Roll, 1x Miso Soup', total: '$32.50', date: '2 days ago' },
                ].map((order, index) => (
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
                {currentView === 'home' && renderHome()}
                {currentView === 'restaurant' && renderRestaurant()}
                {currentView === 'cart' && renderCart()}
                {currentView === 'orders' && renderOrders()}
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

import { ThemeColors } from '../../../../types/theme';
import { Category, Restaurant, categories, restaurants } from '../../../../data/foodDeliveryData';
import { FoodView } from '../../../../hooks/useFoodDelivery';

interface HomeViewProps {
    colors: ThemeColors;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    onSelectRestaurant: (id: number) => void;
    onNavigate: (view: FoodView) => void;
}

export default function HomeView({
    colors,
    selectedCategory,
    onCategoryChange,
    onSelectRestaurant,
    onNavigate,
}: HomeViewProps) {
    return (
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
                            onClick={() => onCategoryChange(cat.name)}
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
                            onClick={() => { onSelectRestaurant(restaurant.id); onNavigate('restaurant'); }}
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
                            onClick={() => { onSelectRestaurant(restaurant.id); onNavigate('restaurant'); }}
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
}

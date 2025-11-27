import { ThemeColors } from '../../../../types/theme';
import { Product, Category, getSaleProducts, getDiscountPercent } from '../../../../data/ecommerceData';
import StarRating from './StarRating';

interface HomeViewProps {
    colors: ThemeColors;
    products: Product[];
    categories: Category[];
    selectedCategory: string;
    wishlist: number[];
    onCategoryChange: (category: string) => void;
    onProductSelect: (product: Product) => void;
    onToggleWishlist: (product: Product) => void;
    onSearchClick: () => void;
}

export default function HomeView({
    colors,
    products,
    categories,
    selectedCategory,
    wishlist,
    onCategoryChange,
    onProductSelect,
    onToggleWishlist,
    onSearchClick,
}: HomeViewProps) {
    const saleProducts = getSaleProducts();

    return (
        <div className="space-y-5 pb-4">
            {/* Search Bar */}
            <div 
                onClick={onSearchClick}
                className="flex items-center space-x-3 px-4 py-3 rounded-2xl cursor-pointer"
                style={{ backgroundColor: colors.surfaceContainerHighest }}
            >
                <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span style={{ color: colors.onSurfaceVariant }} className="text-sm">Search products...</span>
            </div>

            {/* Hero Banner */}
            <div 
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.tertiary} 100%)` }}
            >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 -mr-10 -mt-10 bg-white"></div>
                <div className="relative z-10">
                    <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Limited Time</span>
                    <h3 className="text-white text-2xl font-bold mt-1 mb-2">Summer Sale 🔥</h3>
                    <p className="text-white/80 text-sm mb-4">Up to 50% off on selected items</p>
                    <button 
                        className="px-5 py-2 bg-white rounded-xl text-sm font-bold shadow-lg transform active:scale-95 transition-transform" 
                        style={{ color: colors.primary }}
                    >
                        Shop Now
                    </button>
                </div>
                <div className="absolute right-2 bottom-2 w-24 h-24 opacity-90">
                    <img 
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80" 
                        alt="Sale" 
                        className="w-full h-full object-contain transform rotate-[-15deg]"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h4 style={{ color: colors.onSurface }} className="font-bold">Categories</h4>
                    <span style={{ color: colors.primary }} className="text-sm font-medium cursor-pointer">See All</span>
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

            {/* Flash Sale */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                        <h4 style={{ color: colors.onSurface }} className="font-bold">Flash Sale</h4>
                        <div className="flex space-x-1">
                            {['02', '14', '36'].map((time, i) => (
                                <span 
                                    key={i} 
                                    style={{ backgroundColor: colors.errorContainer, color: colors.onErrorContainer }} 
                                    className="px-1.5 py-0.5 rounded text-xs font-bold"
                                >
                                    {time}
                                </span>
                            ))}
                        </div>
                    </div>
                    <span style={{ color: colors.primary }} className="text-sm font-medium cursor-pointer">See All</span>
                </div>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {saleProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => onProductSelect(product)}
                            className="flex-shrink-0 w-36 rounded-xl overflow-hidden cursor-pointer"
                            style={{ backgroundColor: colors.surface }}
                        >
                            <div className="h-36 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                                <div 
                                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold" 
                                    style={{ backgroundColor: colors.error, color: colors.onError }}
                                >
                                    -{getDiscountPercent(product)}%
                                </div>
                            </div>
                            <div className="p-2">
                                <p style={{ color: colors.onSurface }} className="text-xs font-medium truncate">{product.name}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                    <span style={{ color: colors.primary }} className="font-bold text-sm">${product.price}</span>
                                    <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h4 style={{ color: colors.onSurface }} className="font-bold">
                        {selectedCategory === 'All' ? 'Popular Products' : selectedCategory}
                    </h4>
                    <span style={{ color: colors.primary }} className="text-sm font-medium cursor-pointer">See All</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => onProductSelect(product)}
                            style={{ backgroundColor: colors.surface }}
                            className="rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                        >
                            <div className="aspect-square relative">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    loading="lazy"
                                />
                                {product.badge && (
                                    <div 
                                        className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-bold"
                                        style={{ 
                                            backgroundColor: product.badge === 'Sale' ? colors.error : 
                                                            product.badge === 'New' ? colors.tertiary : colors.secondary, 
                                            color: colors.onError 
                                        }}
                                    >
                                        {product.badge}
                                    </div>
                                )}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all"
                                    style={{ color: wishlist.includes(product.id) ? colors.error : colors.onSurfaceVariant }}
                                    aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <svg className="w-4 h-4" fill={wishlist.includes(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-[10px] font-medium">{product.category}</span>
                                    <StarRating rating={product.rating} />
                                </div>
                                <p style={{ color: colors.onSurface }} className="font-bold text-sm truncate">{product.name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span style={{ color: colors.primary }} className="font-bold">${product.price}</span>
                                    {product.originalPrice !== product.price && (
                                        <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

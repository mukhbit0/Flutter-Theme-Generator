import { ThemeColors } from '../../../../types/theme';
import { Product, Category } from '../../../../data/ecommerceData';
import StarRating from './StarRating';

interface SearchViewProps {
    colors: ThemeColors;
    searchQuery: string;
    filteredProducts: Product[];
    categories: Category[];
    wishlist: Product[];
    onBack: () => void;
    onSearchChange: (query: string) => void;
    onProductSelect: (product: Product) => void;
    onToggleWishlist: (product: Product) => void;
    onCategoryClick: (category: string) => void;
}

export default function SearchView({
    colors,
    searchQuery,
    filteredProducts,
    categories,
    wishlist,
    onBack,
    onSearchChange,
    onProductSelect,
    onToggleWishlist,
    onCategoryClick,
}: SearchViewProps) {
    const recentSearches = ['Sneakers', 'Summer dress', 'Sunglasses', 'Handbag'];
    const trendingSearches = ['Minimalist Watch', 'Vintage Jacket', 'Running Shoes'];

    return (
        <div className="space-y-5 pb-4">
            {/* Search Header */}
            <div className="flex items-center space-x-3">
                <button onClick={onBack} style={{ color: colors.onSurface }} aria-label="Go back">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div 
                    className="flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: colors.surfaceContainerHighest }}
                >
                    <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: colors.onSurface }}
                        autoFocus
                    />
                    {searchQuery && (
                        <button onClick={() => onSearchChange('')} style={{ color: colors.onSurfaceVariant }} aria-label="Clear search">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {searchQuery ? (
                /* Search Results */
                <div className="space-y-4">
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm">
                        {filteredProducts.length} results for "{searchQuery}"
                    </p>
                    
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                                <svg style={{ color: colors.onSurfaceVariant }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <p style={{ color: colors.onSurface }} className="font-bold text-lg">No results found</p>
                            <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Try different keywords</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredProducts.map((product) => {
                                const isWishlisted = wishlist.some(w => w.id === product.id);
                                return (
                                    <div 
                                        key={product.id} 
                                        className="flex space-x-3 p-3 rounded-xl"
                                        style={{ backgroundColor: colors.surfaceContainerLow }}
                                    >
                                        <div 
                                            className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                                            onClick={() => onProductSelect(product)}
                                        >
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p 
                                                    style={{ color: colors.onSurface }} 
                                                    className="font-bold cursor-pointer"
                                                    onClick={() => onProductSelect(product)}
                                                >
                                                    {product.name}
                                                </p>
                                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs mt-0.5">
                                                    {product.category}
                                                </p>
                                                <div className="flex items-center space-x-1 mt-1">
                                                    <StarRating rating={product.rating} size="sm" />
                                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                                                        ({product.reviews})
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span style={{ color: colors.primary }} className="font-bold">${product.price}</span>
                                                    {product.originalPrice && (
                                                        <span style={{ color: colors.onSurfaceVariant }} className="text-xs line-through">
                                                            ${product.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                                <button 
                                                    onClick={() => onToggleWishlist(product)}
                                                    style={{ color: isWishlisted ? colors.error : colors.onSurfaceVariant }}
                                                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                                >
                                                    <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                /* Default State - Recent & Trending */
                <div className="space-y-6">
                    {/* Recent Searches */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 style={{ color: colors.onSurface }} className="font-bold">Recent Searches</h3>
                            <button style={{ color: colors.primary }} className="text-sm">Clear All</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => onSearchChange(search)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-full"
                                    style={{ backgroundColor: colors.surfaceContainerHighest }}
                                >
                                    <svg style={{ color: colors.onSurfaceVariant }} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span style={{ color: colors.onSurface }} className="text-sm">{search}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trending Searches */}
                    <div>
                        <h3 style={{ color: colors.onSurface }} className="font-bold mb-3">Trending Now 🔥</h3>
                        <div className="space-y-2">
                            {trendingSearches.map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => onSearchChange(search)}
                                    className="w-full flex items-center space-x-3 p-3 rounded-xl"
                                    style={{ backgroundColor: colors.surfaceContainerLow }}
                                >
                                    <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{ backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer }}
                                    >
                                        {index + 1}
                                    </div>
                                    <span style={{ color: colors.onSurface }} className="font-medium">{search}</span>
                                    <svg style={{ color: colors.onSurfaceVariant }} className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Browse Categories */}
                    <div>
                        <h3 style={{ color: colors.onSurface }} className="font-bold mb-3">Browse Categories</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => onCategoryClick(category.name)}
                                    className="p-3 rounded-xl text-center"
                                    style={{ backgroundColor: colors.surfaceContainerLow }}
                                >
                                    <div 
                                        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-2"
                                        style={{ backgroundColor: colors.surfaceContainerHighest }}
                                    >
                                        {category.icon}
                                    </div>
                                    <p style={{ color: colors.onSurface }} className="text-xs font-medium">{category.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

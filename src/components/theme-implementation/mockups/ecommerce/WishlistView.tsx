import { ThemeColors } from '../../../../types/theme';
import { Product } from '../../../../data/ecommerceData';
import StarRating from './StarRating';

interface WishlistViewProps {
    colors: ThemeColors;
    wishlist: Product[];
    onBack: () => void;
    onProductSelect: (product: Product) => void;
    onRemoveFromWishlist: (product: Product) => void;
    onAddToCart: (product: Product) => void;
    onStartShopping: () => void;
}

export default function WishlistView({
    colors,
    wishlist,
    onBack,
    onProductSelect,
    onRemoveFromWishlist,
    onAddToCart,
    onStartShopping,
}: WishlistViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button onClick={onBack} style={{ color: colors.onSurface }} aria-label="Go back">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">My Wishlist ({wishlist.length})</h2>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-10">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <p style={{ color: colors.onSurface }} className="font-bold text-lg">Your wishlist is empty</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Save items you love here</p>
                    <button
                        onClick={onStartShopping}
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                        className="mt-4 px-6 py-3 rounded-xl font-medium"
                    >
                        Explore Products
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {wishlist.map((product) => (
                        <div 
                            key={product.id} 
                            className="rounded-xl overflow-hidden" 
                            style={{ backgroundColor: colors.surfaceContainerLow }}
                        >
                            {/* Product Image */}
                            <div className="relative aspect-square">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover cursor-pointer"
                                    loading="lazy"
                                    onClick={() => onProductSelect(product)}
                                />
                                {/* Remove Button */}
                                <button
                                    onClick={() => onRemoveFromWishlist(product)}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: colors.surface }}
                                    aria-label="Remove from wishlist"
                                >
                                    <svg style={{ color: colors.error }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                {/* Badge */}
                                {product.badge && (
                                    <div 
                                        className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                                        style={{ 
                                            backgroundColor: product.badge === 'Sale' ? colors.error : 
                                                           product.badge === 'New' ? colors.tertiary : colors.secondary,
                                            color: product.badge === 'Sale' ? colors.onError : 
                                                  product.badge === 'New' ? colors.onTertiary : colors.onSecondary
                                        }}
                                    >
                                        {product.badge}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-3">
                                <p 
                                    style={{ color: colors.onSurface }} 
                                    className="font-medium text-sm truncate cursor-pointer"
                                    onClick={() => onProductSelect(product)}
                                >
                                    {product.name}
                                </p>
                                
                                <div className="flex items-center space-x-1 mt-1">
                                    <StarRating rating={product.rating} size="sm" />
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-xs">
                                        ({product.reviews})
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-2">
                                        <span style={{ color: colors.primary }} className="font-bold">${product.price}</span>
                                        {product.originalPrice && (
                                            <span style={{ color: colors.onSurfaceVariant }} className="text-xs line-through">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => onAddToCart(product)}
                                    style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                                    className="w-full mt-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

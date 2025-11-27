import { ThemeColors } from '../../../../types/theme';
import { Product, sizes } from '../../../../data/ecommerceData';

interface ProductDetailsViewProps {
    colors: ThemeColors;
    product: Product;
    selectedSize: number;
    selectedColor: string;
    isInWishlist: boolean;
    onBack: () => void;
    onToggleWishlist: () => void;
    onSizeChange: (size: number) => void;
    onColorChange: (color: string) => void;
    onAddToCart: () => void;
}

export default function ProductDetailsView({
    colors,
    product,
    selectedSize,
    selectedColor,
    isInWishlist,
    onBack,
    onToggleWishlist,
    onSizeChange,
    onColorChange,
    onAddToCart,
}: ProductDetailsViewProps) {
    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <button
                    onClick={onBack}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }}
                    className="p-2 rounded-full"
                    aria-label="Go back"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="font-bold">Product Details</h2>
                <button
                    onClick={onToggleWishlist}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: isInWishlist ? colors.error : colors.onSurfaceVariant }}
                    className="p-2 rounded-full"
                    aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Image Gallery */}
            <div className="aspect-square rounded-2xl overflow-hidden relative" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                {product.badge && (
                    <div 
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                    >
                        {product.badge}
                    </div>
                )}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === 1 ? 'w-6 bg-white' : 'bg-white/50'}`}></div>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <span style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">{product.category}</span>
                        <h3 style={{ color: colors.onSurface }} className="text-xl font-bold mt-1">{product.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span style={{ color: colors.onSurface }} className="font-bold text-sm">{product.rating}</span>
                            </div>
                            <span style={{ color: colors.onSurfaceVariant }} className="text-sm">({product.reviews} reviews)</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span style={{ color: colors.primary }} className="text-2xl font-bold">${product.price}</span>
                        {product.originalPrice !== product.price && (
                            <span className="block text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Color Selection */}
            <div>
                <h4 style={{ color: colors.onSurface }} className="font-bold mb-3">Color</h4>
                <div className="flex space-x-3">
                    {product.colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => onColorChange(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'scale-110' : ''}`}
                            style={{ 
                                backgroundColor: color,
                                borderColor: selectedColor === color ? colors.primary : colors.outline
                            }}
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h4 style={{ color: colors.onSurface }} className="font-bold">Size</h4>
                    <span style={{ color: colors.primary }} className="text-sm font-medium cursor-pointer">Size Guide</span>
                </div>
                <div className="flex space-x-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChange(size)}
                            className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all"
                            style={{
                                borderColor: selectedSize === size ? colors.primary : colors.outline,
                                backgroundColor: selectedSize === size ? colors.primaryContainer : 'transparent',
                                color: selectedSize === size ? colors.onPrimaryContainer : colors.onSurface
                            }}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div>
                <h4 style={{ color: colors.onSurface }} className="font-bold mb-2">Description</h4>
                <p style={{ color: colors.onSurfaceVariant }} className="text-sm leading-relaxed">
                    Premium quality product with exceptional craftsmanship. Features modern design with comfortable fit. Perfect for everyday use and special occasions. Made with sustainable materials.
                </p>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={onAddToCart}
                style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform flex items-center justify-center space-x-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Cart - ${product.price}</span>
            </button>
        </div>
    );
}

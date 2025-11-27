import { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type EcommerceView = 'home' | 'details' | 'cart' | 'wishlist' | 'search' | 'profile';

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    badge: string | null;
    category: string;
    colors: string[];
}

interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: number;
    selectedColor: string;
}

export default function EcommerceMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<EcommerceView>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<number>(41);
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([]);

    const products: Product[] = [
        { id: 1, name: 'Modern Sneaker Pro', price: 129, originalPrice: 159, rating: 4.8, reviews: 128, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80', badge: 'New', category: 'Shoes', colors: ['#000000', '#FFFFFF', '#FF0000'] },
        { id: 2, name: 'Classic Chronograph', price: 249, originalPrice: 299, rating: 4.9, reviews: 85, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80', badge: 'Sale', category: 'Accessories', colors: ['#C0C0C0', '#FFD700', '#000000'] },
        { id: 3, name: 'Premium Leather Bag', price: 189, originalPrice: 189, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80', badge: null, category: 'Accessories', colors: ['#8B4513', '#000000', '#D2691E'] },
        { id: 4, name: 'Designer Sunglasses', price: 89, originalPrice: 119, rating: 4.6, reviews: 94, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80', badge: 'Hot', category: 'Accessories', colors: ['#000000', '#8B4513'] },
        { id: 5, name: 'Running Jacket', price: 79, originalPrice: 99, rating: 4.5, reviews: 156, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80', badge: 'Sale', category: 'Clothing', colors: ['#000000', '#1E90FF', '#32CD32'] },
        { id: 6, name: 'Wireless Earbuds', price: 149, originalPrice: 179, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80', badge: 'Best Seller', category: 'Electronics', colors: ['#FFFFFF', '#000000'] },
    ];

    const categories = [
        { name: 'All', icon: '🛍️' },
        { name: 'Shoes', icon: '👟' },
        { name: 'Clothing', icon: '👕' },
        { name: 'Accessories', icon: '⌚' },
        { name: 'Electronics', icon: '🎧' },
        { name: 'Sports', icon: '⚽' },
    ];

    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const toggleWishlist = (productId: number) => {
        setWishlist(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const addToCart = (product: Product) => {
        const existingItem = cartItems.find(
            item => item.product.id === product.id && 
                   item.selectedSize === selectedSize && 
                   item.selectedColor === selectedColor
        );
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item === existingItem
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { 
                product, 
                quantity: 1, 
                selectedSize, 
                selectedColor 
            }]);
        }
        setCurrentView('cart');
    };

    const updateCartQuantity = (index: number, delta: number) => {
        const newItems = [...cartItems];
        newItems[index].quantity += delta;
        if (newItems[index].quantity <= 0) {
            newItems.splice(index, 1);
        }
        setCartItems(newItems);
    };

    const removeFromCart = (index: number) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const renderStars = (rating: number) => (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    const renderHome = () => (
        <div className="space-y-5 pb-4">
            {/* Search Bar */}
            <div 
                onClick={() => setCurrentView('search')}
                className="flex items-center space-x-3 px-4 py-3 rounded-2xl cursor-pointer"
                style={{ backgroundColor: colors.surfaceContainerHighest }}
            >
                <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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
                    <button className="px-5 py-2 bg-white rounded-xl text-sm font-bold shadow-lg transform active:scale-95 transition-transform" style={{ color: colors.primary }}>
                        Shop Now
                    </button>
                </div>
                <div className="absolute right-2 bottom-2 w-24 h-24 opacity-90">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80" alt="Sale" className="w-full h-full object-contain transform rotate-[-15deg]" />
                </div>
            </div>

            {/* Categories */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h4 style={{ color: colors.onSurface }} className="font-bold">Categories</h4>
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

            {/* Flash Sale */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                        <h4 style={{ color: colors.onSurface }} className="font-bold">Flash Sale</h4>
                        <div className="flex space-x-1">
                            {['02', '14', '36'].map((time, i) => (
                                <span key={i} style={{ backgroundColor: colors.errorContainer, color: colors.onErrorContainer }} className="px-1.5 py-0.5 rounded text-xs font-bold">
                                    {time}
                                </span>
                            ))}
                        </div>
                    </div>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">See All</span>
                </div>
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                    {products.filter(p => p.badge === 'Sale').map((product) => (
                        <div
                            key={product.id}
                            onClick={() => { setSelectedProduct(product); setCurrentView('details'); }}
                            className="flex-shrink-0 w-36 rounded-xl overflow-hidden cursor-pointer"
                            style={{ backgroundColor: colors.surface }}
                        >
                            <div className="h-36 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: colors.error, color: colors.onError }}>
                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
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
                    <span style={{ color: colors.primary }} className="text-sm font-medium">See All</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => { setSelectedProduct(product); setCurrentView('details'); }}
                            style={{ backgroundColor: colors.surface }}
                            className="rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                        >
                            <div className="aspect-square relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all"
                                    style={{ color: wishlist.includes(product.id) ? colors.error : colors.onSurfaceVariant }}
                                >
                                    <svg className="w-4 h-4" fill={wishlist.includes(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                            </div>
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span style={{ color: colors.onSurfaceVariant }} className="text-[10px] font-medium">{product.category}</span>
                                    {renderStars(product.rating)}
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

    const renderDetails = () => {
        const product = selectedProduct || products[0];
        return (
            <div className="space-y-5 pb-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setCurrentView('home')}
                        style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }}
                        className="p-2 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h2 style={{ color: colors.onSurface }} className="font-bold">Product Details</h2>
                    <button
                        onClick={() => toggleWishlist(product.id)}
                        style={{ backgroundColor: colors.surfaceContainerHighest, color: wishlist.includes(product.id) ? colors.error : colors.onSurfaceVariant }}
                        className="p-2 rounded-full"
                    >
                        <svg className="w-5 h-5" fill={wishlist.includes(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                </div>

                {/* Image Gallery */}
                <div className="aspect-square rounded-2xl overflow-hidden relative" style={{ backgroundColor: colors.surfaceContainerLow }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
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
                                onClick={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'scale-110' : ''}`}
                                style={{ 
                                    backgroundColor: color,
                                    borderColor: selectedColor === color ? colors.primary : colors.outline
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Size Selection */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 style={{ color: colors.onSurface }} className="font-bold">Size</h4>
                        <span style={{ color: colors.primary }} className="text-sm font-medium">Size Guide</span>
                    </div>
                    <div className="flex space-x-2">
                        {[38, 39, 40, 41, 42, 43, 44].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
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
                    onClick={() => addToCart(product)}
                    style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                    className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform active:scale-95 transition-transform flex items-center justify-center space-x-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    <span>Add to Cart - ${product.price}</span>
                </button>
            </div>
        );
    };

    const renderCart = () => (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentView('home')} style={{ color: colors.onSurface }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-10">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <p style={{ color: colors.onSurface }} className="font-bold text-lg">Your cart is empty</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Add items to get started</p>
                    <button
                        onClick={() => setCurrentView('home')}
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
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p style={{ color: colors.onSurface }} className="font-bold text-sm">{item.product.name}</p>
                                            <p style={{ color: colors.onSurfaceVariant }} className="text-xs mt-0.5">
                                                Size: {item.selectedSize} • <span className="inline-block w-2 h-2 rounded-full align-middle" style={{ backgroundColor: item.selectedColor }}></span>
                                            </p>
                                        </div>
                                        <button onClick={() => removeFromCart(index)} style={{ color: colors.error }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span style={{ color: colors.primary }} className="font-bold">${item.product.price * item.quantity}</span>
                                        <div className="flex items-center space-x-2 rounded-lg px-2 py-1" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                                            <button onClick={() => updateCartQuantity(index, -1)} style={{ color: colors.onSurface }} className="w-6 h-6 flex items-center justify-center font-bold">-</button>
                                            <span style={{ color: colors.onSurface }} className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateCartQuantity(index, 1)} style={{ color: colors.onSurface }} className="w-6 h-6 flex items-center justify-center font-bold">+</button>
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
                            <span style={{ color: colors.onSurface }} className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="h-px" style={{ backgroundColor: colors.outline }}></div>
                        <div className="flex justify-between">
                            <span style={{ color: colors.onSurface }} className="font-bold">Total</span>
                            <span style={{ color: colors.primary }} className="font-bold text-xl">${(cartTotal * 1.08).toFixed(2)}</span>
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

    const renderWishlist = () => {
        const wishlistProducts = products.filter(p => wishlist.includes(p.id));
        return (
            <div className="space-y-5 pb-4">
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">My Wishlist ({wishlist.length})</h2>
                
                {wishlistProducts.length === 0 ? (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                            <svg style={{ color: colors.onSurfaceVariant }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <p style={{ color: colors.onSurface }} className="font-bold text-lg">No items in wishlist</p>
                        <p style={{ color: colors.onSurfaceVariant }} className="text-sm mt-1">Save items you love</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {wishlistProducts.map((product) => (
                            <div key={product.id} className="flex space-x-3 p-3 rounded-xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <p style={{ color: colors.onSurface }} className="font-bold text-sm">{product.name}</p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span style={{ color: colors.onSurfaceVariant }} className="text-xs">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span style={{ color: colors.primary }} className="font-bold">${product.price}</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => toggleWishlist(product.id)}
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: colors.errorContainer, color: colors.onErrorContainer }}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                            <button
                                                onClick={() => { setSelectedProduct(product); setCurrentView('details'); }}
                                                className="px-3 py-2 rounded-lg text-xs font-medium"
                                                style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderProfile = () => (
        <div className="space-y-5 pb-4">
            {/* Profile Header */}
            <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4" style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}>
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 style={{ color: colors.onSurface }} className="text-lg font-bold">John Doe</h2>
                <p style={{ color: colors.onSurfaceVariant }} className="text-sm">john.doe@email.com</p>
            </div>

            {/* Stats */}
            <div className="flex justify-around p-4 rounded-2xl" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="text-center">
                    <p style={{ color: colors.onSurface }} className="text-xl font-bold">{cartCount}</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">In Cart</p>
                </div>
                <div className="w-px h-12" style={{ backgroundColor: colors.outline }}></div>
                <div className="text-center">
                    <p style={{ color: colors.onSurface }} className="text-xl font-bold">{wishlist.length}</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Wishlist</p>
                </div>
                <div className="w-px h-12" style={{ backgroundColor: colors.outline }}></div>
                <div className="text-center">
                    <p style={{ color: colors.onSurface }} className="text-xl font-bold">12</p>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-xs">Orders</p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
                {[
                    { icon: '📦', label: 'My Orders', desc: 'Track your orders' },
                    { icon: '📍', label: 'Addresses', desc: 'Manage delivery addresses' },
                    { icon: '💳', label: 'Payment Methods', desc: 'Cards & wallets' },
                    { icon: '🔔', label: 'Notifications', desc: 'Manage alerts' },
                    { icon: '⚙️', label: 'Settings', desc: 'App preferences' },
                    { icon: '❓', label: 'Help & Support', desc: 'Get assistance' },
                ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all active:scale-[0.98]" style={{ backgroundColor: colors.surfaceContainerLow }}>
                        <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                                <p style={{ color: colors.onSurface }} className="font-medium">{item.label}</p>
                                <p style={{ color: colors.onSurfaceVariant }} className="text-xs">{item.desc}</p>
                            </div>
                        </div>
                        <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                ))}
            </div>

            <button style={{ backgroundColor: colors.errorContainer, color: colors.onErrorContainer }} className="w-full py-3 rounded-xl font-medium">
                Log Out
            </button>
        </div>
    );

    const renderSearch = () => (
        <div className="space-y-5 pb-4">
            {/* Search Input */}
            <div className="flex items-center space-x-3">
                <button onClick={() => setCurrentView('home')} style={{ color: colors.onSurface }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div 
                    className="flex-1 flex items-center space-x-2 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: colors.surfaceContainerHighest }}
                >
                    <svg style={{ color: colors.onSurfaceVariant }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: colors.onSurface }}
                        autoFocus
                    />
                </div>
            </div>

            {/* Recent Searches */}
            <div>
                <h4 style={{ color: colors.onSurface }} className="font-bold mb-3">Recent Searches</h4>
                <div className="flex flex-wrap gap-2">
                    {['Sneakers', 'Watch', 'Bag', 'Sunglasses', 'Jacket'].map((term) => (
                        <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-4 py-2 rounded-full text-sm"
                            style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }}
                        >
                            {term}
                        </button>
                    ))}
                </div>
            </div>

            {/* Popular Categories */}
            <div>
                <h4 style={{ color: colors.onSurface }} className="font-bold mb-3">Popular Categories</h4>
                <div className="grid grid-cols-2 gap-3">
                    {categories.slice(1).map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => { setSelectedCategory(cat.name); setCurrentView('home'); }}
                            className="flex items-center space-x-3 p-4 rounded-xl"
                            style={{ backgroundColor: colors.surfaceContainerLow }}
                        >
                            <span className="text-2xl">{cat.icon}</span>
                            <span style={{ color: colors.onSurface }} className="font-medium">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full relative">
            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-2">
                    <div style={{ backgroundColor: colors.primaryContainer }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🛍️</span>
                    </div>
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">ShopApp</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setCurrentView('search')}
                        style={{ color: colors.onSurfaceVariant }} 
                        className="p-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <button 
                        onClick={() => setCurrentView('cart')}
                        style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }}
                        className="p-2 rounded-full relative"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        {cartCount > 0 && (
                            <span style={{ backgroundColor: colors.error, color: colors.onError }} className="absolute -top-1 -right-1 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                {currentView === 'home' && renderHome()}
                {currentView === 'details' && renderDetails()}
                {currentView === 'cart' && renderCart()}
                {currentView === 'wishlist' && renderWishlist()}
                {currentView === 'profile' && renderProfile()}
                {currentView === 'search' && renderSearch()}
            </div>

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2 px-4 flex justify-around items-center">
                {[
                    { view: 'home' as EcommerceView, icon: '🏠', label: 'Home' },
                    { view: 'wishlist' as EcommerceView, icon: '❤️', label: 'Wishlist', badge: wishlist.length },
                    { view: 'cart' as EcommerceView, icon: '🛒', label: 'Cart', badge: cartCount },
                    { view: 'profile' as EcommerceView, icon: '👤', label: 'Profile' },
                ].map((item) => (
                    <button
                        key={item.view}
                        onClick={() => setCurrentView(item.view)}
                        className="flex flex-col items-center p-2 relative"
                        style={{ color: currentView === item.view ? colors.primary : colors.onSurfaceVariant }}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                            <span style={{ backgroundColor: colors.error, color: colors.onError }} className="absolute top-0 right-1 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{item.badge}</span>
                        )}
                        <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

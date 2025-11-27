import { useMemo, useCallback } from 'react';
import { ThemeColors } from '../../../types/theme';
import { products, categories, Product } from '../../../data/ecommerceData';
import { useEcommerce, EcommerceView } from '../../../hooks';
import {
    HomeView,
    ProductDetailsView,
    CartView,
    WishlistView,
    ProfileView,
    SearchView,
} from './ecommerce';

interface MockupProps {
    colors: ThemeColors;
}

export default function EcommerceMockup({ colors }: MockupProps) {
    const {
        currentView,
        selectedProduct,
        selectedSize,
        selectedColor,
        selectedCategory,
        searchQuery,
        cartItems,
        wishlist,
        cartTotal,
        cartCount,
        cartTax,
        cartGrandTotal,
        setCurrentView,
        setSelectedProduct,
        setSelectedSize,
        setSelectedColor,
        setSelectedCategory,
        setSearchQuery,
        toggleWishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        isInWishlist,
    } = useEcommerce();

    // Computed values
    const filteredProducts = useMemo(() => 
        selectedCategory === 'All' 
            ? products 
            : products.filter(p => p.category === selectedCategory),
        [selectedCategory]
    );

    const searchFilteredProducts = useMemo(() => 
        searchQuery
            ? products.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : [],
        [searchQuery]
    );

    const wishlistProducts = useMemo(() => 
        products.filter(p => wishlist.includes(p.id)),
        [wishlist]
    );

    // Handlers
    const handleProductSelect = useCallback((product: Product) => {
        setSelectedProduct(product);
        setCurrentView('details');
    }, [setSelectedProduct, setCurrentView]);

    const handleToggleWishlist = useCallback((product: Product) => {
        toggleWishlist(product.id);
    }, [toggleWishlist]);

    const handleAddToCartFromWishlist = useCallback((product: Product) => {
        // Set default size/color before adding
        if (product.colors.length > 0) {
            setSelectedColor(product.colors[0]);
        }
        addToCart(product);
    }, [addToCart, setSelectedColor]);

    const handleCategorySelect = useCallback((category: string) => {
        setSelectedCategory(category);
        setCurrentView('home');
    }, [setSelectedCategory, setCurrentView]);

    // Navigation items for bottom nav
    const navItems: { view: EcommerceView; icon: string; label: string; badge?: number }[] = [
        { view: 'home', icon: '🏠', label: 'Home' },
        { view: 'wishlist', icon: '❤️', label: 'Wishlist', badge: wishlist.length },
        { view: 'cart', icon: '🛒', label: 'Cart', badge: cartCount },
        { view: 'profile', icon: '👤', label: 'Profile' },
    ];

    // Render current view
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <HomeView
                        colors={colors}
                        products={filteredProducts}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        wishlist={wishlist}
                        onCategoryChange={setSelectedCategory}
                        onProductSelect={handleProductSelect}
                        onToggleWishlist={handleToggleWishlist}
                        onSearchClick={() => setCurrentView('search')}
                    />
                );
            case 'details':
                return selectedProduct ? (
                    <ProductDetailsView
                        colors={colors}
                        product={selectedProduct}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        isInWishlist={isInWishlist(selectedProduct.id)}
                        onBack={() => setCurrentView('home')}
                        onSizeChange={setSelectedSize}
                        onColorChange={setSelectedColor}
                        onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
                        onAddToCart={() => addToCart(selectedProduct)}
                    />
                ) : null;
            case 'cart':
                return (
                    <CartView
                        colors={colors}
                        cartItems={cartItems}
                        cartCount={cartCount}
                        cartTotal={cartTotal}
                        cartTax={cartTax}
                        cartGrandTotal={cartGrandTotal}
                        onBack={() => setCurrentView('home')}
                        onUpdateQuantity={updateCartQuantity}
                        onRemoveItem={removeFromCart}
                        onStartShopping={() => setCurrentView('home')}
                    />
                );
            case 'wishlist':
                return (
                    <WishlistView
                        colors={colors}
                        wishlist={wishlistProducts}
                        onBack={() => setCurrentView('home')}
                        onProductSelect={handleProductSelect}
                        onRemoveFromWishlist={handleToggleWishlist}
                        onAddToCart={handleAddToCartFromWishlist}
                        onStartShopping={() => setCurrentView('home')}
                    />
                );
            case 'profile':
                return (
                    <ProfileView
                        colors={colors}
                        onBack={() => setCurrentView('home')}
                        onViewOrders={() => {}}
                        onViewWishlist={() => setCurrentView('wishlist')}
                    />
                );
            case 'search':
                return (
                    <SearchView
                        colors={colors}
                        searchQuery={searchQuery}
                        filteredProducts={searchFilteredProducts}
                        categories={categories}
                        wishlist={wishlistProducts}
                        onBack={() => setCurrentView('home')}
                        onSearchChange={setSearchQuery}
                        onProductSelect={handleProductSelect}
                        onToggleWishlist={handleToggleWishlist}
                        onCategoryClick={handleCategorySelect}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: colors.surface }} className="h-full flex flex-col">
            {/* Status Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-1 flex justify-between items-center text-xs">
                <span style={{ color: colors.onSurface }} className="font-medium">9:41</span>
                <div className="flex items-center space-x-1">
                    <svg style={{ color: colors.onSurface }} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
                    </svg>
                    <svg style={{ color: colors.onSurface }} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 22h20V2z" />
                    </svg>
                    <div className="flex items-center">
                        <div style={{ backgroundColor: colors.onSurface }} className="w-6 h-3 rounded-sm relative">
                            <div style={{ backgroundColor: colors.primary }} className="absolute inset-0.5 rounded-sm right-1"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }} className="border-b py-3 px-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: colors.primaryContainer }}
                    >
                        <span style={{ color: colors.onPrimaryContainer }} className="text-lg">🛍️</span>
                    </div>
                    <span style={{ color: colors.onSurface }} className="font-bold text-lg">ShopNow</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setCurrentView('search')}
                        style={{ color: colors.onSurfaceVariant }} 
                        className="p-2"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => setCurrentView('cart')}
                        style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }}
                        className="p-2 rounded-full relative"
                        aria-label="Cart"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span 
                                style={{ backgroundColor: colors.error, color: colors.onError }} 
                                className="absolute -top-1 -right-1 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                {renderContent()}
            </div>

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2 px-4 flex justify-around items-center">
                {navItems.map((item) => (
                    <button
                        key={item.view}
                        onClick={() => setCurrentView(item.view)}
                        className="flex flex-col items-center p-2 relative"
                        style={{ color: currentView === item.view ? colors.primary : colors.onSurfaceVariant }}
                        aria-label={item.label}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                            <span 
                                style={{ backgroundColor: colors.error, color: colors.onError }} 
                                className="absolute top-0 right-1 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
                            >
                                {item.badge}
                            </span>
                        )}
                        <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

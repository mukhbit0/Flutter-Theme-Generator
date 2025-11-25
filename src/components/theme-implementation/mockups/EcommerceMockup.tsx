import React, { useState } from 'react';
import { ThemeColors } from '../../../types/theme';

interface MockupProps {
    colors: ThemeColors;
}

type EcommerceView = 'home' | 'details' | 'cart';

export default function EcommerceMockup({ colors }: MockupProps) {
    const [currentView, setCurrentView] = useState<EcommerceView>('home');
    const [isFavorite, setIsFavorite] = useState(false);

    const products = [
        { id: 1, name: 'Modern Sneaker', price: '$129.00', originalPrice: '$159.00', rating: 4.8, reviews: 128, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80', badge: 'New' },
        { id: 2, name: 'Classic Watch', price: '$249.00', originalPrice: '$299.00', rating: 4.9, reviews: 85, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80', badge: 'Sale' },
        { id: 3, name: 'Leather Bag', price: '$189.00', originalPrice: '$189.00', rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80', badge: null },
        { id: 4, name: 'Sunglasses', price: '$89.00', originalPrice: '$119.00', rating: 4.6, reviews: 94, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80', badge: 'Hot' },
    ];

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    const renderHome = () => (
        <div className="space-y-6">
            {/* Hero Banner */}
            <div style={{ backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer }} className="rounded-2xl p-6 relative overflow-hidden shadow-sm">
                <div className="relative z-10 w-2/3">
                    <div style={{ backgroundColor: colors.primary, color: colors.onPrimary }} className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3">
                        SUMMER SALE
                    </div>
                    <h3 className="text-2xl font-bold mb-2 leading-tight">Up to 50% Off New Arrivals</h3>
                    <p className="text-sm opacity-90 mb-4">Discover the latest trends in fashion and accessories.</p>
                    <button style={{ backgroundColor: colors.onPrimaryContainer, color: colors.primaryContainer }} className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-transform">
                        Shop Now
                    </button>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: colors.primary }}></div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 bg-gradient-to-l from-black to-transparent"></div>
            </div>

            {/* Categories */}
            <div>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h4 style={{ color: colors.onSurface }} className="font-bold text-lg">Categories</h4>
                    <span style={{ color: colors.primary }} className="text-sm font-medium">See All</span>
                </div>
                <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar px-1">
                    {['All', 'Shoes', 'Clothing', 'Accessories', 'Sports'].map((cat, i) => (
                        <button
                            key={cat}
                            style={{
                                backgroundColor: i === 0 ? colors.primary : colors.surfaceContainerHighest,
                                color: i === 0 ? colors.onPrimary : colors.onSurfaceVariant
                            }}
                            className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
                {products.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setCurrentView('details')}
                        style={{ backgroundColor: colors.surface }}
                        className="rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                    >
                        <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            {item.badge && (
                                <div style={{ backgroundColor: item.badge === 'Sale' ? colors.error : colors.tertiary, color: colors.onError }} className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide shadow-sm">
                                    {item.badge}
                                </div>
                            )}
                            <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500 transition-colors shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                        </div>
                        <div className="p-3">
                            <div className="flex justify-between items-start mb-1">
                                <div style={{ color: colors.onSurfaceVariant }} className="text-xs font-medium">Sneakers</div>
                                {renderStars(item.rating)}
                            </div>
                            <div style={{ color: colors.onSurface }} className="font-bold text-sm mb-1 truncate leading-tight">{item.name}</div>
                            <div className="flex items-center space-x-2">
                                <span style={{ color: colors.primary }} className="font-bold text-base">{item.price}</span>
                                {item.originalPrice !== item.price && (
                                    <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDetails = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setCurrentView('home')}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }}
                    className="p-2 rounded-full hover:opacity-80 transition-opacity"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div style={{ color: colors.onSurface }} className="font-bold text-lg">Product Details</div>
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    style={{ backgroundColor: colors.surfaceContainerHighest, color: isFavorite ? colors.error : colors.onSurfaceVariant }}
                    className="p-2 rounded-full hover:opacity-80 transition-opacity"
                >
                    <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
            </div>

            {/* Image Gallery */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative shadow-sm">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" alt="Product" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/50'}`}></div>
                    ))}
                </div>
            </div>

            {/* Info */}
            <div>
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h2 style={{ color: colors.onSurface }} className="text-2xl font-bold mb-1">Modern Sneaker</h2>
                        <div className="flex items-center space-x-2">
                            <div style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }} className="px-2 py-0.5 rounded text-xs font-bold">
                                IN STOCK
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                <span style={{ color: colors.onSurface }} className="font-bold text-sm">4.8</span>
                                <span style={{ color: colors.onSurfaceVariant }} className="text-sm">(128 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span style={{ color: colors.primary }} className="text-2xl font-bold block">$129.00</span>
                        <span className="text-sm text-gray-400 line-through">$159.00</span>
                    </div>
                </div>

                <div className="my-6">
                    <h3 style={{ color: colors.onSurface }} className="font-bold mb-3">Select Size</h3>
                    <div className="flex space-x-3">
                        {[39, 40, 41, 42, 43].map((size, i) => (
                            <button
                                key={size}
                                style={{
                                    borderColor: i === 2 ? colors.primary : colors.outline,
                                    backgroundColor: i === 2 ? colors.primaryContainer : 'transparent',
                                    color: i === 2 ? colors.onPrimaryContainer : colors.onSurface
                                }}
                                className="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold transition-all"
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="my-6">
                    <h3 style={{ color: colors.onSurface }} className="font-bold mb-2">Description</h3>
                    <p style={{ color: colors.onSurfaceVariant }} className="text-sm leading-relaxed">
                        Premium comfort meets modern style. Features breathable mesh upper, responsive cushioning, and durable rubber outsole for all-day wear. Perfect for running or casual street style.
                    </p>
                </div>
            </div>

            <button
                onClick={() => setCurrentView('cart')}
                style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
                className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transform active:scale-95 transition-transform flex items-center justify-center space-x-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span>Add to Cart</span>
            </button>
        </div>
    );

    const renderCart = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
                <button
                    onClick={() => setCurrentView('home')}
                    style={{ color: colors.onSurface }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 style={{ color: colors.onSurface }} className="text-xl font-bold">Shopping Cart (2)</h2>
            </div>

            {[1, 2].map(item => (
                <div key={item} style={{ backgroundColor: colors.surface }} className="p-4 rounded-2xl flex space-x-4 shadow-sm">
                    <div className="w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <div className="flex justify-between items-start">
                                <div style={{ color: colors.onSurface }} className="font-bold text-base">Modern Sneaker</div>
                                <button style={{ color: colors.error }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                            <div style={{ color: colors.onSurfaceVariant }} className="text-xs mt-1">Size: 42 • Color: Black</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div style={{ color: colors.primary }} className="font-bold text-lg">$129.00</div>
                            <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                                <button className="text-sm font-bold text-gray-500 hover:text-gray-900">-</button>
                                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">1</span>
                                <button className="text-sm font-bold text-gray-500 hover:text-gray-900">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div style={{ backgroundColor: colors.surfaceContainerLow }} className="p-5 rounded-2xl space-y-3 mt-8">
                <div className="flex justify-between text-sm">
                    <span style={{ color: colors.onSurfaceVariant }}>Subtotal</span>
                    <span style={{ color: colors.onSurface }} className="font-medium">$258.00</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span style={{ color: colors.onSurfaceVariant }}>Shipping</span>
                    <span style={{ color: colors.onSurface }} className="font-medium">$12.00</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span style={{ color: colors.onSurfaceVariant }}>Tax</span>
                    <span style={{ color: colors.onSurface }} className="font-medium">$24.00</span>
                </div>
                <div style={{ borderColor: colors.outlineVariant }} className="border-t pt-3 mt-2">
                    <div className="flex justify-between text-xl font-bold">
                        <span style={{ color: colors.onSurface }}>Total</span>
                        <span style={{ color: colors.primary }}>$294.00</span>
                    </div>
                </div>
            </div>

            <button style={{ backgroundColor: colors.primary, color: colors.onPrimary }} className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 mt-4">
                Checkout
            </button>
        </div>
    );

    return (
        <div className="flex flex-col h-full relative">
            {/* App Bar */}
            <div style={{ backgroundColor: colors.surface }} className="px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                    <div style={{ backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer }} className="p-1.5 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <div style={{ color: colors.onSurface }} className="font-bold text-lg tracking-tight">ShopApp</div>
                </div>
                <div
                    onClick={() => setCurrentView('cart')}
                    style={{ backgroundColor: colors.secondaryContainer, color: colors.onSecondaryContainer }}
                    className="p-2.5 rounded-full relative cursor-pointer hover:opacity-90 transition-opacity"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    <span style={{ backgroundColor: colors.error, color: colors.onError }} className="absolute -top-1 -right-1 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 font-bold">2</span>
                </div>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: colors.background }} className="flex-1 p-4 overflow-y-auto no-scrollbar">
                {currentView === 'home' && renderHome()}
                {currentView === 'details' && renderDetails()}
                {currentView === 'cart' && renderCart()}
            </div>

            {/* Bottom Nav */}
            <div style={{ backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }} className="border-t py-2 px-6 flex justify-between items-center">
                <div
                    onClick={() => setCurrentView('home')}
                    style={{ color: currentView === 'home' ? colors.primary : colors.onSurfaceVariant }}
                    className="flex flex-col items-center cursor-pointer transition-colors"
                >
                    <svg className="w-6 h-6" fill={currentView === 'home' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-[10px] font-medium mt-1">Home</span>
                </div>
                <div style={{ color: colors.onSurfaceVariant }} className="flex flex-col items-center cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <span className="text-[10px] font-medium mt-1">Wishlist</span>
                </div>
                <div style={{ color: colors.onSurfaceVariant }} className="flex flex-col items-center cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-[10px] font-medium mt-1">Profile</span>
                </div>
            </div>
        </div>
    );
}

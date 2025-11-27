import { useState, useCallback, useMemo } from 'react';
import { Product, CartItem } from '../data/ecommerceData';

export type EcommerceView = 'home' | 'details' | 'cart' | 'wishlist' | 'search' | 'profile';

export interface EcommerceState {
    currentView: EcommerceView;
    selectedProduct: Product | null;
    selectedSize: number;
    selectedColor: string;
    selectedCategory: string;
    searchQuery: string;
    cartItems: CartItem[];
    wishlist: number[];
}

export interface EcommerceActions {
    setCurrentView: (view: EcommerceView) => void;
    setSelectedProduct: (product: Product | null) => void;
    setSelectedSize: (size: number) => void;
    setSelectedColor: (color: string) => void;
    setSelectedCategory: (category: string) => void;
    setSearchQuery: (query: string) => void;
    toggleWishlist: (productId: number) => void;
    addToCart: (product: Product) => void;
    updateCartQuantity: (index: number, delta: number) => void;
    removeFromCart: (index: number) => void;
    isInWishlist: (productId: number) => boolean;
}

export interface EcommerceComputed {
    cartTotal: number;
    cartCount: number;
    cartTax: number;
    cartGrandTotal: number;
}

export function useEcommerce(): EcommerceState & EcommerceActions & EcommerceComputed {
    const [currentView, setCurrentView] = useState<EcommerceView>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<number>(41);
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([]);

    const toggleWishlist = useCallback((productId: number) => {
        setWishlist(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    }, []);

    const addToCart = useCallback((product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(
                item => item.product.id === product.id && 
                       item.selectedSize === selectedSize && 
                       item.selectedColor === selectedColor
            );
            if (existingItem) {
                return prev.map(item =>
                    item === existingItem
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { 
                product, 
                quantity: 1, 
                selectedSize, 
                selectedColor 
            }];
        });
        setCurrentView('cart');
    }, [selectedSize, selectedColor]);

    const updateCartQuantity = useCallback((index: number, delta: number) => {
        setCartItems(prev => {
            const newItems = [...prev];
            newItems[index].quantity += delta;
            if (newItems[index].quantity <= 0) {
                newItems.splice(index, 1);
            }
            return newItems;
        });
    }, []);

    const removeFromCart = useCallback((index: number) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    }, []);

    const isInWishlist = useCallback((productId: number) => wishlist.includes(productId), [wishlist]);

    // Computed values with useMemo for performance
    const cartTotal = useMemo(() => 
        cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [cartItems]
    );

    const cartCount = useMemo(() => 
        cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    const cartTax = useMemo(() => cartTotal * 0.08, [cartTotal]);
    const cartGrandTotal = useMemo(() => cartTotal + cartTax, [cartTotal, cartTax]);

    return {
        // State
        currentView,
        selectedProduct,
        selectedSize,
        selectedColor,
        selectedCategory,
        searchQuery,
        cartItems,
        wishlist,
        // Actions
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
        // Computed
        cartTotal,
        cartCount,
        cartTax,
        cartGrandTotal,
    };
}

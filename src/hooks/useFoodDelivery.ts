import { useState, useCallback, useMemo } from 'react';
import { MenuItem, CartItem, calculateCartTotal, calculateCartCount } from '../data/foodDeliveryData';

export type FoodView = 'home' | 'restaurant' | 'cart' | 'orders';

export interface UseFoodDeliveryReturn {
    currentView: FoodView;
    setCurrentView: (view: FoodView) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedRestaurant: number | null;
    setSelectedRestaurant: (id: number | null) => void;
    cartItems: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: number) => void;
    clearCartItem: (itemId: number) => void;
    cartTotal: number;
    cartCount: number;
    getCartItemQuantity: (itemId: number) => number;
}

export function useFoodDelivery(): UseFoodDeliveryReturn {
    const [currentView, setCurrentView] = useState<FoodView>('home');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((item: MenuItem) => {
        setCartItems(prev => {
            const existingItem = prev.find(ci => ci.item.id === item.id);
            if (existingItem) {
                return prev.map(ci => 
                    ci.item.id === item.id 
                        ? { ...ci, quantity: ci.quantity + 1 }
                        : ci
                );
            }
            return [...prev, { item, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((itemId: number) => {
        setCartItems(prev => {
            const existingItem = prev.find(ci => ci.item.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return prev.map(ci => 
                    ci.item.id === itemId 
                        ? { ...ci, quantity: ci.quantity - 1 }
                        : ci
                );
            }
            return prev.filter(ci => ci.item.id !== itemId);
        });
    }, []);

    const clearCartItem = useCallback((itemId: number) => {
        setCartItems(prev => prev.filter(ci => ci.item.id !== itemId));
    }, []);

    const cartTotal = useMemo(() => calculateCartTotal(cartItems), [cartItems]);
    const cartCount = useMemo(() => calculateCartCount(cartItems), [cartItems]);

    const getCartItemQuantity = useCallback((itemId: number): number => {
        const item = cartItems.find(ci => ci.item.id === itemId);
        return item?.quantity || 0;
    }, [cartItems]);

    return {
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedRestaurant,
        setSelectedRestaurant,
        cartItems,
        addToCart,
        removeFromCart,
        clearCartItem,
        cartTotal,
        cartCount,
        getCartItemQuantity,
    };
}

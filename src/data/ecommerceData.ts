// ==========================================
// Ecommerce Mockup Data Types & Mock Data
// ==========================================

export interface Product {
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

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: number;
    selectedColor: string;
}

export interface Category {
    id: number;
    name: string;
    icon: string;
}

export interface ProfileMenuItem {
    icon: string;
    label: string;
    desc: string;
}

// ==========================================
// Mock Data
// ==========================================

export const products: Product[] = [
    { 
        id: 1, 
        name: 'Modern Sneaker Pro', 
        price: 129, 
        originalPrice: 159, 
        rating: 4.8, 
        reviews: 128, 
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80', 
        badge: 'New', 
        category: 'Shoes', 
        colors: ['#000000', '#FFFFFF', '#FF0000'] 
    },
    { 
        id: 2, 
        name: 'Classic Chronograph', 
        price: 249, 
        originalPrice: 299, 
        rating: 4.9, 
        reviews: 85, 
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80', 
        badge: 'Sale', 
        category: 'Accessories', 
        colors: ['#C0C0C0', '#FFD700', '#000000'] 
    },
    { 
        id: 3, 
        name: 'Premium Leather Bag', 
        price: 189, 
        originalPrice: 189, 
        rating: 4.7, 
        reviews: 210, 
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80', 
        badge: null, 
        category: 'Accessories', 
        colors: ['#8B4513', '#000000', '#D2691E'] 
    },
    { 
        id: 4, 
        name: 'Designer Sunglasses', 
        price: 89, 
        originalPrice: 119, 
        rating: 4.6, 
        reviews: 94, 
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80', 
        badge: 'Hot', 
        category: 'Accessories', 
        colors: ['#000000', '#8B4513'] 
    },
    { 
        id: 5, 
        name: 'Running Jacket', 
        price: 79, 
        originalPrice: 99, 
        rating: 4.5, 
        reviews: 156, 
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80', 
        badge: 'Sale', 
        category: 'Clothing', 
        colors: ['#000000', '#1E90FF', '#32CD32'] 
    },
    { 
        id: 6, 
        name: 'Wireless Earbuds', 
        price: 149, 
        originalPrice: 179, 
        rating: 4.8, 
        reviews: 312, 
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80', 
        badge: 'Best Seller', 
        category: 'Electronics', 
        colors: ['#FFFFFF', '#000000'] 
    },
];

export const categories: Category[] = [
    { id: 1, name: 'All', icon: '🛍️' },
    { id: 2, name: 'Shoes', icon: '👟' },
    { id: 3, name: 'Clothing', icon: '👕' },
    { id: 4, name: 'Accessories', icon: '⌚' },
    { id: 5, name: 'Electronics', icon: '🎧' },
    { id: 6, name: 'Sports', icon: '⚽' },
];

export const profileMenuItems: ProfileMenuItem[] = [
    { icon: '📦', label: 'My Orders', desc: 'Track your orders' },
    { icon: '📍', label: 'Addresses', desc: 'Manage delivery addresses' },
    { icon: '💳', label: 'Payment Methods', desc: 'Cards & wallets' },
    { icon: '🔔', label: 'Notifications', desc: 'Manage alerts' },
    { icon: '⚙️', label: 'Settings', desc: 'App preferences' },
    { icon: '❓', label: 'Help & Support', desc: 'Get assistance' },
];

export const recentSearches = ['Sneakers', 'Watch', 'Bag', 'Sunglasses', 'Jacket'];

export const sizes = [38, 39, 40, 41, 42, 43, 44];

// Utility functions
export const getSaleProducts = () => products.filter(p => p.badge === 'Sale');

export const getFilteredProducts = (category: string) => 
    category === 'All' ? products : products.filter(p => p.category === category);

export const getDiscountPercent = (product: Product) => 
    Math.round((1 - product.price / product.originalPrice) * 100);

export interface Category {
    name: string;
    icon: string;
}

export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    rating: number;
    time: string;
    deliveryFee: string;
    image: string;
    featured: boolean;
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    time: string;
    category: string;
}

export interface CartItem {
    item: MenuItem;
    quantity: number;
}

export interface Order {
    name: string;
    items: string;
    total: string;
    date: string;
}

export interface OrderStep {
    icon: string;
    label: string;
    done: boolean;
}

export const categories: Category[] = [
    { name: 'All', icon: '🍽️' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burger', icon: '🍔' },
    { name: 'Sushi', icon: '🍣' },
    { name: 'Chinese', icon: '🥡' },
    { name: 'Indian', icon: '🍛' },
    { name: 'Dessert', icon: '🍰' },
];

export const restaurants: Restaurant[] = [
    { 
        id: 1, 
        name: 'Pizza Palace', 
        cuisine: 'Italian', 
        rating: 4.8, 
        time: '20-30 min', 
        deliveryFee: 'Free', 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
        featured: true
    },
    { 
        id: 2, 
        name: 'Burger Barn', 
        cuisine: 'American', 
        rating: 4.5, 
        time: '15-25 min', 
        deliveryFee: '$2.99', 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
        featured: true
    },
    { 
        id: 3, 
        name: 'Sakura Sushi', 
        cuisine: 'Japanese', 
        rating: 4.9, 
        time: '25-35 min', 
        deliveryFee: '$3.99', 
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
        featured: false
    },
    { 
        id: 4, 
        name: 'Dragon Garden', 
        cuisine: 'Chinese', 
        rating: 4.6, 
        time: '20-30 min', 
        deliveryFee: '$1.99', 
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80',
        featured: false
    },
];

export const menuItems: MenuItem[] = [
    { id: 1, name: 'Margherita Pizza', price: 14.99, description: 'Fresh tomatoes, mozzarella, basil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80', rating: 4.8, time: '20 min', category: 'Pizza' },
    { id: 2, name: 'Pepperoni Pizza', price: 16.99, description: 'Classic pepperoni, cheese blend', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80', rating: 4.7, time: '20 min', category: 'Pizza' },
    { id: 3, name: 'BBQ Chicken', price: 17.99, description: 'BBQ sauce, grilled chicken, onions', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80', rating: 4.6, time: '25 min', category: 'Pizza' },
    { id: 4, name: 'Caesar Salad', price: 9.99, description: 'Romaine, parmesan, croutons', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300&q=80', rating: 4.4, time: '10 min', category: 'Salad' },
    { id: 5, name: 'Garlic Bread', price: 5.99, description: 'Crispy garlic butter bread', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?auto=format&fit=crop&w=300&q=80', rating: 4.5, time: '10 min', category: 'Sides' },
    { id: 6, name: 'Tiramisu', price: 7.99, description: 'Classic Italian dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80', rating: 4.9, time: '5 min', category: 'Dessert' },
];

export const orderSteps: OrderStep[] = [
    { icon: '✓', label: 'Confirmed', done: true },
    { icon: '👨‍🍳', label: 'Preparing', done: true },
    { icon: '🚗', label: 'On the way', done: false },
    { icon: '🏠', label: 'Delivered', done: false },
];

export const pastOrders: Order[] = [
    { name: 'Burger Barn', items: '2x Cheeseburger, 1x Fries', total: '$24.99', date: 'Yesterday' },
    { name: 'Sakura Sushi', items: '1x Dragon Roll, 1x Miso Soup', total: '$32.50', date: '2 days ago' },
];

export const menuCategories = ['Popular', 'Pizza', 'Salad', 'Sides', 'Dessert', 'Drinks'];

export const calculateCartTotal = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, ci) => total + ci.item.price * ci.quantity, 0);
};

export const calculateCartCount = (cartItems: CartItem[]): number => {
    return cartItems.reduce((count, ci) => count + ci.quantity, 0);
};

export const calculateTax = (subtotal: number): number => subtotal * 0.08;
export const calculateTotal = (subtotal: number): number => subtotal * 1.08;

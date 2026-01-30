import { CartItem } from "../store/slice/cartSlice";

const CART_KEY = "pharmatrust_cart";

export const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === "undefined") return [];

    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to load cart:", error);
        return [];
    }
};

export const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Failed to save cart:", error);
    }
};
import { useCartStore } from "@/components/stores/cart-store";
import { toast } from "sonner";

export const useCart = () => {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const addItem = (item: CartItem) => {
        useCartStore.setState((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                toast.success(`${item.name} quantity increased`);
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            toast.success(`${item.name} added to cart`);
            return { items: [...state.items, { ...item, quantity: 1 }] };
        });
    };

    const removeItem = (id: string) => {
        const item = items.find((i) => i.id === id);
        if (item) {
            toast.error(`${item.name} removed from cart`);
        }
        useCartStore.setState({
            items: items.filter((item) => item.id !== id),
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }

        const item = items.find((i) => i.id === id);
        if (item && quantity !== item.quantity) {
            toast.info(`${item.name} quantity updated to ${quantity}`);
        }

        useCartStore.setState({
            items: items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        });
    };

    const clearCart = () => {
        if (items.length > 0) {
            toast.warning("Cart cleared");
        }
        useCartStore.setState({ items: [] });
    };

    return {
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    };
};

// Add this type if not already defined in your types
type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};
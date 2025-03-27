'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem, CartContextType } from '@/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const ensureArray = (items: unknown): CartItem[] => {
  if (!Array.isArray(items)) return [];
  return items.filter((item): item is CartItem => 
    typeof item === 'object' && 
    item !== null && 
    'id' in item && 
    'quantity' in item
  );
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(ensureArray(parsedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setItems([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      // Ensure prevItems is an array
      const currentItems = ensureArray(prevItems);
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const currentItems = ensureArray(prevItems);
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => {
      const currentItems = ensureArray(prevItems);
      if (quantity <= 0) {
        return currentItems.filter((item) => item.id !== id);
      }
      return currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
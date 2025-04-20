export interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  storeId: string;
  storeName: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} 
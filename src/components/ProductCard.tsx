'use client';

import Image from 'next/image';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  storeId: string;
  storeName: string;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
  storeId,
  storeName,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const { addItem, items, updateItemQuantity, removeItem } = useCart();

  const cartItem = items.find(item => item.id === id);

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      description,
      price,
      image,
      storeId,
      storeName,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {!imageError ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span>Image not available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="mt-2">
          <span className="text-sm font-medium text-blue-600">{storeName}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateItemQuantity(id, cartItem.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-700" />
              </button>
              <span className="text-sm text-gray-900 min-w-[20px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateItemQuantity(id, cartItem.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 
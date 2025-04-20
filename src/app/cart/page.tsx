'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items: cartItems, updateItemQuantity, removeItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const groupedItems = cartItems.reduce((groups, item) => {
    const group = groups[item.storeId] || [];
    group.push(item);
    groups[item.storeId] = group;
    return groups;
  }, {} as Record<string, typeof cartItems[0][]>);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(productId);
    } else {
      updateItemQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // In production, this would create a Stripe payment intent
      console.log('Processing checkout...', {
        items: cartItems,
        total: totalAmount,
      });
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {Object.entries(groupedItems).map(([storeId, items]) => (
                <div
                  key={storeId}
                  className="bg-white rounded-lg shadow-md p-6 mb-6"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {items[0].storeName}
                  </h2>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-4 border-b last:border-0"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">${item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <span className="mx-2 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
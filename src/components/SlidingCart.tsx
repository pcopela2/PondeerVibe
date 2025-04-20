'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAnimation } from '@/contexts/AnimationContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlidingCart() {
  const { items, updateItemQuantity, removeItem } = useCart();
  const { isCartOpen, setIsCartOpen } = useAnimation();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (isCartOpen) {
      // Add no-scroll class to body when cart is open
      document.body.style.overflow = 'hidden';
    } else {
      // Remove no-scroll class when cart is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleClose = () => {
    setIsCartOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black"
        onClick={handleClose}
      />

      {/* Sliding panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <ShoppingBag className="h-5 w-5 text-gray-900" />
              Cart ({totalQuantity})
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-700">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white rounded-lg p-2 shadow-sm"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-700">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-700" />
                        </button>
                        <span className="text-sm text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 text-sm ml-auto hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 
'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { AnimationProvider } from '@/contexts/AnimationContext';
import SlidingCart from '@/components/SlidingCart';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/contexts/AnimationContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AnimationProvider>
      <CartProvider>
        <MainContent>{children}</MainContent>
      </CartProvider>
    </AnimationProvider>
  );
}

function MainContent({ children }: { children: ReactNode }) {
  const { isCartOpen } = useAnimation();

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="relative z-0 w-full"
        animate={{
          width: isCartOpen ? 'calc(100% - 200px)' : '100%',
          x: isCartOpen ? -100 : 0,
          borderRadius: isCartOpen ? '1rem' : '0',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformOrigin: 'left',
          boxShadow: isCartOpen ? '0 4px 60px -15px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isCartOpen && <SlidingCart />}
      </AnimatePresence>
    </div>
  );
} 
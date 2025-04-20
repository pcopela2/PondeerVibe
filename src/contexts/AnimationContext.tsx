'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isItemAnimating: boolean;
  setItemAnimating: (isAnimating: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isItemAnimating, setItemAnimating] = useState(false);

  return (
    <AnimationContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        isItemAnimating,
        setItemAnimating,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
} 
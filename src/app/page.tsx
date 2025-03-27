'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { ShopifyProduct } from '@/lib/shopify/products';

interface ProductWithStore extends ShopifyProduct {
  storeId: string;
  storeName: string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductWithStore[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => [...prev, productId]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar cartItemCount={cartItems.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
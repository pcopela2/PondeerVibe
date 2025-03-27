import { NextResponse } from 'next/server';
import { MOCK_STORES } from '@/lib/shopify/client';
import { MOCK_PRODUCTS } from '@/lib/shopify/products';

export async function GET() {
  try {
    // In production, we would fetch real products from each store
    // const allProducts = await Promise.all(
    //   MOCK_STORES.map(async (store) => {
    //     const products = await fetchStoreProducts(
    //       store.shopifyDomain,
    //       process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
    //     );
    //     return products.map(product => ({
    //       ...product,
    //       storeId: store.id,
    //       storeName: store.name
    //     }));
    //   })
    // );

    // For development, return mock products with store information
    const mockProductsWithStores = MOCK_PRODUCTS.map((product, index) => ({
      ...product,
      storeId: MOCK_STORES[index % MOCK_STORES.length].id,
      storeName: MOCK_STORES[index % MOCK_STORES.length].name,
    }));

    return NextResponse.json({
      products: mockProductsWithStores,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
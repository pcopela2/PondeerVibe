import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/shopify/products';

export async function GET() {
  try {
    // In a real application, you would fetch products from your database or Shopify API
    const products = mockProducts.map(product => ({
      ...product,
      storeId: 'store-1', // Mock store ID
      storeName: 'Sample Store' // Mock store name
    }));

    return NextResponse.json({
      products,
      status: 200
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      error: 'Failed to fetch products',
      status: 500
    });
  }
}
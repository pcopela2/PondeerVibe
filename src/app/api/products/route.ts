import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Add a POST handler to allow adding new products
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, image } = body;
    const { data, error } = await supabase
      .from('products')
      .insert([{ title, description, price, image }])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ product: data?.[0] });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
} 
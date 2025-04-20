import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductWithStore {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image: string;
  storeId: string;
  store: {
    id: string;
    name: string;
  };
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isVisible: true,
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const formattedProducts = products.map((product: ProductWithStore) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      storeId: product.storeId,
      storeName: product.store.name,
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test store
  const store = await prisma.store.create({
    data: {
      name: 'Test Store',
      shopifyDomain: 'test-store.myshopify.com',
      stripeAccountId: 'acct_test123',
      location: 'New York, NY',
    },
  });

  // Create test products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Classic T-Shirt',
        description: 'A comfortable and stylish t-shirt for everyday wear',
        price: 29.99,
        image: 'https://picsum.photos/400/300',
        storeId: store.id,
        isVisible: true,
      },
    }),
    prisma.product.create({
      data: {
        title: 'Denim Jeans',
        description: 'High-quality denim jeans with perfect fit',
        price: 79.99,
        image: 'https://picsum.photos/400/300',
        storeId: store.id,
        isVisible: true,
      },
    }),
    prisma.product.create({
      data: {
        title: 'Leather Wallet',
        description: 'Handcrafted leather wallet with multiple compartments',
        price: 49.99,
        image: 'https://picsum.photos/400/300',
        storeId: store.id,
        isVisible: true,
      },
    }),
  ]);

  // Create test user
  const hashedPassword = await hash('password123', 12);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'STORE_OWNER',
      stores: {
        create: {
          store: {
            connect: {
              id: store.id,
            },
          },
          role: 'STORE_OWNER',
        },
      },
    },
  });

  console.log('Seed data created:', {
    store: store.id,
    products: products.map(p => p.id),
    user: user.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthToken, verifyToken, sanitizeUser } from '@/lib/auth/utils';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const token = getAuthToken();

    if (!token) {
      return NextResponse.json({ user: null });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user with store associations
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        stores: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null });
  }
} 
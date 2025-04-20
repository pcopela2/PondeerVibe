import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  verifyPassword,
  createToken,
  setAuthCookie,
  sanitizeUser,
} from '@/lib/auth/utils';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        stores: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create and set auth token
    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    setAuthCookie(token);

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to log in' },
      { status: 500 }
    );
  }
} 
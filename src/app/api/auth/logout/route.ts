import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth/utils';

export async function POST() {
  try {
    removeAuthCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to log out' },
      { status: 500 }
    );
  }
} 
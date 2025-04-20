import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role, User } from '@/types/auth';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function createToken(user: {
  id: string;
  email: string;
  role: Role;
}): string {
  return sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): {
  id: string;
  email: string;
  role: Role;
} {
  try {
    return verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: Role;
    };
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function setAuthCookie(token: string): void {
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export function removeAuthCookie(): void {
  cookies().delete('auth-token');
}

export function getAuthToken(): string | undefined {
  return cookies().get('auth-token')?.value;
}

export async function validateEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function sanitizeUser(user: any): User {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
} 
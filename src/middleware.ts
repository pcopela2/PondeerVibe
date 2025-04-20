import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthToken, verifyToken } from '@/lib/auth/utils';
import { Role } from '@/types/auth';

// Add paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/store-management',
];

// Add paths that require specific roles
const roleProtectedPaths: Record<string, Role[]> = {
  '/store-management': [Role.STORE_OWNER, Role.STORE_ASSOCIATE, Role.ADMIN],
  '/admin': [Role.ADMIN],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip authentication for public routes
  if (!protectedPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  try {
    const token = getAuthToken();

    if (!token) {
      return redirectToLogin(request);
    }

    const decoded = verifyToken(token);

    // Check role-based access
    for (const [protectedPath, roles] of Object.entries(roleProtectedPaths)) {
      if (path.startsWith(protectedPath) && !roles.includes(decoded.role)) {
        return new NextResponse(null, { status: 403 });
      }
    }

    return NextResponse.next();
  } catch (error) {
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication routes)
     * 2. /_next/* (Next.js internals)
     * 3. /static/* (static files)
     * 4. /*.* (files with extensions)
     */
    '/((?!api/auth|_next|static|[\\w-]+\\.\\w+).*)',
  ],
}; 
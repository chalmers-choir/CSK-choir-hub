import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { authenticate } from './lib/api-client';

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Paths that should stay reachable without authentication
  // Determine if the request is for a static asset (e.g., .js, .css, .png)
  const isStaticAsset = /\.[^/]+$/.test(pathname);
  const PUBLIC_PATHS = ['/', '/login', '/register'];
  const isPublic = PUBLIC_PATHS.includes(pathname) || isStaticAsset;

  if (isPublic) return NextResponse.next();

  const token = req.cookies.get('token')?.value;

  // No token: send to login with return URL
  if (!token) {
    const loginUrl = new URL('/login', req.url);

    loginUrl.searchParams.set('next', pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  const isAdminSection = pathname.startsWith('/admin');

  // Admin-only guard: verify user groups via authenticate endpoint
  if (isAdminSection) {
    try {
      const res = await authenticate();

      const groups: { name: string }[] = res.data?.user?.groups ?? [];
      const isAdmin = groups.some((g) => g.name === 'Admins');

      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch {
      const loginUrl = new URL('/login', req.url);

      loginUrl.searchParams.set('next', pathname + search);

      return NextResponse.redirect(loginUrl);
    }
  }

  // Authenticated (and admin if needed)
  return NextResponse.next();
}

// Run on everything except static assets and images
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

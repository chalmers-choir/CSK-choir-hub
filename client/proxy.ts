import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isAdminSection = pathname.startsWith('/admin');
  const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:5050/api';

  // Paths that should stay reachable without authentication
  const PUBLIC_PATHS = ['/', '/login', '/register', '/favicon.ico'];
  const isPublic = PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/_next');

  // Skip protection for public routes and API routes
  if (isPublic || pathname.startsWith('/api')) return NextResponse.next();

  const token = req.cookies.get('token')?.value;

  // No token: send to login with return URL
  if (!token) {
    const loginUrl = new URL('/login', req.url);

    loginUrl.searchParams.set('next', pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  // Admin-only guard: verify user groups via authenticate endpoint
  if (isAdminSection) {
    try {
      const authUrl = `${API_BASE_URL.replace(/\/$/, '')}/auth/authenticate`;
      const res = await fetch(authUrl, {
        headers: { cookie: req.headers.get('cookie') ?? '' },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Unauthenticated');

      const data = await res.json();
      const groups: { name: string }[] = data?.user?.groups ?? [];
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

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Redirect to /home if accessing root
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If accessing /dashboard but no token, redirect to login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If accessing /auth/login but already have token, redirect to dashboard
  if (pathname.startsWith('/auth/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
  
}
export const config = {
    matcher: [
      '/',
      '/dashboard/:path*',
      '/auth/login',
    ],
  };
  

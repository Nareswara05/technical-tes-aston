import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

    // route akan mengarah otomatis ke halaman login jika user pertama kali mengakses aplikasi
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // jika mengakses dashboard tetapi user belum login, maka akan ter redirect ke halaman login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // jika user sudah login dan mengakses halaman login, maka akan ter redirect ke halaman dashboard
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
  

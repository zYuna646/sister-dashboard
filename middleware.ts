import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = ['/auth/login', '/auth/register', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // If no token, redirect to login
  if (!token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  try {
    // Validate token with API
    const validateResponse = await fetch(`${process.env.API_URL || 'http://api.example.com'}/auth/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    // If validation successful, continue
    if (validateResponse.ok) {
      return NextResponse.next();
    }
    
    // If validation failed, redirect to login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Token validation failed:', error);
    
    // On error, redirect to login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
}

// Configure middleware to only run on specific paths
export const config = {
  matcher: [
    // Apply middleware to all routes except for public paths and api routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}; 
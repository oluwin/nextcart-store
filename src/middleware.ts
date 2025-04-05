import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/products",
  "/category",
  "/checkout",
  "/cart",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Read the cookie directly to check for authentication
  const dummyAuthCookie = req.cookies.get("dummyAuth");
  const isLoggedIn = !!dummyAuthCookie;

  console.log("loggedIn = " + isLoggedIn);

  // If accessing a protected route and the user is not authenticated, redirect to login
  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL(
      `/login?redirect=${encodeURIComponent(pathname)}`,
      req.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Prevent caching of protected pages (this helps with back button issue)
  if (isProtected) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/products/:path*',
    '/category/:path*',
    '/checkout/:path*',
    '/cart/:path*',
  ]
};

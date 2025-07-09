import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow public access to the sign-in page
  if (pathname.startsWith("/sign-in")) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to sign-in for all other routes
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If authenticated, allow access to all routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*", "/search/:path*", "/message/:path*", "/product/:path*", "/checkout/:path*" ], // Remove "/sign-in" from matcher
};
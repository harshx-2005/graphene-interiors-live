import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("graphene_session")?.value;
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect authenticated user away from login page
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (request.method !== "GET") {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

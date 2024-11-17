// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const sessionToken = req.cookies.get("next-auth.session-token");
  const { pathname } = req.nextUrl;

  // Check if the session token exists and the user is trying to access /join/login or /join/signup
  if (sessionToken && (pathname === "/join/login" || pathname === "/join/signup")) {
    // Redirect to the home page or any other page you want
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed as usual if the above conditions are not met
  return NextResponse.next();
}

export const config = {
  matcher: ["/join/login", "/join/signup"], // Apply the middleware only to these routes
};

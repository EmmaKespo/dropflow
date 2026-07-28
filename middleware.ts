// middleware.ts
/**
 * COMPREHENSIVE EDGE SECURITY GATEWAY INTERCEPTOR
 * Evaluates session cookies instantly on incoming traffic requests. Blocks guest
 * access into protected admin routes while keeping marketing paths entirely open.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the URL target path routing variable
  const { pathname } = request.nextUrl;

  // 1. Establish strict structural identification for admin subroutes
  const isAdminRoute = pathname.startsWith("/admin") || pathname === "/dashboard";
  
  // 2. Establish strict identification for authentication pages
  const isAuthRoute = pathname.startsWith("/login") || 
                      pathname.startsWith("/signup") || 
                      pathname.startsWith("/forgot-password") || 
                      pathname.startsWith("/reset-password");

  // Simulate parsing the active Supabase token session cookie parameter
  // (During your backend phase, replace this string with your exact supabase cookie key)
  const hasActiveSession = request.cookies.has("sb-access-token");

  // CRITERIA PATHWAY A: Unauthenticated guest attempts entry into secure platform dashboards
  if (isAdminRoute && !hasActiveSession) {
    // Intercept operation instantly and bounce tracking path back to the login terminal
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // CRITERIA PATHWAY B: Already authenticated business operator wanders back onto login pages
  if (isAuthRoute && hasActiveSession) {
    // Prevent screen confusion and bounce profile straight into the cockpit monitor
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // CRITERIA PATHWAY C: All validations pass smoothly (Marketing, Riders, or confirmed owners)
  return NextResponse.next();
}

/**
 * Configure the specific route match execution criteria lists
 * Tells Next.js to only run this code on admin, dashboard, and login subdirectories
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password"
  ],
};

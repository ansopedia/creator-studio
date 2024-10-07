import { NextRequest, NextResponse } from "next/server";

import { isLoggedIn } from "./lib/server";

export const middleware = async (request: NextRequest) => {
  const hasTokens = isLoggedIn(request);

  const path = new URL(request.url).pathname;

  const protectedRoutes = ["/dashboard", "/profile", "/logout", "/settings"];
  const authRoutes = ["/login", "/sign-up"];

  // Use some() to check if any protected route starts with the current path
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  if (isProtectedRoute && !hasTokens) {
    // Redirect to login if protected and no tokens
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (isAuthRoute && hasTokens) {
    // Redirect to dashboard if auth route and has tokens
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

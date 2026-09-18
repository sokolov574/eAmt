import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./routing";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request) {
  const path = request.nextUrl.pathname;

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/")
  ) {
    return;
  }

  // Three steps to compose with other middlewares
  // Step 1: Use the incoming request
  const defaultLocale = "de";

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware(routing);

  const response = handleI18nRouting(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  const isAuthPage =
    path === "/login" || path === "/signup" || path === "/verifyAccount";

  const isPublicPath = path === "/dashboard";

  const token = request.cookies.get("token")?.value || "";

  if (!isAuthPage) {
    if (path === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    if (path === "/en") {
      return NextResponse.redirect(new URL("/en/dashboard", request.nextUrl));
    }
  }

  if ((isPublicPath || isAuthPage) && token) {
    return NextResponse.redirect(
      new URL("/dashboard/profile", request.nextUrl)
    );
  }

  if (
    (path.startsWith("/dashboard/profile") ||
      path.startsWith("/en/dashboard/profile")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

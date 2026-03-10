import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const AUTH_PAGES = ["/login", "/signup"] as const;
const CLASS_PAGE_PREFIX = "/class";
const HOME_PATH = "/";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccessToken = Boolean(
    request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value
  );

  const isAuthPage = AUTH_PAGES.includes(
    pathname as (typeof AUTH_PAGES)[number]
  );
  const isClassPage = pathname.startsWith(CLASS_PAGE_PREFIX);

  if ((hasAccessToken && isAuthPage) || (!hasAccessToken && isClassPage)) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/class/:path*"],
};

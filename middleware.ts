import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function pickLocaleFromAcceptLanguage(header: string | null) {
  if (!header) return "ru";
  const value = header.toLowerCase();
  if (value.includes("ru")) return "ru";
  if (value.includes("en")) return "en";
  return "ru";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const locale = pickLocaleFromAcceptLanguage(
    request.headers.get("accept-language"),
  );

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/"],
};


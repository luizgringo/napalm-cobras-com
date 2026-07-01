/**
 * Locale-detection proxy (Next.js middleware) for the Napalm Cobras website.
 *
 * @remarks
 * Ensures every request is served under a locale prefix: requests that already
 * include a supported locale pass through, otherwise the locale is resolved
 * (cookie, then `Accept-Language`, then default) and the request is redirected.
 */
import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/** Name of the cookie storing the visitor's preferred locale. */
const LOCALE_COOKIE = "napalm-lang";

/**
 * Resolves the best locale for a request.
 *
 * @param request - Incoming request used to read the locale cookie and headers.
 * @returns The resolved locale code, falling back to the default locale.
 * @remarks
 * Precedence: the locale cookie, then the first `Accept-Language` entry, then
 * {@link defaultLocale}.
 */
function resolveLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie;
  }

  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && (locales as readonly string[]).includes(preferred)) {
    return preferred;
  }

  return defaultLocale;
}

/**
 * Middleware entry point that enforces a locale prefix on every request.
 *
 * @param request - Incoming request to inspect and possibly redirect.
 * @returns `NextResponse.next()` when the path already has a supported locale,
 * otherwise a `NextResponse.redirect` to the locale-prefixed path.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.endsWith(".md") ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    pathname === "/docs.json" ||
    pathname === "/ai-index.json" ||
    pathname === "/schema.json"
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

/**
 * Middleware matcher config: runs the proxy on all paths except Next.js
 * internals, API routes, static assets and well-known SEO files.
 */
export const config = {
  matcher: [
    "/((?!_next|api|assets|og|favicon.ico|favicon-32.png|apple-touch-icon.png|robots.txt|sitemap.xml|llms.txt|llms-full.txt|docs.json|ai-index.json|schema.json).*)",
  ],
};

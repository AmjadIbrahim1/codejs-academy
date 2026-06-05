import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Rate Limiter (in-memory) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per window

function getRateLimit(key: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// ─── Security Headers ───
const securityHeaders = {
  "X-DNS-Prefetch-Control": "on",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  // CSP is intentionally strict for this kind of site
  "Content-Security-Policy":
    "default-src 'self'; "
    + "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com; "
    + "style-src 'self' 'unsafe-inline'; "
    + "img-src 'self' data: blob: https:; "
    + "font-src 'self' data:; "
    + "connect-src 'self' https://*.vercel-insights.com; "
    + "frame-ancestors 'none'; "
    + "form-action 'self'; "
    + "base-uri 'self'; "
    + "object-src 'none'",
};

// ─── Restricted paths ───
const ADMIN_PATHS = ["/admin"];
const AUTH_PATHS = ["/api/auth", "/api/trpc/auth"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Rate limiting for auth paths ───
  if (
    pathname.startsWith("/api/auth/callback/credentials")
  ) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const rateKey = `auth:${ip}`;
    const { allowed, remaining } = getRateLimit(rateKey);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: "طلبات كتيرة. حاول تاني بعد دقيقة." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    return response;
  }

  // ─── Handle response for security headers ───
  const requestHeaders = new Headers(request.headers);

  // Prevent clickjacking on admin pages
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    requestHeaders.set("X-Frame-Options", "DENY");
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // ─── Apply security headers to all responses ───
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // ─── Cache control for sensitive pages ───
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

// ─── Match only specific paths (not static files, not _next) ───
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public/uploads (user-uploaded files)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|uploads).*)",
  ],
};

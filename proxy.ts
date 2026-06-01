import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Resets on cold start. Swap the map for Upstash Redis in production at scale.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS    = 60_000; // 1 minute
const MAX_REQUESTS = 60;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export default clerkMiddleware(async (_auth, req) => {
  const { pathname } = req.nextUrl;

  // Rate limit API routes
  if (pathname.startsWith("/api/")) {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        {
          status: 429,
          headers: {
            "Retry-After":       "60",
            "X-RateLimit-Limit": String(MAX_REQUESTS),
            "X-Robots-Tag":      "noindex, nofollow",
            "Content-Type":      "application/json",
          },
        },
      );
    }
  }

  const res = NextResponse.next();
  // Strip server-fingerprinting headers
  res.headers.delete("x-powered-by");
  res.headers.delete("server");
  return res;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

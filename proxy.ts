import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that bypass onboarding check entirely
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isAuthRoute       = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isApiRoute        = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Always allow auth pages and API routes through
  if (isAuthRoute(req) || isApiRoute(req)) return NextResponse.next();

  const { userId, sessionClaims } = await auth();

  // Signed in but onboarding not complete → send to /onboarding
  if (userId && !isOnboardingRoute(req)) {
    const meta = (sessionClaims?.metadata ?? {}) as Record<string, unknown>;
    if (!meta.onboardingComplete) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // Everything else (including unauthenticated home page visits) passes through
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

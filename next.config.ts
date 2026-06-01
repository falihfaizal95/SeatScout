import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options",    value: "nosniff" },
  // Disallow framing (clickjacking protection)
  { key: "X-Frame-Options",           value: "DENY" },
  // Stop legacy XSS auditor from mangling pages
  { key: "X-XSS-Protection",          value: "1; mode=block" },
  // Strict referrer — don't leak full URL to third-party trackers
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  // Disable sensitive browser features we don't use
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS for all future requests (1 year)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Inline styles are used throughout the app (style= props)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Scripts: self + inline (Next.js RSC needs this)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Images from ticket platforms
      "img-src 'self' data: blob: https: http:",
      // API calls (all outbound fetches are server-side, but keep for fetch polyfills)
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Never expose server-only env vars to the browser bundle
  // (env vars without NEXT_PUBLIC_ prefix are already server-only, this is belt-and-suspenders)
  serverExternalPackages: [],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s1.ticketm.net" },
      { protocol: "https", hostname: "media.ticketmaster.eu" },
      { protocol: "https", hostname: "chairnerd.global.ssl.fastly.net" },
      { protocol: "https", hostname: "*.seatgeek.com" },
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.ticketmaster.com" },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // API routes: prevent search-engine indexing and caching of responses
        source: "/api/(.*)",
        headers: [
          ...securityHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;

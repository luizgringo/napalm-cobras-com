import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const polyfillStub = path.join(rootDir, "src/lib/modern-polyfill-stub.js");

/**
 * Content Security Policy (Report-Only).
 *
 * Allowlists the third-party origins the site actually loads: the Bandsintown
 * widget script, Spotify/YouTube/Bandcamp embed frames, remote images and the
 * Vercel Analytics/Speed Insights endpoints. Kept in Report-Only mode because a
 * strict `script-src` would require per-request nonces for Next.js inline
 * hydration scripts; switch to `Content-Security-Policy` once nonces are wired.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://widgetv3.bandsintown.com https://rest.bandsintown.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com https://i.scdn.co https://image-cdn-fa.spotifycdn.com https://f4.bcbits.com https://behold.pictures https://cdn2.behold.pictures https://*.cdninstagram.com",
  "font-src 'self' data:",
  "connect-src 'self' https://rest.bandsintown.com https://widgetv3.bandsintown.com https://*.bandsintown.com https://behold.pictures https://cdn2.behold.pictures",
  "frame-src https://open.spotify.com https://www.youtube.com https://www.youtube-nocookie.com https://bandcamp.com https://*.bandcamp.com https://widgetv3.bandsintown.com https://widget.bandsintown.com https://www.bandsintown.com",
  "media-src 'self' https:",
].join("; ");

/** HTTP security headers applied to every route. */
const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const polyfillAliases = {
  "@next/polyfill-module": polyfillStub,
  "next/dist/build/polyfills/polyfill-module": polyfillStub,
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  turbopack: {
    resolveAlias: polyfillAliases,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" },
      { protocol: "https", hostname: "f4.bcbits.com" },
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "cdn2.behold.pictures" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...polyfillAliases,
      };
    }
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" },
      { protocol: "https", hostname: "f4.bcbits.com" },
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "cdn2.behold.pictures" },
    ],
  },
};

export default nextConfig;

import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  compress: true,

  reactStrictMode: true,
  poweredByHeader: false,

  // ─── Security headers are now handled by middleware.ts ───

  experimental: {
    optimizePackageImports: [
      "@trpc/react-query",
      "@trpc/client",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1920],
    // Only allow images from trusted sources
    remotePatterns: [],
  },

  // 🔥 أهم سطر في الحل
  output: "standalone",


};

export default config;
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  compress: true,

  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: [
      "@trpc/react-query",
      "@trpc/client",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1920],
  },

  // 🔥 أهم سطر في الحل
  output: "standalone",
};

export default config;
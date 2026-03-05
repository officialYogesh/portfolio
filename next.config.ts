import { NextConfig } from "next";

const config: NextConfig = {
  // Image optimization configuration
  images: {
    // Enable modern image formats
    formats: ["image/webp", "image/avif"],

    // Configure remote image patterns if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],

    // Configure image sizes for responsive loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Enable lazy loading by default
    loader: "default",
  },

  // External packages configuration
  serverExternalPackages: [],

  // Enable experimental features for better performance
  experimental: {
    // Remove deprecated serverComponentsExternalPackages
  },

  // Compression and optimization
  compress: true,

  // PWA and performance optimizations
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enable HSTS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // XSS Protection
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Bundle analyzer in development
  ...(process.env.ANALYZE === "true" && {
    webpack: (config: { plugins: any[] }) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          openAnalyzer: true,
        })
      );
      return config;
    },
  }),
};

export default config;

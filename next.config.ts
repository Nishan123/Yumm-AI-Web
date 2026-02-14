import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/public/**',
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

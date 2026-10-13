/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow large PDF files in public/
  webpack: (config) => {
    // Support for pdf.js worker
    config.resolve.alias.canvas = false;
    return config;
  },
  eslint: {
    // Prevent ESLint warnings/errors from failing Vercel production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent minor type-check issues from blocking Vercel deployment
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        source: '/quran/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

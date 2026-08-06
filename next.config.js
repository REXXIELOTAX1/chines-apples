/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dojkxicyqkfenpiccewc.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
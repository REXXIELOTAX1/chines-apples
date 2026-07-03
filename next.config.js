/** @type {import('next').NextConfig} */
const nextConfig = {
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
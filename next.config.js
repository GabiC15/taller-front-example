/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'funko.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig

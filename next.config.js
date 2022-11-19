/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  },
  swcMinify: true,
  output: 'standalone'
}

module.exports = nextConfig

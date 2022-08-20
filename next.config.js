/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    beBaseUrl: process.env.BE_BASE_URL,
 }
}

module.exports = nextConfig

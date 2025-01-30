/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"], // Allow external images from FakeStoreAPI
  },
}

module.exports = nextConfig

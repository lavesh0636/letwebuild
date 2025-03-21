/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  // Increase timeout for loading chunks
  webpack: (config) => {
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    };
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
}

module.exports = nextConfig 
const { withBlitz } = require("@blitzjs/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  webpack: (config) => {
    config.cache = false
    return config
  },
}

module.exports = withBlitz(nextConfig)

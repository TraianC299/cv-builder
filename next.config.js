/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const rewrites = require("./rewrites.config.json");

const nextConfig = {
  i18n,
  // reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  async rewrites() {
    return [...rewrites]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://cv-builder-back.onrender.com" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS, PATCH, DELETE, POST, PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Access-Control-Allow-Origin" },
        ]
      },

    ]
  }
}

module.exports = nextConfig

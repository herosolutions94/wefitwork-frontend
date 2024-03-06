/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        // hostname: 'api.shapperly.com',
        // pathname: '/**',
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/shapperly/**',
      }
      
    ]
  },
  reactStrictMode: true,
  webpack: (config, {
    buildId,
    dev,
    isServer,
    defaultLoaders,
    webpack
  }) => {
      config.plugins.push(
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              "window.jQuery": "jquery"
          })
      );
      return config;
  }
}

module.exports = nextConfig


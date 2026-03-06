const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname), // sets root to the client app dir
  },
};

module.exports = nextConfig;

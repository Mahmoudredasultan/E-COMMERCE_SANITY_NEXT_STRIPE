/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
export default nextConfig;

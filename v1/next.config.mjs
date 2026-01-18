/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:3001", "*.app.github.dev"],
    },
  },
};

export default nextConfig;

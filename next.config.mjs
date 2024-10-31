/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
  },
  serverRuntimeConfig: {
    port: 9124,
  },
  reactStrictMode:false,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // When Marckiemoo adds real product/branding images, drop them in /public/images.
    // Remote hosts (e.g. a CDN) can be whitelisted here later.
    remotePatterns: [],
  },
};

export default nextConfig;

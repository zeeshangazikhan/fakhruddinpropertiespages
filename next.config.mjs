/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export output when possible
  // Note: App Router and server-only features may still prevent a full static export.
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

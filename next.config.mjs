/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: this project uses server-side API routes and runtime features
  // (emails, Strapi calls). Static HTML export (`output: 'export'`) is
  // incompatible with such server routes. Remove or comment out if you
  // need dynamic API endpoints to work during build/deploy.
  // output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

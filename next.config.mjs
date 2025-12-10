/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_USE_MOCK_TRANSLATIONS: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  turbopack: {},
}

export default nextConfig

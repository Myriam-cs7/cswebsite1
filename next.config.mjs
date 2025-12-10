/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  env: {
    NEXT_PUBLIC_USE_MOCK_TRANSLATIONS: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false };
    return config;
  },
}

export default nextConfig

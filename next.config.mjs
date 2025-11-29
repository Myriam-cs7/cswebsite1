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
    // Définir la variable d'environnement pour utiliser les mocks en développement
    NEXT_PUBLIC_USE_MOCK_TRANSLATIONS: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  // Ajouter cette configuration pour s'assurer que les API routes fonctionnent correctement
  experimental: {
    appDir: true,
  },
  // Ajouter cette configuration pour résoudre les problèmes de fetch dans les API routes
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false };
    return config;
  },
}

export default nextConfig

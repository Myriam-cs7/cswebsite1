import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "./responsive.css" // Import des styles responsive

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A1A1A",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://caire-solutions.com"),
  title: {
    default: "cAIre Solutions | Your new unfair advantage in beauty & wellness",
    template: "%s | cAIre Solutions",
  },
  description: "Sell, convert & support on chat with an AI powered Omnichannel conversation suite",
  keywords: [
    "AI skincare",
    "luxury skincare consultations",
    "French elegance",
    "cAIre Solutions",
    "beauty tech",
    "skincare AI",
    "customer experience",
    "personalized skincare",
  ],
  authors: [{ name: "cAIre Solutions", url: "https://caire-solutions.com" }],
  creator: "cAIre Solutions",
  publisher: "cAIre Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://caire-solutions.com",
    siteName: "cAIre Solutions",
    title: "cAIre Solutions | Your new unfair advantage in beauty & wellness",
    description: "Your smartest way to grow bookings, loyalty, and product sales - without extra staff ,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "cAIre Solutions - Your new unfair advantage in beauty & wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "cAIre Solutions | Your new unfair advantage in beauty & wellness",
    description: "Sell, convert & support on chat with an AI powered Omnichannel conversation suite",
    images: ["/images/og-image.jpg"],
    creator: "@caire_solutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://caire-solutions.com",
    languages: {
      en: "https://caire-solutions.com",
      fr: "https://caire-solutions.com/fr",
    },
  },
  verification: {
    google: "google-site-verification-code", // Remplacer par votre code de vérification
  },
    generator: 'v0.app'
}

import ClientLayout from "./ClientLayout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
        <script src="https://app.youform.io/api/v1/embed.js" async></script>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

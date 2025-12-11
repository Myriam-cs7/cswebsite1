import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script" // Import essentiel !
import "./globals.css"
import "./responsive.css"

import ClientLayout from "./ClientLayout"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A1A1A",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://caire-solutions.com"),
  title: {
    default: "cAIre Solutions | Where amazing customer experiences are built",
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
    title: "cAIre Solutions | Where amazing customer experiences are built",
    description: "Sell, convert & support on chat with an AI powered Omnichannel conversation suite",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "cAIre Solutions - Where amazing customer experiences are built",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "cAIre Solutions | Where amazing customer experiences are built",
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
    google: "google-site-verification-code",
  },
  generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
        
        {/* Scripts chargés correctement avec Next.js */}
        {/* strategy="lazyOnload" permet de ne charger le script que quand la page est prête */}
        {/* Cela évite de bloquer le chargement initial ou le scroll */}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        <Script src="https://app.youform.io/api/v1/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}

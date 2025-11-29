import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = {
  title: "cAIre Solutions Blog | Luxury Skincare Trends & AI Innovations",
  description:
    "Explore the latest trends in luxury skincare and AI innovations on the cAIre Solutions Blog. Discover how AI transforms the customer experience for luxury cosmetic brands.",
  keywords: [
    "luxury skincare blog",
    "AI in cosmetics",
    "skincare trends",
    "cAIre Solutions",
    "beauty tech",
    "AI innovations",
  ],
  openGraph: {
    title: "cAIre Solutions Blog | Luxury Skincare Trends & AI Innovations",
    description: "Explore the latest trends in luxury skincare and AI innovations on the cAIre Solutions Blog.",
    url: "https://caire-solutions.com/blog",
    siteName: "cAIre Solutions",
    images: [
      {
        url: "https://caire-solutions.com/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "cAIre Solutions Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cAIre Solutions Blog | Luxury Skincare Trends & AI Innovations",
    description: "Explore the latest trends in luxury skincare and AI innovations on the cAIre Solutions Blog.",
    images: ["https://caire-solutions.com/images/og-blog.jpg"],
    creator: "@caire_solutions",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://caire-solutions.com/blog",
    languages: {
      en: "https://caire-solutions.com/blog",
    },
  },
}

export default function Page() {
  return <BlogClientPage />
}

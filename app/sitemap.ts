import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/data/blogPosts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://caire-solutions.com"
  const blogPosts = getBlogPosts()
  const currentDate = new Date().toISOString()
  const languages = ["en", "fr", "es", "ar", "pt"]

  // Créer les entrées pour les articles de blog dans toutes les langues
  const blogPostsEntries = blogPosts.flatMap((post) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt.split("/").reverse().join("-")),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  )

  // Pages principales dans toutes les langues
  const mainPages = ["about", "features", "benefits", "pricing", "blog", "contact"]

  const mainPagesEntries = mainPages.flatMap((page) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/${page}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  )

  // Pages d'accueil pour chaque langue
  const homePageEntries = languages.map((lang) => ({
    url: lang === "en" ? baseUrl : `${baseUrl}/${lang}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 1.0,
  }))

  return [...homePageEntries, ...mainPagesEntries, ...blogPostsEntries]
}

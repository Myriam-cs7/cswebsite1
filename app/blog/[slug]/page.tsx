import { getBlogPostBySlug, getBlogPosts } from "@/data/blogPosts"
import type { Metadata } from "next"
import BlogPostClientPage from "./blog-post-client-page"

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Article Not Found | cAIre Solutions Blog",
      description: "The article you are looking for does not exist.",
    }
  }

  return {
    title: `${post.title} | cAIre Solutions Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://caire-solutions.com/blog/${post.slug}`,
      siteName: "cAIre Solutions",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      creator: "@caire_solutions",
    },
    alternates: {
      canonical: `https://caire-solutions.com/blog/${post.slug}`,
    },
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostClientPage slug={params.slug} />
}

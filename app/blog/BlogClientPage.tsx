"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getBlogPosts } from "@/data/blogPosts"
// Importer depuis notre nouveau fichier de traductions factices
import { useTranslation } from "@/utils/dummy-translations"
import { Search, Calendar, Clock, User } from "lucide-react"

export default function BlogClientPage() {
  const { t } = useTranslation()

  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      setBlogPosts(getBlogPosts())
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Header - Repris du layout principal */}
      <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md" role="banner">
        <div className="container mx-auto px-4 flex justify-end items-center">
          <nav className="flex items-center gap-4" role="navigation" aria-label="Main navigation">
            <Link href="/" className="text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4">
              Home
            </Link>
            <Link href="/blog" className="text-[#cfaa5c] transition-colors duration-300 mx-4" aria-current="page">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#cfaa5c]">cAIre Solutions Blog</h1>
            <p className="font-montserrat text-xl mb-10 text-[#F5F5F5]">
              Explore the Latest Trends and Innovations in Luxury Skincare
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-[#2A2A2A] border border-[#cfaa5c]/30 text-[#F5F5F5] focus:outline-none focus:border-[#cfaa5c] transition-colors"
                aria-label="Search articles"
              />
              <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#cfaa5c]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article List */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cfaa5c]" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] blog-card"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative h-64 w-full">
                          <Image
                            src={post.featuredImage || "/placeholder.svg?height=400&width=600"}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-70"></div>
                        </div>
                        <div className="p-6">
                          <h2 className="font-playfair text-xl font-bold mb-3 text-[#cfaa5c] line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="font-montserrat text-[#F5F5F5] mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-[#cfaa5c]" aria-hidden="true" />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-[#cfaa5c]" aria-hidden="true" />
                              <span>{post.publishedAt}</span>
                            </div>
                            {post.readTime && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-[#cfaa5c]" aria-hidden="true" />
                                <span>{post.readTime}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h2 className="text-2xl font-playfair text-[#cfaa5c] mb-4">No articles found</h2>
                  <p className="text-[#F5F5F5] text-lg">
                    We couldn't find any articles matching your search. Please try different keywords.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#2A2A2A]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-[#cfaa5c]">Stay Informed</h2>
            <p className="font-montserrat text-[#F5F5F5] mb-8">
              Subscribe to our newsletter to receive our latest articles and news about AI and luxury skincare.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-6 py-3 rounded-full bg-[#1A1A1A] border border-[#cfaa5c]/30 text-[#F5F5F5] focus:outline-none focus:border-[#cfaa5c]"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#cfaa5c] text-black font-medium rounded-full hover:bg-[#b89548] transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Simplified */}
      <footer className="py-12 bg-black text-[#F5F5F5]" role="contentinfo">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img
                src="/images/logo.png"
                alt="cAIre Solutions Logo"
                className="h-12 object-contain"
                width={48}
                height={48}
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2025 cAIre Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Structured data for blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: "cAIre Solutions Blog",
            description: "Explore the latest trends in luxury skincare and AI innovations on the cAIre Solutions Blog.",
            url: "https://caire-solutions.com/blog",
            publisher: {
              "@type": "Organization",
              name: "cAIre Solutions",
              logo: {
                "@type": "ImageObject",
                url: "https://caire-solutions.com/images/logo.png",
              },
            },
            blogPost: filteredPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              author: {
                "@type": "Person",
                name: post.author.name,
              },
              url: `https://caire-solutions.com/blog/${post.slug}`,
              image: post.featuredImage,
            })),
          }),
        }}
      />
    </div>
  )
}

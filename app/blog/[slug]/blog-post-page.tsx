"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getBlogPostBySlug, getRelatedPosts, type BlogPost } from "@/data/blogPosts"
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react"

export default function BlogPostPage({ slug }: { slug: string }) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      // Simulate API fetch with a small delay
      const timer = setTimeout(() => {
        const foundPost = getBlogPostBySlug(slug)
        if (foundPost) {
          setPost(foundPost)
          setRelatedPosts(getRelatedPosts(foundPost.id, 2))
        } else {
          // Redirect to blog page if post not found
          router.push("/blog")
        }
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [slug, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cfaa5c]"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#cfaa5c] mb-4">Article Not Found</h1>
          <p className="text-[#F5F5F5] mb-6">The article you are looking for does not exist.</p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-[#cfaa5c] text-black font-medium rounded-full hover:bg-[#b89548] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Header - Simplified */}
      <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="cAIre Solutions Logo"
                className="h-12 object-contain"
                style={{ filter: "drop-shadow(0 0 5px rgba(207, 170, 92, 0.5))" }}
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4">
              Home
            </Link>
            <Link href="/blog" className="text-[#cfaa5c] transition-colors duration-300 mx-4">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-[#2A2A2A] py-3">
        <div className="container mx-auto px-6">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-[#cfaa5c]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/blog" className="hover:text-[#cfaa5c]">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-[#cfaa5c] truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src={post.featuredImage || "/placeholder.svg?height=800&width=1200"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-90"></div>
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Link href="/blog" className="inline-flex items-center text-[#cfaa5c] mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-[#F5F5F5] max-w-4xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-[#F5F5F5]/80">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-[#cfaa5c]" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#cfaa5c]" />
              <span>{post.publishedAt}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-[#cfaa5c]" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Article */}
            <article className="lg:w-2/3">
              <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-[#cfaa5c] prose-p:text-[#F5F5F5] prose-p:font-montserrat prose-strong:text-[#F5F5F5]">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="mt-8">
                <h3 className="font-playfair text-xl font-bold mb-4 text-[#cfaa5c]">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <Link
                      key={index}
                      href={`/blog?search=${encodeURIComponent(keyword)}`}
                      className="px-4 py-2 bg-[#2A2A2A] text-[#F5F5F5] rounded-full text-sm hover:bg-[#cfaa5c] hover:text-black transition-colors"
                    >
                      {keyword}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="font-playfair text-xl font-bold mb-4 text-[#cfaa5c]">Share this Article</h3>
                <div className="flex gap-4">
                  <button
                    className="p-3 rounded-full bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#cfaa5c] hover:text-[#1A1A1A] transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    className="p-3 rounded-full bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#cfaa5c] hover:text-[#1A1A1A] transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    className="p-3 rounded-full bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#cfaa5c] hover:text-[#1A1A1A] transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    className="p-3 rounded-full bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#cfaa5c] hover:text-[#1A1A1A] transition-colors"
                    aria-label="Copy link"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="font-playfair text-xl font-bold mb-4 text-[#cfaa5c]">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#2A2A2A]">
                    <Image
                      src={post.author.avatar || "/placeholder.svg?height=100&width=100"}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold text-[#F5F5F5]">{post.author.name}</h4>
                    {post.author.title && <p className="text-gray-400">{post.author.title}</p>}
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-[#2A2A2A] rounded-lg p-6 sticky top-24">
                <h3 className="font-playfair text-xl font-bold mb-6 text-[#cfaa5c]">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="flex gap-4 group">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={relatedPost.featuredImage || "/placeholder.svg?height=80&width=80"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-playfair font-bold text-[#F5F5F5] group-hover:text-[#cfaa5c] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-400">{relatedPost.publishedAt}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h3 className="font-playfair text-xl font-bold mb-6 text-[#cfaa5c]">Newsletter</h3>
                  <p className="text-[#F5F5F5] mb-4">Receive our latest articles and news directly in your inbox.</p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] border border-[#cfaa5c]/30 text-[#F5F5F5] focus:outline-none focus:border-[#cfaa5c]"
                      aria-label="Email address"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#cfaa5c] text-black font-medium rounded-md hover:bg-[#b89548] transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-gray-400 text-xs mt-2">By subscribing, you agree to our Privacy Policy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2A2A2A]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-[#cfaa5c]">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="font-montserrat text-[#F5F5F5] mb-8">
              Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-8 py-3 bg-[#cfaa5c] text-black font-medium rounded-full hover:bg-[#b89548] transition-colors"
              >
                Request a Demo
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3 border-2 border-[#cfaa5c] text-[#cfaa5c] font-medium rounded-full hover:bg-[#cfaa5c] hover:text-black transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Simplified */}
      <footer className="py-12 bg-black text-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/images/logo.png" alt="cAIre Solutions Logo" className="h-12 object-contain" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2025 cAIre Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

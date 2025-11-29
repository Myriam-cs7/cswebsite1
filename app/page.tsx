"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { BlockRendererOptimized } from "@/components/block-renderer-optimized"
import AdminPanel from "@/components/admin/admin-panel"
import BackToTop from "@/components/back-to-top"
import { Menu, X } from "lucide-react"
import { useSiteConfig } from "@/components/site-config"
import StructuredDataEnhanced from "@/components/structured-data-enhanced"
import Image from "next/image"

export default function Home() {
  const { config } = useSiteConfig()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Fonction simplifiée de traduction qui retourne simplement le texte
  const t = (text: string) => text

  // Forcer la langue anglaise dans localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", "en")
    }
  }, [])

  // Récupérer les IDs des sections visibles
  const visibleSections = config.sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order)
    .map((section) => section.id)

  // Observer les sections pour la navigation active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -100px 0px", threshold: 0.1 },
    )

    visibleSections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      visibleSections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [visibleSections])

  // Fonction pour faire défiler en douceur vers une section
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // Trouver les sections pour la navigation
  const findSectionByTemplate = (template) => {
    return config.sections.find((section) => section.template === template && section.visible)
  }

  const aboutSection = findSectionByTemplate("about-us") || findSectionByTemplate("about")
  const featuresSection = findSectionByTemplate("features")
  const benefitsSection = findSectionByTemplate("benefits")
  const pricingSection = findSectionByTemplate("pricing")

  return (
    <>
      <main className="min-h-screen">
        {/* Header - Luxe */}
        <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md" role="banner">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4 pl-5">
              <a href="/" className="flex items-center" aria-label="cAIre Solutions Home">
                <Image
                  src="/images/Logo CS.svg"
                  alt="cAIre Solutions Logo"
                  className="h-20 w-20 object-contain rounded-full bg-black/40 p-1"
                  style={{ filter: "drop-shadow(0 0 8px rgba(207, 170, 92, 0.6))" }}
                  width={80}
                  height={80}
                  priority
                />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-3"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-[#cfaa5c]" />
              ) : (
                <Menu size={24} className="text-[#cfaa5c]" />
              )}
            </button>

            <nav className="hidden md:flex items-center gap-4" role="navigation" aria-label="Main navigation">
              {aboutSection && (
                <a
                  href={`#${aboutSection.id}`}
                  className={`text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4 ${
                    activeSection === aboutSection.id ? "text-[#cfaa5c]" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(aboutSection.id)
                  }}
                >
                  About
                </a>
              )}

              {featuresSection && (
                <a
                  href={`#${featuresSection.id}`}
                  className={`text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4 ${
                    activeSection === featuresSection.id ? "text-[#cfaa5c]" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(featuresSection.id)
                  }}
                >
                  Features
                </a>
              )}

              {benefitsSection && (
                <a
                  href={`#${benefitsSection.id}`}
                  className={`text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4 ${
                    activeSection === benefitsSection.id ? "text-[#cfaa5c]" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(benefitsSection.id)
                  }}
                >
                  Benefits
                </a>
              )}

              {pricingSection && (
                <a
                  href={`#${pricingSection.id}`}
                  className={`text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4 ${
                    activeSection === pricingSection.id ? "text-[#cfaa5c]" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(pricingSection.id)
                  }}
                >
                  Pricing
                </a>
              )}

              <Link href="/blog" className="text-white hover:text-[#cfaa5c] transition-colors duration-300 mx-4">
                Blog
              </Link>
            </nav>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden bg-[#1A1A1A] border-t border-gray-800 py-4 animate-fadeIn"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="container mx-auto px-4 flex flex-col space-y-4">
                {aboutSection && (
                  <a
                    href={`#${aboutSection.id}`}
                    className="text-white hover:text-[#cfaa5c] transition-colors duration-300 py-2 px-4 rounded-md text-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(aboutSection.id)
                    }}
                  >
                    About
                  </a>
                )}

                {featuresSection && (
                  <a
                    href={`#${featuresSection.id}`}
                    className="text-white hover:text-[#cfaa5c] transition-colors duration-300 py-2 px-4 rounded-md text-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(featuresSection.id)
                    }}
                  >
                    Features
                  </a>
                )}

                {benefitsSection && (
                  <a
                    href={`#${benefitsSection.id}`}
                    className="text-white hover:text-[#cfaa5c] transition-colors duration-300 py-2 px-4 rounded-md text-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(benefitsSection.id)
                    }}
                  >
                    Benefits
                  </a>
                )}

                {pricingSection && (
                  <a
                    href={`#${pricingSection.id}`}
                    className="text-white hover:text-[#cfaa5c] transition-colors duration-300 py-2 px-4 rounded-md text-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(pricingSection.id)
                    }}
                  >
                    Pricing
                  </a>
                )}

                <Link
                  href="/blog"
                  className="text-white hover:text-[#cfaa5c] transition-colors duration-300 py-2 px-4 rounded-md text-lg"
                >
                  Blog
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Rendu dynamique des blocs */}
        <BlockRendererOptimized />
      </main>

      {/* Bouton retour en haut */}
      <BackToTop />

      {/* Panneau d'administration */}
      <AdminPanel />

      {/* Structured data amélioré */}
      <StructuredDataEnhanced />
    </>
  )
}

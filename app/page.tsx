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
import { Button } from "@/components/ui/button" // Assure-toi d'avoir ce composant, sinon utilise <button> standard

export default function Home() {
  const { config } = useSiteConfig()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Force la langue anglaise
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", "en")
    }
  }, [])

  // Gestion du scroll et navigation
  const visibleSections = config.sections
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order)
    .map((section) => section.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-100px 0px -100px 0px", threshold: 0.1 },
    )
    visibleSections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => visibleSections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.unobserve(el)
    })
  }, [visibleSections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  // Récupération des sections pour le menu
  const findSection = (template: string) => config.sections.find((s) => s.template === template && s.visible)
  const aboutSection = findSection("about-us") || findSection("about")
  const featuresSection = findSection("features")
  const benefitsSection = findSection("benefits")
  const pricingSection = findSection("pricing")

  return (
    <>
      <main className="min-h-screen bg-[#121212]">
        {/* --- HEADER --- */}
        <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4 pl-5">
              <a href="/" className="flex items-center">
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

            {/* Menu Mobile Button */}
            <button
              className="md:hidden text-white p-3"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} className="text-[#cfaa5c]" /> : <Menu size={24} className="text-[#cfaa5c]" />}
            </button>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-4">
              {aboutSection && <a href={`#${aboutSection.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(aboutSection.id)}} className="text-white hover:text-[#cfaa5c] mx-4 transition-colors">About</a>}
              {featuresSection && <a href={`#${featuresSection.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(featuresSection.id)}} className="text-white hover:text-[#cfaa5c] mx-4 transition-colors">Features</a>}
              {benefitsSection && <a href={`#${benefitsSection.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(benefitsSection.id)}} className="text-white hover:text-[#cfaa5c] mx-4 transition-colors">Benefits</a>}
              {pricingSection && <a href={`#${pricingSection.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(pricingSection.id)}} className="text-white hover:text-[#cfaa5c] mx-4 transition-colors">Pricing</a>}
              <Link href="/blog" className="text-white hover:text-[#cfaa5c] mx-4 transition-colors">Blog</Link>
            </nav>
          </div>
          {/* Menu Mobile Contenu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800 py-4">
               {/* Liens mobile ici (simplifiés pour la lisibilité) */}
            </div>
          )}
        </header>

        {/* --- NOUVELLE SECTION HERO --- */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-[#121212] text-white">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* COLONNE GAUCHE : NOUVEAU TEXTE */}
              <div className="flex flex-col space-y-8 text-left">
                <p className="text-sm md:text-base font-medium uppercase tracking-[0.3em] text-gray-400">
                  Dubaï — Paris
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                  Your new unfair advantage in{' '}
                  <span className="text-[#cfaa5c] relative whitespace-nowrap">
                    beauty & wellness
                    <span className="absolute inset-x-0 bottom-2 h-3 bg-[#cfaa5c]/20 -z-10 -skew-x-12"></span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                  Your smartest way to increase bookings, loyalty, and product sales without extra staff.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="bg-[#cfaa5c] text-black hover:bg-[#b08d3b] font-semibold text-base px-8 h-12 rounded-full shadow-[0_0_15px_rgba(207,170,92,0.3)] transition-all">
                    See WhatsApp Automation
                  </button>
                  <button className="border border-white/20 text-white hover:bg-white/10 text-base px-8 h-12 rounded-full transition-all">
                    Explore Solutions
                  </button>
                </div>
              </div>

              {/* COLONNE DROITE : LE CHATBOT GLOWBOT */}
              {/* IMPORTANT : Ici, ton ancien site injectait le chatbot via le BlockRenderer. 
                  Comme je ne peux pas voir le composant exact 'Glowbot', il est possible qu'il apparaisse
                  en double si on laisse le BlockRenderer en dessous afficher l'ancien Hero. 
                  
                  Idéalement, il faut trouver le composant <ChatInterface /> ou similaire. 
                  Si tu ne l'as pas sous la main, laisse cette div vide ou mets une image temporaire 
                  en attendant de reconnecter le vrai composant chatbot ici. */}
              <div className="flex justify-center lg:justify-end relative min-h-[500px]">
                 {/* Place ici ton composant Chatbot si tu connais son nom, ex: <ChatInterface /> */}
                 {/* Sinon, le BlockRenderer en bas va peut-être l'afficher plus bas. */}
              </div>

            </div>
          </div>
        </section>

        {/* Le reste du site (About, Features, etc.) */}
        {/* ATTENTION : Cela risque d'afficher l'ANCIEN Hero en dessous du nouveau. 
            Il faudra aller dans ton fichier de config (site-config.ts ou JSON) pour masquer l'ancien Hero. */}
        <BlockRendererOptimized />
      </main>

      <BackToTop />
      <AdminPanel />
      <StructuredDataEnhanced />
    </>
  )
}

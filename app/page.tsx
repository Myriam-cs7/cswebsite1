"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

// --- IMPORTS DES BLOCS DE CONTENU ---
import { BlockRendererOptimized } from "@/components/block-renderer-optimized"
import TestimonialsBlock from "@/components/blocks/testimonials-block"
import { SiteFooter } from "@/components/site-footer"
import BackToTop from "@/components/back-to-top"

// J'ai retiré StructuredDataEnhanced et AdminPanel pour stopper les erreurs de Build
// J'ai retiré le useEffect (Robot) pour éviter tout conflit

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  // --- MENU 100% MANUEL (Indestructible) ---
  const MENU_LINKS = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about-us" },
    { name: "Features", id: "features" },
    { name: "Case Studies", id: "benefits" }, 
    { name: "Pricing", id: "pricing" }
  ];

  return (
    <main className="min-h-screen bg-[#121212]">
      {/* --- HEADER --- */}
      <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-4 pl-5">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo CS.svg"
                alt="cAIre Solutions Logo"
                className="h-20 w-20 object-contain rounded-full bg-black/40 p-1"
                style={{ filter: "drop-shadow(0 0 8px rgba(207, 170, 92, 0.6))" }}
                width={80}
                height={80}
                priority
              />
            </Link>
          </div>

          {/* BOUTON MOBILE */}
          <button className="md:hidden text-white p-3" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="text-[#cfaa5c]" /> : <Menu className="text-[#cfaa5c]" />}
          </button>

          {/* NAVIGATION DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
             {MENU_LINKS.map((item) => (
                <a 
                  key={item.name} 
                  href={`#${item.id}`} 
                  onClick={(e) => {e.preventDefault(); scrollToSection(item.id)}} 
                  className="text-white hover:text-[#cfaa5c] transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
             ))}
             <Link href="/blog" className="text-white hover:text-[#cfaa5c] transition-colors">Blog</Link>
          </nav>
        </div>
        
        {/* NAVIGATION MOBILE */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800 py-4 absolute w-full left-0 top-full">
              <div className="flex flex-col space-y-4 px-4">
                {MENU_LINKS.map((item) => (
                  <a 
                    key={item.name} 
                    href={`#${item.id}`} 
                    onClick={(e) => {e.preventDefault(); scrollToSection(item.id)}} 
                    className="text-white hover:text-[#cfaa5c] text-lg block py-2"
                  >
                    {item.name}
                  </a>
                ))}
                <Link href="/blog" className="text-white hover:text-[#cfaa5c] text-lg block py-2">Blog</Link>
              </div>
            </div>
        )}
      </header>

      {/* --- CONTENU --- */}
      
      {/* 1. Le corps de page */}
      <BlockRendererOptimized />

      {/* 2. Les Témoignages */}
      <TestimonialsBlock />

      {/* 3. Le Footer */}
      <SiteFooter />

      {/* Outils Utilitaires simples */}
      <BackToTop />
      
    </main>
  )
}

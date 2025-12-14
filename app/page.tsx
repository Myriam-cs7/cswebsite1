"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

// --- 1. IMPORTS MANUELS DES BLOCS (On ne passe plus par le Renderer cassé) ---
// On importe directement les fichiers qu'on a créés ensemble ou qui sont standards
import { Hero } from "@/components/hero" 
import BrandBlock from "@/components/blocks/brand-block"
import BenefitsBlockNew from "@/components/blocks/benefits-block-new"
import TestimonialsBlock from "@/components/blocks/testimonials-block"
import { SiteFooter } from "@/components/site-footer"

// Outils
import BackToTop from "@/components/back-to-top"

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

  // Menu Statique
  const MENU_LINKS = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about-us" }, // Pointe vers BrandBlock
    { name: "Case Studies", id: "case-studies" }, // Pointe vers Benefits
    { name: "Testimonials", id: "testimonials" }
  ];

  return (
    <main className="min-h-screen bg-[#121212]">
      {/* --- HEADER --- */}
      <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          
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

          <button className="md:hidden text-white p-3" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="text-[#cfaa5c]" /> : <Menu className="text-[#cfaa5c]" />}
          </button>

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
          </nav>
        </div>
        
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
              </div>
            </div>
        )}
      </header>

      {/* --- CONSTRUCTION MANUELLE DE LA PAGE --- */}
      {/* On empile les blocs les uns après les autres. C'est incassable. */}

      {/* 1. HERO (Standard) */}
      <div id="hero">
        <Hero />
      </div>

      {/* 2. BRAND BLOCK (Why Choose cAIre) */}
      <BrandBlock id="about-us" />

      {/* 3. BENEFITS (Case Studies / Burj Khalifa) */}
      <BenefitsBlockNew id="case-studies" />

      {/* 4. TÉMOIGNAGES */}
      <div id="testimonials">
        <TestimonialsBlock />
      </div>

      {/* 5. FOOTER */}
      <SiteFooter />

      <BackToTop />
      
    </main>
  )
}

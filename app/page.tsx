"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

// IMPORTS
import HeroBlockResponsive from "@/components/hero-block-responsive"
import BrandBlock from "@/components/blocks/brand-block"
import BenefitsBlockNew from "@/components/blocks/benefits-block-new"
import TestimonialsBlock from "@/components/blocks/testimonials-block"
import { SiteFooter } from "@/components/site-footer"
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

  const MENU_LINKS = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about-us" },
    { name: "Case Studies", id: "case-studies" },
    { name: "Testimonials", id: "testimonials" }
  ];

  return (
    <main className="min-h-screen bg-[#121212]">
      {/* HEADER */}
      <header className="bg-[#1A1A1A] text-white py-6 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 pl-5">
            <Link href="/" className="flex items-center">
              <Image src="/images/Logo CS.svg" alt="cAIre Solutions" width={80} height={80} className="h-20 w-20 object-contain rounded-full bg-black/40 p-1" style={{ filter: "drop-shadow(0 0 8px rgba(207, 170, 92, 0.6))" }} priority />
            </Link>
          </div>
          <button className="md:hidden text-white p-3" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="text-[#cfaa5c]" /> : <Menu className="text-[#cfaa5c]" />}
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
             {MENU_LINKS.map((item) => (
                <a key={item.name} href={`#${item.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(item.id)}} className="text-white hover:text-[#cfaa5c] transition-colors cursor-pointer">{item.name}</a>
             ))}
          </nav>
        </div>
        {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800 py-4 absolute w-full left-0 top-full">
              <div className="flex flex-col space-y-4 px-4">
                {MENU_LINKS.map((item) => (
                  <a key={item.name} href={`#${item.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(item.id)}} className="text-white hover:text-[#cfaa5c] text-lg block py-2">{item.name}</a>
                ))}
              </div>
            </div>
        )}
      </header>

      {/* 1. HERO - GLOWBOT ANIMÉ */}
      <div id="hero">
        <HeroBlockResponsive 
           id="hero"
           content={{
             title: "Your new unfair advantage in beauty & wellness",
             subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
             showChatbot: true,
             buttonText: "Start Free Trial",
             secondaryButtonText: "Get a Demo"
           }}
        />
      </div>

      {/* 2. BRAND BLOCK (About Us) */}
      <BrandBlock id="about-us" />

      {/* 3. CASE STUDIES */}
      <BenefitsBlockNew id="case-studies" />

      {/* 4. TESTIMONIALS */}
      <div id="testimonials"><TestimonialsBlock /></div>

      {/* 5. FOOTER */}
      <SiteFooter />
      <BackToTop />
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { BlockRendererOptimized } from "@/components/block-renderer-optimized"
import AdminPanel from "@/components/admin/admin-panel"
import BackToTop from "@/components/back-to-top"
import { Menu, X } from "lucide-react"
import { useSiteConfig } from "@/components/site-config"
import StructuredDataEnhanced from "@/components/structured-data-enhanced"
import Image from "next/image"
import Link from "next/link"

// --- IMPORTS DES COMPOSANTS ---
import { SiteFooter } from "@/components/site-footer"
// Import sécurisé pour les témoignages
import TestimonialsBlock from "@/components/blocks/testimonials-block"

export default function Home() {
  const { config, updateSection } = useSiteConfig()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // --- LE ROBOT CORRECTEUR (Version Sécurisée) ---
  useEffect(() => {
    // Sécurité : On vérifie que la config est chargée
    if (!config || !config.sections) return;

    const heroSection = config.sections.find((s) => s.id === "hero")
    
    // On ne rentre dans la logique que si heroSection existe ET a du contenu
    if (heroSection && heroSection.content) {
       const newTitle = "Your new unfair advantage in beauty & wellness";
       const currentTitle = heroSection.content.title || "";
       const currentHeading = heroSection.content.heading || "";
       
       if (!currentTitle.includes("unfair advantage") && !currentHeading.includes("unfair advantage")) {
           console.log("🚀 Mise à jour auto du Hero...")
           updateSection("hero", {
             title: newTitle,
             heading: newTitle,   
             headline: newTitle,  
             subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
             buttonText: "See WhatsApp Automation",
             secondaryButtonText: "Explore Solutions",
             primaryButtonLink: "https://app.youform.com/forms/gxc7dqht", 
             secondaryButtonLink: "https://calendly.com/cairesolutions/30min", 
             calendlyUrl: "https://calendly.com/cairesolutions/30min", 
             showChatbot: true 
           })
       }
    }
  }, [config, updateSection])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  // Sécurité : Liste des IDs de menu
  const menuIds = ['about-us', 'features', 'benefits', 'pricing'];

  return (
    <main className="min-h-screen bg-[#121212]">
      {/* Header */}
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
             {menuIds.map((id) => {
                // SÉCURITÉ MAXIMALE ICI
                if (!config || !config.sections) return null;
                const section = config.sections.find(s => s.id === id);
                
                // Si la section n'existe pas ou n'est pas visible, on n'affiche rien (return null)
                if (!section || !section.visible) return null;

                return (
                  <a key={id} href={`#${id}`} onClick={(e) => {e.preventDefault(); scrollToSection(id)}} className="text-white hover:text-[#cfaa5c] transition-colors cursor-pointer">
                    {section.title === "Section Héro" ? "Home" : section.title}
                  </a>
                )
             })}
             <Link href="/blog" className="text-white hover:text-[#cfaa5c] transition-colors">Blog</Link>
          </nav>
        </div>
        
        {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800 py-4 absolute w-full left-0 top-full">
              <div className="flex flex-col space-y-4 px-4">
                {menuIds.map((id) => {
                    if (!config || !config.sections) return null;
                    const section = config.sections.find(s => s.id === id);
                    
                    // SÉCURITÉ MAXIMALE ICI AUSSI
                    if (!section || !section.visible) return null;

                    return (
                      <a key={id} href={`#${id}`} onClick={(e) => {e.preventDefault(); scrollToSection(id)}} className="text-white hover:text-[#cfaa5c] text-lg block py-2">
                        {section.title}
                      </a>
                    )
                })}
              </div>
            </div>
        )}
      </header>

      {/* 1. CONTENU PRINCIPAL */}
      <BlockRendererOptimized />

      {/* 2. TÉMOIGNAGES */}
      <TestimonialsBlock />

      {/* 3. FOOTER */}
      <SiteFooter />

      <BackToTop />
      <AdminPanel />
      <StructuredDataEnhanced />
    </main>
  )
}

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

export default function Home() {
  const { config, updateSection } = useSiteConfig()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // --- LE ROBOT CORRECTEUR V2 (Blindé) ---
  useEffect(() => {
    const heroSection = config.sections.find((s) => s.id === "hero")
    
    // On force la mise à jour si le titre n'est pas le bon
    if (heroSection) {
       // Le nouveau titre que l'on veut partout
       const newTitle = "Your new unfair advantage in beauty & wellness";
       
       // On vérifie si la mise à jour est nécessaire pour éviter une boucle infinie
       // On regarde si le titre actuel contient "unfair advantage"
       const currentTitle = heroSection.content.title || "";
       const currentHeading = heroSection.content.heading || ""; // Variable potentielle
       
       if (!currentTitle.includes("unfair advantage") || !currentHeading.includes("unfair advantage")) {
           console.log("🚀 Mise à jour forcée du Hero (Titres + Liens)...")
           
           updateSection("hero", {
             // 1. ON FORCE LE TITRE DANS TOUTES LES VARIABLES POSSIBLES
             title: newTitle,
             heading: newTitle,   // Certains composants utilisent 'heading'
             headline: newTitle,  // D'autres utilisent 'headline'
             
             // 2. LE SOUS-TITRE
             subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
             
             // 3. LES BOUTONS (TEXTES)
             buttonText: "See WhatsApp Automation",
             secondaryButtonText: "Explore Solutions",
             
             // 4. LES LIENS (RÉPARATION)
             primaryButtonLink: "https://app.youform.com/forms/gxc7dqht", // Lien YouForm
             secondaryButtonLink: "https://calendly.com/cairesolutions/30min", // Lien Calendly
             calendlyUrl: "https://calendly.com/cairesolutions/30min", // Sécurité supplémentaire
             
             // 5. ON GARDE LE CHATBOT
             showChatbot: true 
           })
       }
    }
  }, [config, updateSection])
  // ----------------------------------------

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  // Gestion du scroll fluide
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

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
             {['about-us', 'features', 'benefits', 'pricing'].map((id) => {
                const section = config.sections.find(s => s.id === id);
                if (!section?.visible) return null;
                return (
                  <a key={id} href={`#${id}`} onClick={(e) => {e.preventDefault(); scrollToSection(id)}} className="text-white hover:text-[#cfaa5c] transition-colors cursor-pointer">
                    {section.title === "Section Héro" ? "Home" : section.title}
                  </a>
                )
             })}
             <Link href="/blog" className="text-white hover:text-[#cfaa5c] transition-colors">Blog</Link>
          </nav>
        </div>
        
        {/* Menu Mobile */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800 py-4 absolute w-full left-0 top-full">
              <div className="flex flex-col space-y-4 px-4">
                {['about-us', 'features', 'benefits', 'pricing'].map((id) => {
                    const section = config.sections.find(s => s.id === id);
                    if (!section?.visible) return null;
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

      {/* Le contenu du site géré dynamiquement */}
      <BlockRendererOptimized />

      <BackToTop />
      <AdminPanel />
      <StructuredDataEnhanced />
    </main>
  )
}

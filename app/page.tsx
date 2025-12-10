"use client"
import { useEffect, useState } from "react" // Ajout de hooks importants
import { BlockRendererOptimized } from "@/components/block-renderer-optimized"
import AdminPanel from "@/components/admin/admin-panel"
import BackToTop from "@/components/back-to-top"
import { Menu, X } from "lucide-react"
import { useSiteConfig } from "@/components/site-config" // On utilise la config existante
import StructuredDataEnhanced from "@/components/structured-data-enhanced"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const { config, updateSection } = useSiteConfig() // On récupère la fonction de mise à jour
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // --- LE ROBOT CORRECTEUR ---
  // Ce code s'exécute au chargement pour FORCER le nouveau texte
  useEffect(() => {
    const heroSection = config.sections.find((s) => s.id === "hero")
    
    // Si on détecte que le titre n'est pas le bon (ou est vide), on le change de force !
    if (heroSection && (!heroSection.content.title || !heroSection.content.title.includes("unfair advantage"))) {
       console.log("Mise à jour automatique du titre Hero...")
       updateSection("hero", {
         title: "Your new unfair advantage in beauty & wellness",
         subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
         buttonText: "See WhatsApp Automation",
         secondaryButtonText: "Explore Solutions"
       })
    }
  }, [config, updateSection]) // Se relance si la config change pour vérifier
  // ---------------------------

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <main className="min-h-screen bg-[#121212]">
      {/* Header existant */}
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
             {/* On garde tes liens de navigation */}
             {['about-us', 'features', 'benefits', 'pricing'].map((id) => {
                const section = config.sections.find(s => s.id === id);
                if (!section?.visible) return null;
                return (
                  <a key={id} href={`#${id}`} className="text-white hover:text-[#cfaa5c] transition-colors">
                    {section.title === "Section Héro" ? "Home" : section.title}
                  </a>
                )
             })}
             <Link href="/blog" className="text-white hover:text-[#cfaa5c] transition-colors">Blog</Link>
          </nav>
        </div>
      </header>

      {/* ICI : On a enlevé la section manuelle. 
          On laisse le BlockRenderer afficher la section Hero "automatique"
          MAIS notre robot (useEffect) aura corrigé son texte juste avant ! */}
      <BlockRendererOptimized />

      <BackToTop />
      <AdminPanel />
      <StructuredDataEnhanced />
    </main>
  )
}

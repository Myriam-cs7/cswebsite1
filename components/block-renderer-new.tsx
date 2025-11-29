"use client"

import { useSiteConfig } from "./site-config"
import type { SiteSection } from "./site-config"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { processBlockContent } from "@/lib/content/content-processor"

// Importer dynamiquement les composants de bloc
const HeroBlock = dynamic(() => import("./blocks/hero-block"), {
  loading: () => <BlockLoading name="Hero" />,
})

// Utiliser le nouveau composant FeaturesBlock
const FeaturesBlock = dynamic(() => import("./blocks/features-block-new"), {
  loading: () => <BlockLoading name="Features" />,
})

// Autres imports de blocs...
const BrandBlock = dynamic(() => import("./blocks/brand-block"), {
  loading: () => <BlockLoading name="Brand" />,
})

const AboutBlock = dynamic(() => import("./blocks/about-block"), {
  loading: () => <BlockLoading name="About" />,
})

// ... autres imports de blocs

// Composant de chargement
function BlockLoading({ name }: { name: string }) {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#cfaa5c]" />
        <p className="text-sm text-gray-500">Chargement du bloc {name}...</p>
      </div>
    </div>
  )
}

// Composant pour le rendu des blocs
export function BlockRendererNew() {
  const { config } = useSiteConfig()

  // Trier les sections par ordre
  const sortedSections = [...config.sections].filter((section) => section.visible).sort((a, b) => a.order - b.order)

  // Fonction pour rendre le bon composant en fonction du template
  const renderBlock = (section: SiteSection) => {
    const { id, template, content } = section

    // Traiter le contenu en fonction du type de bloc
    const processedContent = processBlockContent(content, template || "base")

    switch (template) {
      case "hero":
        return <HeroBlock key={id} id={id} content={processedContent} />
      case "features":
        return <FeaturesBlock key={id} id={id} content={processedContent} />
      case "brand":
        return <BrandBlock key={id} id={id} content={processedContent} />
      case "about":
        return <AboutBlock key={id} id={id} content={processedContent} />
      // ... autres cas pour les différents types de blocs
      default:
        return (
          <div key={id} className="py-8 text-center bg-gray-100">
            <p>Bloc de type inconnu: {template || "personnalisé"}</p>
          </div>
        )
    }
  }

  return <>{sortedSections.map((section) => renderBlock(section))}</>
}

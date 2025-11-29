"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useSiteConfig } from "./site-config"

// Importation dynamique des composants de bloc
const HeroBlock = dynamic(() => import("./blocks/hero-block"), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading Hero...</div>,
})

const FeaturesBlock = dynamic(() => import("./blocks/features-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Features...</div>,
})

const AboutBlock = dynamic(() => import("./blocks/about-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading About...</div>,
})

const AboutUsBlock = dynamic(() => import("./blocks/about-us-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading About Us...</div>,
})

const TestimonialsBlock = dynamic(() => import("./blocks/testimonials-section"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Testimonials...</div>,
})

const FaqBlock = dynamic(() => import("./blocks/faq-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading FAQ...</div>,
})

const CtaBlock = dynamic(() => import("./blocks/cta-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading CTA...</div>,
})

const FooterBlock = dynamic(() => import("./blocks/footer-block"), {
  loading: () => <div className="py-10 flex items-center justify-center">Loading Footer...</div>,
})

const BrandBlock = dynamic(() => import("./blocks/brand-block"), {
  loading: () => <div className="py-10 flex items-center justify-center">Loading Brand...</div>,
})

const ValuePropositionBlock = dynamic(() => import("./blocks/value-proposition-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Value Proposition...</div>,
})

const CaseStudiesBlock = dynamic(() => import("./blocks/case-studies-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Case Studies...</div>,
})

// Vérifier les importations des composants benefits
// Assurez-vous qu'il n'y a pas de conflit entre les deux composants

// Remplacer les importations existantes des composants benefits par:
const BenefitsBlock = dynamic(() => import("./blocks/benefits-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Benefits...</div>,
})

const BenefitsBlockNew = dynamic(() => import("./blocks/benefits-block-new"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Benefits...</div>,
})

const WhyChooseBlock = dynamic(() => import("./blocks/why-choose-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Why Choose...</div>,
})

const PricingBlock = dynamic(() => import("./blocks/pricing-block"), {
  loading: () => <div className="py-20 flex items-center justify-center">Loading Pricing...</div>,
})

// Composant de rendu des blocs
export function BlockRenderer() {
  const { config } = useSiteConfig()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Si le composant n'est pas monté, retourner null pour éviter les erreurs d'hydratation
  if (!mounted) return null

  // Trier les sections par ordre
  const sortedSections = [...config.sections].filter((section) => section.visible).sort((a, b) => a.order - b.order)

  // Fonction pour rendre le bon composant en fonction du template
  const renderBlock = (section) => {
    const { id, template, content } = section

    switch (template) {
      case "hero":
        return <HeroBlock key={id} id={id} content={content} />
      case "features":
        return <FeaturesBlock key={id} id={id} content={content} />
      case "about":
        return <AboutBlock key={id} id={id} content={content} />
      case "about-us":
        return <AboutUsBlock key={id} id={id} content={content} />
      case "testimonials":
      case "testimonials-section":
        return <TestimonialsBlock key={id} id={id} content={content} />
      case "faq":
        return <FaqBlock key={id} id={id} content={content} />
      case "cta":
        return <CtaBlock key={id} id={id} content={content} />
      case "footer":
        return <FooterBlock key={id} id={id} content={content} />
      case "brand":
        return <BrandBlock key={id} id={id} content={content} />
      case "value-proposition":
        return <ValuePropositionBlock key={id} id={id} content={content} />
      case "case-studies":
        return <CaseStudiesBlock key={id} id={id} content={content} />
      // Assurez-vous que les deux composants sont correctement rendus dans la fonction renderBlock
      // Dans la fonction renderBlock, vérifiez que les cas pour "benefits" et "benefits-new" sont distincts:
      case "benefits":
        return <BenefitsBlock key={id} id={id} content={content} />
      case "benefits-new":
        return <BenefitsBlockNew key={id} id={id} content={content} />
      case "why-choose":
        return <WhyChooseBlock key={id} id={id} content={content} />
      case "pricing":
        return <PricingBlock key={id} id={id} content={content} />
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

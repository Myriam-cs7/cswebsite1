"use client"

import { useSiteConfig } from "./site-config"
import dynamic from "next/dynamic"
import { Suspense, useState, useEffect } from "react"
import LazySectionEnhanced from "./lazy-section-enhanced"

// Chargement dynamique des composants de bloc
const HeroBlock = dynamic(() => import("./blocks/hero-block"), {
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse"></div>,
  ssr: true,
})

const AboutUsBlock = dynamic(() => import("./blocks/about-us-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const BrandBlock = dynamic(() => import("./blocks/brand-block"), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse"></div>,
})

const FeaturesBlock = dynamic(() => import("./blocks/features-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const BenefitsBlock = dynamic(() => import("./blocks/benefits-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const BenefitsBlockNew = dynamic(() => import("./blocks/benefits-block-new"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const PricingBlock = dynamic(() => import("./blocks/pricing-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const TestimonialsBlock = dynamic(() => import("./blocks/testimonials-block"), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse"></div>,
})

const TestimonialsSection = dynamic(() => import("./blocks/testimonials-section"), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse"></div>,
})

const CTABlock = dynamic(() => import("./blocks/cta-block"), {
  loading: () => <div className="h-[200px] bg-gray-100 animate-pulse"></div>,
})

const FooterBlock = dynamic(() => import("./blocks/footer-block"), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse"></div>,
})

const AboutBlock = dynamic(() => import("./blocks/about-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const WhyChooseBlock = dynamic(() => import("./blocks/why-choose-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const ValuePropositionBlock = dynamic(() => import("./blocks/value-proposition-block"), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse"></div>,
})

const FAQBlock = dynamic(() => import("./blocks/faq-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

const CaseStudiesBlock = dynamic(() => import("./blocks/case-studies-block"), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse"></div>,
})

export function BlockRendererOptimized() {
  const { config } = useSiteConfig()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Trier les sections par ordre
  const sortedSections = [...config.sections].filter((section) => section.visible).sort((a, b) => a.order - b.order)

  // Identifier les sections prioritaires (au-dessus de la ligne de flottaison)
  const prioritySections = sortedSections.slice(0, 2) // Les 2 premières sections sont prioritaires

  return (
    <>
      {isClient &&
        sortedSections.map((section) => {
          const isPriority = prioritySections.includes(section)

          // Fonction pour rendre le bloc approprié
          const renderBlock = () => {
            switch (section.template) {
              case "hero":
                return <HeroBlock id={section.id} content={section.content} />
              case "about-us":
                return <AboutUsBlock id={section.id} content={section.content} />
              case "brand":
                return <BrandBlock id={section.id} content={section.content} />
              case "features":
                return <FeaturesBlock id={section.id} content={section.content} />
              case "benefits":
                return <BenefitsBlock id={section.id} content={section.content} />
              case "benefits-new":
                return <BenefitsBlockNew id={section.id} content={section.content} />
              case "pricing":
                return <PricingBlock id={section.id} content={section.content} />
              case "testimonials":
                return <TestimonialsBlock id={section.id} content={section.content} />
              case "testimonials-section":
                return <TestimonialsSection id={section.id} content={section.content} />
              case "cta":
                return <CTABlock id={section.id} content={section.content} />
              case "footer":
                return <FooterBlock id={section.id} content={section.content} />
              case "about":
                return <AboutBlock id={section.id} content={section.content} />
              case "why-choose":
                return <WhyChooseBlock id={section.id} content={section.content} />
              case "value-proposition":
                return <ValuePropositionBlock id={section.id} content={section.content} />
              case "faq":
                return <FAQBlock id={section.id} content={section.content} />
              case "case-studies":
                return <CaseStudiesBlock id={section.id} content={section.content} />
              default:
                return null
            }
          }

          return (
            <Suspense
              key={section.id}
              fallback={
                <div className="h-[400px] bg-gray-100 animate-pulse" aria-label={`Loading ${section.title}`}></div>
              }
            >
              <LazySectionEnhanced
                id={section.id}
                className=""
                priority={isPriority}
                minHeight={section.template === "hero" ? "600px" : "400px"}
              >
                {renderBlock()}
              </LazySectionEnhanced>
            </Suspense>
          )
        })}
    </>
  )
}

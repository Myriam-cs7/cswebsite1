"use client"

import { Shield, Star, Code, Heart, Settings, Zap, Clock } from "lucide-react"
import { useSiteConfig } from "../site-config"
// Importer depuis notre nouveau fichier de traductions factices
import { useTranslation, safePreloadTranslations } from "@/utils/dummy-translations"
import { useEffect } from "react"

export default function FeaturesBlock({ id, content = {} }) {
  const { config } = useSiteConfig()
  const { t, language, preloadKeys } = useTranslation()

  // Précharger les traductions de manière sécurisée dans un useEffect
  useEffect(() => {
    if (typeof preloadKeys === "function") {
      const keys = [
        `features.${id}.title`,
        `features.${id}.description`,
        // Ajouter d'autres clés si nécessaire
      ]

      safePreloadTranslations(preloadKeys, keys)
    }
  }, [id, preloadKeys])

  // Sécuriser l'accès au contenu
  const safeContent = content || {}

  // Utiliser les valeurs du contenu ou les valeurs par défaut avec traduction
  const {
    title = "Features Designed for Luxury Brands",
    description = "Our AI solutions are tailored specifically for premium skincare and beauty brands.",
    items = [
      {
        title: "Personalized Recommendations",
        description: "AI-powered product suggestions based on individual skin concerns and goals.",
        icon: "Star",
      },
      {
        title: "Brand Protection",
        description: "Ensure your AI assistant maintains your brand voice and luxury positioning.",
        icon: "Shield",
      },
      {
        title: "Loyalty Integration",
        description: "Seamlessly connect with your existing loyalty and CRM systems.",
        icon: "Heart",
      },
      {
        title: "Easy Integration",
        description: "Simple implementation with your existing e-commerce platform.",
        icon: "Code",
      },
    ],
    backgroundColor = "bg-gray-50",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = safeContent

  // Sécuriser les items
  const safeItems = Array.isArray(items) ? items : []

  // Pré-calculer les traductions de manière sécurisée
  const translatedTitle = title
  const translatedDescription = description

  // Fonction pour rendre l'icône appropriée sans appeler getTranslatedText
  const renderIcon = (iconName) => {
    const iconProps = { className: "h-12 w-12 text-[#cfaa5c]" }

    // Use the icon name directly without translation during render
    const iconToUse = iconName || "Star"

    switch (iconToUse) {
      case "Star":
        return <Star {...iconProps} />
      case "Shield":
        return <Shield {...iconProps} />
      case "Heart":
        return <Heart {...iconProps} />
      case "Code":
        return <Code {...iconProps} />
      case "Settings":
        return <Settings {...iconProps} />
      case "Zap":
        return <Zap {...iconProps} />
      case "Clock":
        return <Clock {...iconProps} />
      default:
        return <Star {...iconProps} />
    }
  }

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor?.startsWith("#") ? backgroundColor : undefined,
    color: textColor?.startsWith("#") ? textColor : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS - Changement du fond pour créer une distinction
  const sectionClasses = `py-28 ${
    backgroundColor?.startsWith("bg-") ? backgroundColor : "bg-[#f8f5f0]"
  } ${textColor?.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          {/* Ajout d'un élément décoratif */}
          <div className="inline-block mb-6">
            <div className="w-16 h-0.5 bg-[#cfaa5c] mx-auto"></div>
            <div className="w-10 h-0.5 bg-[#cfaa5c] mx-auto mt-1.5"></div>
            <div className="w-6 h-0.5 bg-[#cfaa5c] mx-auto mt-1.5"></div>
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">{translatedTitle}</h2>
          <p className="font-montserrat text-lg text-gray-600 max-w-2xl mx-auto">{translatedDescription}</p>
        </div>

        {/* Nouvelle mise en page pour les fonctionnalités */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {safeItems.map((feature, index) => {
            // Pré-calculer les traductions pour chaque feature
            const featureTitle = feature?.title || "Feature"
            const featureDescription = feature?.description || ""

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
              >
                {/* Barre dorée en haut */}
                <div className="h-1 w-full bg-gradient-to-r from-[#cfaa5c]/30 via-[#cfaa5c] to-[#cfaa5c]/30"></div>

                <div className="p-8">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#f8f5f0] flex items-center justify-center group-hover:bg-[#cfaa5c]/10 transition-colors duration-500">
                      {renderIcon(feature?.icon)}
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-4 text-[#1A1A1A] text-center">
                    {featureTitle}
                  </h3>
                  <p className="font-montserrat text-gray-600 text-center">{featureDescription}</p>

                  {feature?.image && (
                    <div className="mt-6">
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={featureTitle}
                        className="rounded-md w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect } from "react"
import { Shield, Star, Code, Heart, Settings, Zap, Clock } from "lucide-react"
import { useTranslation, loadTranslations } from "@/lib/store/translation-store"
import {
  processBlockContent,
  type FeaturesBlockContent,
  generateTranslationKeys,
} from "@/lib/content/content-processor"

interface FeaturesBlockProps {
  id: string
  content?: FeaturesBlockContent
}

export default function FeaturesBlockNew({ id, content }: FeaturesBlockProps) {
  const { t, language } = useTranslation()

  // Traiter et valider le contenu
  const processedContent = processBlockContent<FeaturesBlockContent>(content, "features")

  // Précharger les traductions nécessaires
  useEffect(() => {
    const translationKeys = generateTranslationKeys(processedContent, "features", id)
    loadTranslations(translationKeys, language as any)
  }, [id, language, processedContent])

  // Fonction pour rendre l'icône appropriée
  const renderIcon = (iconName?: string) => {
    const iconProps = { className: "h-12 w-12 text-[#cfaa5c]" }

    switch (iconName) {
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

  // Extraire les propriétés du contenu traité
  const { title, description, items, backgroundColor, textColor, backgroundImage, customClass } = processedContent

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor?.startsWith("#") ? backgroundColor : undefined,
    color: textColor?.startsWith("#") ? textColor : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `py-20 ${
    backgroundColor?.startsWith("bg-") ? backgroundColor : ""
  } ${textColor?.startsWith("text-") ? textColor : ""} ${customClass || ""}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">
            {t(`features.${id}.title`, title || "")}
          </h2>
          <p className="font-montserrat text-lg text-gray-600">{t(`features.${id}.description`, description || "")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items?.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-8 rounded-lg shadow-lg text-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 flex justify-center">{renderIcon(feature.icon)}</div>
              <h3 className="font-playfair text-xl font-semibold mb-4 text-[#cfaa5c]">
                {t(`features.${id}.items.${index}.title`, feature.title || "Feature")}
              </h3>
              <p className="font-montserrat text-[#F5F5F5]">
                {t(`features.${id}.items.${index}.description`, feature.description || "")}
              </p>
              {feature.image && (
                <div className="mt-4">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={t(`features.${id}.items.${index}.title`, feature.title || "Feature")}
                    className="rounded-md w-full h-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

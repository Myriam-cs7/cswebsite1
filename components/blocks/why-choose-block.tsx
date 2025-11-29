"use client"

import { useSiteConfig } from "../site-config"
import { Check, Award, Shield, Clock, Users, Zap, BarChart, Link } from "lucide-react"
import { useTranslation } from "@/components/translations"

export default function WhyChooseBlock({ id, content }) {
  const { config } = useSiteConfig()
  // Ajoutons l'utilisation du hook useTranslation
  const { t, language } = useTranslation()

  // Utiliser les valeurs du contenu ou les valeurs par défaut avec traduction
  const {
    title = t("Why luxury brands choose cAIre", "Why luxury brands choose cAIre"),
    description = t(
      "Discover what sets us apart from the competition",
      "Discover what sets us apart from the competition",
    ),
    reasons = [
      {
        title: t("Premium Market Expertise", "Premium Market Expertise"),
        description: t(
          "Built specifically for luxury skincare brands with deep understanding of your unique needs.",
          "Built specifically for luxury skincare brands with deep understanding of your unique needs.",
        ),
        icon: "Award",
      },
      {
        title: t("Brand Voice Protection", "Brand Voice Protection"),
        description: t(
          "Our AI maintains your brand voice and positioning, ensuring consistent luxury experience.",
          "Our AI maintains your brand voice and positioning, ensuring consistent luxury experience.",
        ),
        icon: "Shield",
      },
      {
        title: t("Quick Implementation", "Quick Implementation"),
        description: t(
          "Get up and running in weeks, not months, with our streamlined onboarding process.",
          "Get up and running in weeks, not months, with our streamlined onboarding process.",
        ),
        icon: "Clock",
      },
      {
        title: "Dedicated Expert Support",
        description: "Comes with a team of experts always ready to ensure your platform's success.",
        icon: "Users",
      },
      {
        title: "Seamless CRM Integration",
        description: "Integrates with your CRM (HubSpot, Salesforce) to build a complete customer view.",
        icon: "Link",
      },
      {
        title: "Data-Driven Insights",
        description: "Tracks interactions to boost retention and provides KPIs to measure your progress.",
        icon: "BarChart",
      },
    ],
    backgroundColor = "bg-gray-50",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
    // Suppression des lignes suivantes
    // ctaText = t("Schedule a demo", "Schedule a demo"),
    // ctaLink = "#",
  } = content

  // Fonction pour rendre l'icône appropriée
  const renderIcon = (iconName) => {
    const iconProps = { className: "h-10 w-10 text-[#cfaa5c]" }

    switch (iconName) {
      case "Award":
        return <Award {...iconProps} />
      case "Shield":
        return <Shield {...iconProps} />
      case "Clock":
        return <Clock {...iconProps} />
      case "Users":
        return <Users {...iconProps} />
      case "Zap":
        return <Zap {...iconProps} />
      case "BarChart":
        return <BarChart {...iconProps} />
      case "Link":
        return <Link {...iconProps} />
      default:
        return <Check {...iconProps} />
    }
  }

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor.startsWith("#") ? backgroundColor : undefined,
    color: textColor.startsWith("#") ? textColor : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `py-24 ${
    backgroundColor.startsWith("bg-") ? backgroundColor : ""
  } ${textColor.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        {/* En-tête de section avec effet de brillance */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#cfaa5c]/10 rounded-full">
            <span className="text-sm font-medium text-[#cfaa5c]">Our Difference</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            {title}
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cfaa5c] to-transparent opacity-70"></div>
          </h2>
          <p className="font-montserrat text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Grille de raisons avec design amélioré */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#cfaa5c]/10 flex items-center justify-center mb-6">
                  {renderIcon(reason.icon)}
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3 text-[#1A1A1A]">{reason.title}</h3>
                <p className="font-montserrat text-gray-600">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suppression du CTA centré */}
      </div>
    </section>
  )
}

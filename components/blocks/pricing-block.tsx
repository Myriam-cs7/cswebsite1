"use client"

import { Check, Info } from "lucide-react"
import { useSiteConfig } from "../site-config"
import { useState, useEffect } from "react"
// Importer depuis notre nouveau fichier de traductions factices
import { useTranslation, safePreloadTranslations } from "@/utils/dummy-translations"

export default function PricingBlock({ id, content = {} }) {
  const { config } = useSiteConfig()
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const { t, language, preloadKeys } = useTranslation()

  // Précharger les traductions de manière sécurisée dans un useEffect
  useEffect(() => {
    if (typeof preloadKeys === "function") {
      const keys = [
        `pricing.${id}.title`,
        `pricing.${id}.description`,
        // Ajouter d'autres clés si nécessaire
      ]

      safePreloadTranslations(preloadKeys, keys)
    }
  }, [id, preloadKeys])

  // Utiliser les valeurs du contenu ou les valeurs par défaut avec traduction
  const {
    title = "Find the plan that grows your brand with seamless CRM integration",
    description = "We have a plan for every stage of your journey—explore the options below. All plans include multilingual support and CRM capabilities to connect with your global audience seamlessly.",
    plans = [
      {
        name: "LysIA",
        price: "$10,724",
        period: "One-time setup fee",
        description: "Designed for industry leaders",
        features: [
          "Unlimited users",
          "Dedicated dermatological knowledge base",
          "Complex case management",
          "Enterprise-grade CRM Integration",
          "Salesforce, HubSpot & Microsoft Dynamics support",
          "Unified customer profiles & automated data sync",
          "Multilingual support",
          "Custom AI training",
          "24/7 support with dedicated account manager",
          "Plus a performance based fee tailored to your results",
        ],
        tooltips: {
          "Enterprise-grade CRM Integration":
            "Our premium CRM integration connects your existing customer data with our AI for a unified experience, preserving your valuable customer data while enhancing personalization.",
          "Salesforce, HubSpot & Microsoft Dynamics support":
            "Full integration with major enterprise CRM platforms including custom solutions. Our integration specialists ensure seamless connection with your existing systems.",
          "Unified customer profiles & automated data sync":
            "Maintain a complete view of your customers with automated bi-directional data synchronization between our AI platform and your CRM system.",
        },
        buttonText: "Contact Sales",
        highlighted: false,
        footnote: "* Setup fees may vary based on your customization needs—let's discuss what works for you",
      },
      {
        name: "AVA Skin",
        price: "$1,057",
        period: "/month",
        description: "Perfect for growing brands",
        features: [
          "Up to 2,000 users/month",
          "CRM integration",
          "Advanced analytics & insights",
          "Product recommendation engine",
          "Multilingual support",
          "Priority support",
          "One-time setup fee of $3,177",
          "Our setup fee ensures your AI is perfectly tailored to your brand, delivering results from day one",
        ],
        tooltips: {
          "CRM integration":
            "Connect with popular CRM platforms to track customer interactions and enhance your marketing efforts.",
        },
        buttonText: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Glowbot",
        price: "$517",
        period: "/month",
        description: "Ideal for smaller brands starting out",
        features: [
          "Up to 500 users/month",
          "Basic skincare knowledge base",
          "Standard analytics dashboard",
          "Email support",
          "Basic recommendation system",
          "Multilingual support",
          "One-time setup fee of $1,587",
        ],
        buttonText: "Get Started",
        highlighted: false,
      },
    ],
    backgroundColor = "bg-gradient-to-b from-gray-50 to-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = content

  // Force the LysIA plan to have the CRM features regardless of what's in content
  const updatedPlans = [...plans]
  if (updatedPlans[0] && updatedPlans[0].name === "LysIA") {
    updatedPlans[0].features = [
      "Unlimited users",
      "Dedicated dermatological knowledge base",
      "Complex case management",
      "Enterprise-grade CRM Integration",
      "Salesforce, HubSpot & Microsoft Dynamics support",
      "Unified customer profiles & automated data sync",
      "Multilingual support",
      "Custom AI training",
      "24/7 support with dedicated account manager",
      "Plus a performance based fee tailored to your results",
    ]

    updatedPlans[0].tooltips = {
      "Enterprise-grade CRM Integration":
        "Our premium CRM integration connects your existing customer data with our AI for a unified experience, preserving your valuable customer data while enhancing personalization.",
      "Salesforce, HubSpot & Microsoft Dynamics support":
        "Full integration with major enterprise CRM platforms including custom solutions. Our integration specialists ensure seamless connection with your existing systems.",
      "Unified customer profiles & automated data sync":
        "Maintain a complete view of your customers with automated bi-directional data synchronization between our AI platform and your CRM system.",
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

  // Déterminer les classes CSS
  const sectionClasses = `py-24 ${
    backgroundColor?.startsWith("bg-") ? backgroundColor : ""
  } ${textColor?.startsWith("text-") ? textColor : ""} ${customClass}`

  // Function to check if a feature has a tooltip
  const hasTooltip = (plan, feature) => {
    return plan.tooltips && plan.tooltips[feature]
  }

  // Function to get tooltip content
  const getTooltipContent = (plan, feature) => {
    return plan.tooltips ? plan.tooltips[feature] : null
  }

  // Pré-calculer les traductions de manière sécurisée
  const translatedTitle = title
  const translatedDescription = description

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        {/* En-tête de section avec effet de brillance */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#cfaa5c]/10 rounded-full">
            <span className="text-sm font-medium text-[#cfaa5c]">Pricing Options</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            {translatedTitle}
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cfaa5c] to-transparent opacity-70"></div>
          </h2>
          <p className="font-montserrat text-lg text-gray-600 max-w-2xl mx-auto">{translatedDescription}</p>
        </div>

        {/* Grille de plans avec effet de surbrillance au survol */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {updatedPlans.map((plan, index) => {
            // Pré-calculer les traductions pour chaque plan
            const planName = plan.name || "Plan"
            const planDescription = plan.description || ""
            const planButtonText = plan.buttonText || "Get Started"

            return (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden transition-all duration-500 animate-fadeInUp ${
                  hoveredPlan === index
                    ? "transform scale-[1.05] z-10 shadow-[0_15px_50px_-12px_rgba(207,170,92,0.4)]"
                    : ""
                } ${
                  plan.highlighted
                    ? "border-2 border-[#cfaa5c] shadow-[0_10px_40px_-15px_rgba(207,170,92,0.3)]"
                    : "border border-[#2A2A2A] shadow-lg"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Badge pour le plan recommandé */}
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#cfaa5c] to-[#b89548] text-black text-xs font-medium px-3 py-1 rounded-full shadow-lg flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-1.5 opacity-70"></span>
                    RECOMMENDED
                  </div>
                )}

                {/* En-tête du plan */}
                <div
                  className={`p-8 ${plan.highlighted ? "bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]" : "bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]"} text-white`}
                >
                  <div className="mb-6 relative">
                    <div
                      className={`absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-12 ${plan.highlighted ? "bg-[#cfaa5c]" : "bg-gray-600"}`}
                    ></div>
                    <h3 className="font-playfair text-2xl font-bold mb-1 relative inline-block text-[#cfaa5c]">
                      {planName}
                      <span
                        className={`absolute -bottom-1 left-0 w-full h-[1px] ${plan.highlighted ? "bg-gradient-to-r from-[#cfaa5c] to-transparent" : "bg-gradient-to-r from-gray-400 to-transparent"}`}
                      ></span>
                    </h3>

                    {/* Prix directement sous le nom du plan */}
                    <div className="flex items-baseline mt-3 mb-2">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      {plan.name === "LysIA" ? (
                        <span className="ml-2 text-gray-300 text-sm">/ One-time setup fee</span>
                      ) : (
                        <span className="ml-2 text-gray-300 text-sm">{plan.period}</span>
                      )}
                    </div>

                    <p className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-300"}`}>
                      {planDescription}
                    </p>
                  </div>
                </div>

                {/* Corps du plan avec les fonctionnalités */}
                <div className="p-8 bg-white">
                  <h4 className="text-sm uppercase font-semibold mb-4 text-black">WHAT'S INCLUDED</h4>
                  <ul className="space-y-4">
                    {(Array.isArray(plan.features) ? plan.features : []).map((feature, featureIndex) => {
                      // Pré-calculer la traduction pour chaque fonctionnalité
                      const featureText = feature || ""

                      // Pré-calculer le tooltip pour chaque fonctionnalité
                      const tooltipText = hasTooltip(plan, feature) ? getTooltipContent(plan, feature) || "" : ""

                      return (
                        <li key={featureIndex} className="flex items-start">
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full ${plan.highlighted ? "bg-[#cfaa5c]/20" : "bg-[#cfaa5c]/10"} flex items-center justify-center mt-0.5 mr-3`}
                          >
                            <Check className={`h-3 w-3 text-[#cfaa5c]`} />
                          </div>

                          {/* Feature with optional tooltip */}
                          <div className="flex-1 flex items-start justify-between">
                            <span className="text-sm text-black pr-2">{featureText}</span>

                            {hasTooltip(plan, feature) ? (
                              <div className="relative group flex-shrink-0">
                                <button
                                  className="text-[#cfaa5c] hover:text-[#b89548] focus:outline-none"
                                  aria-label={`More info about ${feature}`}
                                >
                                  <Info className="h-4 w-4" />
                                </button>
                                <div className="absolute z-10 bottom-full right-0 mb-2 w-64 p-3 bg-[#1A1A1A] text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  {tooltipText}
                                </div>
                              </div>
                            ) : (
                              <div className="w-4 flex-shrink-0"></div> // Placeholder for alignment
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  {/* Afficher la note de bas de page si elle existe */}
                  {plan.footnote && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 italic">{plan.footnote}</p>
                    </div>
                  )}
                </div>
                {/* Bouton CTA supprimé */}
                {/* Effet de brillance amélioré sur le plan survolé */}
                {hoveredPlan === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-[#cfaa5c] via-transparent to-[#cfaa5c]"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#cfaa5c]/30 to-transparent opacity-30 blur-sm"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cfaa5c] to-transparent opacity-70"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

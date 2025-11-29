"use client"

import { useSiteConfig } from "../site-config"

export default function ValuePropositionBlock({ id, content }) {
  const { config } = useSiteConfig()

  // Vérifier que content existe
  const safeContent = content || {}

  // Utiliser des valeurs par défaut lors de la destructuration
  const {
    title = "Value Proposition",
    description = "Discover why luxury brands trust us",
    propositions = [
      {
        title: "Exclusive Personalization",
        description: "An AI that reflects your identity and enhances your products.",
        icon: "Crown",
      },
      {
        title: "Premium Experience",
        description: "Offer virtual consultations worthy of luxury.",
        icon: "Diamond",
      },
      {
        title: "Competitive Differentiation",
        description: "Stand out with a unique innovation.",
        icon: "Award",
      },
    ],
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = safeContent

  // Vérifier que propositions est un tableau avant de l'utiliser
  const safePropositions = Array.isArray(propositions) ? propositions : []

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor.startsWith("#") ? backgroundColor : undefined,
    color: textColor.startsWith("#") ? textColor : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `py-24 px-6 ${
    backgroundColor.startsWith("bg-") ? backgroundColor : ""
  } ${textColor.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto max-w-7xl">
        {/* Utilisation d'une mise en page horizontale élégante */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Colonne de gauche avec titre et description */}
          <div className="md:w-1/3 mb-12 md:mb-0">
            <div className="relative">
              <div className="w-16 h-1 bg-[#cfaa5c] mb-8"></div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Our Unique <span className="text-[#cfaa5c]">Approach</span> to Luxury
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine French luxury expertise with cutting-edge AI technology to create solutions that maintain the
                personalized, high-touch experience of in-store consultations in the digital realm.
              </p>
            </div>
          </div>

          {/* Colonne de droite avec les propositions de valeur */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {safePropositions.map((proposition, index) => (
              <div key={index} className="relative overflow-hidden group rounded-2xl">
                {/* Effet de halo lumineux */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#cfaa5c]/0 via-[#cfaa5c]/30 to-[#cfaa5c]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 group-hover:animate-pulse"></div>

                {/* Fond avec effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfaa5c]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Contenu */}
                <div className="relative p-8 h-full flex flex-col rounded-2xl z-10">
                  <h3 className="font-playfair text-xl font-bold mb-4 text-[#cfaa5c]">
                    {proposition?.title || "Proposition"}
                  </h3>
                  <p className="font-montserrat text-white text-sm">{proposition?.description || ""}</p>

                  {/* Ligne décorative qui s'anime au survol */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cfaa5c] group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse-gold {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-pulse-gold {
          animation: pulse-gold 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}

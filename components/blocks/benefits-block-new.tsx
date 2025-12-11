"use client"

import { useState } from "react"
import { useSiteConfig } from "../site-config"
import { Award, TrendingUp, Users, DollarSign, Globe, Moon, Repeat } from "lucide-react"

export default function BenefitsBlockNew({ id, content }) {
  const { config } = useSiteConfig()
  const [activeTab, setActiveTab] = useState(0)

  // Utiliser les valeurs du contenu ou les valeurs par défaut
  const {
    title = "Elevate Your Brand with Proven Benefits",
    description = "Discover how our AI solutions deliver measurable results for luxury skincare brands.",
    benefits = [],
    results = [],
    backgroundColor = "bg-[#1A1A1A]", // Force le fond sombre par défaut
    textColor = "text-white",
    backgroundImage = "",
    customClass = "",
  } = content

  // Fonction pour obtenir l'icône appropriée
  const getIcon = (iconName) => {
    const iconClass = "w-8 h-8 text-[#cfaa5c]"
    switch (iconName) {
      case "Users": return <Users className={iconClass} />
      case "TrendingUp": return <TrendingUp className={iconClass} />
      case "DollarSign": return <DollarSign className={iconClass} />
      case "Award": return <Award className={iconClass} />
      case "Globe": return <Globe className={iconClass} />
      case "Moon": return <Moon className={iconClass} />
      case "Repeat": return <Repeat className={iconClass} />
      default: return <Award className={iconClass} />
    }
  }

  const sectionStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  return (
    <section
      id={id}
      className={`py-24 relative overflow-hidden bg-[#1A1A1A] text-white ${customClass}`}
      style={sectionStyle}
    >
      {/* Fond décoratif subtil (Glow) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#cfaa5c]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#cfaa5c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-[#cfaa5c]/10 border border-[#cfaa5c]/20 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium text-[#cfaa5c] tracking-widest uppercase">Proven Results</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            {description}
          </p>
        </div>

        {/* Navigation des onglets (Style Glassmorphism) */}
        <div className="flex flex-wrap justify-center mb-16 gap-3">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base font-medium border ${
                activeTab === index
                  ? "bg-[#cfaa5c] text-black border-[#cfaa5c] shadow-[0_0_20px_rgba(207,170,92,0.3)]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-[#cfaa5c]/50"
              }`}
            >
              {benefit.title}
            </button>
          ))}
        </div>

        {/* Contenu Principal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Colonne Gauche : Texte & Stats */}
          <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#cfaa5c]/10 border border-[#cfaa5c]/20 flex items-center justify-center mr-5 shadow-lg shadow-[#cfaa5c]/5">
                {getIcon(benefits[activeTab]?.icon)}
              </div>
              <h3 className="font-playfair text-3xl font-bold text-white">
                {benefits[activeTab]?.title}
              </h3>
            </div>
            
            <p className="text-gray-300 mb-10 text-lg leading-relaxed border-l-2 border-[#cfaa5c]/30 pl-6">
              {benefits[activeTab]?.description}
            </p>

            {/* Statistiques (Cartes Dark) */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {benefits[activeTab]?.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-[#cfaa5c]/30 transition-colors group"
                >
                  <div className="text-[#cfaa5c] text-3xl md:text-4xl font-bold mb-1 group-hover:scale-105 transition-transform origin-left">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne Droite : Image (Cadre Premium) */}
          <div 
            className="order-1 lg:order-2 relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group animate-in fade-in zoom-in duration-700"
          >
            {/* Image de fond */}
            <div className="absolute inset-0">
               <img
                src={benefits[activeTab]?.image || "/placeholder.svg"}
                alt={benefits[activeTab]?.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay sombre pour l'élégance */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* Effet de reflet (Glass Shine) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  )
}

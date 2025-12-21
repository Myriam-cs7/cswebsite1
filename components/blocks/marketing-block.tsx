"use client"

import { Target, Share2, Database } from "lucide-react"

export default function MarketingBlock({ id }: { id?: string }) {
  
  const features = [
    {
      title: "Measurable ROI",
      description: "Track conversions, engagement, and purchase behavior in real time. Know exactly which conversations generate revenue.",
      icon: Target,
    },
    {
      title: "Omnichannel",
      // ICI : J'ai remis AVA
      description: "AVA connects seamlessly across WhatsApp, Instagram, your website, and Telegram delivering a consistent experience everywhere your customers interact.",
      icon: Share2,
    },
    {
      title: "Insights capture",
      // ICI : J'ai remis AVA
      description: "AVA doesn't just chat she listens, learns, and captures valuable insights. Each conversation automatically updates your CRM. Customer name, preferences, and intent are recorded.",
      icon: Database,
    }
  ]

  return (
    <section id={id} className="py-24 bg-black text-white relative overflow-hidden">
      {/* Fond subtil pour donner de la profondeur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#cfaa5c]/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#cfaa5c]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 capitalize">
            Marketing Intelligence
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Every conversation enriches your marketing database and fuels personalized campaigns.
          </p>
        </div>

        {/* GRILLE 3 COLONNES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center group">
              
              {/* ICÔNE CERCLE DORÉ (Style inspiré de votre capture) */}
              <div className="w-24 h-24 rounded-full border-2 border-[#cfaa5c] flex items-center justify-center mb-8 group-hover:bg-[#cfaa5c]/10 transition-colors duration-500">
                <feature.icon className="w-10 h-10 text-[#cfaa5c]" strokeWidth={1.5} />
              </div>

              {/* TITRE */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

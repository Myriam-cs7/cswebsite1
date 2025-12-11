"use client"

import Image from "next/image"
import { CheckCircle2, TrendingUp, Globe, MessageCircle } from "lucide-react"

export default function BenefitsBlockNew({ id }) {
  
  const cases = [
    {
      id: 1,
      category: "LUXURY SPAS",
      title: "The Midnight Booking Effect",
      description: "60% des clients cherchent de la détente après 20h. Notre IA capture ces réservations instantanément sur WhatsApp pendant que votre staff se repose.",
      stat: "+40%",
      statLabel: "Revenus Nocturnes",
      icon: <MessageCircle className="w-6 h-6 text-[#cfaa5c]" />,
      image: "/images/img1.png", // Assure-toi que cette image existe
      color: "from-purple-900/20 to-blue-900/20" // Ambiance couleur subtile
    },
    {
      id: 2,
      category: "AESTHETIC CLINICS",
      title: "Global Medical Hub",
      description: "Dubaï attire le monde entier. Ne laissez pas la barrière de la langue vous coûter des patients. Notre IA gère les demandes internationales 24/7 en plus de 30 langues.",
      stat: "30+",
      statLabel: "Langues Parlées",
      icon: <Globe className="w-6 h-6 text-[#cfaa5c]" />,
      image: "/images/img2.jpg",
      color: "from-emerald-900/20 to-teal-900/20"
    },
    {
      id: 3,
      category: "RETAIL & SALONS",
      title: "Automated Loyalty",
      description: "Ne vous contentez pas d'attendre les RDV. L'IA réengage proactivement vos clients pour le renouvellement de produits et les suivis, transformant une visite unique en revenu récurrent.",
      stat: "x2.5",
      statLabel: "Taux de Rétention",
      icon: <TrendingUp className="w-6 h-6 text-[#cfaa5c]" />,
      image: "/images/img3.png",
      color: "from-orange-900/20 to-red-900/20"
    }
  ]

  return (
    <section id={id} className="bg-black py-24 md:py-32 overflow-hidden">
      
      {/* En-tête de section */}
      <div className="container mx-auto px-4 mb-24 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
          Case Studies
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
          Intelligence Artificielle. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#f0e6d2]">
            Résultats Réels.
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          Découvrez comment nos agents IA transforment l'expérience client des établissements les plus prestigieux.
        </p>
      </div>

      <div className="container mx-auto px-4 flex flex-col gap-24">
        {cases.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* PARTIE IMAGE (Cadre Tech) */}
              <div className="w-full lg:w-1/2 relative group">
                {/* Effet de lueur derrière l'image */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000`}></div>
                
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Overlay subtil pour unifier */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                  {/* Élément UI Flottant (Preuve Tech) */}
                  <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center gap-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                     <div className="bg-white/10 p-2 rounded-lg text-[#cfaa5c]">
                        {item.icon}
                     </div>
                     <div>
                        <div className="text-white text-sm font-medium">AI Agent Active</div>
                        <div className="text-green-400 text-xs flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          Processing live
                        </div>
                     </div>
                     <div className="ml-auto text-white font-mono text-xl tracking-tight">
                        {item.stat}
                     </div>
                  </div>
                </div>
              </div>

              {/* PARTIE TEXTE */}
              <div className="w-full lg:w-1/2 space-y-8 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-[#cfaa5c]"></span>
                    <span className="text-[#cfaa5c] text-xs font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Métrique Clé */}
                <div className="border-t border-white/10 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col">
                      <span className="text-4xl md:text-5xl font-light text-white tracking-tight">
                        {item.stat}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">
                        {item.statLabel}
                      </span>
                    </div>
                    {/* Liste de features rapide */}
                    <div className="ml-auto space-y-2 hidden md:block">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#cfaa5c]" />
                            <span>24/7 Availability</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#cfaa5c]" />
                            <span>Instant Sync</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}

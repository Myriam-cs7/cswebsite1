"use client"

import Image from "next/image"
import { CheckCircle2, TrendingUp, Globe, MessageCircle } from "lucide-react"

export default function BenefitsBlockNew({ id }) {
  
  const cases = [
    {
      id: 1,
      category: "LUXURY SPAS",
      title: "The Midnight Booking Effect",
      description: "60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
      stat: "+40%",
      statLabel: "Night Bookings",
      image: "/images/img1.png", // Image Burj Khalifa
      color: "from-purple-900/20 to-blue-900/20" 
    },
    {
      id: 2,
      category: "AESTHETIC CLINICS",
      title: "Global Medical Hub",
      // Ajout de la mention "Time Zone" dans la description
      description: "Dubai attracts the world. Don't let language barriers or time zone differences cost you patients. Our AI manages international inquiries 24/7 in 30+ languages.",
      stat: "30+",
      statLabel: "Languages Spoken",
      image: "/image/ai-concierge.png", // NOUVELLE IMAGE : Version propre sans texte
      color: "from-emerald-900/20 to-teal-900/20"
    },
    {
      id: 3,
      category: "RETAIL & SALONS",
      title: "Automated Loyalty",
      description: "Don't just wait for appointments. The AI proactively re-engages clients for product refills and follow-up treatments, turning one-time visits into lifetime value.",
      stat: "x2.5",
      statLabel: "Retention Rate",
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
          Artificial Intelligence. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#f0e6d2]">
            Real World Results.
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          Discover how our AI agents transform the client experience for prestigious establishments.
        </p>
      </div>

      <div className="container mx-auto px-4 flex flex-col gap-24">
        {cases.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* PARTIE IMAGE (Format Portrait optimisé pour Mobile & Burj Khalifa) */}
              <div className="w-full lg:w-1/2 relative group">
                {/* Effet de lueur derrière l'image */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000`}></div>
                
                {/* Ratio 3/4 parfait pour le téléphone (ai-concierge) et la tour (img1) */}
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay subtil */}
                  <div className="absolute inset-0 bg-black/10"></div>
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

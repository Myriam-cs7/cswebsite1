"use client"

import Image from "next/image"
import { CheckCircle2, TrendingUp, Globe, MessageCircle, Trophy, Sparkles } from "lucide-react"

export default function BenefitsBlockNew({ id }) {
  
  const cases = [
    {
      id: 1,
      category: "LUXURY SPAS",
      title: "The Midnight Booking Effect",
      description: "60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
      stat: "+40%",
      statLabel: "Night Bookings",
      image: "/images/img1.png", 
      color: "from-purple-900/20 to-blue-900/20" 
    },
    {
      id: 2,
      category: "AESTHETIC CLINICS",
      title: "Global Medical Hub",
      description: "Dubai attracts the world. Don't let language barriers or time zone differences cost you patients. Our AI manages international inquiries 24/7 in 30+ languages.",
      stat: "30+",
      statLabel: "Languages Spoken",
      image: "/images/ai-concierge.png", 
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
    <section id={id} className="bg-black py-16 md:py-24 overflow-hidden">
      
      {/* En-tête de section plus compacte */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
          Case Studies
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-8">
          Artificial Intelligence. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#f0e6d2]">
            Real World Results.
          </span>
        </h2>
        
        {/* BLOC AWARDS & EVENT */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-[#cfaa5c]/30 bg-[#cfaa5c]/5 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-[#cfaa5c]" />
                <span className="text-gray-200 text-xs md:text-sm font-medium tracking-wide">
                    Winner: <span className="text-[#cfaa5c]">Beauty AI Innovation Award</span>
                </span>
            </div>

            <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-gray-200 text-xs md:text-sm font-medium tracking-wide">
                    Featured at <span className="text-white">Beautyworld Middle East</span>
                </span>
            </div>
        </div>

        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light">
          Discover how our award-winning agents transform the client experience for prestigious establishments in Dubai.
        </p>
      </div>

      {/* Espacement réduit entre les blocs (gap-16 au lieu de gap-24) */}
      <div className="container mx-auto px-4 flex flex-col gap-16 md:gap-20">
        {cases.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* PARTIE IMAGE : Format CINÉMA (Horizontal) */}
              <div className="w-full lg:w-1/2 relative group">
                <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
                
                {/* CHANGEMENT MAJEUR ICI : aspect-video (16/9) pour réduire la hauteur */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>

              {/* PARTIE TEXTE */}
              <div className="w-full lg:w-1/2 space-y-6 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-8 bg-[#cfaa5c]"></span>
                    <span className="text-[#cfaa5c] text-xs font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-4xl font-light text-white tracking-tight">
                        {item.stat}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                        {item.statLabel}
                      </span>
                    </div>
                    {/* Features compactes */}
                    <div className="ml-auto flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#cfaa5c]" />
                            <span>24/7 Availability</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
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

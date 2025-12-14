"use client"

import Image from "next/image"
import { CheckCircle2, Trophy, Sparkles } from "lucide-react"

export default function BenefitsBlockNew({ id }: { id?: string }) {
  
  const cases = [
    {
      id: 1,
      category: "LUXURY SPAS",
      title: "The Midnight Booking Effect",
      description: "60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
      stat: "+40%",
      statLabel: "Night Bookings",
      image: "/images/img1.png", 
      color: "from-purple-900/20 to-blue-900/20",
      position: "object-center"
    },
    {
      id: 2,
      category: "AESTHETIC CLINICS",
      title: "Global Medical Hub",
      description: "Dubai attracts the world. Don't let language barriers or time zone differences cost you patients. Our AI manages international inquiries 24/7 in 30+ languages.",
      stat: "30+",
      statLabel: "Languages Spoken",
      image: "/images/ai-concierge.png", 
      color: "from-emerald-900/20 to-teal-900/20",
      // ICI : On garde object-contain pour que le téléphone ne soit pas coupé, mais on limite la hauteur
      position: "object-contain"
    },
    {
      id: 3,
      category: "RETAIL & SALONS",
      title: "Automated Loyalty",
      description: "Don't just wait for appointments. The AI proactively re-engages clients for product refills and follow-up treatments, turning one-time visits into lifetime value.",
      stat: "x2.5",
      statLabel: "Retention Rate",
      image: "/images/img3.png", 
      color: "from-orange-900/20 to-red-900/20",
      position: "object-contain"
    }
  ]

  return (
    // J'ai réduit le padding vertical (py-12 au lieu de py-24) pour moins de vide
    <section id={id} className="bg-black py-12 md:py-20 overflow-hidden">
      
      <div className="container mx-auto px-4 mb-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-md">
          Case Studies
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
          Artificial Intelligence. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#f0e6d2]">
            Real World Results.
          </span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#cfaa5c]/30 bg-[#cfaa5c]/5 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-[#cfaa5c]" />
                <span className="text-gray-200 text-xs font-medium tracking-wide">
                    Winner: <span className="text-[#cfaa5c]">Beauty AI Innovation Award</span>
                </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-gray-200 text-xs font-medium tracking-wide">
                    Featured at <span className="text-white">Beautyworld Middle East</span>
                </span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col gap-12 md:gap-16">
        {cases.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* PARTIE IMAGE : LIMITÉE EN HAUTEUR ET HORIZONTALE */}
              {/* J'ai changé la largeur à lg:w-5/12 pour que l'image soit moins large */}
              <div className="w-full lg:w-5/12 relative group flex justify-center">
                <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700`}></div>
                
                {/* IMPORTANT : 
                   1. aspect-video : Force le format rectangulaire horizontal (16/9)
                   2. max-h-[350px] : Empêche l'image de devenir géante verticalement 
                */}
                <div className="relative aspect-video w-full max-h-[350px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${item.position === 'object-contain' ? 'object-contain p-2' : 'object-cover'}`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>

              {/* PARTIE TEXTE */}
              <div className="w-full lg:w-7/12 space-y-4 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-px w-8 bg-[#cfaa5c]"></span>
                    <span className="text-[#cfaa5c] text-xs font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-serif text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-3xl md:text-4xl font-light text-white tracking-tight">
                        {item.stat}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                        {item.statLabel}
                      </span>
                    </div>
                    <div className="ml-auto flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-3 h-3 text-[#cfaa5c]" />
                            <span>24/7 Availability</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-3 h-3 text-[#cfaa5c]" />
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

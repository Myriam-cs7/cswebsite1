"use client"

import Image from "next/image"

export default function BenefitsBlockNew({ id }: { id?: string }) {
  
  const cases = [
    {
      id: 1,
      category: "LUXURY SPAS",
      title: "The Midnight Booking Effect",
      description: "60% of relaxation seekers browse services after 8 PM. Glowbot captures these bookings instantly on WhatsApp.",
      stat: "+40%",
      statLabel: "Night Bookings",
      image: "/images/ai-concierge.jpg", 
      color: "from-purple-500/10 to-blue-500/10",
      // CORRECTION : On utilise 'object-contain' pour voir toute l'image sans zoom
      objectFit: "object-contain" 
    },
    {
      id: 2,
      category: "AESTHETIC CLINICS",
      title: "Global Medical Hub",
      description: "Dubai attracts the world. Glowbot manages international inquiries 24/7 in 30+ languages.",
      stat: "30+",
      statLabel: "Languages Spoken",
      image: "/images/img1.png", 
      color: "from-emerald-500/10 to-teal-500/10",
      // On garde 'object-cover' pour les autres images
      objectFit: "object-cover" 
    },
    {
      id: 3,
      category: "RETAIL & SALONS",
      title: "Automated Loyalty",
      description: "Glowbot proactively re-engages clients for product refills and follow-up treatments.",
      stat: "x2.5",
      statLabel: "Retention Rate",
      image: "/images/img3.png", 
      color: "from-orange-500/10 to-red-500/10",
      objectFit: "object-cover"
    }
  ]

  return (
    <section id={id} className="bg-black py-32 overflow-hidden">
      
      <div className="container mx-auto px-4 mb-24 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
          Case Studies
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
          Artificial Intelligence. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#f0e6d2]">
            Real World Results.
          </span>
        </h2>
      </div>

      <div className="container mx-auto px-4 flex flex-col gap-32">
        {cases.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* --- ZONE IMAGE --- */}
              <div className="w-full lg:w-3/5 h-[500px] relative group">
                 
                 {/* Lueur d'arrière-plan */}
                 <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 -z-10`}></div>
                 
                 {/* LE MASQUE D'ÉCRÊTAGE ARRONDIE */}
                 <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-xl bg-black/20 backdrop-blur-sm border border-white/10">
                   <Image
                     src={item.image}
                     alt={item.title}
                     fill
                     // CORRECTION : On utilise la propriété dynamique objectFit
                     className={`${item.objectFit} object-center transition-transform duration-700 group-hover:scale-105 p-4`}
                     sizes="(max-width: 768px) 100vw, 60vw"
                   />
                 </div>
              </div>

              {/* TEXTE */}
              <div className="w-full lg:w-2/5 space-y-8 text-left">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-px w-12 bg-[#cfaa5c]"></span>
                      <span className="text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <span className="text-5xl md:text-6xl font-light text-white tracking-tight block mb-2">
                        {item.stat}
                    </span>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{item.statLabel}</p>
                  </div>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}

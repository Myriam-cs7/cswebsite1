"use client";

import Image from "next/image";
import { CheckCircle2, Trophy, Sparkles } from "lucide-react";

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
      color: "from-purple-900/20 to-blue-900/20",
      aspect: "aspect-video", 
      fit: "object-cover",
      position: "object-center",
      noFrame: false // Cadre standard
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
      aspect: "aspect-[4/5] md:aspect-square", 
      fit: "object-contain",
      position: "object-center",
      noFrame: false // Cadre standard
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
      
      // --- MODIFICATIONS MAJEURES ICI ---
      // 1. On change le ratio pour du vertical/carré (plus haut)
      aspect: "aspect-square md:aspect-[10/11]", 
      // 2. On garde 'contain' pour voir les téléphones en entier
      fit: "object-contain", 
      position: "object-center",
      // 3. Nouvelle propriété pour retirer les bordures grises
      noFrame: true 
    }
  ];

  return (
    <section id={id} className="bg-black py-16 md:py-24 overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-4 mb-12 text-center">
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

      {/* CASES LOOP */}
      <div className="container mx-auto px-4 flex flex-col gap-24"> {/* Gap augmenté à 24 pour aérer */}
        {cases.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* PARTIE IMAGE */}
              <div className="w-full lg:w-6/12 relative group flex justify-center">
                
                {/* Background Glow (Lueur) */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                
                {/* CONTAINER IMAGE */}
                {/* Logique conditionnelle : Si noFrame est true, on enlève bordures et background */}
                <div className={`
                    relative w-full ${item.aspect} 
                    ${item.noFrame ? '' : 'rounded-xl border border-white/10 shadow-2xl bg-neutral-900 overflow-hidden'}
                    transition-transform duration-700
                `}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${item.fit} ${item.position} will-change-transform`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay subtil uniquement si on a un cadre */}
                  {!item.noFrame && <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>}
                </div>
              </div>

              {/* PARTIE TEXTE */}
              <div className="w-full lg:w-6/12 space-y-8 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-8 bg-[#cfaa5c]"></span>
                    <span className="text-[#cfaa5c] text-xs font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                      <span className="text-5xl font-light text-white tracking-tight">
                        {item.stat}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">
                        {item.statLabel}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-[#cfaa5c]" />
                            <span>24/7 Availability</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-[#cfaa5c]" />
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

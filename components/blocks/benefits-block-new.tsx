"use client"

import { useSiteConfig } from "../site-config"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function BenefitsBlockNew({ id, content }) {
  
  // Configuration Simple et Robuste
  const cases = [
    {
      title: "The Midnight Booking Effect",
      subtitle: "FOR LUXURY SPAS",
      description: "60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
      stat: "+40% Night Bookings",
      image: "/images/img1.png", // Spa
      align: "left" // Texte à gauche
    },
    {
      title: "Global Medical Hub Mastery",
      subtitle: "FOR AESTHETIC CLINICS",
      description: "Dubai & Paris attract the world. Don't let language barriers cost you patients. Our AI manages international inquiries 24/7 in 30+ languages.",
      stat: "30+ Languages Spoken",
      image: "/images/img2.jpg", // Clinique
      align: "right" // Texte à droite
    },
    {
      title: "Automated Loyalty & Sales",
      description: "Don't just wait for appointments. The AI proactively re-engages clients for product refills and follow-up treatments, turning one-time visits into lifetime value.",
      subtitle: "FOR RETAIL & SALONS",
      stat: "35% Repeat Sales",
      image: "/images/img3.png", // Retail
      align: "left" // Texte à gauche
    }
  ]

  return (
    <section id={id} className="bg-[#000000] py-20">
      
      {/* Titre Introduction */}
      <div className="container mx-auto px-4 mb-20 text-center">
        <span className="text-[#cfaa5c] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
          Proven Excellence
        </span>
        <h2 className="text-4xl md:text-6xl font-playfair text-white leading-tight">
          Real World Impact. <br />
          <span className="text-[#cfaa5c] italic">Measurable Results.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-20 md:gap-32">
        {cases.map((item, index) => (
          <div key={index} className="relative w-full h-[80vh] min-h-[600px] overflow-hidden group">
            
            {/* 1. L'IMAGE DE FOND (IMMERSIVE) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[3s] ease-in-out group-hover:scale-105"
                priority={index === 0}
              />
              {/* Filtre sombre pour que le texte soit lisible */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
            </div>

            {/* 2. LA CARTE DE TEXTE FLOTTANTE */}
            <div className={`absolute inset-0 container mx-auto px-6 flex flex-col justify-center ${
              item.align === 'right' ? 'items-end' : 'items-start'
            }`}>
              <div className="max-w-xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl transform transition-all duration-700 hover:bg-black/60 hover:border-[#cfaa5c]/30">
                
                <span className="text-[#cfaa5c] text-sm font-bold tracking-widest uppercase mb-4 block">
                  {item.subtitle}
                </span>
                
                <h3 className="text-3xl md:text-5xl font-playfair text-white mb-6 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-200 text-lg leading-relaxed mb-8 font-light">
                  {item.description}
                </p>

                <div className="flex items-center gap-6 border-t border-white/20 pt-6">
                  <div>
                    <div className="text-3xl font-bold text-white">{item.stat}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Key Result</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}

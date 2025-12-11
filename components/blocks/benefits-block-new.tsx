"use client"

import { useState, useEffect, useRef } from "react"
import { useSiteConfig } from "../site-config"
import Image from "next/image"

export default function BenefitsBlockNew({ id, content }) {
  const [activeCard, setActiveCard] = useState(0)
  const observerRefs = useRef([])

  // --- CONFIGURATION BLINDÉE ---
  // J'ai ajouté des liens Unsplash de secours.
  // Si ton image locale (/images/...) ne marche pas, le code ne plantera pas,
  // mais idéalement il faut que tes images locales fonctionnent.
  const defaultBenefits = [
    {
      title: "The Midnight Booking Effect",
      description: "For Luxury Spas: 60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
      stats: [{ value: "+40%", label: "Night Bookings" }],
      // Image locale (PRIORITAIRE)
      image: "/images/spa-booking.png", 
      id: "01"
    },
    {
      title: "Global Medical Hub Mastery",
      description: "Dubai & Paris attract the world. Don't let time zones or language barriers cost you patients. Our AI manages international inquiries 24/7 in 30+ languages.",
      stats: [{ value: "30+", label: "Languages" }],
      // Image locale (PRIORITAIRE)
      image: "/images/clinic-booking.jpg",
      id: "02"
    },
    {
      title: "Automated Loyalty & Sales",
      description: "For Retail & Salons: Don't just wait for appointments. The AI proactively re-engages clients for product refills and follow-up treatments.",
      stats: [{ value: "35%", label: "Repeat Sales" }],
      // Image locale (PRIORITAIRE)
      image: "/images/retail-loyalty.png",
      id: "03"
    }
  ]

  const benefitsData = content?.benefits && content.benefits.length > 0 ? content.benefits : defaultBenefits

  // Détection du Scroll (Ajustée)
  useEffect(() => {
    const observers = []
    benefitsData.forEach((_, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveCard(index)
            }
          })
        },
        // Zone de déclenchement plus large pour éviter que ça saute
        { threshold: 0.5, rootMargin: "-30% 0px -30% 0px" }
      )
      if (observerRefs.current[index]) observer.observe(observerRefs.current[index])
      observers.push(observer)
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [benefitsData])

  return (
    <section id={id} className="relative bg-[#0a0a0a] py-32 overflow-hidden">
      
      {/* Background (Lumières) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cfaa5c]/10 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#cfaa5c]/5 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Titre Section */}
        <div className="text-center mb-40 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#cfaa5c]/30 bg-[#cfaa5c]/10 mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cfaa5c] animate-pulse"></span>
            <span className="text-[#cfaa5c] text-xs font-semibold tracking-widest uppercase">
              Proven Results
            </span>
          </div>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
            Designed for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] via-[#e6d5b0] to-[#cfaa5c]">
              High-End Experiences.
            </span>
          </h2>
        </div>

        {/* Layout : Sticky Scroll */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start">
          
          {/* Colonne GAUCHE : Texte Défilant */}
          <div className="lg:w-5/12 flex flex-col relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#cfaa5c]/30 to-transparent hidden lg:block"></div>

            <div className="flex flex-col gap-[90vh] pb-[40vh] pt-[10vh]">
              {benefitsData.map((benefit, index) => (
                <div 
                  key={index}
                  ref={el => observerRefs.current[index] = el}
                  className={`relative pl-20 transition-all duration-700 ease-out ${
                    activeCard === index ? 'opacity-100 blur-0' : 'opacity-20 blur-[2px]'
                  }`}
                >
                  {/* Numéro */}
                  <div className={`absolute left-0 top-1 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-10 bg-[#0a0a0a] ${
                    activeCard === index 
                      ? 'border-[#cfaa5c] text-[#cfaa5c] scale-110 shadow-[0_0_30px_rgba(207,170,92,0.4)]' 
                      : 'border-[#333] text-[#333] scale-100'
                  }`}>
                    <span className="font-playfair font-bold text-xl">{index + 1}</span>
                  </div>

                  {/* Titre (Blanc Forcé) */}
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-white">
                    {benefit.title}
                  </h3>
                  
                  {/* Description (Gris Clair Forcé) */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                    {benefit.description}
                  </p>

                  {/* Stats */}
                  <div className={`flex gap-8 transition-all duration-500 ${activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {benefit.stats.map((stat, i) => (
                      <div key={i} className="border-l-2 border-[#cfaa5c] pl-4">
                        <div className="text-4xl font-bold text-[#cfaa5c] mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne DROITE : Image Sticky */}
          <div className="hidden lg:block lg:w-7/12 relative h-full">
            <div className="sticky top-[20vh] h-[600px] w-full flex items-center justify-center">
              
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-[#ffffff]/10 bg-[#151515]">
                {benefitsData.map((benefit, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeCard === index 
                        ? "opacity-100 scale-100 z-10" 
                        : "opacity-0 scale-110 z-0"
                    }`}
                  >
                    {/* IMAGE : Balise IMG simple pour éviter tout bug Next.js */}
                    <img 
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover' }}
                      // Fallback : Si l'image n'est pas trouvée, ça ne plantera pas mais affichera une bordure vide
                      onError={(e) => {
                        e.target.style.display = 'none'; // Cache l'image cassée si elle n'existe pas
                      }}
                    />
                    
                    {/* Overlay léger pour que le texte ressorte si besoin */}
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ))}
              </div>

              {/* Halo arrière */}
              <div className="absolute -inset-4 bg-[#cfaa5c]/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

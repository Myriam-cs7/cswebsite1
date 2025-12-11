"use client"

import { useState, useEffect, useRef } from "react"
import { useSiteConfig } from "../site-config"
import { Award, TrendingUp, Users, DollarSign, Globe, Moon, Repeat, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function BenefitsBlockNew({ id, content }) {
  const [activeCard, setActiveCard] = useState(0)
  const observerRefs = useRef([])

  // Configuration par défaut si le contenu ne vient pas de la config
  const defaultBenefits = [
    {
      title: "The Midnight Booking Effect",
      description: "For Luxury Spas: 60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
      stats: [{ value: "+40%", label: "Night Bookings" }],
      // Utilise l'image que tu as nommée spa-booking.png
      image: "/images/spa-booking.png", 
      icon: "Moon"
    },
    {
      title: "Global Medical Hub Mastery",
      description: "Dubai & Paris attract the world. Don't let time zones or language barriers cost you patients. Our AI manages international inquiries 24/7 in 30+ languages.",
      stats: [{ value: "30+", label: "Languages" }],
      // Utilise l'image que tu as nommée clinic-consultation.png
      image: "/images/clinic-consultation.png",
      icon: "Globe"
    },
    {
      title: "Automated Loyalty & Sales",
      description: "For Retail & Salons: Don't just wait for appointments. The AI proactively re-engages clients for product refills and follow-up treatments.",
      stats: [{ value: "35%", label: "Repeat Sales" }],
      // Utilise l'image que tu as nommée retail-loyalty.png
      image: "/images/retail-loyalty.png",
      icon: "Repeat"
    }
  ]

  // On utilise soit le contenu de la config, soit nos défauts si la structure change
  const benefitsData = content?.benefits && content.benefits.length > 0 ? content.benefits : defaultBenefits

  // Détection du Scroll pour changer l'image active
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
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" } // Déclenche quand l'élément est au milieu de l'écran
      )
      
      if (observerRefs.current[index]) {
        observer.observe(observerRefs.current[index])
      }
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [benefitsData])

  return (
    <section id={id} className="relative bg-[#121212] py-24 overflow-hidden">
      
      {/* Background Glow Premium */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#cfaa5c]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#cfaa5c]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Titre Section */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[#cfaa5c] font-medium tracking-[0.2em] uppercase text-sm mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
            Real World Impact
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            From Spas to Clinics,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#f0e6d2]">
              Automation means Growth.
            </span>
          </h2>
        </div>

        {/* Layout : Sticky Scroll */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Colonne GAUCHE : Texte (Scrollable) */}
          <div className="lg:w-1/2 flex flex-col gap-[30vh] pb-[20vh]">
            {benefitsData.map((benefit, index) => (
              <div 
                key={index}
                ref={el => observerRefs.current[index] = el}
                className={`transition-all duration-500 ${activeCard === index ? 'opacity-100 scale-100' : 'opacity-30 scale-95 blur-[2px]'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full border border-[#cfaa5c]/30 flex items-center justify-center bg-[#cfaa5c]/10 text-[#cfaa5c]">
                    <span className="font-playfair font-bold text-xl">{index + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white">
                    {benefit.title}
                  </h3>
                </div>
                
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 pl-16 border-l border-[#cfaa5c]/20">
                  {benefit.description}
                </p>

                <div className="pl-16 flex gap-8">
                  {benefit.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold text-[#cfaa5c]">{stat.value}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Colonne DROITE : Image (Sticky / Fixe) */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <div className="sticky top-[20vh] h-[600px] w-full">
              {/* Cadre style iPhone / Premium */}
              <div className="relative w-full h-full rounded-[2.5rem] border-8 border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl overflow-hidden">
                {/* Dynamic Image */}
                {benefitsData.map((benefit, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeCard === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    {/* On utilise une image HTML standard pour éviter les soucis de config Next.js Image si les domaines ne sont pas whitelistés */}
                    <img 
                      src={benefit.image || "/images/placeholder.jpg"} 
                      alt={benefit.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient pour que le texte ressorte si besoin */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                ))}
              </div>

              {/* Elément décoratif flottant */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#cfaa5c]/10 rounded-full blur-3xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

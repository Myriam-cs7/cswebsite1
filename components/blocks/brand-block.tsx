"use client"

import { useSiteConfig } from "../site-config"
import Image from "next/image"

export default function BrandBlock({ id, content }) {
  const { config } = useSiteConfig()

  const safeContent = content || {}

  const {
    title = "cAIre Solutions",
    // J'ai retiré le subtitle d'ici pour le gérer manuellement dans le code
    description = "Combining French luxury expertise with cutting-edge technology for personalized skincare consultations",
    image = "/images/beauty-cs.png",
    backgroundColor = "bg-black",
    textColor = "text-white",
    customClass = "",
  } = safeContent

  const sectionStyle = {
    backgroundColor: backgroundColor.startsWith("#") ? backgroundColor : undefined,
    color: textColor.startsWith("#") ? textColor : undefined,
  }

  const sectionClasses = `py-20 md:py-32 ${
    backgroundColor.startsWith("bg-") ? backgroundColor : ""
  } ${textColor.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        
        {/* --- NOUVEAU : TITRE DE SECTION CENTRÉ --- */}
        <div className="text-center mb-20 md:mb-32">
           <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
              Value Proposition
           </span>
           <h2 className="text-4xl md:text-6xl font-serif text-white">
             Why choose cAIre?
           </h2>
        </div>

        {/* CONTENU PRINCIPAL */}
        {/* J'ai augmenté le gap à md:gap-24 pour bien séparer le texte de l'image */}
        <div className="flex flex-col md:flex-row items-center justify-between md:gap-24">
          
          {/* COLONNE TEXTE */}
          <div className="md:w-5/12 mb-16 md:mb-0 md:pr-0">
            <div className="mb-8 md:ml-4">
              {/* Logo cAIre */}
              <h1 className="text-6xl md:text-7xl font-playfair font-bold mb-4">
                <span className="text-[#cfaa5c]">c</span>
                <span className="text-white">AI</span>
                <span className="text-[#cfaa5c]">re</span>
              </h1>
              {/* Sous-titre mis à jour pour introduire le sujet */}
              <h3 className="text-2xl md:text-3xl font-montserrat font-light text-white">
                Technology & Acquisition
              </h3>
            </div>

            <div className="max-w-lg md:ml-4">
              <div className="bg-[#1A1A1A]/50 p-6 rounded-2xl border-l-4 border-[#cfaa5c] max-w-xl backdrop-blur-sm shadow-2xl">
                
                <p className="text-white/90 leading-relaxed text-lg">
                  cAIre finally brings together two essential growth levers: <span className="text-white font-medium">technology and acquisition.</span>
                </p>

                <p className="text-white/90 leading-relaxed text-lg mt-4">
                  On one hand, you get a beauty- and wellness-specialized <span className="text-[#cfaa5c]">virtual assistant</span> that can answer questions, advise, sell, and even book appointments for your team.
                </p>

                <p className="text-white/90 leading-relaxed text-lg mt-4">
                  On the other hand, you gain direct access to <span className="text-[#cfaa5c]">creators and influencers</span> who drive qualified traffic to your services, treatments, and products.
                </p>

                <p className="text-white/90 leading-relaxed text-lg mt-4">
                  Your clients discover your brand through authentic content and posts, and are instantly guided by a virtual advisor who turns that attention into bookings, sales, and long-term loyalty.
                </p>

                <p className="text-white font-medium leading-relaxed text-lg mt-6 pt-4 border-t border-white/10">
                  Clear, simple, effective: you attract more clients and convert more without increasing your team size.
                </p>

              </div>
            </div>
          </div>

          {/* COLONNE IMAGE */}
          <div className="md:w-7/12 flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-2xl">
              <Image
                src={image || "/placeholder.svg"}
                alt="Beauty Skincare"
                width={800}
                height={800}
                // Image avec coins très arrondis (Apple style)
                className="object-contain rounded-[2rem] shadow-2xl border border-white/5"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 800px"
              />
              {/* Éléments décoratifs en arrière-plan */}
              <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-[#cfaa5c]/10 blur-3xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

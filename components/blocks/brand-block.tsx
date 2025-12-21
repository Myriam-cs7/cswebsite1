"use client"

import Image from "next/image"

export default function BrandBlock({ id }: { id?: string }) {
  return (
    <section id={id} className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        
        {/* Titre Centré */}
        <div className="text-center mb-20">
           <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Our Mission
           </span>
           <h2 className="text-4xl md:text-6xl font-serif text-white">
             About Us
           </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* COLONNE TEXTE (Plus large pour accueillir tout le texte) */}
          <div className="w-full md:w-6/12">
            <h1 className="text-5xl font-serif font-bold mb-4">
              <span className="text-[#cfaa5c]">c</span>
              <span className="text-white">AI</span>
              <span className="text-[#cfaa5c]">re</span>
            </h1>
            <h3 className="text-2xl font-light text-white mb-8 tracking-wide">
              Technology & Acquisition
            </h3>

            <div className="bg-[#111] p-8 rounded-[2rem] border-l-2 border-[#cfaa5c] shadow-xl">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  cAIre finally brings together two essential growth levers: <strong className="text-white">technology and acquisition.</strong>
                </p>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  On one hand, you get a beauty- and wellness-specialized <span className="text-[#cfaa5c]">virtual assistant</span> (Glowbot) that can answer questions, advise, sell, and even book appointments for your team.
                </p>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  On the other hand, you gain direct access to <span className="text-[#cfaa5c]">creators and influencers</span> who drive qualified traffic to your services, treatments, and products.
                </p>

                {/* LE TEXTE QUE J'AVAIS OUBLIÉ EST ICI : */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your clients discover your brand through authentic content and posts, and are instantly guided by a virtual advisor who turns that attention into bookings, sales, and long-term loyalty.
                </p>

                <div className="pt-6 border-t border-white/10">
                    <p className="text-white font-medium text-lg italic">
                      "Clear, simple, effective: you attract more clients and convert more without increasing your team size."
                    </p>
                </div>
            </div>
          </div>

          {/* COLONNE IMAGE (Taille contrôlée) */}
          <div className="w-full md:w-5/12 flex justify-center">
             {/* J'ajoute max-w-md pour empêcher l'image de devenir géante */}
             <div className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/influencer-partner.png" 
                alt="Influencer Partner" 
                width={600} 
                height={800} 
                className="object-cover w-full h-auto" 
              />
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}

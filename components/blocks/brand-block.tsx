"use client"

import Image from "next/image"

export default function BrandBlock({ id }: { id?: string }) {
  return (
    <section id={id} className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        
        {/* Titre Centré */}
        <div className="text-center mb-24">
           <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#cfaa5c] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Our Mission
           </span>
           <h2 className="text-4xl md:text-6xl font-serif text-white">
             About Us
           </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          
          {/* COLONNE TEXTE */}
          <div className="md:w-5/12">
            <h1 className="text-5xl font-playfair font-bold mb-4">
              <span className="text-[#cfaa5c]">c</span>
              <span className="text-white">AI</span>
              <span className="text-[#cfaa5c]">re</span>
            </h1>
            <h3 className="text-2xl font-light text-white mb-8">
              Technology & Acquisition
            </h3>

            <div className="bg-[#111] p-8 rounded-[2rem] border-l-2 border-[#cfaa5c]">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  cAIre finally brings together two essential growth levers: <strong className="text-white">technology and acquisition.</strong>
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  On one hand, you get a beauty- and wellness-specialized <span className="text-[#cfaa5c]">virtual assistant</span> (Glowbot) that can answer questions, advise, sell, and even book appointments.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  On the other hand, you gain direct access to <span className="text-[#cfaa5c]">creators and influencers</span> who drive qualified traffic to your services.
                </p>
            </div>
          </div>

          {/* COLONNE IMAGE (Corrigée avec influencer-partner) */}
          <div className="md:w-6/12 relative">
             <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              {/* J'ai mis l'extension .png par défaut. Si votre image est en .jpg ou .webp, changez juste la fin ici */}
              <Image 
                src="/images/influencer-partner.png" 
                alt="Influencer Partner" 
                width={800} 
                height={800} 
                className="object-cover" 
              />
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}

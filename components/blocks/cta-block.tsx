"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CtaBlock() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Le conteneur principal style "Carte Premium" */}
        <div className="bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 relative border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
          
          {/* Lueur d'ambiance */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cfaa5c]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          {/* TEXTE A GAUCHE */}
          <div className="w-full md:w-1/2 relative z-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Ready to <span className="text-[#cfaa5c]">scale</span> your brand?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              Book a strategy session with our experts. We'll analyze your current setup and show you exactly how AI can increase your revenue.
            </p>
            
            <a 
              href="https://calendly.com/cairesolutions/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#cfaa5c] text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-[#b89548] transition-all hover:scale-105 shadow-lg shadow-[#cfaa5c]/20"
            >
              Book Free Expert Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* IMAGE A DROITE (Votre SVG) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
             <div className="relative w-full max-w-sm aspect-square">
                {/* Assurez-vous que le fichier est bien dans public/images/ */}
                <Image 
                  src="/images/expert-consulting-cs.svg" 
                  alt="Expert Consulting" 
                  fill
                  className="object-contain drop-shadow-2xl"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}

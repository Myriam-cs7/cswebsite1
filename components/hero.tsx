"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden pt-20">
      
      {/* Fond Gradient Luxe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-black to-black z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#cfaa5c]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-[#cfaa5c] animate-pulse"></span>
          <span className="text-xs font-medium text-gray-300 tracking-widest uppercase">
            AI for Luxury Wellness
          </span>
        </div>

        {/* Titre Principal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-medium tracking-tight mb-8 leading-tight">
          Your new <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfaa5c] to-[#e6d5b8] italic">unfair advantage</span><br />
          in beauty & wellness
        </h1>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Your smartest way to increase bookings, loyalty, and product sales without extra staff.
          The first AI Concierge dedicated to Elite Spas & Clinics.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          {/* Bouton Principal (Gold) */}
          <Link 
            href="https://app.youform.com/forms/gxc7dqht" 
            target="_blank"
            className="group relative px-8 py-4 bg-[#cfaa5c] text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(207,170,92,0.5)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              See WhatsApp Automation
            </span>
          </Link>

          {/* Bouton Secondaire (Outline) */}
          <Link 
            href="#features"
            className="group px-8 py-4 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
          >
            Explore Solutions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>

      {/* Élément décoratif bas de page */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce duration-[2000ms]">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#cfaa5c] rounded-full"></div>
        </div>
      </div>

    </section>
  )
}

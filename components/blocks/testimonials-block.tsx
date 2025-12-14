"use client"

import { Star, Quote } from "lucide-react"

export default function TestimonialsBlock() {
  
  // VOS VRAIS CLIENTS (Récupérés de votre capture d'écran)
  const reviews = [
    {
      name: "Phynacare",
      role: "Partner Brand",
      content: "Phynacare saw sales soar by 20% in just 3 months with cAIre Solutions—your brand can shine too.",
      stars: 5,
    },
    {
      name: "Doze",
      role: "Luxury Wellness",
      content: "Customer loyalty has never been stronger—our clients feel the difference.",
      stars: 5,
    },
    {
      name: "Institut Esthederm",
      role: "Premium Skincare",
      content: "Our AI reflects elegance and innovation—sales up, satisfaction up.",
      stars: 5,
    },
  ]

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#cfaa5c]/5 via-black to-black opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Testimonials
          </h2>
          <p className="text-[#cfaa5c] uppercase tracking-[0.2em] text-sm font-bold">
            Real Results from Real Brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-[#1A1A1A]/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-[#cfaa5c]/50 transition-colors duration-300 flex flex-col"
            >
              {/* Étoiles */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#cfaa5c] text-[#cfaa5c]" />
                ))}
              </div>

              {/* Texte */}
              <div className="relative mb-8 flex-grow">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#cfaa5c]/20 rotate-180" />
                <p className="text-gray-300 text-lg leading-relaxed relative z-10 pl-4">
                  "{review.content}"
                </p>
              </div>

              {/* Auteur */}
              <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#cfaa5c]/20 flex items-center justify-center text-[#cfaa5c] font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium">{review.name}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

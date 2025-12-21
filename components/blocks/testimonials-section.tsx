"use client"

import { Star } from "lucide-react"

export default function TestimonialsBlock({ id }: { id?: string }) {
  
  const testimonials = [
    {
      // --- MODIFICATION ICI ---
      company: "Docteur Beauty Care",
      // J'ai aussi adapté le nom dans la citation pour que ça soit cohérent
      quote: "Docteur Beauty Care saw sales soar by 20% in just 3 months with cAIre Solutions—your brand can shine too.",
      // Ici, on pointe vers l'image que vous avez mise dans public/images/
      logo: "/images/dr-beauty.png", 
    },
    {
      company: "Doze",
      quote: "Doze: Customer loyalty has never been stronger—our clients feel the difference.",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99e%CC%81cran%202025-04-08%20a%CC%80%2006.27.39.jpg-0qnXJStu9ANIevkVt4RY4YNSlavNw1.jpeg",
    },
    {
      company: "Institut Esthederm",
      quote: "Institut Esthederm: Our AI reflects elegance and innovation—sales up, satisfaction up.",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/phyphy%20%281%29-MEiBERtQFOzjiozG9yzUxSGjFLYYtA.webp",
    },
  ]

  return (
    <section id={id} className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-white">
            What our partners are saying: your success starts here.
          </h2>
          <p className="font-sans text-lg text-gray-400">
            Real results from real skincare brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-8 rounded-lg shadow-lg text-white hover:scale-105 hover:shadow-xl transition-transform duration-300 border border-white/10"
            >
              <div className="flex justify-center mb-6">
                
                {/* LOGIQUE D'AFFICHAGE DU LOGO */}
                
                {testimonial.company === "Docteur Beauty Care" ? (
                  // Style Rond pour Docteur Beauty Care (comme Phynacare avant)
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#cfaa5c] bg-white">
                    <img
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : testimonial.company === "Doze" ? (
                  // Style Carré pour Doze
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex items-center justify-center border-2 border-[#cfaa5c] bg-black p-2">
                    <img
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : testimonial.company === "Institut Esthederm" ? (
                  // Style Rond pour Esthederm
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#cfaa5c] bg-white p-2">
                    <img
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-32 bg-gray-700 flex items-center justify-center rounded">Logo</div>
                )}
              </div>
              
              <h3 className="font-serif text-xl font-bold mb-4 text-[#cfaa5c] text-center">
                {testimonial.company}
              </h3>
              
              {/* Etoiles ajoutées pour correspondre au design global */}
              <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#cfaa5c] text-[#cfaa5c]" />
                  ))}
              </div>

              <p className="font-sans text-gray-300 italic text-center leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

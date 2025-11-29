"use client"

import { useSiteConfig } from "../site-config"

export default function TestimonialsSection({ id, content }) {
  const { config } = useSiteConfig()

  // Utiliser les valeurs du contenu ou les valeurs par défaut
  const {
    title = "What our partners are saying your success starts here.",
    description = "Real results from real skincare brands.",
    testimonials = [
      {
        company: "Phynacare",
        quote: "Phynacare saw sales soar by 20% in just 3 months with cAIre Solutions—your brand can shine too.",
        logo: "/placeholder.svg?height=60&width=120",
      },
      {
        company: "Doze",
        quote: "Doze: Customer loyalty has never been stronger—our clients feel the difference.",
        logo: "/placeholder.svg?height=60&width=120",
      },
      {
        company: "Institut Esthederm",
        quote: "Institut Esthederm: Our AI reflects elegance and innovation—sales up, satisfaction up.",
        logo: "/placeholder.svg?height=60&width=120",
      },
    ],
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
    ctaButtonLink = "#",
  } = content

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor.startsWith("#") ? backgroundColor : undefined,
    color: textColor.startsWith("#") ? textColor : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `py-20 ${
    backgroundColor.startsWith("bg-") ? backgroundColor : ""
  } ${textColor.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">{title}</h2>
          <p className="font-montserrat text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-8 rounded-lg shadow-lg text-white hover:scale-105 hover:shadow-xl transition-transform duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={testimonial.logo || "/placeholder.svg"}
                  alt={`${testimonial.company} logo`}
                  className="h-12 object-contain"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4 text-[#cfaa5c] text-center">{testimonial.company}</h3>
              <p className="font-montserrat text-[#F5F5F5] italic text-center">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

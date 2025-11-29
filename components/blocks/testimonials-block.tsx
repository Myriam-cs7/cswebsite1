"use client"

import { useSiteConfig } from "../site-config"
import { useTranslation } from "@/components/translations"

export default function TestimonialsBlock({ id, content }) {
  const { config } = useSiteConfig()
  // Ajoutons l'utilisation du hook useTranslation
  const { t, language } = useTranslation()

  // Utiliser les valeurs du contenu ou les valeurs par défaut avec traduction
  const {
    title = t("What Our Clients Say", "What Our Clients Say"),
    description = t(
      "Discover how luxury brands are transforming their customer experience with our AI solutions.",
      "Discover how luxury brands are transforming their customer experience with our AI solutions.",
    ),
    testimonials = [
      {
        quote: t(
          "cAIre Solutions has revolutionized how we connect with our customers online. The AI assistant feels like a natural extension of our brand voice.",
          "cAIre Solutions has revolutionized how we connect with our customers online. The AI assistant feels like a natural extension of our brand voice.",
        ),
        author: "Sophie Laurent",
        position: t("Digital Director", "Digital Director"),
        company: "Lumière Skincare",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        quote:
          "Since implementing cAIre's AI assistant, we've seen a 42% increase in customer satisfaction and a 35% boost in online sales.",
        author: "Jean-Pierre Dubois",
        position: "CEO",
        company: "Élysée Beauty",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        quote:
          "The level of personalization cAIre provides is unmatched. Our customers feel truly understood and valued throughout their digital journey.",
        author: "Maria Rodriguez",
        position: "Customer Experience Lead",
        company: "Luxe Cosmetics",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
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
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#cfaa5c]/20 mx-auto">
                  <img
                    src={testimonial.image || "/placeholder.svg?height=200&width=200"}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#cfaa5c]/20 -z-10"></div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                <p className="text-sm text-gray-600">
                  {testimonial.position}, {testimonial.company}
                </p>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

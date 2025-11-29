"use client"

import { useState, useEffect, useRef } from "react"
import { useSiteConfig } from "../site-config"
import { useTranslation } from "@/components/translations"

// Ajouter ce hook personnalisé pour l'animation de comptage
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const startTime = useRef(null)
  const endValue = useRef(end)
  const animationFrameId = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [numericValue, setNumericValue] = useState(0) // Initialize numericValue

  useEffect(() => {
    endValue.current = end
    // Extract the numeric value from the string
    setNumericValue(Number.parseInt(end.replace(/[^0-9]/g, "")))
  }, [end])

  useEffect(() => {
    // Réinitialiser le compteur lorsqu'il entre dans la vue
    const observer = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries[0].isIntersecting)
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("client-results")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  useEffect(() => {
    if (isIntersecting) {
      startTime.current = null

      const animate = () => {
        if (!startTime.current) startTime.current = performance.now()
        const elapsed = performance.now() - startTime.current

        if (elapsed < duration) {
          const progress = elapsed / duration
          // Fonction d'accélération pour un effet plus dynamique
          const easedProgress =
            progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

          setCount(Math.floor(easedProgress * numericValue))
          animationFrameId.current = requestAnimationFrame(animate)
        } else {
          setCount(numericValue)
        }
      }

      animationFrameId.current = requestAnimationFrame(animate)

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
        }
      }
    }
  }, [isIntersecting, numericValue])

  return count
}

export default function BenefitsBlock({ id, content }) {
  const { config } = useSiteConfig()
  // Ajoutons l'utilisation du hook useTranslation
  const { t, language } = useTranslation()

  // Utiliser les valeurs du contenu ou les valeurs par défaut avec traduction
  const {
    title = t("Transform Your Customer Experience", "Transform Your Customer Experience"),
    description = t(
      "Discover how our AI solutions can elevate your brand's digital presence.",
      "Discover how our AI solutions can elevate your brand's digital presence.",
    ),
    items = [
      {
        title: t("Enhance customer satisfaction", "Enhance customer satisfaction"),
        description: t(
          "Guide customers to the perfect products for their needs, increasing purchase likelihood by an average of 35%.",
          "Guide customers to the perfect products for their needs.",
        ),
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20may%20I%20assist%20you.jpg-i9HpxEl4AxlbBnpNcXhZhMyL5pS5Wo.jpeg",
      },
      {
        title: "Build Brand Trust",
        description: "Provide instant, accurate skincare advice that builds trust and confidence in your brand.",
        image:
          "https://bvblegvbmnf3ahcv.public.blob.vercel-storage.com/Enhance%20Customer%20Satisfaction-R0vIiMotNqkmkSqx4PRQlZZIiQ1M1f.jpg",
      },
      {
        title: t("Gain Valuable Customer Insights", "Gain Valuable Customer Insights"),
        description: t(
          "Learn from every interaction to better understand your customers' needs and preferences.",
          "Learn from every interaction to better understand your customers' needs and preferences.",
        ),
        image:
          "https://bvblegvbmnf3ahcv.public.blob.vercel-storage.com/Gain%20Valuable%20Customer%20Insights-o3P9nHxsGPdIPmTOrKphhwjZBtSA5f.jpg",
      },
      {
        title: t("Reduce Support Costs", "Reduce Support Costs"),
        description: t(
          "Automate routine inquiries while maintaining the luxury experience your customers expect.",
          "Automate routine inquiries while maintaining the luxury experience your customers expect.",
        ),
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    results = [
      { label: t("Conversion Rate", "Conversion Rate"), value: "+35%" },
      { label: t("Customer Satisfaction", "Customer Satisfaction"), value: "+98%" },
      { label: t("Average Order Value", "Average Order Value"), value: "+28%" },
      { label: t("Customer Retention", "Customer Retention"), value: "+45%" },
    ],
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = content

  // Créer des compteurs pour chaque résultat
  const counts = results.map((result) => useCountUp(result.value))

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
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {items.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-fadeInUp hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 relative">
                <div className="w-full h-64 overflow-hidden shadow-lg">
                  <img
                    src={benefit.image || "/placeholder.svg?height=400&width=600"}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-playfair text-xl font-semibold mb-3 text-[#1A1A1A]">{benefit.title}</h3>
                <p className="font-montserrat text-[#666666]">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          id="client-results"
          className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-xl p-6 md:py-12 md:px-6 animate-fadeInUp"
        >
          <h3 className="font-playfair text-2xl font-bold text-center mb-10 text-[#F5F5F5]">Client Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-[#cfaa5c] text-3xl md:text-4xl font-bold mb-2">{`${counts[index]}%`}</div>
                <div className="text-white font-medium">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

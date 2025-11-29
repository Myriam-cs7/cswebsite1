"use client"

import { useSiteConfig } from "../site-config"
import { useState, useEffect, useRef } from "react"

// Hook personnalisé pour l'animation de comptage
function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const startTime = useRef(null)
  const animationFrameId = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [numericValue, setNumericValue] = useState(0)

  useEffect(() => {
    // Extraire la valeur numérique de la chaîne (par exemple, "25+" -> 25)
    const match = end.match(/\d+/)
    setNumericValue(match ? Number.parseInt(match[0], 10) : 0)
  }, [end])

  useEffect(() => {
    // Réinitialiser le compteur lorsqu'il entre dans la vue
    const observer = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries[0].isIntersecting)
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about-stats")
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
  }, [isIntersecting, numericValue, duration])

  return count
}

export default function AboutBlock({ id, content }) {
  const { config } = useSiteConfig()

  // Utiliser les valeurs du contenu ou les valeurs par défaut
  const {
    title = "Combining French Skincare Expertise with AI Innovation",
    paragraphs = [
      "Founded in Paris in 2022, cAIre Solutions was born to revolutionize how luxury skincare brands approach customer relationships with consultations available 24/7.",
      "Our team combines 15 years of expertise in French luxury beauty with advanced AI mastery to deliver the same quality of personalized advice online as in-store, any time of day or night.",
    ],
    stats = [
      { label: "Luxury Brands", value: "25+" },
      { label: "Customer Interactions", value: "15M+" },
      { label: "Customer Satisfaction", value: "98%" },
      { label: "Sales Increase", value: "35%" },
    ],
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = content

  // Créer des compteurs pour chaque statistique
  const counts = stats.map((stat) => useCountUp(stat.value))

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

  // Fonction pour formater la valeur affichée
  const formatStatValue = (value, count) => {
    if (value.includes("M")) {
      return `${count}M+`
    } else if (value.includes("%")) {
      return `${count}%`
    } else {
      return `${count}+`
    }
  }

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fadeInUp">
          <h2 className="section-title">{title}</h2>

          {/* Image ajoutée */}
          <div className="mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20sans%20titre%20%281%29-abaQKAaphgiNR1TrGkMDhp3AlAs843.png"
              alt="AI-powered skincare recommendations"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-[#666666]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div id="about-stats" className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-md hover-lift hover-shadow animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-value">{formatStatValue(stat.value, counts[index])}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

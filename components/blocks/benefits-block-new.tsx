"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSiteConfig } from "../site-config"
import { Award, TrendingUp, Users, DollarSign } from "lucide-react"

// Hook personnalisé pour l'animation de comptage (conservé tel quel)
function useCountUp(end, duration = 2000) {
  const endValue = useRef(end)
  const [count, setCount] = useState(0)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const startTime = useRef(null)
  const animationFrameRef = useRef(null)
  const observerRef = useRef(null)
  const [numericValue, setNumericValue] = useState(0)

  useEffect(() => {
    endValue.current = end
    // Extraire la valeur numérique de la chaîne (par exemple, "+35%" -> 35)
    const match = end.match(/\d+/)
    setNumericValue(match ? Number.parseInt(match[0], 10) : 0)
  }, [end])

  const animate = useCallback(() => {
    if (!isIntersecting) return

    if (!startTime.current) startTime.current = performance.now()
    const elapsed = performance.now() - startTime.current

    if (elapsed < duration) {
      const progress = elapsed / duration
      const easedProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setCount(Math.floor(easedProgress * numericValue))
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      setCount(numericValue)
    }
  }, [duration, isIntersecting, numericValue])

  useEffect(() => {
    const element = document.getElementById("benefits-results")

    const observerCallback = (entries) => {
      setIsIntersecting(entries[0].isIntersecting)
      if (entries[0].isIntersecting) {
        startTime.current = null
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }

    if (element) {
      observerRef.current = new IntersectionObserver(observerCallback, { threshold: 0.1 })
      observerRef.current.observe(element)
    }

    return () => {
      if (element && observerRef.current) observerRef.current.unobserve(element)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate])

  return count
}

export default function BenefitsBlockNew({ id, content }) {
  const { config } = useSiteConfig()
  const [activeTab, setActiveTab] = useState(0)

  // Utiliser les valeurs du contenu ou les valeurs par défaut
  const {
    title = "Elevate Your Brand with Proven Benefits",
    description = "Discover how our AI solutions deliver measurable results for luxury skincare brands.",
    benefits = [
      {
        title: "Increase Conversion Rates",
        description:
          "Provide personalized skincare consultations 24/7, creating memorable interactions that build brand loyalty.",
        icon: "Users",
        stats: [
          { value: "98", label: "Customer Satisfaction" },
          { value: "24/7", label: "Availability" },
        ],
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20may%20I%20assist%20you.jpg-i9HpxEl4AxlbBnpNcXhZhMyL5pS5Wo.jpeg",
      },
      {
        title: "Enhance Customer Satisfaction",
        description:
          "Guide customers to the perfect products for their unique needs, significantly boosting purchase likelihood.",
        icon: "TrendingUp",
        stats: [
          { value: "35", label: "Conversion Increase" },
          { value: "28", label: "Higher AOV" },
        ],
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LP%20GlowBot.jpg-3ZP9FymQm7qgSv01VH7dpzXqSTZ0nd.jpeg",
      },
      {
        title: "Gain Valuable Customer Insight",
        description: "Learn from every interaction to better understand your customers needs and preferences",
        icon: "DollarSign",
        stats: [
          { value: "100", label: "Brand Alignment" },
          { value: "0", label: "Off-Brand Responses" },
        ],
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gain%20Valuable%20Customer%20Insights.jpg-sd0cXaxbHXDo9OOO9iD7yCepExvmfz.jpeg",
      },
      {
        title: "Actionable Customer Insights",
        description:
          "Gain valuable data from every interaction to better understand your customers' needs and preferences.",
        icon: "Award",
        stats: [
          { value: "45", label: "Retention Increase" },
          { value: "3x", label: "Customer Data" },
        ],
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gain%20Valuable%20Customer%20Insights.jpg-sd0cXaxbHXDo9OOO9iD7yCepExvmfz.jpeg",
      },
    ],
    results = [
      { label: "Conversion Rate", value: "+35%" },
      { label: "Customer Satisfaction", value: "+98%" },
      { label: "Average Order Value", value: "+28%" },
      { label: "Customer Retention", value: "+45%" },
    ],
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = content

  // Fonction pour obtenir l'icône appropriée
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-8 h-8 text-[#cfaa5c]" />
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-[#cfaa5c]" />
      case "DollarSign":
        return <DollarSign className="w-8 h-8 text-[#cfaa5c]" />
      case "Award":
        return <Award className="w-8 h-8 text-[#cfaa5c]" />
      default:
        return <Award className="w-8 h-8 text-[#cfaa5c]" />
    }
  }

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor?.startsWith("#") ? backgroundColor : undefined,
    color: textColor?.startsWith("#") ? textColor : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `py-24 ${
    backgroundColor?.startsWith("bg-") ? backgroundColor : ""
  } ${textColor?.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section
      id={id}
      className={sectionClasses}
      style={{ ...sectionStyle, background: "linear-gradient(to bottom, #f8f5f0, #ffffff)" }}
    >
      <div className="container mx-auto px-4">
        {/* En-tête de section avec design cohérent */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#cfaa5c]/10 rounded-full">
            <span className="text-sm font-medium text-[#cfaa5c]">Proven Results</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">{title}</h2>
          <p className="text-lg text-[#666666]">{description}</p>
        </div>

        {/* Navigation des onglets avec design élégant et épuré */}
        <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfaa5c] focus-visible:ring-offset-2 ${
                activeTab === index
                  ? "bg-[#cfaa5c] text-white font-semibold shadow-lg hover:bg-[#b89548] hover:shadow-xl"
                  : "bg-white text-[#1A1A1A] border border-[#cfaa5c]/50 hover:border-[#cfaa5c] hover:shadow-md hover:translate-y-[-1px]"
              }`}
            >
              <span className="relative overflow-hidden block">
                {benefit.title}
                {activeTab === index && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent"></span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Contenu du bénéfice actif avec design cohérent */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          {/* Contenu textuel */}
          <div className="animate-fadeInLeft order-2 md:order-1" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#cfaa5c]/20 flex items-center justify-center mr-4 shadow-lg shadow-[#cfaa5c]/5">
                {getIcon(benefits[activeTab]?.icon)}
              </div>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                {benefits[activeTab]?.title}
              </h3>
            </div>
            <p className="text-[#666666] mb-8 text-lg leading-relaxed">{benefits[activeTab]?.description}</p>

            <div className="grid grid-cols-2 gap-6">
              {benefits[activeTab]?.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 border-l-4 border-[#cfaa5c] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-[#cfaa5c] text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-[#1A1A1A] font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image avec design cohérent */}
          <div
            className="relative h-[450px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2 animate-fadeInRight"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Fond clair pour contraste */}
            <div className="absolute inset-0 bg-[#f8f5f0]"></div>

            {/* Bordure élégante */}
            <div className="absolute inset-0 rounded-xl border border-[#cfaa5c]/30"></div>

            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfaa5c]/10 to-transparent animate-shimmer-luxury"></div>

            {/* Image différente pour chaque onglet - ajustée pour être entièrement visible */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={benefits[activeTab]?.image || "/placeholder.svg"}
                alt={benefits[activeTab]?.title}
                className="max-h-full object-contain z-10"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border border-[#cfaa5c]/20 z-20"></div>
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full border border-[#cfaa5c]/20 z-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

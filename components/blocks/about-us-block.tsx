"use client"

import { useSiteConfig } from "../site-config"
import Image from "next/image"
import { useTranslation } from "@/components/translations"
import { useEffect, useState, useRef } from "react"

export default function AboutUsBlock({ id, content }) {
  const { config } = useSiteConfig()
  const { language, t } = useTranslation()
  const [bioText, setBioText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const hasLoadedRef = useRef(false)

  // Vérifier que content existe
  const safeContent = content || {}

  // Précharger les traductions nécessaires
  useEffect(() => {
    // Utiliser une référence pour éviter les appels multiples
    if (hasLoadedRef.current) return

    const loadTranslations = async () => {
      setIsLoading(true)

      // Définir le texte de biographie en fonction de la langue
      if (language !== "en") {
        // Version simplifiée pour éviter les appels API
        const englishBio =
          "Hello, I'm Myriam\n\nA few years ago, I made a life-changing decision: I quit smoking.\n\nAfter years of damaging my health, I reclaimed control. Day by day, I rediscovered my body's potential. My sleep improved, my breathing deepened, and my skin... my skin transformed! So much that people constantly asked: \"Myriam, you look radiant! Did you just return from vacation?\"\n\nThis unexpected transformation ignited my passion: Skincare.\n\nNot just any skincare, but an experience that eliminates confusion and addresses real needs."

        // Utiliser une traduction statique au lieu d'un appel API
        const translatedBio =
          language === "fr"
            ? "Bonjour, je suis Myriam\n\nIl y a quelques années, j'ai pris une décision qui a changé ma vie : j'ai arrêté de fumer.\n\nAprès des années à nuire à ma santé, j'ai repris le contrôle. Jour après jour, j'ai redécouvert le potentiel de mon corps. Mon sommeil s'est amélioré, ma respiration s'est approfondie, et ma peau... ma peau s'est transformée ! À tel point que les gens me demandaient constamment : \"Myriam, tu as l'air radieuse ! Tu reviens de vacances ?\"\n\nCette transformation inattendue a éveillé ma passion : les soins de la peau.\n\nPas n'importe quels soins, mais une expérience qui élimine la confusion et répond aux besoins réels."
            : englishBio

        setBioText(translatedBio)
      } else {
        setBioText(
          "Hello, I'm Myriam\n\nA few years ago, I made a life-changing decision: I quit smoking.\n\nAfter years of damaging my health, I reclaimed control. Day by day, I rediscovered my body's potential. My sleep improved, my breathing deepened, and my skin... my skin transformed! So much that people constantly asked: \"Myriam, you look radiant! Did you just return from vacation?\"\n\nThis unexpected transformation ignited my passion: Skincare.\n\nNot just any skincare, but an experience that eliminates confusion and addresses real needs.",
        )
      }

      setIsLoading(false)
      hasLoadedRef.current = true
    }

    loadTranslations()
  }, [language]) // Dépendance uniquement à language

  // Pour les sous-propriétés, utiliser une approche sécurisée
  const ceo = safeContent.ceo || {}

  // Utiliser les valeurs du contenu ou les valeurs par défaut
  const {
    title = "About Us",
    subtitle = "",
    description = "",
    backgroundColor = "bg-white",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = safeContent

  // Utiliser des valeurs par défaut pour les propriétés de CEO
  const ceoData = {
    name: ceo.name || "Myriam Rezgui",
    position: ceo.position || t("CEO & Founder", "CEO & Founder"),
    bio: bioText,
    image:
      ceo.image ||
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20sans%20titre%20%282%29%20%281%29.jpg-mo76qLjUGhBJH5chiDrZwAzLHituR6.jpeg",
  }

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

  // Function to render paragraphs with line breaks
  const renderBio = (text) => {
    return text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="text-gray-600 mb-4">
        {paragraph}
      </p>
    ))
  }

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2 text-[#1A1A1A]">{title}</h2>
          {subtitle && <p className="font-montserrat text-lg text-gray-600 mb-6">{subtitle}</p>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        {/* CEO Section - Avec photo rectangulaire */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Photo rectangulaire au lieu de ronde */}
              <div className="w-full max-w-md overflow-hidden border-4 border-[#cfaa5c]/20 rounded-lg shadow-lg">
                <Image
                  src={ceoData.image || "/placeholder.svg?height=400&width=600"}
                  alt={ceoData.name}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-[#cfaa5c]/10 -z-10"></div>
                <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-[#cfaa5c]/20 -z-10"></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-2">{ceoData.name}</h3>
            <p className="text-[#cfaa5c] font-medium mb-4">{ceoData.position}</p>
            <div className="text-gray-600 mb-6 space-y-4">
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                renderBio(ceoData.bio)
              )}
            </div>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.linkedin.com/in/myriam-rezgui"
                className="text-gray-600 hover:text-[#cfaa5c]"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

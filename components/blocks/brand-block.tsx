"use client"

import { useSiteConfig } from "../site-config"
import Image from "next/image"

export default function BrandBlock({ id, content }) {
  const { config } = useSiteConfig()

  // Vérifier que content existe
  const safeContent = content || {}

  // Utiliser des valeurs par défaut lors de la destructuration
  const {
    title = "cAIre Solutions",
    subtitle = "AI-Powered Skincare",
    description = "Combining French luxury expertise with cutting-edge technology for personalized skincare consultations",
    image = "/images/beauty-cs.png",
    backgroundColor = "bg-black",
    textColor = "text-white",
    customClass = "",
  } = safeContent

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundColor: backgroundColor.startsWith("#") ? backgroundColor : undefined,
    color: textColor.startsWith("#") ? textColor : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `py-20 ${
    backgroundColor.startsWith("bg-") ? backgroundColor : ""
  } ${textColor.startsWith("text-") ? textColor : ""} ${customClass}`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between md:gap-2">
          <div className="md:w-5/12 mb-10 md:mb-0 md:pr-0">
            <div className="mb-6 md:ml-4">
              <h1 className="text-6xl md:text-7xl font-playfair font-bold mb-2">
                <span className="text-[#cfaa5c]">c</span>
                <span className="text-white">AI</span>
                <span className="text-[#cfaa5c]">re</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-montserrat font-light text-white">{subtitle}</h2>
            </div>

            <div className="max-w-lg md:ml-4">
              <div className="bg-[#1A1A1A]/50 p-6 rounded-lg border-l-4 border-[#cfaa5c] max-w-xl">
                <p className="text-white/90 leading-relaxed text-lg">
                  Imagine an AI that captures your clients' attention from the very first interaction, offering
                  intelligent recommendations and a tone perfectly aligned with your brand's values.
                </p>
                <p className="text-white/90 leading-relaxed text-lg mt-4">
                  Available 24/7, our skincare assistant leverages cutting-edge dermatological research to provide a
                  seamless, personalized experience.
                </p>
                <p className="text-white/90 leading-relaxed text-lg mt-4 font-medium">
                  The result? Higher engagement rates, improved customer satisfaction, and soaring sales—up to a 35%
                  increase for our partners.
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-7/12 flex justify-center md:justify-start relative">
            <div className="relative w-full max-w-xl">
              <Image
                src={image || "/placeholder.svg"}
                alt="Beauty Skincare"
                width={800}
                height={800}
                className="object-contain"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#cfaa5c]/20 -z-10"></div>
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#cfaa5c]/10 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useSiteConfig } from "../site-config"
import CalendlyButton from "../calendly-integration"
import YouformButton from "../youform-integration"

export default function CtaBlockEnhanced({ id, content }) {
  const { config } = useSiteConfig()

  const {
    title = "Ready to Transform Your Customer Experience?",
    description = "Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.",
    primaryButton = "Request a Demo",
    secondaryButton = "Contact Sales",
    backgroundColor = "bg-[#1A1A1A]",
    textColor = "text-white",
    backgroundImage = "",
    customClass = "",
    // Ajoutez ces propriétés à votre configuration
    calendlyUrl = "https://calendly.com/cairesolutions/30min", // Remplacez par votre URL Calendly
    youformId = "gxc7dqht", // Remplacez par votre ID Youform
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
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-[#cfaa5c]">{title}</h2>
          <p className="font-montserrat text-xl mb-10 text-[#F5F5F5]">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <YouformButton
              formId={youformId}
              text={primaryButton}
              className="bg-[#cfaa5c] hover:bg-[#b89548] text-black px-8 py-3 rounded-full"
            />
            <CalendlyButton
              url={calendlyUrl}
              text={secondaryButton}
              variant="outline"
              className="border-2 border-[#cfaa5c] text-[#cfaa5c] px-8 py-3 rounded-full hover:bg-[#cfaa5c] hover:text-black"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

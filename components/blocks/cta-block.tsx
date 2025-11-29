"use client"

import { Button } from "@/components/ui/button"
import { useSiteConfig } from "../site-config"
import { useTranslation } from "@/components/translations"

export default function CtaBlock({ id, content }) {
  const { config } = useSiteConfig()
  const { t } = useTranslation()

  const {
    title = t("Ready to Transform Your Customer Experience?", "Ready to Transform Your Customer Experience?"),
    description = t(
      "Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.",
      "Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.",
    ),
    primaryButton = t("Request a Demo", "Request a Demo"),
    secondaryButton = t("Contact Sales", "Contact Sales"),
    backgroundColor = "bg-[#1A1A1A]",
    textColor = "text-white",
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
        <div className="max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left side with image - redesigned with elegant light background */}
            <div className="md:w-2/5 hidden md:block relative overflow-hidden bg-gradient-to-b from-[#f5f2e8] to-[#e8e0cc]">
              <div className="absolute inset-0 bg-[#cfaa5c]/5"></div>
              <div
                className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#2A2A2A] to-transparent"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 100%)",
                }}
              ></div>
              <div className="h-full flex items-center justify-center p-6 relative">
                <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/expert-consulting-cs.svg"
                    alt="Expert Consultant"
                    className="w-auto h-[120%] max-w-none object-contain object-center translate-y-[10%]"
                  />
                </div>
              </div>
            </div>

            {/* Right side with content */}
            <div className="md:w-3/5 p-8 md:p-12 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]">
              <div className="inline-flex items-center px-4 py-2 bg-[#cfaa5c]/10 rounded-full mb-6">
                <span className="inline-block w-2 h-2 bg-[#cfaa5c] rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-[#cfaa5c]">Limited availability this month</span>
              </div>

              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-[#cfaa5c] leading-tight">
                Transform your customer experience with expert guidance
              </h2>

              <p className="font-montserrat text-lg mb-6 text-[#F5F5F5] leading-relaxed">{description}</p>

              <div className="space-y-6">
                <div className="flex flex-col space-y-3">
                  {/* Benefits list with icons */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#cfaa5c]/20 flex items-center justify-center mt-1 mr-3">
                      <svg className="w-3 h-3 text-[#cfaa5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#F5F5F5]">Personalized strategy session with our AI experts</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#cfaa5c]/20 flex items-center justify-center mt-1 mr-3">
                      <svg className="w-3 h-3 text-[#cfaa5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#F5F5F5]">Custom implementation roadmap for your brand</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#cfaa5c]/20 flex items-center justify-center mt-1 mr-3">
                      <svg className="w-3 h-3 text-[#cfaa5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#F5F5F5]">ROI projection based on your specific business needs</span>
                  </div>
                </div>

                <Button
                  className="w-full sm:w-auto bg-[#cfaa5c] hover:bg-white text-black text-lg py-6 px-8 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  href={content.primaryButtonLink}
                >
                  {primaryButton}
                  <span className="bg-black/10 px-2 py-1 rounded text-sm ml-2">Free 30-min Session</span>
                </Button>

                <p className="text-sm text-gray-400 text-center sm:text-left">
                  No credit card required • Cancel anytime • 100% confidential
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

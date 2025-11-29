"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useSiteConfig } from "../site-config"
import { useTranslation } from "@/components/translations"

export default function FaqBlock({ id, content }) {
  const { config } = useSiteConfig()
  // Ajoutons l'utilisation du hook useTranslation
  const { t, language } = useTranslation()

  // Utiliser les valeurs du contenu ou les valeurs par défaut avec traduction
  const {
    title = t("Frequently Asked Questions", "Frequently Asked Questions"),
    description = t(
      "Find answers to common questions about our AI solutions for luxury skincare brands.",
      "Find answers to common questions about our AI solutions for luxury skincare brands.",
    ),
    faqs = [
      {
        question: t(
          "How does the AI assistant maintain our brand voice?",
          "How does the AI assistant maintain our brand voice?",
        ),
        answer: t(
          "Our AI is trained on your brand guidelines, product information, and communication style to ensure it represents your brand authentically. We work closely with your team during implementation to capture the nuances of your brand voice.",
          "Our AI is trained on your brand guidelines, product information, and communication style to ensure it represents your brand authentically. We work closely with your team during implementation to capture the nuances of your brand voice.",
        ),
      },
      {
        question: "Can the AI assistant be integrated with our existing e-commerce platform?",
        answer:
          "Yes, our solution integrates seamlessly with all major e-commerce platforms including Shopify, Magento, WooCommerce, and custom solutions. We provide APIs and plugins to ensure smooth integration with your existing systems.",
      },
      {
        question: "How long does implementation typically take?",
        answer:
          "The standard implementation timeline is 2-4 weeks, depending on the complexity of your product catalog and the level of customization required. Our team works efficiently to ensure minimal disruption to your operations.",
      },
      {
        question: "What languages does the AI assistant support?",
        answer:
          "Our AI assistant supports over 20 languages, including English, French, German, Spanish, Italian, Chinese, Japanese, and Arabic. We can add support for additional languages based on your specific market needs.",
      },
      {
        question: "How do you ensure the privacy and security of customer data?",
        answer:
          "We take data privacy extremely seriously. Our systems are GDPR and CCPA compliant, and we use enterprise-grade encryption for all data. We only collect and process data that is necessary for providing the service, and we never sell customer data to third parties.",
      },
    ],
    backgroundColor = "bg-gray-50",
    textColor = "text-black",
    backgroundImage = "",
    customClass = "",
  } = content

  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
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

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className={`flex justify-between items-center w-full text-left p-6 rounded-lg ${
                  openIndex === index ? "bg-[#cfaa5c]/10" : "bg-white"
                }`}
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#cfaa5c]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="bg-white p-6 rounded-b-lg border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

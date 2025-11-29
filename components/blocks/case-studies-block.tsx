"use client"

import { useSiteConfig } from "../site-config"
import CaseStudyCard from "../case-study-card"

export default function CaseStudiesBlock({ id, content }) {
  const { config } = useSiteConfig()

  // Utiliser les valeurs du contenu ou les valeurs par défaut
  const {
    title = "Success Stories",
    description = "See how luxury brands are transforming their customer experience with our AI solutions",
    caseStudies = [
      {
        title: "35% Increase in Customer Engagement",
        client: "Phynacare Luxury Skincare",
        description: "How a premium French skincare brand revolutionized their online consultations with AI.",
        results: [
          { label: "Conversion Rate", value: "+35%" },
          { label: "Avg. Order Value", value: "+28%" },
          { label: "Customer Satisfaction", value: "98%" },
          { label: "ROI", value: "410%" },
        ],
        image: "/images/case-study-1.jpg",
        link: "/case-studies/phynacare",
      },
      {
        title: "Personalized Recommendations at Scale",
        client: "Institut Esthederm",
        description: "Delivering tailored skincare advice to thousands of customers simultaneously.",
        results: [
          { label: "Customer Retention", value: "+42%" },
          { label: "Support Costs", value: "-30%" },
          { label: "Product Recommendations", value: "98% accurate" },
          { label: "Implementation", value: "3 weeks" },
        ],
        image: "/images/case-study-2.jpg",
        link: "/case-studies/institut-esthederm",
      },
      {
        title: "Multilingual Support for Global Expansion",
        client: "Doze Luxury Cosmetics",
        description: "How AI-powered consultations helped a luxury brand expand to 12 new markets.",
        results: [
          { label: "New Markets", value: "12" },
          { label: "Languages", value: "8" },
          { label: "International Sales", value: "+65%" },
          { label: "Time to Market", value: "-70%" },
        ],
        image: "/images/case-study-3.jpg",
        link: "/case-studies/doze-cosmetics",
      },
    ],
    backgroundColor = "bg-gray-50",
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
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#cfaa5c]/10 rounded-full">
            <span className="text-sm font-medium text-[#cfaa5c]">Real Results</span>
          </div>
          <h2 className="font-playfair text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard
              key={index}
              title={caseStudy.title}
              client={caseStudy.client}
              description={caseStudy.description}
              results={caseStudy.results}
              image={caseStudy.image}
              link={caseStudy.link}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

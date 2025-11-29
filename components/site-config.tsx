"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Interface pour les sections du site
export interface SiteSection {
  id: string
  title: string
  description?: string
  visible: boolean
  order: number
  template?: string
  content: any
  // Ajoutez ces propriétés pour les intégrations
  calendlyUrl?: string
  youformId?: string
}

// Interface pour la configuration du site
export interface SiteConfig {
  sections: SiteSection[]
  logo: string
  primaryColor: string
  secondaryColor: string
  siteName?: string
  siteDescription?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  socialLinks?: {
    linkedin?: string
    instagram?: string
    [key: string]: string | undefined
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
  }
  analytics?: {
    googleAnalyticsId?: string
    facebookPixelId?: string
    enabledAnalytics?: boolean
  }
}

// Configuration par défaut
const defaultConfig: SiteConfig = {
  sections: [
    {
      id: "hero",
      title: "Section Héro",
      visible: true,
      order: 1,
      template: "hero",
      content: {
        showChatbot: true,
        buttonText: "Start Free Trial",
        secondaryButtonText: "Get a Demo",
        primaryButtonLink: "https://app.youform.com/forms/gxc7dqht", // Votre ID Youform
        // Ajoutez ces propriétés
        youformId: "gxc7dqht", // Votre ID Youform
        calendlyUrl: "https://calendly.com/cairesolutions/30min", // Votre URL Calendly
      },
    },
    {
      id: "about-us",
      title: "Notre Équipe",
      visible: true,
      order: 1.5, // Nouvelle valeur pour placer cette section juste après Hero
      template: "about-us",
      content: {
        title: "About Us",
        subtitle: "",
        description: "",
        ceo: {
          name: "Myriam Rezgui",
          position: "CEO & Founder",
          bio: "Hello, I'm Myriam\n\nA few years ago, I made a life-changing decision: I quit smoking.\n\nAfter years of damaging my health, I reclaimed control. Day by day, I rediscovered my body's potential. My sleep improved, my breathing deepened, and my skin... my skin transformed! So much that people constantly asked: \"Myriam, you look radiant! Did you just return from vacation?\"\n\nThis unexpected transformation ignited my passion: Skincare.\n\nNot just any skincare, but an experience that eliminates confusion and addresses real needs.\n\nLet's face it: your customers are overwhelmed. Tired of deciphering complex ingredient lists, exhausted from late-night research, questioning if products are truly worth their investment.\n\nI experienced these frustrations as a consumer. As an entrepreneur, I resolved to change the narrative. That's how cAIre was born.",
          image: "/images/myriam-rezgui.png",
        },
        team: [
          {
            name: "Jean Dupont",
            position: "CTO",
            bio: "Expert in AI and machine learning with a background in developing personalized recommendation systems.",
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Marie Leclerc",
            position: "Head of Skincare Science",
            bio: "Dermatologist with extensive research experience in skincare formulations and ingredients.",
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Alexandre Martin",
            position: "Head of Client Success",
            bio: "Luxury retail expert ensuring our clients receive the highest level of service and support.",
            image: "/placeholder.svg?height=200&width=200",
          },
        ],
      },
    },
    {
      id: "brand",
      title: "Section Marque",
      visible: true,
      order: 2,
      template: "brand",
      content: {
        title: "cAIre Solutions",
        subtitle: "AI-Powered Skincare",
        description:
          "Imagine an AI that captures your clients' attention from the very first interaction, offering intelligent recommendations and a tone perfectly aligned with your brand's values. Available 24/7, our skincare assistant leverages cutting-edge dermatological research to provide a seamless, personalized experience. The result? Higher engagement rates, improved customer satisfaction, and soaring sales—up to a 35% increase for our partners.",
        image: "/images/beauty-cs.png",
      },
    },
    {
      id: "value-proposition",
      title: "Value Proposition",
      visible: true,
      order: 2.5, // Pour l'insérer entre brand (2) et about (3)
      template: "value-proposition",
      content: {
        propositions: [
          {
            title: "Exclusive Personalization",
            description: "An AI that reflects your identity and enhances your products.",
            icon: "Crown",
          },
          {
            title: "Premium Experience",
            description: "Offer virtual consultations worthy of luxury.",
            icon: "Diamond",
          },
          {
            title: "Competitive Differentiation",
            description: "Stand out with a unique innovation.",
            icon: "Award",
          },
        ],
      },
    },
    {
      id: "about",
      title: "À Propos",
      visible: true,
      order: 4.5,
      template: "about",
      content: {
        title: "Combining French Skincare Expertise with AI Innovation",
        paragraphs: [
          "Founded in Paris in 2022, cAIre Solutions was born to revolutionize how luxury skincare brands approach customer relationships with consultations available 24/7.",
          "Our team combines 15 years of expertise in French luxury beauty with advanced AI mastery to deliver the same quality of personalized advice online as in-store, any time of day or night.",
        ],
        stats: [
          { label: "Luxury Brands", value: "25+" },
          { label: "Customer Interactions", value: "15M+" },
          { label: "Customer Satisfaction", value: "98%" },
          { label: "Sales Increase", value: "35%" },
        ],
      },
    },
    {
      id: "features",
      title: "Fonctionnalités",
      visible: true,
      order: 4,
      template: "features",
      content: {
        title: "Features Designed for Luxury Brands",
        description: "Our AI solutions are tailored specifically for premium skincare and beauty brands.",
        items: [
          {
            title: "Personalized Recommendations",
            description: "AI-powered product suggestions based on individual skin concerns and goals.",
            icon: "Star",
          },
          {
            title: "Brand Protection",
            description: "Ensure your AI assistant maintains your brand voice and luxury positioning.",
            icon: "Shield",
          },
          {
            title: "Loyalty Integration",
            description: "Seamlessly connect with your existing loyalty and CRM systems.",
            icon: "Heart",
          },
          {
            title: "Easy Integration",
            description: "Simple implementation with your existing e-commerce platform.",
            icon: "Code",
          },
        ],
      },
    },
    {
      id: "why-choose",
      title: "Pourquoi Choisir cAIre",
      visible: true,
      order: 5.5,
      template: "why-choose",
      content: {
        title: "Why luxury brands choose cAIre",
        description: "Discover what sets us apart from the competition",
        reasons: [
          {
            title: "Premium Market Expertise",
            description: "Built specifically for luxury skincare brands with deep understanding of your unique needs.",
            icon: "Award",
          },
          {
            title: "Brand Voice Protection",
            description: "Our AI maintains your brand voice and positioning, ensuring consistent luxury experience.",
            icon: "Shield",
          },
          {
            title: "Quick Implementation",
            description: "Get up and running in weeks, not months, with our streamlined onboarding process.",
            icon: "Clock",
          },
          {
            title: "Dedicated Support",
            description: "Our team of experts is always available to ensure your success with our platform.",
            icon: "Users",
          },
          {
            title: "Seamless Integration",
            description: "Connects with your existing CRM and e-commerce systems for a unified customer experience.",
            icon: "Link",
          },
          {
            title: "Data-Driven Results",
            description: "Track performance with detailed analytics and see measurable improvements in key metrics.",
            icon: "BarChart",
          },
        ],
        backgroundColor: "bg-gray-50",
      },
    },
    {
      id: "benefits-new",
      title: "Avantages",
      visible: true,
      order: 6, // Mise à jour de l'ordre pour remplacer l'ancienne section benefits
      template: "benefits-new",
      content: {
        title: "Elevate Your Brand with Proven Benefits",
        description: "Discover how our AI solutions deliver measurable results for luxury skincare brands.",
        benefits: [
          {
            title: "Enhance customer satisfaction",
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
            title: "Increased Conversion Rates",
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
            title: "Reduce Support Costs",
            description: "Automate routine inquiries while maintaining the luxury experience your customers expect.",
            icon: "ShieldCheck",
            stats: [
              { value: "100", label: "Brand Alignment" },
              { value: "0", label: "Off-Brand Responses" },
            ],
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reduce%20cost.22.jpg-0Hlb3dGRpjJ4vEjuwpCSmCtuROrh56.jpeg",
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
        results: [
          { label: "Conversion Rate", value: "+35%" },
          { label: "Customer Satisfaction", value: "+98%" },
          { label: "Average Order Value", value: "+28%" },
          { label: "Customer Retention", value: "+45%" },
        ],
      },
    },
    {
      id: "testimonials-section",
      title: "Témoignages",
      visible: true, // Changé de false à true pour rendre la section visible
      order: 6.5,
      template: "testimonials-section",
      content: {
        title: "What our partners are saying—your success starts here.",
        description: "Real results from real skincare brands.",
        testimonials: [
          {
            company: "Phynacare",
            quote: "Phynacare saw sales soar by 20% in just 3 months with cAIre Solutions—your brand can shine too.",
            logo: "/placeholder.svg?height=60&width=120",
          },
          {
            company: "Doze",
            quote: "Doze: Customer loyalty has never been stronger—our clients feel the difference.",
            logo: "/placeholder.svg?height=60&width=120",
          },
          {
            company: "Institut Esthederm",
            quote: "Institut Esthederm: Our AI reflects elegance and innovation—sales up, satisfaction up.",
            logo: "/placeholder.svg?height=60&width=120",
          },
        ],
        ctaButtonLink: "https://form.typeform.com/to/example3",
      },
    },
    {
      id: "pricing",
      title: "Tarifs",
      visible: true,
      order: 7,
      template: "pricing",
      content: {
        title: "Find the plan that grows your brand—simple and tailored to you.",
        description:
          "We have a plan for every stage of your journey—explore the options below. All plans include multilingual support to connect with your global audience seamlessly.",
        plans: [
          {
            name: "LysIA",
            price: "$10,724",
            period: "",
            description: "Designed for industry leaders",
            features: [
              "Unlimited users",
              "Dedicated dermatological knowledge base",
              "Complex case management",
              "Enterprise-grade CRM Integration",
              "Salesforce, HubSpot & Microsoft Dynamics support",
              "Unified customer profiles & automated data sync",
              "Multilingual support",
              "Custom AI training",
              "24/7 support with dedicated account manager",
              "Plus a performance based fee tailored to your results",
            ],
            buttonText: "Contact Sales",
            highlighted: false,
            footnote: "* Setup fees may vary based on your customization needs—let's discuss what works for you",
          },
          {
            name: "AVA Skin",
            price: "$1,057",
            period: "/month",
            description: "Perfect for growing brands",
            features: [
              "Up to 2,000 users/month",
              "CRM integration",
              "Advanced analytics & insights",
              "Product recommendation engine",
              "Multilingual support",
              "Priority support",
              "One-time setup fee of $3,177",
            ],
            buttonText: "Start Free Trial",
            highlighted: false,
          },
          {
            name: "Glowbot",
            price: "$517",
            period: "/month",
            description: "Ideal for smaller brands starting out",
            features: [
              "Up to 500 users/month",
              "Basic skincare knowledge base",
              "Standard analytics dashboard",
              "Email support",
              "Basic recommendation system",
              "Multilingual support",
              "One-time setup fee of $1,587",
            ],
            buttonText: "Get Started",
            highlighted: false,
          },
        ],
      },
    },
    {
      id: "cta",
      title: "Appel à l'Action",
      visible: true,
      order: 8,
      template: "cta",
      content: {
        title: "Ready to Transform Your Customer Experience?",
        description:
          "Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.",
        primaryButton: "Request a Demo",
        secondaryButton: "Contact Sales",
        primaryButtonLink: "https://app.youform.com/forms/gxc7dqht", // Votre ID Youform
        secondaryButtonLink: "mailto:contact@caire-solutions.com",
      },
    },
    {
      id: "footer",
      title: "Pied de Page",
      visible: true,
      order: 9,
      template: "footer",
      content: {
        description:
          "AI-powered skincare consultations combining French luxury expertise with cutting-edge technology.",
        copyright: "© 2023 cAIre Solutions. All rights reserved.",
        links: {
          company: ["About", "Careers", "Blog", "Press"],
          resources: ["Documentation", "Case Studies", "Webinars", "Help Center"],
          legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
        },
        contact: {
          location: "Paris, France",
          email: "contact@caire-solutions.com",
          phone: "+971 58 564 2906",
        },
      },
    },
  ],
  logo: "/images/logo.png",
  primaryColor: "#cfaa5c",
  secondaryColor: "#000000",
  siteName: "cAIre Solutions",
  siteDescription: "AI-powered skincare consultations",
  contactEmail: "contact@caire-solutions.com",
  contactPhone: "+971 58 564 2906",
  contactAddress: "Paris, France",
  socialLinks: {
    linkedin: "https://linkedin.com/company/caire-solutions",
    instagram: "https://instagram.com/caire_solutions",
  },
  seo: {
    title: "cAIre Solutions | AI-powered Skincare Consultations",
    description: "AI-powered skincare consultations combining French luxury expertise with cutting-edge technology",
    keywords: "AI, skincare, luxury, consultations, beauty tech",
    ogImage: "/images/og-image.jpg",
  },
  analytics: {
    googleAnalyticsId: "",
    facebookPixelId: "",
    enabledAnalytics: false,
  },
}

// Créer le contexte
type SiteConfigContextType = {
  config: SiteConfig
  updateConfig: (newConfig: SiteConfig) => void
  updateSection: (sectionId: string, newContent: any) => void
  reorderSections: (sectionId: string, newOrder: number) => void
  toggleSectionVisibility: (sectionId: string) => void
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
  updateSection: () => {},
  reorderSections: () => {},
  toggleSectionVisibility: () => {},
})

// Créer le provider
export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)

  // Charger la configuration depuis le stockage local au démarrage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedConfig = localStorage.getItem("siteConfig")
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig))
        }
      } catch (e) {
        console.error("Erreur lors du chargement de la configuration:", e)
      }
    }
  }, [])

  // Mettre à jour la configuration complète
  const updateConfig = (newConfig) => {
    setConfig(newConfig)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("siteConfig", JSON.stringify(newConfig))
      } catch (e) {
        console.error("Erreur lors de la sauvegarde de la configuration:", e)
      }
    }
  }

  // Mettre à jour une section spécifique
  const updateSection = (sectionId, newContent) => {
    const newConfig = { ...config }
    const sectionIndex = newConfig.sections.findIndex((s) => s.id === sectionId)

    if (sectionIndex !== -1) {
      newConfig.sections[sectionIndex].content = {
        ...newConfig.sections[sectionIndex].content,
        ...newContent,
      }
      updateConfig(newConfig)
    }
  }

  // Réorganiser les sections
  const reorderSections = (sectionId, newOrder) => {
    const newConfig = { ...config }
    const sectionIndex = newConfig.sections.findIndex((s) => s.id === sectionId)

    if (sectionIndex !== -1) {
      const section = newConfig.sections[sectionIndex]
      const oldOrder = section.order

      // Mettre à jour l'ordre de toutes les sections affectées
      newConfig.sections.forEach((s) => {
        if (oldOrder < newOrder && s.order > oldOrder && s.order <= newOrder) {
          s.order--
        } else if (oldOrder > newOrder && s.order < oldOrder && s.order >= newOrder) {
          s.order++
        }
      })

      section.order = newOrder
      updateConfig(newConfig)
    }
  }

  // Activer/désactiver la visibilité d'une section
  const toggleSectionVisibility = (sectionId) => {
    const newConfig = { ...config }
    const sectionIndex = newConfig.sections.findIndex((s) => s.id === sectionId)

    if (sectionIndex !== -1) {
      newConfig.sections[sectionIndex].visible = !newConfig.sections[sectionIndex].visible
      updateConfig(newConfig)
    }
  }

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateSection,
        reorderSections,
        toggleSectionVisibility,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  )
}

// Créer le hook
export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (context === undefined) {
    throw new Error("useSiteConfig doit être utilisé à l'intérieur d'un SiteConfigProvider")
  }
  return context
}

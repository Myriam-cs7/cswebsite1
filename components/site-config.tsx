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
      title: "Hero",
      visible: true,
      order: 1,
      template: "hero",
      content: {
        title: "Your new unfair advantage in beauty & wellness",
        subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
        showChatbot: true,
        buttonText: "Free Trial", 
        secondaryButtonText: "Book a Private Demo", 
        primaryButtonLink: "https://app.youform.com/forms/gxc7dqht", 
        youformId: "gxc7dqht",
        calendlyUrl: "https://calendly.com/cairesolutions/30min",
      },
    },
    {
      id: "about-us",
      title: "About Us", 
      visible: true,
      order: 1.5,
      template: "about-us",
      content: {
        title: "About Us",
        subtitle: "Expertise meets Innovation",
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
    // --- SECTION CASE STUDIES / USE CASES ---
    {
      id: "case-studies",
      title: "Success Stories",
      visible: true,
      order: 1.7, 
      template: "benefits-new", 
      content: {
        title: "Real World Impact: From Spas to Clinics",
        description: "See how cAIre Solutions transforms operations for diverse beauty & wellness businesses through WhatsApp automation.",
        benefits: [
          {
            title: "The Midnight Booking Effect",
            description:
              "For Luxury Spas: 60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
            icon: "Moon",
            stats: [
              { value: "+40%", label: "Night Bookings" },
              { value: "0", label: "Missed Clients" },
            ],
            image:
              "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop", 
          },
          {
            title: "Global Medical Hub Mastery",
            description:
              "Dubai & Paris attract the world. Don't let time zones or language barriers cost you patients. Our AI manages international inquiries 24/7 in 30+ languages, turning global interest into confirmed appointments.",
            icon: "Globe",
            stats: [
              { value: "30+", label: "Languages" },
              { value: "0", label: "Time Zone Friction" },
            ],
            image:
              "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop",
          },
          {
            title: "Automated Loyalty & Sales",
            description:
              "For Retail & Salons: Don't just wait for appointments. The AI proactively re-engages clients for product refills and follow-up treatments, turning one-time visits into lifetime value.",
            icon: "Repeat",
            stats: [
              { value: "35%", label: "Repeat Sales" },
              { value: "24/7", label: "Availability" },
            ],
            image:
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
          },
        ],
        results: [
          { label: "Bookings Increase", value: "+40%" },
          { label: "Staff Time Saved", value: "15h/wk" },
          { label: "Client Satisfaction", value: "99%" },
          { label: "Response Time", value: "< 2s" },
        ],
      },
    },
    // --- NOUVELLE SECTION BRAND / WHY CHOOSE US ---
    {
      id: "brand",
      title: "Why Choose Us",
      visible: true,
      order: 2,
      template: "brand",
      content: {
        title: "Why choose cAIre?",
        subtitle: "Technology & Acquisition",
        // J'ai inséré les sauts de lignes pour aérer tes paragraphes
        description:
          "cAIre finally brings together two essential growth levers: technology and acquisition.\n\nOn one hand, you get a beauty- and wellness-specialized virtual assistant that can answer questions, advise, sell, and even book appointments for your team.\n\nOn the other hand, you gain direct access to creators and influencers who drive qualified traffic to your services, treatments, and products.\n\nYour clients discover your brand through authentic content and posts, and are instantly guided by a virtual advisor who turns that attention into bookings, sales, and long-term loyalty.\n\nClear, simple, effective: you attract more clients and convert more without increasing your team size.",
        // Attention : Renomme ton image en influencer-partner.png
        image: "/images/influencer-partner.png",
      },
    },
    {
      id: "value-proposition",
      title: "Value Proposition",
      visible: true,
      order: 2.5,
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
      title: "About (Tech)",
      visible: true,
      order: 4.5,
      template: "about",
      content: {
        title: "Combining French Expertise with AI Innovation",
        paragraphs: [
          "Founded in Paris in 2022, cAIre Solutions was born to revolutionize how luxury beauty brands approach customer relationships.",
          "Our team combines 15 years of expertise in French luxury beauty with advanced AI mastery to deliver the same quality of personalized advice online as in-store.",
        ],
        stats: [
          { label: "Luxury Brands", value: "25+" },
          { label: "Interactions", value: "15M+" },
          { label: "Satisfaction", value: "98%" },
          { label: "Growth", value: "35%" },
        ],
      },
    },
    {
      id: "features",
      title: "Features",
      visible: true,
      order: 4,
      template: "features",
      content: {
        title: "Features Designed for Luxury",
        description: "Our AI solutions are tailored specifically for premium skincare, spas, and clinics.",
        items: [
          {
            title: "Smart Booking System",
            description: "Automated appointment scheduling directly through WhatsApp, synced with your calendar.",
            icon: "Calendar",
          },
          {
            title: "Brand Guardrails",
            description: "Ensure your AI assistant maintains your brand voice and luxury positioning at all times.",
            icon: "Shield",
          },
          {
            title: "CRM Integration",
            description: "Seamlessly connect with your existing loyalty and CRM systems (Salesforce, HubSpot, etc.).",
            icon: "Link",
          },
          {
            title: "Omnichannel",
            description: "Deploy on WhatsApp, Instagram, and Webchat simultaneously.",
            icon: "MessageCircle",
          },
        ],
      },
    },
    {
      id: "why-choose",
      title: "Why Choose Us",
      visible: true,
      order: 5.5,
      template: "why-choose",
      content: {
        title: "Why luxury brands choose cAIre",
        description: "Discover what sets us apart from the competition",
        reasons: [
          {
            title: "Premium Market Expertise",
            description: "Built specifically for luxury brands with deep understanding of your unique needs.",
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
      id: "benefits-original",
      title: "Benefits (Legacy)",
      visible: false,
      order: 6,
      template: "benefits-new",
      content: {
        title: "Elevate Your Brand",
        description: "Discover how our AI solutions deliver measurable results.",
        benefits: [],
        results: [],
      },
    },
    {
      id: "testimonials-section",
      title: "Testimonials",
      visible: true,
      order: 6.5,
      template: "testimonials-section",
      content: {
        title: "What our partners are saying",
        description: "Real results from real brands.",
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
        ctaButtonLink: "https://calendly.com/cairesolutions/30min",
      },
    },
    // --- SECTION PRICING MASQUÉE (visible: false) ---
    {
      id: "pricing",
      title: "Pricing",
      visible: false, 
      order: 7,
      template: "pricing",
      content: {
        title: "Find the plan that grows your brand",
        description:
          "We have a plan for every stage of your journey. All plans include multilingual support.",
        plans: [],
      },
    },
    // ------------------------------------------------
    {
      id: "cta",
      title: "Call to Action",
      visible: true,
      order: 8,
      template: "cta",
      content: {
        title: "Ready to Transform Your Customer Experience?",
        description:
          "Join leading luxury brands already using cAIre Solutions to enhance their digital presence.",
        primaryButton: "Free Trial",
        secondaryButton: "Contact Sales",
        primaryButtonLink: "https://app.youform.com/forms/gxc7dqht",
        secondaryButtonLink: "mailto:contact@caire-solutions.com",
      },
    },
    {
      id: "footer",
      title: "Footer",
      visible: true,
      order: 9,
      template: "footer",
      content: {
        description:
          "AI-powered consultations combining French luxury expertise with cutting-edge technology.",
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedConfig = localStorage.getItem("siteConfig")
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig)
          // Vérification rapide pour voir si la nouvelle section existe ET si le pricing est bien masqué
          const hasCaseStudies = parsed.sections.some(s => s.id === "case-studies")
          const pricingHidden = parsed.sections.find(s => s.id === "pricing")?.visible === false
          
          if (!hasCaseStudies || !pricingHidden) {
             // Si la config en mémoire ne correspond pas à la stratégie, on force la nouvelle
             setConfig(defaultConfig)
             localStorage.setItem("siteConfig", JSON.stringify(defaultConfig))
          } else {
             setConfig(parsed)
          }
        } else {
           setConfig(defaultConfig)
        }
      } catch (e) {
        console.error("Erreur config:", e)
        setConfig(defaultConfig)
      }
    }
  }, [])

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("siteConfig", JSON.stringify(newConfig))
      } catch (e) { console.error(e) }
    }
  }

  const updateSection = (sectionId: string, newContent: any) => {
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

  const reorderSections = (sectionId: string, newOrder: number) => {
    const newConfig = { ...config }
    const sectionIndex = newConfig.sections.findIndex((s) => s.id === sectionId)
    if (sectionIndex !== -1) {
      const section = newConfig.sections[sectionIndex]
      const oldOrder = section.order
      newConfig.sections.forEach((s) => {
        if (oldOrder < newOrder && s.order > oldOrder && s.order <= newOrder) s.order--
        else if (oldOrder > newOrder && s.order < oldOrder && s.order >= newOrder) s.order++
      })
      section.order = newOrder
      updateConfig(newConfig)
    }
  }

  const toggleSectionVisibility = (sectionId: string) => {
    const newConfig = { ...config }
    const sectionIndex = newConfig.sections.findIndex((s) => s.id === sectionId)
    if (sectionIndex !== -1) {
      newConfig.sections[sectionIndex].visible = !newConfig.sections[sectionIndex].visible
      updateConfig(newConfig)
    }
  }

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, updateSection, reorderSections, toggleSectionVisibility }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (context === undefined) {
    throw new Error("useSiteConfig doit être utilisé à l'intérieur d'un SiteConfigProvider")
  }
  return context
}

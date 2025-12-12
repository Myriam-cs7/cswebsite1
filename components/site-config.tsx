"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Interface
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
  socialLinks?: { [key: string]: string | undefined }
  seo?: { title?: string; description?: string; keywords?: string; ogImage?: string }
  analytics?: { googleAnalyticsId?: string; facebookPixelId?: string; enabledAnalytics?: boolean }
}

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
          bio: "Hello, I'm Myriam...",
          image: "/images/myriam-rezgui.png",
        },
        team: [],
      },
    },
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
            description: "For Luxury Spas: 60% of relaxation seekers browse services after 8 PM. Our AI captures these bookings instantly on WhatsApp, securing revenue while your staff rests.",
            icon: "Moon",
            stats: [{ value: "+40%", label: "Night Bookings" }, { value: "0", label: "Missed Clients" }],
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop", 
          },
          {
            title: "Global Medical Hub Mastery",
            description: "Dubai & Paris attract the world. Don't let time zones or language barriers cost you patients.",
            icon: "Globe",
            stats: [{ value: "30+", label: "Languages" }, { value: "0", label: "Time Zone Friction" }],
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop",
          },
          {
            title: "Automated Loyalty & Sales",
            description: "For Retail & Salons: Don't just wait for appointments.",
            icon: "Repeat",
            stats: [{ value: "35%", label: "Repeat Sales" }, { value: "24/7", label: "Availability" }],
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
          },
        ],
        results: [],
      },
    },
    // --- C'EST ICI QUE JE FORCE LE TEXTE ---
    {
      id: "brand",
      title: "Why Choose Us",
      visible: true,
      order: 2,
      template: "brand",
      content: {
        title: "Why choose cAIre?",
        subtitle: "Technology & Acquisition",
        // J'utilise des backticks ` ` pour éviter l'erreur de syntaxe sur le texte long
        description: `cAIre finally brings together two essential growth levers: technology and acquisition.

On one hand, you get a beauty- and wellness-specialized virtual assistant that can answer questions, advise, sell, and even book appointments for your team.

On the other hand, you gain direct access to creators and influencers who drive qualified traffic to your services, treatments, and products.

Your clients discover your brand through authentic content and posts, and are instantly guided by a virtual advisor who turns that attention into bookings, sales, and long-term loyalty.

Clear, simple, effective: you attract more clients and convert more without increasing your team size.`,
        image: "/images/influencer-partner.png",
      },
    },
    { id: "value-proposition", title: "Value Proposition", visible: true, order: 2.5, template: "value-proposition", content: { propositions: [] } },
    { id: "about", title: "About (Tech)", visible: true, order: 4.5, template: "about", content: { title: "Combining French Expertise", paragraphs: [], stats: [] } },
    { id: "features", title: "Features", visible: true, order: 4, template: "features", content: { title: "Features Designed for Luxury", description: "", items: [] } },
    { id: "why-choose", title: "Why Choose Us", visible: true, order: 5.5, template: "why-choose", content: { title: "Why luxury brands choose cAIre", description: "", reasons: [] } },
    { id: "benefits-original", title: "Benefits (Legacy)", visible: false, order: 6, template: "benefits-new", content: { benefits: [], results: [] } },
    { id: "testimonials-section", title: "Testimonials", visible: true, order: 6.5, template: "testimonials-section", content: { title: "Testimonials", testimonials: [] } },
    { id: "pricing", title: "Pricing", visible: false, order: 7, template: "pricing", content: { plans: [] } },
    { id: "cta", title: "Call to Action", visible: true, order: 8, template: "cta", content: { title: "Ready?", primaryButton: "Free Trial" } },
    { id: "footer", title: "Footer", visible: true, order: 9, template: "footer", content: { description: "", copyright: "", links: {}, contact: {} } },
  ],
  logo: "/images/logo.png",
  primaryColor: "#cfaa5c",
  secondaryColor: "#000000",
}

const SiteConfigContext = createContext<any>(null)

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  // JE FORCE LA CONFIG ICI. Pas de lecture de localStorage qui garde les vieilles versions.
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)

  // On force la sauvegarde de la nouvelle version dans le navigateur
  useEffect(() => {
    if (typeof window !== "undefined") {
        localStorage.setItem("siteConfig", JSON.stringify(defaultConfig))
    }
  }, [])

  const updateConfig = (newConfig) => setConfig(newConfig)
  const updateSection = () => {} 
  const reorderSections = () => {}
  const toggleSectionVisibility = () => {}

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, updateSection, reorderSections, toggleSectionVisibility }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (!context) throw new Error("useSiteConfig Error")
  return context
}

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
    // --- SECTION BRAND / WHY CHOOSE US (CORRIGÉE AVEC LE BON TEXTE) ---
    {
      id: "brand",
      title: "Why Choose Us",
      visible: true,
      order: 2,
      template: "brand",
      content: {
        title: "Why choose cAIre?",
        subtitle: "Technology & Acquisition",
        // LE NOUVEAU TEXTE EST ICI :
        description:
          "cAIre finally brings together two essential growth levers: technology and acquisition.\n\nOn one hand

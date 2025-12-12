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
      title: "About Us", // <--- MODIFICATION ICI (C'était "Team")
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

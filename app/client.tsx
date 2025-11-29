"use client"

import type React from "react"
import "./globals.css"
import { Inter, Playfair_Display, Montserrat } from "next/font/google"
import { TranslationProvider } from "../components/translations"
import { SiteConfigProvider } from "../components/site-config"
// Add this line to import the flag-icons CSS
import "flag-icons/css/flag-icons.min.css"
import { useTranslation } from "next-i18next"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

// Assurons-nous que le TranslationProvider est correctement configuré

// Dans le composant RootLayout, ajoutons la logique pour la direction du texte
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable}`}>
        <SiteConfigProvider>
          <TranslationProvider>
            <TextDirectionProvider>{children}</TextDirectionProvider>
          </TranslationProvider>
        </SiteConfigProvider>
      </body>
    </html>
  )
}

// Créons un composant pour gérer la direction du texte
function TextDirectionProvider({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation()

  useEffect(() => {
    // Set RTL direction for Arabic
    if (language === "ar") {
      document.documentElement.dir = "rtl"
      document.documentElement.classList.add("rtl")
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.classList.remove("rtl")
    }
  }, [language])

  return <>{children}</>
}

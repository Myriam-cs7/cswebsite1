"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "./translations"
import { useLanguageScoring } from "./language-scoring"

export default function LanguageInitializer() {
  const { language, setLanguage } = useTranslation()
  const { currentLanguage, selectLanguage } = useLanguageScoring()
  const initialized = useRef(false)

  useEffect(() => {
    // Only run initialization once
    if (initialized.current) return

    // Function to detect and initialize the correct language
    const initializeLanguage = () => {
      // Priority order:
      // 1. URL parameter (e.g., ?lang=fr)
      // 2. localStorage
      // 3. Browser preference
      // 4. Default (en)

      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const urlLang = urlParams.get("lang")

      // Check localStorage
      const storedLang = localStorage.getItem("language")

      // Check browser preference
      const getBrowserLanguage = () => {
        const browserLangs = navigator.languages || [navigator.language]
        const supportedLangs = ["en", "fr", "es", "ar", "pt"]

        for (const lang of browserLangs) {
          const langCode = lang.split("-")[0].toLowerCase()
          if (supportedLangs.includes(langCode)) {
            return langCode
          }
        }
        return "en" // Default
      }

      // Determine language with priority
      const detectedLanguage = urlLang || storedLang || getBrowserLanguage()

      // Only set the language if it's different from current language
      if (detectedLanguage && detectedLanguage !== language && detectedLanguage !== currentLanguage) {
        localStorage.setItem("language", detectedLanguage)

        // Set HTML attributes
        document.documentElement.setAttribute("lang", detectedLanguage)
        if (detectedLanguage === "ar") {
          document.documentElement.setAttribute("dir", "rtl")
        } else {
          document.documentElement.setAttribute("dir", "ltr")
        }

        // Update language state - do this last to avoid multiple renders
        setLanguage(detectedLanguage)
        selectLanguage(detectedLanguage)
      }

      // Mark as initialized to prevent future runs
      initialized.current = true
    }

    initializeLanguage()
  }, [language, currentLanguage, setLanguage, selectLanguage])

  return null
}

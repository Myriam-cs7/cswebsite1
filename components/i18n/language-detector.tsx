"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface LanguageDetectorProps {
  supportedLanguages: string[]
  defaultLanguage: string
  languageParam?: string
}

export function LanguageDetector({
  supportedLanguages,
  defaultLanguage,
  languageParam = "lang",
}: LanguageDetectorProps) {
  const router = useRouter()

  useEffect(() => {
    // Fonction pour détecter la langue préférée de l'utilisateur
    const detectUserLanguage = (): string => {
      // 1. Vérifier si une langue est déjà stockée dans localStorage
      const storedLanguage = localStorage.getItem("preferredLanguage")
      if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
        return storedLanguage
      }

      // 2. Vérifier les paramètres d'URL
      const urlParams = new URLSearchParams(window.location.search)
      const urlLang = urlParams.get(languageParam)
      if (urlLang && supportedLanguages.includes(urlLang)) {
        localStorage.setItem("preferredLanguage", urlLang)
        return urlLang
      }

      // 3. Vérifier les préférences du navigateur
      if (navigator.languages && navigator.languages.length) {
        for (const browserLang of navigator.languages) {
          const langCode = browserLang.split("-")[0]
          if (supportedLanguages.includes(langCode)) {
            localStorage.setItem("preferredLanguage", langCode)
            return langCode
          }
        }
      }

      // 4. Si aucune langue préférée n'est détectée, utiliser la langue par défaut
      return defaultLanguage
    }

    const userLanguage = detectUserLanguage()

    // Rediriger vers la page avec la langue détectée si nécessaire
    if (window.location.pathname === "/") {
      router.push(`/${userLanguage}`)
    }
  }, [router, supportedLanguages, defaultLanguage, languageParam])

  return null
}

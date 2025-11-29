"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "./translations"

interface TranslationObserverProps {
  onLanguageChange?: (language: string) => void
}

export default function TranslationObserver({ onLanguageChange }: TranslationObserverProps) {
  const { language } = useTranslation()
  const lastLanguageRef = useRef(language)
  const isProcessingRef = useRef(false)

  useEffect(() => {
    // Éviter les appels multiples
    if (isProcessingRef.current) return

    // Vérifier si la langue a réellement changé
    if (language !== lastLanguageRef.current) {
      console.log(`TranslationObserver: Language changed from ${lastLanguageRef.current} to ${language}`)

      // Mettre à jour la référence avant de traiter le changement
      lastLanguageRef.current = language

      // Appliquer les changements au DOM
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", language)

        // Mettre à jour les classes pour le CSS
        const bodyClasses = document.body.className.replace(/lang-\w+/g, "").trim()
        document.body.className = `${bodyClasses} lang-${language}`

        // Gérer la direction RTL
        if (language === "ar") {
          document.documentElement.setAttribute("dir", "rtl")
          document.body.classList.add("rtl")
        } else {
          document.documentElement.setAttribute("dir", "ltr")
          document.body.classList.remove("rtl")
        }

        // Ne pas déclencher d'événement qui pourrait causer une boucle de rendus
        // Commenté pour éviter les boucles infinies:
        // const event = new CustomEvent("forceTranslationRefresh", {
        //   detail: { language, timestamp: Date.now() },
        // })
        // window.dispatchEvent(event)
      }

      // Notifier le parent du changement, mais sans déclencher de mise à jour d'état
      if (onLanguageChange) {
        // Utiliser setTimeout pour sortir du cycle de rendu actuel
        isProcessingRef.current = true
        setTimeout(() => {
          try {
            onLanguageChange(language)
          } catch (error) {
            console.error("Error in onLanguageChange callback:", error)
          } finally {
            isProcessingRef.current = false
          }
        }, 0)
      }
    }
  }, [language, onLanguageChange])

  // Synchronisation entre onglets
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language" && e.newValue && e.newValue !== language) {
        console.log(`TranslationObserver: Language changed in another tab to ${e.newValue}`)
        // Forcer un rechargement de la page plutôt que de tenter une mise à jour d'état
        window.location.reload()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [language])

  return null
}

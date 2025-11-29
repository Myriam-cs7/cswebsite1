"use client"

import { useEffect } from "react"
import { useLanguageScoring } from "./language-scoring"
import { useTranslation } from "./translations"

export default function LanguageSwitcher() {
  const { currentLanguage, selectLanguage } = useLanguageScoring()
  const { setLanguage } = useTranslation()

  // Update the translation context when language changes
  useEffect(() => {
    setLanguage(currentLanguage)
  }, [currentLanguage, setLanguage])

  // Modifions le language-switcher pour s'assurer que les changements sont correctement propagés

  // Remplacer la fonction handleLanguageSelect par celle-ci:
  const handleLanguageSelect = (lang: string) => {
    // Mettre à jour le localStorage directement
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)

      // Déclencher un événement personnalisé pour notifier tous les composants du changement de langue
      const event = new CustomEvent("languageChange", { detail: { language: lang } })
      window.dispatchEvent(event)
    }

    // Mettre à jour le score de langue
    selectLanguage(lang)

    // Mettre à jour la langue dans le contexte
    setLanguage(lang)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <button
          onClick={() => handleLanguageSelect("en")}
          className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center hover:opacity-90 transition-opacity ${
            currentLanguage === "en"
              ? "ring-2 ring-[#f0d78a] shadow-[0_0_10px_rgba(240,215,138,0.5)]"
              : "ring-1 ring-gray-300"
          }`}
          aria-label="Switch to English"
        >
          <img src="/flags/uk.png" alt="English" className="w-full h-full object-cover" />
        </button>
        <span className="text-[10px] font-medium mt-0.5 text-white">EN</span>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={() => handleLanguageSelect("fr")}
          className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center hover:opacity-90 transition-opacity ${
            currentLanguage === "fr"
              ? "ring-2 ring-[#f0d78a] shadow-[0_0_10px_rgba(240,215,138,0.5)]"
              : "ring-1 ring-gray-300"
          }`}
          aria-label="Switch to French"
        >
          <img src="/flags/france.png" alt="French" className="w-full h-full object-cover scale-[1.5]" />
        </button>
        <span className="text-[10px] font-medium mt-0.5 text-white">FR</span>
      </div>
    </div>
  )
}

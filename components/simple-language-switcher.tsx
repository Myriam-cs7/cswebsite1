"use client"

import { useState, useRef } from "react"
import { getCurrentLanguage, setLanguage } from "@/utils/translations"
import { useOnClickOutside } from "@/hooks/use-click-outside"

// Définir les options de langue
const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "/flags/uk.png" },
  { code: "fr", name: "French", nativeName: "Français", flag: "/flags/france.png" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "/flags/spain.png" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "/flags/arabic.png" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "/flags/portugal.png" },
]

export default function SimpleLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentLanguage = getCurrentLanguage()

  // Fermer le menu déroulant en cliquant à l'extérieur
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  // Gérer la sélection de langue
  const handleLanguageSelect = (lang: string) => {
    if (lang === currentLanguage) {
      setIsOpen(false)
      return
    }

    setLanguage(lang)
  }

  // Obtenir le code de langue actuel pour l'affichage
  const getCurrentLanguageCode = () => {
    return currentLanguage.toUpperCase()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton de sélection de langue */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 px-4 py-2 rounded-full border border-[#cfaa5c]/30 bg-transparent hover:bg-[#cfaa5c]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#cfaa5c] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        aria-controls={isOpen ? "language-dropdown" : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#cfaa5c]"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
        <span className="text-[#cfaa5c] font-medium">{getCurrentLanguageCode()}</span>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div
          id="language-dropdown"
          className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50"
          role="listbox"
          aria-label="Available languages"
        >
          <div className="py-2 px-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Select Language</h3>
          </div>
          <ul className="py-1" role="listbox" aria-label="Select language">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors ${
                    currentLanguage === lang.code ? "font-medium text-[#cfaa5c] bg-[#cfaa5c]/5" : "text-gray-800"
                  } flex items-center gap-3 focus:outline-none focus:bg-gray-100 focus:text-[#cfaa5c]`}
                  onClick={() => handleLanguageSelect(lang.code)}
                  role="option"
                  aria-selected={currentLanguage === lang.code}
                  id={`language-option-${lang.code}`}
                >
                  <img
                    src={lang.flag || "/placeholder.svg"}
                    alt={`${lang.name} flag`}
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                  />
                  <span>{lang.nativeName}</span>
                  {currentLanguage === lang.code && (
                    <span className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#cfaa5c]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

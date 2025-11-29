"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "./translations"
import { Globe, RefreshCw } from "lucide-react"
import { useOnClickOutside } from "@/hooks/use-click-outside"

// Define language options
const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "/flags/uk.png" },
  { code: "fr", name: "French", nativeName: "Français", flag: "/flags/france.png" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "/flags/spain.png" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "/flags/arabic.png" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "/flags/portugal.png" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isArabicMode, setIsArabicMode] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const languageChangeRef = useRef(false)
  const isChangingRef = useRef(false)

  // Check if we're in Arabic mode
  useEffect(() => {
    setIsArabicMode(language === "ar")
  }, [language])

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  // Handle language selection with direct DOM manipulation as fallback
  const handleLanguageSelect = (lang: string) => {
    // Éviter les changements multiples
    if (languageChangeRef.current || isChangingRef.current) return
    if (lang === language) return

    // Marquer comme en cours de changement
    isChangingRef.current = true

    console.log(`Language selected: ${lang}`)
    languageChangeRef.current = true

    // Update translation context
    setLanguage(lang)

    // Special handling for Arabic
    const isSelectingArabic = lang === "ar"
    const isLeavingArabic = language === "ar" && lang !== "ar"

    // Direct DOM manipulation as fallback
    if (typeof document !== "undefined") {
      // Set HTML attributes
      document.documentElement.setAttribute("lang", lang)

      // Handle RTL languages
      if (lang === "ar") {
        document.documentElement.setAttribute("dir", "rtl")
        document.documentElement.classList.add("rtl")
        document.body.classList.add("rtl")
        document.body.classList.add("lang-ar")
      } else {
        document.documentElement.setAttribute("dir", "ltr")
        document.documentElement.classList.remove("rtl")
        document.body.classList.remove("rtl")
        document.body.classList.remove("lang-ar")
      }
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      localStorage.setItem("useMockTranslations", "true") // Always use mock translations

      try {
        // Dispatch custom events
        const event = new CustomEvent("languageChange", {
          detail: { language: lang, forceRefresh: true },
        })
        window.dispatchEvent(event)

        // Also dispatch a dedicated event for forcing translation refresh
        const refreshEvent = new CustomEvent("forceTranslationRefresh", {
          detail: { language: lang, timestamp: Date.now() },
        })
        window.dispatchEvent(refreshEvent)

        console.log(`Language events dispatched for: ${lang}`)

        // Close dropdown
        setIsOpen(false)

        // Force page refresh for Arabic or when leaving Arabic mode
        if (isSelectingArabic || isLeavingArabic) {
          console.log(`Forcing page refresh for Arabic language change: ${lang}`)
          setTimeout(() => {
            window.location.reload()
            languageChangeRef.current = false
            isChangingRef.current = false
          }, 100)
        } else {
          // Réinitialiser le flag après un court délai
          setTimeout(() => {
            languageChangeRef.current = false
            isChangingRef.current = false
          }, 500)
        }
      } catch (error) {
        console.error("Error dispatching language events:", error)
        languageChangeRef.current = false
        isChangingRef.current = false
      }
    }
  }

  // Force a complete refresh
  const handleForceRefresh = () => {
    // Éviter les clics multiples
    if (isChangingRef.current) return
    isChangingRef.current = true

    console.log("Forcing complete refresh...")
    // Ajouter un paramètre d'URL pour forcer un rechargement complet
    const url = new URL(window.location.href)
    url.searchParams.set("forceRefresh", Date.now().toString())
    window.location.href = url.toString()
  }

  // Get current language display name
  const getCurrentLanguageCode = () => {
    return language.toUpperCase()
  }

  // Améliorons l'accessibilité et la visibilité du sélecteur de langue
  return (
    <div className={`relative ${isArabicMode ? "rtl" : ""}`} ref={dropdownRef}>
      {/* Language selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 px-4 py-2 rounded-full border border-[#cfaa5c]/30 bg-transparent hover:bg-[#cfaa5c]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#cfaa5c] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        aria-controls={isOpen ? "language-dropdown" : undefined}
      >
        <Globe className="w-5 h-5 text-[#cfaa5c]" aria-hidden="true" />
        <span className="text-[#cfaa5c] font-medium">{getCurrentLanguageCode()}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="language-dropdown"
          className={`absolute ${isArabicMode ? "left-0" : "right-0"} mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 animate:fadeIn`}
          role="listbox"
          aria-label="Available languages"
        >
          <div className="py-2 px-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">{isArabicMode ? "اختر اللغة" : "Select Language"}</h3>
          </div>
          <ul className="py-1" role="listbox" aria-label="Select language">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors ${
                    language === lang.code ? "font-medium text-[#cfaa5c] bg-[#cfaa5c]/5" : "text-gray-800"
                  } flex items-center gap-3 focus:outline-none focus:bg-gray-100 focus:text-[#cfaa5c]`}
                  onClick={() => handleLanguageSelect(lang.code)}
                  role="option"
                  aria-selected={language === lang.code}
                  id={`language-option-${lang.code}`}
                >
                  <img
                    src={lang.flag || "/placeholder.svg"}
                    alt={`${lang.name} flag`}
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                  />
                  <span>{lang.nativeName}</span>
                  {language === lang.code && (
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

          {/* Force refresh button */}
          <div className="border-t border-gray-200 p-2">
            <button
              onClick={handleForceRefresh}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              {isArabicMode ? "تحديث إجباري" : "Force Refresh"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

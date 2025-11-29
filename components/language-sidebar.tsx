"use client"

import { useState, useEffect } from "react"
import { useLanguageScoring } from "./language-scoring"
import { useTranslation } from "./translations"
import { X } from "lucide-react"
import Image from "next/image"

export default function LanguageSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, selectLanguage } = useLanguageScoring()
  const { setLanguage } = useTranslation()

  // Fermer la sidebar lorsque l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("language-sidebar")
      if (sidebar && !sidebar.contains(event.target) && !event.target.closest(".language-toggle")) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Empêcher le défilement du body lorsque la sidebar est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleLanguageSelect = (lang) => {
    selectLanguage(lang)
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <>
      {/* Bouton pour ouvrir la sidebar */}
      <button
        className="language-toggle flex items-center gap-2 text-white hover:text-[#cfaa5c] transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Change language"
      >
        <span className="sr-only">Change language</span>
        <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-[#cfaa5c]/30">
          <img
            src={`/flags/${currentLanguage === "en" ? "uk" : "france"}.png`}
            alt={currentLanguage === "en" ? "English" : "Français"}
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div
            id="language-sidebar"
            className="fixed right-0 top-0 h-full w-80 bg-[#1A1A1A] shadow-xl transform transition-transform duration-300 ease-in-out"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-playfair text-[#cfaa5c]">Language</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close sidebar"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 relative">
                  <Image
                    src="/images/Logo CS.svg"
                    alt="CAIre Solutions Logo"
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleLanguageSelect("en")}
                  className={`flex items-center gap-4 w-full p-3 rounded-lg transition-colors ${
                    currentLanguage === "en" ? "bg-[#cfaa5c]/20 text-[#cfaa5c]" : "text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#cfaa5c]/30">
                    <img src="/flags/uk.png" alt="English" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">English</span>
                    <span className="text-xs text-gray-400">United Kingdom</span>
                  </div>
                </button>

                <button
                  onClick={() => handleLanguageSelect("fr")}
                  className={`flex items-center gap-4 w-full p-3 rounded-lg transition-colors ${
                    currentLanguage === "fr" ? "bg-[#cfaa5c]/20 text-[#cfaa5c]" : "text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#cfaa5c]/30">
                    <img src="/flags/france.png" alt="Français" className="w-full h-full object-cover scale-[1.2]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Français</span>
                    <span className="text-xs text-gray-400">France</span>
                  </div>
                </button>
              </div>

              <div className="mt-auto">
                <p className="text-sm text-gray-400 text-center">
                  Your preferred language will be saved for future visits.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "./translations"

export default function TranslationDebugger() {
  const { t, language, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [translationState, setTranslationState] = useState<any>(null)

  // Only show in development or when forced
  const showDebugger = process.env.NODE_ENV === "development" // Only show in development mode

  useEffect(() => {
    // Capture the current translation state
    try {
      setTranslationState({
        currentLanguage: language,
        translationObject:
          typeof t === "object"
            ? // Créer un objet sécurisé pour la sérialisation JSON
              Object.keys(t).reduce((acc, key) => {
                // Ne pas inclure les fonctions ou les valeurs non-sérialisables
                if (typeof t[key] !== "function" && key !== "then" && key !== "catch") {
                  try {
                    // Essayer de sérialiser la valeur
                    JSON.stringify(t[key])
                    acc[key] = t[key]
                  } catch (e) {
                    // Si la sérialisation échoue, utiliser une représentation simple
                    acc[key] = `[Complex Object: ${typeof t[key]}]`
                  }
                }
                return acc
              }, {})
            : { info: "Translation object is not available or is a function" },
        htmlLang: document.documentElement.lang,
        htmlDir: document.documentElement.dir,
        bodyClasses: document.body.className,
        localStorage: typeof window !== "undefined" ? localStorage.getItem("language") : null,
        eventListeners: window.hasOwnProperty("languageChange") ? "Yes" : "No",
      })
    } catch (error) {
      console.error("Error capturing translation state:", error)
      setTranslationState({
        currentLanguage: language,
        translationObject: {},
        htmlLang: document.documentElement.lang,
        htmlDir: document.documentElement.dir,
        bodyClasses: document.body.className,
        localStorage: typeof window !== "undefined" ? localStorage.getItem("language") : null,
        eventListeners: window.hasOwnProperty("languageChange") ? "Yes" : "No",
      })
    }
  }, [language, t])

  // Test function to force language change
  const forceLanguageChange = (lang: string) => {
    try {
      // Désactiver temporairement les traductions automatiques pendant le changement de langue
      const prevTranslationState = localStorage.getItem("useMockTranslations")
      localStorage.setItem("useMockTranslations", "true")

      setLanguage(lang)

      // Manipulation directe du DOM comme fallback
      document.documentElement.lang = lang
      document.documentElement.setAttribute("lang", lang)
      if (lang === "ar") {
        document.documentElement.dir = "rtl"
      } else {
        document.documentElement.dir = "ltr"
      }

      // Forcer un rafraîchissement après un court délai
      setTimeout(() => {
        // Restaurer l'état précédent des traductions
        if (prevTranslationState) {
          localStorage.setItem("useMockTranslations", prevTranslationState)
        } else {
          localStorage.removeItem("useMockTranslations")
        }

        // Rafraîchir la page avec un paramètre pour éviter le cache
        const url = new URL(window.location.href)
        url.searchParams.set("forceRefresh", Date.now().toString())
        window.location.href = url.toString()
      }, 500)
    } catch (error) {
      console.error("Error changing language:", error)
    }
  }

  if (!showDebugger) return null

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-red-600 text-white p-2 rounded-full shadow-lg"
        aria-label="Translation debugger"
        data-translation-debugger="true"
      >
        🌐
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-auto"
          data-translation-debugger="true"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-100">
              <h2 className="font-bold text-lg">Translation Debugger</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="p-4 overflow-auto flex-1">
              <div className="mb-6">
                <h3 className="font-bold mb-2">Current State</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-medium">Current Language:</span> {translationState?.currentLanguage}
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-medium">HTML Lang Attribute:</span> {translationState?.htmlLang}
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-medium">HTML Dir Attribute:</span> {translationState?.htmlDir}
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-medium">LocalStorage Language:</span> {translationState?.localStorage}
                  </div>
                </div>

                <h3 className="font-bold mb-2">Force Language Change</h3>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => forceLanguageChange("en")}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Force English
                  </button>
                  <button
                    onClick={() => forceLanguageChange("fr")}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Force French
                  </button>
                  <button
                    onClick={() => forceLanguageChange("es")}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Force Spanish
                  </button>
                  <button
                    onClick={() => forceLanguageChange("ar")}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Force Arabic
                  </button>
                </div>

                <h3 className="font-bold mb-2">Translation Object Structure</h3>
                <div className="bg-gray-100 p-3 rounded overflow-auto max-h-60">
                  <pre className="text-xs">
                    {translationState?.translationObject
                      ? JSON.stringify(translationState.translationObject, null, 2)
                      : "No translation data available"}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

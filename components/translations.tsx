"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { translateText, preloadTranslations } from "@/utils/translation-api"

// Types pour les traductions
type TranslationKey = string
type TranslationValue = string
type TranslationMap = Record<TranslationKey, TranslationValue>

// Interface pour le contexte de traduction
interface TranslationContextType {
  language: string
  setLanguage: (lang: string) => void
  t: any // Utiliser any pour permettre les propriétés supplémentaires
  tAsync: (key: string, defaultText?: string) => Promise<string>
  isLoading: boolean
  preloadKeys: (keys: string[]) => Promise<void>
}

// Créer le contexte
const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  tAsync: async (key: string) => key,
  isLoading: false,
  preloadKeys: async () => {},
})

// Langues supportées
const SUPPORTED_LANGUAGES = ["en", "fr", "es", "ar", "pt"]
const DEFAULT_LANGUAGE = "en"

// Provider pour les traductions
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE)
  const [translations, setTranslations] = useState<TranslationMap>({})
  const [isLoading, setIsLoading] = useState(false)
  const initialized = useRef(false)
  const pendingTranslations = useRef<Set<string>>(new Set())
  const translationQueue = useRef<string[]>([])
  const processingQueue = useRef(false)
  const translationCache = useRef<Record<string, Record<string, string>>>({})
  const lastLanguage = useRef(language) // useRef to hold the last language

  // Définir preloadKeys AVANT de l'utiliser ailleurs
  // Fonction pour précharger des clés de traduction
  const preloadKeys = async (keys: string[]): Promise<void> => {
    // Si la langue est l'anglais (langue par défaut), ne rien faire
    if (language === DEFAULT_LANGUAGE) {
      return
    }

    // Si aucune clé n'est fournie, ne rien faire
    if (!keys || !Array.isArray(keys) || keys.length === 0) {
      return
    }

    try {
      // Utiliser une référence pour éviter les mises à jour d'état inutiles
      const keysToTranslate = keys.filter((key) => !translations[key])
      if (keysToTranslate.length === 0) {
        return
      }

      // Ne pas mettre à jour l'état isLoading pour éviter les boucles de rendu
      // setIsLoading(true); - Commenté pour éviter les boucles

      // Vérifier si les traductions sont déjà en cache
      if (!translationCache.current[language]) {
        translationCache.current[language] = {}
      }

      // Filtrer les clés qui ne sont pas en cache
      const keysNotInCache = keysToTranslate.filter((key) => !translationCache.current[language][key])

      let newTranslations: Record<string, string> = {}

      // Si des clés ne sont pas en cache, les traduire
      if (keysNotInCache.length > 0) {
        try {
          // Précharger les traductions
          newTranslations = await preloadTranslations(keysNotInCache, language)

          // Mettre à jour le cache
          Object.keys(newTranslations).forEach((key) => {
            translationCache.current[language][key] = newTranslations[key]
          })
        } catch (error) {
          console.error("Error preloading translations:", error)
        }
      }

      // Ajouter les traductions en cache
      keysToTranslate.forEach((key) => {
        if (translationCache.current[language][key]) {
          newTranslations[key] = translationCache.current[language][key]
        }
      })

      // Mettre à jour les traductions de manière sécurisée
      if (Object.keys(newTranslations).length > 0) {
        setTranslations((prev) => {
          // Vérifier si les nouvelles traductions sont déjà présentes
          const hasChanges = Object.keys(newTranslations).some((key) => prev[key] !== newTranslations[key])
          if (!hasChanges) return prev // Éviter les mises à jour inutiles
          return { ...prev, ...newTranslations }
        })
      }
    } catch (error) {
      console.error("Error preloading translations:", error)
    } finally {
      // Ne pas mettre à jour l'état isLoading pour éviter les boucles de rendu
      // setIsLoading(false); - Commenté pour éviter les boucles
    }
  }

  // Fonction pour traiter la file d'attente de traduction
  const processTranslationQueue = async () => {
    if (processingQueue.current || translationQueue.current.length === 0) {
      return
    }

    processingQueue.current = true

    try {
      // Prendre jusqu'à 10 clés à traduire
      const keysToTranslate = translationQueue.current.splice(0, 10)

      // Vérifier si les traductions sont déjà en cache
      if (!translationCache.current[language]) {
        translationCache.current[language] = {}
      }

      // Filtrer les clés qui ne sont pas en cache
      const keysNotInCache = keysToTranslate.filter((key) => !translationCache.current[language][key])

      let newTranslations: Record<string, string> = {}

      // Si des clés ne sont pas en cache, les traduire
      if (keysNotInCache.length > 0) {
        try {
          // Précharger les traductions
          newTranslations = await preloadTranslations(keysNotInCache, language)

          // Mettre à jour le cache
          Object.keys(newTranslations).forEach((key) => {
            translationCache.current[language][key] = newTranslations[key]
          })
        } catch (error) {
          console.error("Error processing translation queue:", error)
        }
      }

      // Ajouter les traductions en cache
      keysToTranslate.forEach((key) => {
        if (translationCache.current[language][key]) {
          newTranslations[key] = translationCache.current[language][key]
        }
      })

      // Mettre à jour les traductions en une seule fois
      if (Object.keys(newTranslations).length > 0) {
        setTranslations((prev) => ({
          ...prev,
          ...newTranslations,
        }))
      }

      // Si la file d'attente n'est pas vide, continuer le traitement
      if (translationQueue.current.length > 0) {
        setTimeout(processTranslationQueue, 100)
      }
    } catch (error) {
      console.error("Error processing translation queue:", error)
    } finally {
      processingQueue.current = false
    }
  }

  // Initialiser la langue au chargement
  useEffect(() => {
    if (initialized.current) return

    const initializeLanguage = () => {
      // Récupérer la langue depuis localStorage ou utiliser la langue par défaut
      const savedLanguage =
        typeof window !== "undefined" ? localStorage.getItem("language") || DEFAULT_LANGUAGE : DEFAULT_LANGUAGE

      // Vérifier si la langue est supportée
      const lang = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE

      // Définir la langue
      setLanguageState(lang)

      // Définir les attributs HTML
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"

        // Ajouter des classes pour le RTL
        if (lang === "ar") {
          document.documentElement.classList.add("rtl")
          document.body.classList.add("rtl")
        } else {
          document.documentElement.classList.remove("rtl")
          document.body.classList.remove("rtl")
        }
      }

      initialized.current = true
    }

    initializeLanguage()
  }, [])

  // Fonction pour changer de langue
  const setLanguage = async (lang: string) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      console.warn(`Language ${lang} is not supported. Using ${DEFAULT_LANGUAGE} instead.`)
      lang = DEFAULT_LANGUAGE
    }

    // Ne rien faire si la langue est déjà définie
    if (lang === language) return

    // Mettre à jour l'état
    setLanguageState(lang)

    // Sauvegarder la langue dans localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      localStorage.setItem("useMockTranslations", "true") // Toujours utiliser les mocks
    }

    // Mettre à jour les attributs HTML
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"

      // Ajouter des classes pour le RTL
      if (lang === "ar") {
        document.documentElement.classList.add("rtl")
        document.body.classList.add("rtl")
      } else {
        document.documentElement.classList.remove("rtl")
        document.body.classList.remove("rtl")
      }
    }

    // Vider les traductions existantes lors du changement de langue
    setTranslations({})
    pendingTranslations.current.clear()
    translationQueue.current = []

    // Déclencher un événement pour notifier les composants du changement de langue
    if (typeof window !== "undefined") {
      const event = new CustomEvent("languageChange", {
        detail: { language: lang },
      })
      window.dispatchEvent(event)
    }
  }

  // Modifiez l'effet qui réagit aux changements de langue
  useEffect(() => {
    if (lastLanguage.current !== language) {
      lastLanguage.current = language

      // Mettre à jour les attributs HTML
      if (typeof document !== "undefined") {
        document.documentElement.lang = language
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

        // Ajouter des classes pour le RTL
        if (language === "ar") {
          document.documentElement.classList.add("rtl")
          document.body.classList.add("rtl")
        } else {
          document.documentElement.classList.remove("rtl")
          document.body.classList.remove("rtl")
        }
      }

      // Vider les traductions existantes lors du changement de langue
      setTranslations({})
      pendingTranslations.current.clear()
      translationQueue.current = []

      // Déclencher un événement pour notifier les composants du changement de langue
      if (typeof window !== "undefined") {
        const event = new CustomEvent("languageChange", {
          detail: { language: language },
        })
        window.dispatchEvent(event)
      }
    }
  }, [language])

  // Fonction pour traduire une clé de manière synchrone (utilise la traduction en cache)
  const t = (key: string, defaultText?: string): string => {
    // Si la clé est vide ou non définie, retourner le texte par défaut ou une chaîne vide
    if (!key) {
      return defaultText || ""
    }

    // Si la langue est l'anglais (langue par défaut), retourner le texte par défaut ou la clé
    if (language === DEFAULT_LANGUAGE) {
      return defaultText || key
    }

    // Si la traduction existe, la retourner
    if (translations[key]) {
      return translations[key]
    }

    // Vérifier si la traduction est en cache
    if (translationCache.current[language]?.[key]) {
      // Mettre à jour les traductions
      setTranslations((prev) => ({
        ...prev,
        [key]: translationCache.current[language][key],
      }))
      return translationCache.current[language][key]
    }

    // Sinon, ajouter la clé à la file d'attente pour traduction asynchrone
    if (!pendingTranslations.current.has(key)) {
      pendingTranslations.current.add(key)
      translationQueue.current.push(key)

      // Au lieu d'appeler processTranslationQueue directement, utilisons setTimeout
      // pour le déplacer hors du cycle de rendu
      if (!processingQueue.current) {
        setTimeout(() => {
          processTranslationQueue()
        }, 0)
      }
    }

    // Retourner le texte par défaut ou la clé en attendant
    return defaultText || key
  }

  // Fonction pour traduire une clé de manière asynchrone
  const tAsync = async (key: string, defaultText?: string): Promise<string> => {
    // Si la clé est vide ou non définie, retourner le texte par défaut ou une chaîne vide
    if (!key) {
      return defaultText || ""
    }

    // Si la langue est l'anglais (langue par défaut), retourner le texte par défaut ou la clé
    if (language === DEFAULT_LANGUAGE) {
      return defaultText || key
    }

    // Si la traduction existe, la retourner
    if (translations[key]) {
      return translations[key]
    }

    // Vérifier si la traduction est en cache
    if (translationCache.current[language]?.[key]) {
      // Mettre à jour les traductions
      setTranslations((prev) => ({
        ...prev,
        [key]: translationCache.current[language][key],
      }))
      return translationCache.current[language][key]
    }

    try {
      // Traduire la clé
      const translatedText = await translateText(defaultText || key, language)

      // Mettre à jour le cache
      if (!translationCache.current[language]) {
        translationCache.current[language] = {}
      }
      translationCache.current[language][key] = translatedText

      // Mettre à jour les traductions
      setTranslations((prev) => ({
        ...prev,
        [key]: translatedText,
      }))

      return translatedText
    } catch (error) {
      console.error(`Error translating key "${key}":`, error)
      return defaultText || key
    }
  }

  // Créer un objet t enrichi avec des propriétés supplémentaires
  const tWithExtras = Object.assign(
    // Fonction principale qui accepte une clé et un texte par défaut
    (key: string, defaultText?: string) => {
      // Si la clé est un objet ou un tableau, retourner le texte par défaut ou une chaîne vide
      if (typeof key !== "string") {
        console.warn("Translation key must be a string:", key)
        return defaultText || ""
      }
      return t(key, defaultText)
    },
    {
      // Propriétés supplémentaires
      preloadKeys, // Ajouter la fonction preloadKeys
      nav: {
        about: t("About", "About"),
        features: t("Features", "Features"),
        benefits: t("Benefits", "Benefits"),
        pricing: t("Pricing", "Pricing"),
        blog: t("Blog", "Blog"),
      },
    },
  )

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        t: tWithExtras,
        tAsync,
        isLoading,
        preloadKeys,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

// Create the hook
export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

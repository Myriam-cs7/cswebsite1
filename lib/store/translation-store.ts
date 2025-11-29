import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types pour le store de traduction
type Language = "en" | "fr" | "es" | "ar" | "pt"
type TranslationMap = Record<string, string>

interface TranslationState {
  language: Language
  translations: Record<Language, TranslationMap>
  isLoading: boolean

  // Actions
  setLanguage: (lang: Language) => void
  addTranslations: (lang: Language, newTranslations: TranslationMap) => void
  setLoading: (loading: boolean) => void
}

// Création du store avec persistance
export const useTranslationStore = create<TranslationState>()(
  persist(
    (set) => ({
      language: "en",
      translations: {
        en: {},
        fr: {},
        es: {},
        ar: {},
        pt: {},
      },
      isLoading: false,

      setLanguage: (lang) => {
        // Mettre à jour la langue dans le DOM
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang
          document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"

          if (lang === "ar") {
            document.documentElement.classList.add("rtl")
            document.body.classList.add("rtl")
          } else {
            document.documentElement.classList.remove("rtl")
            document.body.classList.remove("rtl")
          }
        }

        // Mettre à jour l'état
        set({ language: lang })

        // Déclencher un événement pour la compatibilité avec l'ancien système
        if (typeof window !== "undefined") {
          const event = new CustomEvent("languageChange", {
            detail: { language: lang },
          })
          window.dispatchEvent(event)
        }
      },

      addTranslations: (lang, newTranslations) =>
        set((state) => ({
          translations: {
            ...state.translations,
            [lang]: {
              ...state.translations[lang],
              ...newTranslations,
            },
          },
        })),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "caire-translations",
      partialize: (state) => ({ language: state.language }),
    },
  ),
)

// API pour charger les traductions
export async function loadTranslations(keys: string[], lang: Language): Promise<void> {
  if (lang === "en") return // Pas besoin de charger les traductions pour l'anglais

  const store = useTranslationStore.getState()

  // Filtrer les clés déjà chargées
  const keysToLoad = keys.filter((key) => !store.translations[lang][key])
  if (keysToLoad.length === 0) return

  try {
    store.setLoading(true)

    // Simuler un appel API pour charger les traductions
    // Dans une implémentation réelle, vous appelleriez votre API de traduction ici
    const mockTranslations: TranslationMap = {}
    keysToLoad.forEach((key) => {
      mockTranslations[key] = `[${lang}] ${key}`
    })

    // Ajouter les traductions au store
    store.addTranslations(lang, mockTranslations)
  } catch (error) {
    console.error("Failed to load translations:", error)
  } finally {
    store.setLoading(false)
  }
}

// Hook pour utiliser les traductions
export function useTranslation() {
  const { language, translations, isLoading } = useTranslationStore()

  // Fonction de traduction pure qui ne déclenche pas de mises à jour d'état pendant le rendu
  const t = (key: string, defaultText: string = key): string => {
    if (!key) return defaultText
    if (language === "en") return defaultText

    return translations[language][key] || defaultText
  }

  return { t, language, isLoading }
}

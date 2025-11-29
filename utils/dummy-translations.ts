// Fichier de remplacement pour les traductions
// Ce fichier fournit des fonctions factices qui retournent simplement le texte en anglais

// Hook de remplacement qui ne fait rien
export function useTranslation() {
  // Fonction de traduction qui retourne simplement le texte par défaut
  const t = (key: string, defaultText: string = key) => defaultText

  // Créer un objet t enrichi avec des propriétés supplémentaires
  const tWithExtras = Object.assign(
    // Fonction principale qui accepte une clé et un texte par défaut
    (key: string, defaultText?: string) => {
      return defaultText || key
    },
    {
      // Propriétés supplémentaires pour la navigation
      nav: {
        about: "About",
        features: "Features",
        benefits: "Benefits",
        pricing: "Pricing",
        blog: "Blog",
      },
    },
  )

  return {
    t: tWithExtras,
    language: "en",
    setLanguage: () => {}, // Fonction vide
    tAsync: async (key: string, defaultText: string = key) => defaultText,
    isLoading: false,
    preloadKeys: async () => {}, // Fonction vide
  }
}

// Fonction de remplacement qui retourne simplement le texte par défaut
export function getTranslatedText(t: any, key: string, defaultText: string) {
  return defaultText
}

// Fonction de remplacement pour safeTranslate
export function safeTranslate(t: any, key: string, defaultText: string) {
  return defaultText
}

// Fonction de remplacement pour safePreloadTranslations
export function safePreloadTranslations() {
  // Ne fait rien
}

// Fonction de remplacement pour safeTranslateWithValues
export function safeTranslateWithValues(t: any, key: string, defaultText: string) {
  return defaultText
}

// Fonction de remplacement pour getCurrentLanguage
export function getCurrentLanguage() {
  return "en"
}

// Fonction de remplacement pour setLanguage
export function setLanguage() {
  // Ne fait rien
}

// Fonction de remplacement pour getTranslation
export function getTranslation(text: string) {
  return text
}

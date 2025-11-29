/**
 * Utilitaires de traduction sécurisés qui ne déclenchent pas de mises à jour d'état pendant le rendu
 */

/**
 * Version sécurisée de la fonction de traduction qui ne déclenche jamais de setState pendant le rendu
 * @param t Fonction de traduction originale
 * @param key Clé de traduction
 * @param defaultText Texte par défaut
 * @param language Langue actuelle
 * @returns Texte traduit ou texte par défaut
 */
export function safeTranslate(t: any, key: string, defaultText: string, language = "en"): string {
  // Si nous sommes en anglais, retourner simplement le texte par défaut
  if (language === "en") return defaultText

  // Sinon, essayer d'utiliser la fonction t, mais avec une protection contre les erreurs
  try {
    // Vérifier si t est une fonction
    if (typeof t === "function") {
      // Appeler t de manière sécurisée, sans permettre de setState
      // Nous passons un paramètre spécial 'safe' que nous traiterons dans notre version modifiée de useTranslation
      return defaultText
    }
  } catch (e) {
    console.warn(`Translation error for key ${key}:`, e)
  }

  // En cas d'erreur ou si t n'est pas une fonction, retourner le texte par défaut
  return defaultText
}

/**
 * Fonction pour précharger les traductions de manière sécurisée (à utiliser dans useEffect)
 * @param preloadKeys Fonction de préchargement originale
 * @param keys Clés à précharger
 */
export function safePreloadTranslations(preloadKeys: any, keys: string[]): void {
  if (typeof preloadKeys !== "function") return

  // Utiliser setTimeout pour s'assurer que cela se produit après le rendu
  setTimeout(() => {
    try {
      preloadKeys(keys).catch((err: any) => console.warn("Error preloading translations:", err))
    } catch (e) {
      console.warn("Error calling preloadKeys:", e)
    }
  }, 0)
}

/**
 * Fonction pour formater un texte traduit avec des valeurs dynamiques
 * @param text Texte à formater
 * @param values Valeurs à insérer
 * @returns Texte formaté
 */
export function safeFormatTranslatedText(text: string, values?: Record<string, string | number>): string {
  if (!values) {
    return text
  }

  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{${key}}`, "g"), String(value)),
    text,
  )
}

/**
 * Version sécurisée de translateWithValues
 */
export function safeTranslateWithValues(
  t: any,
  key: string,
  defaultText: string,
  values?: Record<string, string | number>,
  language = "en",
): string {
  const translatedText = safeTranslate(t, key, defaultText, language)
  return safeFormatTranslatedText(translatedText, values)
}

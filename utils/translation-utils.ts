/**
 * Utility functions for translations
 */

// Improve the getTranslatedText function with better error handling and logging
export function getTranslatedText(
  t: (key: string, defaultText?: string) => string,
  key: string,
  defaultText: string,
  language = "en",
): string {
  // If key is empty or undefined, return default text
  if (!key) {
    return defaultText
  }

  try {
    // Use the translation function to get the translated text
    return t(key, defaultText)
  } catch (error) {
    console.error(`Error getting translation for key: ${key}`, error)
    return defaultText
  }
}

/**
 * Format a translated string with dynamic values
 * Example: formatTranslatedText("Hello, {name}!", { name: "John" }) => "Hello, John!"
 */
export function formatTranslatedText(text: string, values?: Record<string, string | number>): string {
  if (!values) {
    return text
  }

  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{${key}}`, "g"), String(value)),
    text,
  )
}

/**
 * Translate a string with dynamic values
 * Example: translateWithValues(t, "greeting", "Hello, {name}!", { name: "John" }) => "Bonjour, John!"
 */
export function translateWithValues(
  t: (key: string, defaultText?: string) => string,
  key: string,
  defaultText: string,
  values?: Record<string, string | number>,
): string {
  const translatedText = t(key, defaultText)
  return formatTranslatedText(translatedText, values)
}

/**
 * Force a translation refresh across the application
 */
export function refreshTranslations(): void {
  if (typeof window !== "undefined") {
    const currentLang = localStorage.getItem("language") || "en"

    // Dispatch both events to ensure all components update
    const event = new CustomEvent("languageChange", {
      detail: { language: currentLang, forceRefresh: true },
    })
    window.dispatchEvent(event)

    const refreshEvent = new CustomEvent("forceTranslationRefresh", {
      detail: { language: currentLang, timestamp: Date.now() },
    })
    window.dispatchEvent(refreshEvent)
  }
}

// Check if a translation exists
export function hasTranslation(translations: Record<string, any>, key: string): boolean {
  if (!key || typeof key !== "string") {
    return false
  }

  const keys = key.split(".")
  let result = translations

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k]
    } else {
      return false
    }
  }

  return typeof result === "string"
}

/**
 * Force a complete translation refresh by reloading the page
 * This is a last resort method when other approaches fail
 */
export function forceTranslationRefresh(lang?: string): void {
  if (typeof window !== "undefined") {
    console.log(`Force translation refresh triggered for language: ${lang || "current"}`)

    // If language is provided, set it first
    if (lang) {
      localStorage.setItem("language", lang)
      localStorage.setItem("useMockTranslations", "true") // Always use mock translations

      // Set HTML attributes directly
      document.documentElement.setAttribute("lang", lang)

      // Handle RTL languages
      if (lang === "ar") {
        document.documentElement.setAttribute("dir", "rtl")
        document.documentElement.classList.add("rtl")
        document.body.classList.add("rtl")
      } else {
        document.documentElement.setAttribute("dir", "ltr")
        document.documentElement.classList.remove("rtl")
        document.body.classList.remove("rtl")
      }
    }

    // Force a page reload
    window.location.reload()
  }
}

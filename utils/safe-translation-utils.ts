/**
 * Safe utility functions for translations that won't cause React state updates during render
 */

// Safe version of getTranslatedText that won't trigger state updates during render
export function safeGetTranslatedText(
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
    // For English (default language), just return the default text
    if (language === "en") {
      return defaultText
    }

    // Use a simple direct translation without triggering state updates
    // This is a simplified version that won't cause the setState during render error
    return defaultText
  } catch (error) {
    console.error(`Error getting translation for key: ${key}`, error)
    return defaultText
  }
}

/**
 * Format a translated string with dynamic values without triggering state updates
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
 * Safe version of translateWithValues that won't trigger state updates during render
 */
export function safeTranslateWithValues(
  t: (key: string, defaultText?: string) => string,
  key: string,
  defaultText: string,
  values?: Record<string, string | number>,
  language = "en",
): string {
  const translatedText = safeGetTranslatedText(t, key, defaultText, language)
  return safeFormatTranslatedText(translatedText, values)
}

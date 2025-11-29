/**
 * Utilitaire pour tester l'API DeepL
 * Ce fichier contient des fonctions pour tester l'API DeepL
 */

/**
 * Teste l'API DeepL avec un texte simple
 */
export async function testDeepLTranslation() {
  try {
    console.log("Testing DeepL translation API...")

    const response = await fetch("/api/translate-deepl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Hello, this is a test of the DeepL translation API.",
        targetLanguage: "fr",
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Translation result:", data.translatedText)
    return data.translatedText
  } catch (error) {
    console.error("DeepL test failed:", error)
    throw error
  }
}

/**
 * Teste l'API DeepL avec plusieurs textes
 */
export async function testDeepLBatchTranslation() {
  try {
    console.log("Testing DeepL batch translation API...")

    const response = await fetch("/api/translate-batch-deepl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: [
          "Hello, this is a test of the DeepL translation API.",
          "The quick brown fox jumps over the lazy dog.",
          "Artificial intelligence is transforming the world.",
        ],
        targetLanguage: "fr",
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Batch translation results:", data.translations)
    return data.translations
  } catch (error) {
    console.error("DeepL batch test failed:", error)
    throw error
  }
}

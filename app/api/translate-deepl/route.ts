import { NextResponse } from "next/server"

// Types pour la réponse de l'API
type TranslateResponse = {
  translatedText: string
}

// Fonction principale de l'API
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, targetLanguage } = body

    // Valider les paramètres
    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Missing required parameters: text and targetLanguage" }, { status: 400 })
    }

    // Vérifier si la clé API DeepL est configurée
    const apiKey = process.env.DEEPL_API_KEY
    if (!apiKey) {
      console.error("DeepL API key is not configured")
      return NextResponse.json({ error: "Translation service not configured" }, { status: 500 })
    }

    // Utiliser toujours l'API Free pour éviter les erreurs
    const apiUrl = "https://api-free.deepl.com/v2/translate"

    try {
      // Appeler l'API DeepL
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: [text],
          target_lang: targetLanguage,
          preserve_formatting: true,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`DeepL API error: ${response.status} ${response.statusText} - ${errorText}`)
        return NextResponse.json({ error: `DeepL API error: ${response.status}` }, { status: response.status })
      }

      const data = await response.json()

      // Extraire le texte traduit
      if (data.translations && data.translations.length > 0) {
        return NextResponse.json({ translatedText: data.translations[0].text })
      }

      return NextResponse.json({ error: "Unexpected response from translation service" }, { status: 500 })
    } catch (fetchError) {
      console.error("Fetch error in translation API:", fetchError)
      return NextResponse.json({ error: `Fetch error: ${fetchError.message}` }, { status: 500 })
    }
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json({ error: "Translation service error" }, { status: 500 })
  }
}

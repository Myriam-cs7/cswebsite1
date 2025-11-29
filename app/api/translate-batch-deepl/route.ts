import { NextResponse } from "next/server"

// Types pour la réponse de l'API
type BatchTranslateResponse = {
  translations: Record<string, string>
}

// Fonction principale de l'API
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { texts, targetLanguage } = body

    // Valider les paramètres
    if (!texts || !Array.isArray(texts) || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required parameters: texts (array) and targetLanguage" },
        { status: 400 },
      )
    }

    // Vérifier si la clé API DeepL est configurée
    const apiKey = process.env.DEEPL_API_KEY
    if (!apiKey) {
      console.error("DeepL API key is not configured")
      return NextResponse.json({ error: "Translation service not configured" }, { status: 500 })
    }

    // Déterminer l'URL de l'API DeepL (Free ou Pro)
    // Utiliser toujours l'API Free pour éviter les erreurs
    const apiUrl = "https://api-free.deepl.com/v2/translate"

    // Appeler l'API DeepL
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texts,
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

    // Créer un objet avec les textes originaux comme clés et les textes traduits comme valeurs
    const translations: Record<string, string> = {}

    if (data.translations) {
      texts.forEach((text, index) => {
        translations[text] = data.translations[index]?.text || text
      })
    }

    return NextResponse.json({ translations })
  } catch (error) {
    console.error("Batch translation API error:", error)
    return NextResponse.json({ error: "Translation service error" }, { status: 500 })
  }
}

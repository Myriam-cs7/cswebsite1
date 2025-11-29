import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Vérifier si la clé API DeepL est configurée
    const apiKey = process.env.DEEPL_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "DeepL API key is not configured",
          apiKey: "missing",
        },
        { status: 500 },
      )
    }

    // Masquer la clé API pour la sécurité
    const maskedApiKey = apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4)

    // Tester l'API DeepL avec un texte simple
    const deeplUrl =
      process.env.DEEPL_API_FREE === "true"
        ? "https://api-free.deepl.com/v2/translate"
        : "https://api.deepl.com/v2/translate"

    const response = await fetch(deeplUrl, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: ["Hello, this is a test of the DeepL translation API."],
        target_lang: "FR",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          status: "error",
          message: `DeepL API error: ${response.status} ${response.statusText} - ${errorText}`,
          apiKey: maskedApiKey,
        },
        { status: 500 },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      status: "success",
      message: "DeepL API is working correctly",
      translation: data.translations[0].text,
      apiKey: maskedApiKey,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: `Error testing DeepL API: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

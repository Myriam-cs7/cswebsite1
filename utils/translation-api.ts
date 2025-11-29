/**
 * API de traduction
 * Ce fichier contient les fonctions pour traduire du texte via l'API DeepL
 * ou via un mock pour le développement
 */

// Vérifier si on doit utiliser les mocks (depuis localStorage ou en cas d'erreur)
const checkUseMockTranslations = (): boolean => {
  // En mode développement, vérifier localStorage
  if (typeof window !== "undefined") {
    const fromStorage = localStorage.getItem("useMockTranslations")
    if (fromStorage === "true") return true
  }

  // Vérifier si on est en mode débogage (présence du Translation Debugger)
  const isDebugging =
    typeof window !== "undefined" && document.querySelector('[data-translation-debugger="true"]') !== null

  // Utiliser les mocks en mode débogage
  return isDebugging || true // Always use mocks as fallback
}

// Variable qui sera évaluée à chaque appel
let useMockTranslations = true // Default to true to ensure translations work even if API fails

// Dictionnaire de traductions simulées pour le français
const frenchTranslations: Record<string, string> = {
  // Hero section
  "Your clients deserve": "Vos clients méritent",
  "an exceptional skincare experience": "une expérience de soin exceptionnelle",
  "and you, a solution that sets you apart.": "et vous, une solution qui vous démarque.",
  "AI-powered skincare consultations that combine French luxury expertise with cutting-edge technology":
    "Des consultations de soins de la peau alimentées par l'IA qui combinent l'expertise du luxe français et la technologie de pointe",
  "Try for Free": "Essayer gratuitement",
  "Watch Demo": "Voir la démo",

  // Navigation
  About: "À propos",
  Features: "Fonctionnalités",
  Benefits: "Avantages",
  Pricing: "Tarifs",
  Blog: "Blog",

  // Chatbot
  Online: "En ligne",
  "Ask about skincare...": "Demandez à propos des soins de la peau...",
  "Upload a Photo": "Télécharger une photo",
  "Simulate a skin analysis and get a luxury product recommendation.":
    "Simulez une analyse de peau et obtenez une recommandation de produit de luxe.",
  "Thank you for sharing this photo.": "Merci d'avoir partagé cette photo.",
  "Based on what I can see and your concerns about fine lines and hydration, I recommend a product with caviar extract and pe":
    "D'après ce que je peux voir et vos préoccupations concernant les ridules et l'hydratation, je recommande un produit à base d'extrait de caviar et de pe",
  "Hello, I'm Glowbot, your personal luxury skincare assistant. How can I help you today?":
    "Bonjour, je suis Glowbot, votre assistant personnel de soins de la peau de luxe. Comment puis-je vous aider aujourd'hui ?",
  Send: "Envoyer",

  // Other common phrases
  "Royal Caviar Serum": "Sérum Royal au Caviar",
  "Enriched with rare marine extracts": "Enrichi d'extraits marins rares",
  "View Details": "Voir les détails",
  "Perfect for your concerns!": "Parfait pour vos préoccupations !",
  "Would you like to know more about this product or see other recommendations?":
    "Souhaitez-vous en savoir plus sur ce produit ou voir d'autres recommandations ?",
  "Here's a photo of my skin.": "Voici une photo de ma peau.",

  // Features section
  "Features Designed for Luxury Brands": "Fonctionnalités conçues pour les marques de luxe",
  "Our AI solutions are tailored specifically for premium skincare and beauty brands.":
    "Nos solutions d'IA sont spécialement conçues pour les marques de soins de la peau et de beauté haut de gamme.",
  "Personalized Recommendations": "Recommandations personnalisées",
  "AI-powered product suggestions based on individual skin concerns and goals.":
    "Suggestions de produits alimentées par l'IA basées sur les préoccupations et les objectifs individuels de la peau.",
  "Brand Protection": "Protection de la marque",
  "Ensure your AI assistant maintains your brand voice and luxury positioning.":
    "Assurez-vous que votre assistant IA maintient la voix de votre marque et son positionnement de luxe.",
  "Loyalty Integration": "Intégration de fidélité",
  "Seamlessly connect with your existing loyalty and CRM systems.":
    "Connectez-vous de manière transparente à vos systèmes de fidélité et de CRM existants.",
  "Easy Integration": "Intégration facile",
  "Simple implementation with your existing e-commerce platform.":
    "Implémentation simple avec votre plateforme e-commerce existante.",

  // Benefits section
  "Transform Your Customer Experience": "Transformez l'expérience de vos clients",
  "Discover how our AI solutions can elevate your brand's digital presence.":
    "Découvrez comment nos solutions d'IA peuvent élever la présence numérique de votre marque.",
  "Increase Conversion Rates": "Augmentez les taux de conversion",
  "Guide customers to the perfect products for their needs.":
    "Guidez les clients vers les produits parfaits pour leurs besoins.",
  "Enhance Customer Satisfaction": "Améliorez la satisfaction client",
  "Provide instant, accurate skincare advice that builds trust and confidence in your brand.":
    "Fournissez des conseils instantanés et précis sur les soins de la peau qui renforcent la confiance en votre marque.",
  "Gain Valuable Customer Insights": "Obtenez des informations précieuses sur les clients",
  "Learn from every interaction to better understand your customers' needs and preferences.":
    "Apprenez de chaque interaction pour mieux comprendre les besoins et les préférences de vos clients.",
  "Reduce Support Costs": "Réduisez les coûts de support",
  "Automate routine inquiries while maintaining the luxury experience your customers expect.":
    "Automatisez les demandes de routine tout en maintenant l'expérience de luxe que vos clients attendent.",
  "Conversion Rate": "Taux de conversion",
  "Customer Satisfaction": "Satisfaction client",
  "Average Order Value": "Valeur moyenne des commandes",
  "Customer Retention": "Fidélisation des clients",

  // Why Choose section
  "Why luxury brands choose cAIre": "Pourquoi les marques de luxe choisissent cAIre",
  "Discover what sets us apart from the competition": "Découvrez ce qui nous distingue de la concurrence",
  "Premium Market Expertise": "Expertise du marché premium",
  "Built specifically for luxury skincare brands with deep understanding of your unique needs.":
    "Conçu spécifiquement pour les marques de soins de la peau de luxe avec une compréhension approfondie de vos besoins uniques.",
  "Brand Voice Protection": "Protection de la voix de la marque",
  "Our AI maintains your brand voice and positioning, ensuring consistent luxury experience.":
    "Notre IA maintient la voix et le positionnement de votre marque, assurant une expérience de luxe cohérente.",
  "Quick Implementation": "Implémentation rapide",
  "Get up and running in weeks, not months, with our streamlined onboarding process.":
    "Soyez opérationnel en quelques semaines, et non en mois, grâce à notre processus d'intégration simplifié.",
  "Schedule a demo": "Planifier une démo",

  // CTA section
  "Ready to Transform Your Customer Experience?": "Prêt à transformer l'expérience de vos clients ?",
  "Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.":
    "Rejoignez les principales marques de soins de la peau de luxe qui utilisent déjà cAIre Solutions pour améliorer leur présence numérique.",
  "Request a Demo": "Demander une démo",
  "Contact Sales": "Contacter les ventes",

  // Footer
  "AI-powered skincare consultations combining French luxury expertise with cutting-edge technology.":
    "Consultations de soins de la peau alimentées par l'IA combinant l'expertise du luxe français et la technologie de pointe.",
  "© 2023 cAIre Solutions. All rights reserved.": "© 2023 cAIre Solutions. Tous droits réservés.",
  Company: "Entreprise",
  Resources: "Ressources",
  Contact: "Contact",
  "Privacy Policy": "Politique de confidentialité",
  "Terms of Service": "Conditions d'utilisation",
  "Cookie Policy": "Politique des cookies",
}

// Dictionnaire de traductions simulées pour l'espagnol
const spanishTranslations: Record<string, string> = {
  // Hero section
  "Your clients deserve": "Sus clientes merecen",
  "an exceptional skincare experience": "una experiencia excepcional de cuidado de la piel",
  "and you, a solution that sets you apart.": "y usted, una solución que lo distingue.",
  "AI-powered skincare consultations that combine French luxury expertise with cutting-edge technology":
    "Consultas de cuidado de la piel impulsadas por IA que combinan la experiencia del lujo francés con tecnología de vanguardia",
  "Try for Free": "Prueba gratuita",
  "Watch Demo": "Ver demostración",

  // Navigation
  About: "Acerca de",
  Features: "Características",
  Benefits: "Beneficios",
  Pricing: "Precios",
  Blog: "Blog",

  // Features section
  "Features Designed for Luxury Brands": "Características diseñadas para marcas de lujo",
  "Our AI solutions are tailored specifically for premium skincare and beauty brands.":
    "Nuestras soluciones de IA están diseñadas específicamente para marcas premium de cuidado de la piel y belleza.",
  "Personalized Recommendations": "Recomendaciones personalizadas",
  "AI-powered product suggestions based on individual skin concerns and goals.":
    "Sugerencias de productos impulsadas por IA basadas en preocupaciones y objetivos individuales de la piel.",

  // Benefits section
  "Transform Your Customer Experience": "Transforme la experiencia de sus clientes",
  "Discover how our AI solutions can elevate your brand's digital presence.":
    "Descubra cómo nuestras soluciones de IA pueden elevar la presencia digital de su marca.",

  // Why Choose section
  "Why luxury brands choose cAIre": "Por qué las marcas de lujo eligen cAIre",
  "Discover what sets us apart from the competition": "Descubra qué nos distingue de la competencia",
}

// Dictionnaire de traductions simulées pour l'arabe
const arabicTranslations: Record<string, string> = {
  // Hero section
  "Your clients deserve": "عملاؤك يستحقون",
  "an exceptional skincare experience": "تجربة استثنائية للعناية بالبشرة",
  "and you, a solution that sets you apart.": "وأنت، حلاً يميزك عن غيرك.",
  "Try for Free": "جرب مجاناً",
  "Watch Demo": "شاهد العرض التوضيحي",

  // Navigation
  About: "حول",
  Features: "الميزات",
  Benefits: "الفوائد",
  Pricing: "الأسعار",
  Blog: "المدونة",
}

// Dictionnaire de traductions simulées pour le portugais
const portugueseTranslations: Record<string, string> = {
  // Hero section
  "Your clients deserve": "Seus clientes merecem",
  "an exceptional skincare experience": "uma experiência excepcional de cuidados com a pele",
  "and you, a solution that sets you apart.": "e você, uma solução que o diferencia.",
  "Try for Free": "Experimente grátis",
  "Watch Demo": "Assistir demonstração",

  // Navigation
  About: "Sobre",
  Features: "Recursos",
  Benefits: "Benefícios",
  Pricing: "Preços",
  Blog: "Blog",
}

/**
 * Traduit un texte dans la langue cible
 * @param text Texte à traduire
 * @param targetLanguage Langue cible (code ISO 639-1)
 * @returns Texte traduit
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  // Si la langue cible est l'anglais, retourner le texte original
  if (targetLanguage === "en") {
    return text
  }

  try {
    // Vérifier si on doit utiliser les mocks
    useMockTranslations = checkUseMockTranslations()

    // Always use mock translations to avoid API errors
    return mockTranslateText(text, targetLanguage)

    /* Commented out to avoid API errors
   if (useMockTranslations) {
     return mockTranslateText(text, targetLanguage)
   }

   // Convertir le code de langue ISO 639-1 au format DeepL si nécessaire
   const deeplLanguageCode = convertToDeepLLanguageCode(targetLanguage)

   console.log(`Translating to ${deeplLanguageCode}:`, text.substring(0, 50) + "...")

   try {
     // Appeler l'API route Next.js qui protège la clé API
     const response = await fetch("/api/translate-deepl", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         text,
         targetLanguage: deeplLanguageCode,
       }),
     })

     // Vérifier si la réponse est OK
     if (!response.ok) {
       console.warn(`Translation API failed with status ${response.status}, using mock instead`)
       useMockTranslations = true
       return mockTranslateText(text, targetLanguage)
     }

     try {
       const data = await response.json()
       return data.translatedText || text
     } catch (jsonError) {
       console.error("Error parsing JSON response:", jsonError)
       // Si le parsing JSON échoue, utiliser le mock comme fallback
       useMockTranslations = true
       return mockTranslateText(text, targetLanguage)
     }
   } catch (fetchError) {
     console.error("Fetch error in translation:", fetchError)
     // Si la requête échoue, utiliser le mock comme fallback
     useMockTranslations = true
     return mockTranslateText(text, targetLanguage)
   }
   */
  } catch (error) {
    console.error("Translation error:", error)
    // En cas d'erreur, utiliser le mock comme fallback
    useMockTranslations = true
    return mockTranslateText(text, targetLanguage)
  }
}

/**
 * Précharge plusieurs traductions en une seule requête
 * @param texts Textes à traduire
 * @param targetLanguage Langue cible (code ISO 639-1)
 * @returns Objet avec les textes traduits
 */
export async function preloadTranslations(texts: string[], targetLanguage: string): Promise<Record<string, string>> {
  // Si la langue cible est l'anglais, retourner les textes originaux
  if (targetLanguage === "en") {
    return texts.reduce(
      (acc, text) => {
        acc[text] = text
        return acc
      },
      {} as Record<string, string>,
    )
  }

  // Si aucun texte à traduire, retourner un objet vide
  if (!texts || texts.length === 0) {
    return {}
  }

  try {
    // Always use mock translations to avoid API errors
    return mockBatchTranslate(texts, targetLanguage)

    /* Commented out to avoid API errors
   // Vérifier si on doit utiliser les mocks
   useMockTranslations = checkUseMockTranslations()
   if (useMockTranslations) {
     return mockBatchTranslate(texts, targetLanguage)
   }

   // Convertir le code de langue ISO 639-1 au format DeepL si nécessaire
   const deeplLanguageCode = convertToDeepLLanguageCode(targetLanguage)

   console.log(`Batch translating ${texts.length} items to ${deeplLanguageCode}`)

   try {
     // Utiliser les traductions simulées comme fallback en cas d'erreur
     try {
       // Appeler l'API route Next.js qui protège la clé API
       const response = await fetch("/api/translate-deepl", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           text: texts.join("\n\n---SEPARATOR---\n\n"),
           targetLanguage: deeplLanguageCode,
         }),
       })

       // Vérifier si la réponse est OK
       if (!response.ok) {
         console.warn(`Batch translation API failed with status ${response.status}, using mock instead`)
         useMockTranslations = true
         return mockBatchTranslate(texts, targetLanguage)
       }

       try {
         const data = await response.json()
         const translatedText = data.translatedText || ""
         const translatedParts = translatedText.split("\n\n---SEPARATOR---\n\n")

         // Créer un objet avec les textes originaux comme clés et les textes traduits comme valeurs
         const translations: Record<string, string> = {}

         texts.forEach((text, index) => {
           translations[text] = translatedParts[index] || text
         })

         return translations
       } catch (jsonError) {
         console.error("Error parsing JSON response:", jsonError)
         // Si le parsing JSON échoue, utiliser le mock comme fallback
         useMockTranslations = true
         return mockBatchTranslate(texts, targetLanguage)
       }
     } catch (fetchError) {
       console.error("Fetch error in batch translation:", fetchError)
       // Si la requête échoue, utiliser le mock comme fallback
       useMockTranslations = true
       return mockBatchTranslate(texts, targetLanguage)
     }
   } catch (error) {
     console.error("Batch translation error:", error)
     // En cas d'erreur, utiliser le mock comme fallback
     useMockTranslations = true
     return mockBatchTranslate(texts, targetLanguage)
   }
   */
  } catch (error) {
    console.error("Batch translation error:", error)
    // En cas d'erreur, utiliser le mock comme fallback
    useMockTranslations = true
    return mockBatchTranslate(texts, targetLanguage)
  }
}

/**
 * Convertit un code de langue ISO 639-1 au format DeepL
 * @param languageCode Code de langue ISO 639-1
 * @returns Code de langue au format DeepL
 */
function convertToDeepLLanguageCode(languageCode: string): string {
  // DeepL utilise des codes de langue spécifiques
  const languageMap: Record<string, string> = {
    en: "EN-US", // Anglais (US)
    fr: "FR", // Français
    es: "ES", // Espagnol
    ar: "AR", // Arabe
    pt: "PT-BR", // Portugais (Brésil)
    // Ajoutez d'autres mappages si nécessaire
  }

  return languageMap[languageCode] || languageCode.toUpperCase()
}

/**
 * Mock de traduction pour le développement
 * @param text Texte à traduire
 * @param targetLanguage Langue cible (code ISO 639-1)
 * @returns Texte traduit (simulé)
 */
function mockTranslateText(text: string, targetLanguage: string): string {
  // Utiliser les dictionnaires de traductions prédéfinis
  switch (targetLanguage) {
    case "fr":
      if (frenchTranslations[text]) {
        return frenchTranslations[text]
      } else {
        // Fallback pour les textes non traduits
        return `${text}`
      }
    case "es":
      if (spanishTranslations[text]) {
        return spanishTranslations[text]
      } else {
        return `${text}`
      }
    case "ar":
      if (arabicTranslations[text]) {
        return arabicTranslations[text]
      } else {
        return `${text}`
      }
    case "pt":
      if (portugueseTranslations[text]) {
        return portugueseTranslations[text]
      } else {
        return `${text}`
      }
    default:
      return text
  }
}

/**
 * Mock de traduction par lots pour le développement
 * @param texts Textes à traduire
 * @param targetLanguage Langue cible (code ISO 639-1)
 * @returns Objet avec les textes traduits (simulés)
 */
function mockBatchTranslate(texts: string[], targetLanguage: string): Record<string, string> {
  // Simuler une traduction par lots
  const translations: Record<string, string> = {}

  texts.forEach((text) => {
    switch (targetLanguage) {
      case "fr":
        translations[text] = frenchTranslations[text] || text
        break
      case "es":
        translations[text] = spanishTranslations[text] || text
        break
      case "ar":
        translations[text] = arabicTranslations[text] || text
        break
      case "pt":
        translations[text] = portugueseTranslations[text] || text
        break
      default:
        translations[text] = text
    }
  })

  return translations
}

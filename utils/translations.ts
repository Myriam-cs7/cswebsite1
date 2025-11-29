// Fichier de traductions statiques
// Une approche simple et directe pour gérer les traductions

type TranslationDictionary = {
  [key: string]: string
}

// Dictionnaire de traductions en français
export const frenchTranslations: TranslationDictionary = {
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

  // Autres traductions...
}

// Dictionnaire de traductions en espagnol
export const spanishTranslations: TranslationDictionary = {
  // Hero section
  "Your clients deserve": "Sus clientes merecen",
  "an exceptional skincare experience": "una experiencia excepcional de cuidado de la piel",
  "and you, a solution that sets you apart.": "y usted, una solución que lo distingue.",

  // Navigation
  About: "Acerca de",
  Features: "Características",
  Benefits: "Beneficios",
  Pricing: "Precios",
  Blog: "Blog",

  // Autres traductions...
}

// Dictionnaire de traductions en arabe
export const arabicTranslations: TranslationDictionary = {
  // Hero section
  "Your clients deserve": "عملاؤك يستحقون",
  "an exceptional skincare experience": "تجربة استثنائية للعناية بالبشرة",

  // Navigation
  About: "حول",
  Features: "الميزات",
  Benefits: "الفوائد",
  Pricing: "الأسعار",
  Blog: "المدونة",

  // Autres traductions...
}

// Dictionnaire de traductions en portugais
export const portugueseTranslations: TranslationDictionary = {
  // Hero section
  "Your clients deserve": "Seus clientes merecem",
  "an exceptional skincare experience": "uma experiência excepcional de cuidados com a pele",

  // Navigation
  About: "Sobre",
  Features: "Recursos",
  Benefits: "Benefícios",
  Pricing: "Preços",
  Blog: "Blog",

  // Autres traductions...
}

// Fonction simple pour obtenir une traduction
export function getTranslation(text: string, language: string): string {
  if (language === "en") return text

  let translations: TranslationDictionary

  switch (language) {
    case "fr":
      translations = frenchTranslations
      break
    case "es":
      translations = spanishTranslations
      break
    case "ar":
      translations = arabicTranslations
      break
    case "pt":
      translations = portugueseTranslations
      break
    default:
      return text
  }

  return translations[text] || text
}

// Fonction simple pour changer la langue
export function setLanguage(language: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language)

    // Mettre à jour les attributs HTML pour RTL si nécessaire
    if (language === "ar") {
      document.documentElement.setAttribute("dir", "rtl")
      document.documentElement.setAttribute("lang", language)
      document.body.classList.add("rtl")
    } else {
      document.documentElement.setAttribute("dir", "ltr")
      document.documentElement.setAttribute("lang", language)
      document.body.classList.remove("rtl")
    }

    // Forcer un rechargement de la page pour appliquer les changements
    window.location.reload()
  }
}

// Fonction pour obtenir la langue actuelle
export function getCurrentLanguage(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en"
  }
  return "en"
}

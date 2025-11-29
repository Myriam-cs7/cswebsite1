"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useTranslation } from "./translations"

/**
 * Composant qui applique directement les traductions aux éléments DOM
 * Cette approche contourne les problèmes de rendu React en manipulant directement le DOM
 */
export default function DirectTranslationHandler() {
  const { language } = useTranslation()
  const [isApplied, setIsApplied] = useState(false)
  const applyCount = useRef(0)
  const timeoutRef = useRef(null)
  const applyCountRef = useRef(0)
  const isApplyingRef = useRef(false)
  const maxAttempts = 5
  const lastLanguage = useRef(language)

  // Traductions directes pour l'arabe
  const arabicTranslations = {
    // Hero section
    "Your clients deserve": "عملاؤك يستحقون",
    "exceptional skincare": "تجربة عناية بالبشرة",
    experience: "استثنائية",
    "and you, a solution that sets": "وأنت، حلاً يميزك",
    "you apart": "عن غيرك",
    "Watch Demo": "مشاهدة العرض التوضيحي",
    "Try for Free": "تجربة مجانية",

    // About section
    "About Us": "معلومات عنا",
    "CEO & Founder": "الرئيس التنفيذي والمؤسس",
    "Hello, I'm Myriam": "مرحباً، أنا مريم",
    "A few years ago, I made a life-changing decision: I quit smoking":
      "قبل بضع سنوات، اتخذت قراراً غير حياتي: أقلعت عن التدخين",
    "After years of damaging my health, I reclaimed control": "بعد سنوات من الإضرار بصحتي، استعدت السيطرة",
    "Day by day, I rediscovered my body's potential": "يوماً بعد يوم، أعدت اكتشاف إمكانات جسدي",
    "My sleep improved, my breathing deepened, and my skin": "تحسن نومي، وتعمق تنفسي، وبشرتي",
    "my skin transformed! So much that people": "تحولت بشرتي! لدرجة أن الناس",
    'constantly asked: "Myriam, you look radiant! Did you just return from vacation':
      'كانوا يسألون باستمرار: "مريم، تبدين متألقة! هل عدت للتو من إجازة',
    "This unexpected transformation ignited my passion: Skincare": "هذا التحول غير المتوقع أشعل شغفي: العناية بالبشرة",
    "Not just any skincare, but an experience that eliminates confusion and addresses real needs":
      "ليس مجرد عناية بالبشرة، بل تجربة تزيل الارتباك وتلبي الاحتياجات الحقيقية",

    // Features section
    Features: "الميزات",
    "Features Designed for Luxury Brands": "ميزات مصممة للعلامات التجارية الفاخرة",
    "Our AI solutions are tailored specifically for premium skincare and beauty brands":
      "حلول الذكاء الاصطناعي لدينا مصممة خصيصًا لعلامات العناية بالبشرة والجمال الفاخرة",

    // Benefits section
    Benefits: "الفوائد",
    "Transform Your Customer Experience": "حوّل تجربة عملائك",
    "Discover how our AI solutions can elevate your brand's digital presence":
      "اكتشف كيف يمكن لحلول الذكاء الاصطناعي لدينا رفع مستوى التواجد الرقمي لعلامتك التجارية",

    // Pricing section
    Pricing: "التسعير",
    "Find the plan that grows your brand with seamless CRM integration":
      "اختر الخطة التي تنمي علامتك التجارية مع تكامل سلس لإدارة علاقات العملاء",

    // Blog section
    Blog: "المدونة",
  }

  // Traductions pour le français
  const frenchTranslations = {
    // Hero section
    "Your clients deserve": "Vos clients méritent",
    "exceptional skincare": "une expérience de soin",
    experience: "exceptionnelle",
    "and you, a solution that sets": "et vous, une solution qui",
    "you apart": "vous démarque",
    "Watch Demo": "Voir la démo",
    "Try for Free": "Essayer gratuitement",

    // Navigation
    About: "À propos",
    Features: "Fonctionnalités",
    Benefits: "Avantages",
    Pricing: "Tarifs",
    Blog: "Blog",

    // Features section
    "Features Designed for Luxury Brands": "Fonctionnalités conçues pour les marques de luxe",
    "Our AI solutions are tailored specifically for premium skincare and beauty brands.":
      "Nos solutions d'IA sont spécialement conçues pour les marques de soins de la peau et de beauté haut de gamme.",
    "Personalized Recommendations": "Recommandations personnalisées",
    "Brand Protection": "Protection de la marque",
    "Loyalty Integration": "Intégration de fidélité",
    "Easy Integration": "Intégration facile",

    // Benefits section
    "Transform Your Customer Experience": "Transformez l'expérience de vos clients",
    "Discover how our AI solutions can elevate your brand's digital presence.":
      "Découvrez comment nos solutions d'IA peuvent élever la présence numérique de votre marque.",
    "Increase Conversion Rates": "Augmentez les taux de conversion",
    "Enhance Customer Satisfaction": "Améliorez la satisfaction client",
    "Gain Valuable Customer Insights": "Obtenez des informations précieuses sur les clients",
    "Reduce Support Costs": "Réduisez les coûts de support",
    "Conversion Rate": "Taux de conversion",
    "Customer Satisfaction": "Satisfaction client",
    "Average Order Value": "Valeur moyenne des commandes",
    "Customer Retention": "Fidélisation des clients",

    // Why Choose section
    "Why luxury brands choose cAIre": "Pourquoi les marques de luxe choisissent cAIre",
    "Discover what sets us apart from the competition": "Découvrez ce qui nous distingue de la concurrence",
    "Premium Market Expertise": "Expertise du marché premium",
    "Brand Voice Protection": "Protection de la voix de la marque",
    "Quick Implementation": "Implémentation rapide",
    "Schedule a demo": "Planifier une démo",

    // CTA section
    "Ready to Transform Your Customer Experience?": "Prêt à transformer l'expérience de vos clients ?",
    "Join leading luxury skincare brands already using cAIre Solutions to enhance their digital presence.":
      "Rejoignez les principales marques de soins de la peau de luxe qui utilisent déjà cAIre Solutions pour améliorer leur présence numérique.",
    "Request a Demo": "Demander une démo",
    "Contact Sales": "Contacter les ventes",
  }

  // Traductions pour l'espagnol
  const spanishTranslations = {
    // Hero section
    "Your clients deserve": "Sus clientes merecen",
    "exceptional skincare": "una experiencia excepcional",
    experience: "de cuidado de la piel",
    "and you, a solution that sets": "y usted, una solución",
    "you apart": "que lo distingue",
    "Watch Demo": "Ver demostración",
    "Try for Free": "Prueba gratuita",

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
    "Brand Protection": "Protección de marca",
    "Loyalty Integration": "Integración de fidelidad",
    "Easy Integration": "Integración sencilla",
  }

  // Traductions pour le portugais
  const portugueseTranslations = {
    // Hero section
    "Your clients deserve": "Seus clientes merecem",
    "exceptional skincare": "uma experiência excepcional",
    experience: "de cuidados com a pele",
    "and you, a solução that sets": "e você, uma solução",
    "you apart": "que o diferencia",
    "Watch Demo": "Assistir demonstração",
    "Try for Free": "Experimente grátis",

    // Navigation
    About: "Sobre",
    Features: "Recursos",
    Benefits: "Benefícios",
    Pricing: "Preços",
    Blog: "Blog",
  }

  // Fonction pour obtenir les traductions en fonction de la langue
  const getTranslations = useCallback(() => {
    switch (language) {
      case "fr":
        return frenchTranslations
      case "es":
        return spanishTranslations
      case "ar":
        return arabicTranslations
      case "pt":
        return portugueseTranslations
      default:
        return {}
    }
  }, [language])

  // Appliquer les traductions directement au DOM
  const applyDirectTranslations = useCallback(() => {
    if (language === "en" || isApplied) return

    console.log(`Applying direct ${language} translations to DOM elements... (attempt ${applyCount.current + 1})`)
    applyCount.current += 1

    const translations = getTranslations()
    if (!translations || Object.keys(translations).length === 0) return

    // Sélectionner tous les éléments de texte
    const textNodes = []
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false)

    let node
    while ((node = walk.nextNode())) {
      if (node.nodeValue && node.nodeValue.trim() !== "") {
        textNodes.push(node)
      }
    }

    // Appliquer les traductions
    textNodes.forEach((node) => {
      const text = node.nodeValue.trim()

      // Vérifier si le texte correspond à une clé de traduction
      Object.keys(translations).forEach((key) => {
        if (text.includes(key)) {
          // Remplacer le texte par sa traduction
          node.nodeValue = node.nodeValue.replace(key, translations[key])
        }
      })
    })

    // Appliquer les traductions aux attributs (comme placeholder, title, etc.)
    const elements = document.querySelectorAll("[placeholder], [title], [aria-label]")
    elements.forEach((el) => {
      if (el.hasAttribute("placeholder")) {
        const text = el.getAttribute("placeholder")
        Object.keys(translations).forEach((key) => {
          if (text.includes(key)) {
            el.setAttribute("placeholder", text.replace(key, translations[key]))
          }
        })
      }

      if (el.hasAttribute("title")) {
        const text = el.getAttribute("title")
        Object.keys(translations).forEach((key) => {
          if (text.includes(key)) {
            el.setAttribute("title", text.replace(key, translations[key]))
          }
        })
      }

      if (el.hasAttribute("aria-label")) {
        const text = el.getAttribute("aria-label")
        Object.keys(translations).forEach((key) => {
          if (text.includes(key)) {
            el.setAttribute("aria-label", text.replace(key, translations[key]))
          }
        })
      }
    })

    // Marquer comme appliqué
    setIsApplied(true)
  }, [isApplied, language, getTranslations])

  // Réinitialiser l'état lorsque la langue change
  useEffect(() => {
    setIsApplied(false)
    applyCount.current = 0
    applyCountRef.current = 0
    isApplyingRef.current = false

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [language])

  // Appliquer les traductions après le chargement complet de la page
  useEffect(() => {
    if (language === "en" || isApplied) return

    // Utiliser une référence pour éviter les appels multiples

    const applyTranslationsWithRetry = () => {
      // Éviter les appels multiples
      if (isApplyingRef.current) return
      isApplyingRef.current = true

      // Limiter le nombre de tentatives
      if (applyCountRef.current >= maxAttempts) {
        console.log(`Reached maximum attempts (${maxAttempts}) for applying translations`)
        isApplyingRef.current = false
        return
      }

      applyCountRef.current += 1
      console.log(`Applying direct ${language} translations to DOM elements... (attempt ${applyCountRef.current})`)

      // Apply translations
      applyDirectTranslations()

      // If we've tried less than maxAttempts times, schedule another attempt
      if (!isApplied && applyCountRef.current < maxAttempts) {
        timeoutRef.current = setTimeout(() => {
          isApplyingRef.current = false
          applyTranslationsWithRetry()
        }, 1000)
      } else {
        isApplyingRef.current = false
      }
    }

    // Initial application
    if (document.readyState === "complete") {
      applyTranslationsWithRetry()
    } else {
      const handleLoad = () => {
        applyTranslationsWithRetry()
      }
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [language, isApplied, applyDirectTranslations])

  // Réappliquer après les changements de DOM (comme après les rendus React)
  useEffect(() => {
    if (language === "en" || isApplied) return

    const observer = new MutationObserver(() => {
      if (!isApplied) {
        applyDirectTranslations()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [language, isApplied, applyDirectTranslations])

  // Ajoutez la vérification dans l'effet principal
  useEffect(() => {
    if (lastLanguage.current !== language) {
      lastLanguage.current = language
      console.log(`Applying direct ${language} translations to DOM elements...`)

      const translations = getTranslations()
      if (!translations || Object.keys(translations).length === 0) return

      // Sélectionner tous les éléments de texte
      const textNodes = []
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false)

      let node
      while ((node = walk.nextNode())) {
        if (node.nodeValue && node.nodeValue.trim() !== "") {
          textNodes.push(node)
        }
      }

      // Appliquer les traductions
      textNodes.forEach((node) => {
        const text = node.nodeValue.trim()

        // Vérifier si le texte correspond à une clé de traduction
        Object.keys(translations).forEach((key) => {
          if (text.includes(key)) {
            // Remplacer le texte par sa traduction
            node.nodeValue = node.nodeValue.replace(key, translations[key])
          }
        })
      })

      // Marquer comme appliqué
      setIsApplied(true)
    }
  }, [language, isApplied, getTranslations])

  return null
}

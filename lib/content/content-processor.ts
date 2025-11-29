// Types pour les différents blocs de contenu
export interface BaseBlockContent {
  id?: string
  backgroundColor?: string
  textColor?: string
  backgroundImage?: string
  customClass?: string
}

export interface HeroBlockContent extends BaseBlockContent {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  image?: string
}

export interface FeaturesBlockContent extends BaseBlockContent {
  title?: string
  description?: string
  items?: Array<{
    title?: string
    description?: string
    icon?: string
    image?: string
  }>
}

export interface PricingBlockContent extends BaseBlockContent {
  title?: string
  description?: string
  plans?: Array<{
    name?: string
    price?: string
    period?: string
    description?: string
    features?: string[]
    buttonText?: string
    highlighted?: boolean
    tooltips?: Record<string, string>
    footnote?: string
  }>
}

// Union type pour tous les types de blocs
export type BlockContent = HeroBlockContent | FeaturesBlockContent | PricingBlockContent | BaseBlockContent

// Valeurs par défaut pour chaque type de bloc
const defaultContents: Record<string, any> = {
  hero: {
    title: "Welcome to cAIre Solutions",
    subtitle: "AI-Powered Skincare",
    description:
      "Combining French luxury expertise with cutting-edge technology for personalized skincare consultations",
    buttonText: "Discover More",
    buttonLink: "#about",
  },
  features: {
    title: "Features Designed for Luxury Brands",
    description: "Our AI solutions are tailored specifically for premium skincare and beauty brands.",
    items: [
      {
        title: "Personalized Recommendations",
        description: "AI-powered product suggestions based on individual skin concerns and goals.",
        icon: "Star",
      },
      {
        title: "Brand Protection",
        description: "Ensure your AI assistant maintains your brand voice and luxury positioning.",
        icon: "Shield",
      },
      {
        title: "Loyalty Integration",
        description: "Seamlessly connect with your existing loyalty and CRM systems.",
        icon: "Heart",
      },
      {
        title: "Easy Integration",
        description: "Simple implementation with your existing e-commerce platform.",
        icon: "Code",
      },
    ],
  },
  pricing: {
    title: "Find the plan that grows your brand",
    description: "We have a plan for every stage of your journey—explore the options below.",
    plans: [
      {
        name: "LysIA",
        price: "$10,724",
        period: "One-time setup fee",
        description: "Designed for industry leaders",
        features: ["Unlimited users", "Dedicated dermatological knowledge base", "Enterprise-grade CRM Integration"],
        buttonText: "Contact Sales",
      },
      {
        name: "AVA Skin",
        price: "$1,057",
        period: "/month",
        description: "Perfect for growing brands",
        features: ["Up to 2,000 users/month", "CRM integration", "Advanced analytics & insights"],
        buttonText: "Start Free Trial",
        highlighted: true,
      },
    ],
  },
}

// Fonction pour traiter et valider les données de contenu
export function processBlockContent<T extends BlockContent>(content: T | undefined | null, blockType: string): T {
  // Récupérer les valeurs par défaut pour ce type de bloc
  const defaults = defaultContents[blockType] || {}

  // Fusionner avec les valeurs par défaut
  const processedContent = {
    ...defaults,
    ...(content || {}),
  } as T

  // Validation et transformation spécifiques au type
  switch (blockType) {
    case "features":
      const featuresContent = processedContent as FeaturesBlockContent
      featuresContent.items = Array.isArray(featuresContent.items) ? featuresContent.items : []
      break

    case "pricing":
      const pricingContent = processedContent as PricingBlockContent
      pricingContent.plans = Array.isArray(pricingContent.plans) ? pricingContent.plans : []
      break
  }

  return processedContent
}

// Fonction pour générer des clés de traduction pour un bloc
export function generateTranslationKeys(content: BlockContent, blockType: string, blockId: string): string[] {
  const keys: string[] = []

  // Ajouter les clés de base
  keys.push(`${blockType}.${blockId}.title`)
  keys.push(`${blockType}.${blockId}.description`)

  // Ajouter des clés spécifiques au type
  switch (blockType) {
    case "features":
      const featuresContent = content as FeaturesBlockContent
      if (Array.isArray(featuresContent.items)) {
        featuresContent.items.forEach((item, index) => {
          keys.push(`${blockType}.${blockId}.items.${index}.title`)
          keys.push(`${blockType}.${blockId}.items.${index}.description`)
        })
      }
      break

    case "pricing":
      const pricingContent = content as PricingBlockContent
      if (Array.isArray(pricingContent.plans)) {
        pricingContent.plans.forEach((plan, index) => {
          keys.push(`${blockType}.${blockId}.plans.${index}.name`)
          keys.push(`${blockType}.${blockId}.plans.${index}.description`)
          keys.push(`${blockType}.${blockId}.plans.${index}.buttonText`)

          if (Array.isArray(plan.features)) {
            plan.features.forEach((feature, featureIndex) => {
              keys.push(`${blockType}.${blockId}.plans.${index}.features.${featureIndex}`)
            })
          }
        })
      }
      break
  }

  return keys
}

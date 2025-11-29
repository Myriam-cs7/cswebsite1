export function ProductStructuredData({ product }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "cAIre Solutions",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "cAIre Solutions",
    url: "https://caire-solutions.com",
    logo: "https://caire-solutions.com/images/logo.svg",
    sameAs: [
      "https://linkedin.com/company/caire-solutions",
      "https://instagram.com/caire_solutions",
      "https://twitter.com/caire_solutions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971 58 564 2906",
      contactType: "customer service",
      email: "contact@caire-solutions.com",
      availableLanguage: ["English", "French", "Spanish", "Arabic", "Portuguese"],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function FAQStructuredData({ faqs }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

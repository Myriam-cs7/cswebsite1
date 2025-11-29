export default function StructuredDataEnhanced() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "cAIre Solutions",
    url: "https://caire-solutions.com",
    logo: "https://caire-solutions.com/images/logo.png",
    description: "AI-powered skincare consultations combining French luxury expertise with cutting-edge technology",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33-1-23-45-67-89",
      contactType: "customer service",
      email: "contact@caire-solutions.com",
    },
    sameAs: [
      "https://linkedin.com/company/caire-solutions",
      "https://instagram.com/caire_solutions",
      "https://x.com/caire_solutions",
      "https://tiktok.com/@caire_solutions",
    ],
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "LysIA AI Skincare Assistant",
    description: "Enterprise-grade AI skincare consultation solution for luxury brands",
    brand: {
      "@type": "Brand",
      name: "cAIre Solutions",
    },
    offers: {
      "@type": "Offer",
      price: "10724",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "124",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Skincare Consultation",
    provider: {
      "@type": "Organization",
      name: "cAIre Solutions",
    },
    description: "AI-powered skincare consultations for luxury brands",
    areaServed: {
      "@type": "Country",
      name: "Global",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  )
}

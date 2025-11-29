export function CSPMeta() {
  // Définition de la politique de sécurité du contenu (CSP)
  const csp = [
    // Par défaut, n'autoriser que le contenu de la même origine
    "default-src 'self'",

    // Scripts: autoriser les scripts de la même origine et de certains domaines de confiance
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",

    // Styles: autoriser les styles de la même origine et les styles inline
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    // Images: autoriser les images de la même origine et de certains domaines de confiance
    "img-src 'self' data: https://www.google-analytics.com https://www.facebook.com https://*.cloudfront.net https://res.cloudinary.com",

    // Fonts: autoriser les polices de la même origine et de certains domaines de confiance
    "font-src 'self' https://fonts.gstatic.com",

    // Connect: autoriser les connexions à certains domaines de confiance
    "connect-src 'self' https://www.google-analytics.com https://analytics.facebook.com",

    // Frame: n'autoriser que les frames de la même origine
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://www.facebook.com",

    // Object: n'autoriser aucun objet
    "object-src 'none'",

    // Base: n'autoriser que la même origine pour les balises base
    "base-uri 'self'",

    // Form: n'autoriser que la même origine pour les soumissions de formulaires
    "form-action 'self'",

    // Frame-ancestors: n'autoriser que la même origine pour les frames parents
    "frame-ancestors 'self'",

    // Upgrade-insecure-requests: forcer les connexions HTTP à HTTPS
    "upgrade-insecure-requests",

    // Block-all-mixed-content: bloquer tout contenu mixte (HTTP dans HTTPS)
    "block-all-mixed-content",
  ].join("; ")

  return <meta httpEquiv="Content-Security-Policy" content={csp} />
}

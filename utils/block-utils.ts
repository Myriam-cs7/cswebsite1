// Wrapper de sécurité pour les composants de blocs
export function withSafeContent(WrappedComponent) {
  return function SafeBlockWrapper(props) {
    // Sécuriser l'accès au contenu
    const safeProps = {
      ...props,
      content: props.content || {},
    }

    return <WrappedComponent {...safeProps} />
  }
}

// Fonction utilitaire pour sécuriser les tableaux
export function ensureArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray : []
}

// Fonction utilitaire pour accéder de manière sécurisée aux propriétés d'un objet
export function safeGet(obj, path, defaultValue = "") {
  if (!obj) return defaultValue

  const keys = path.split(".")
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) return defaultValue
    result = result[key]
  }

  return result !== undefined && result !== null ? result : defaultValue
}

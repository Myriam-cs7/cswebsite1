"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface YouformButtonProps {
  formId: string
  text: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

export default function YouformButton({ formId, text, className = "", variant = "default" }: YouformButtonProps) {
  // Charger le script Youform
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://app.youform.io/api/v1/embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Fonction pour ouvrir Youform
  const openYouform = () => {
    if (typeof window !== "undefined" && window.Youform) {
      window.Youform.openPopup(`https://app.youform.io/forms/${formId}`, {
        mode: "popup",
        hideHeader: true,
        hideFooter: true,
        opacity: 85,
        onSubmit: () => {
          console.log("Formulaire soumis!")
        },
      })
    } else {
      // Fallback si le script n'est pas chargé
      window.open(`https://app.youform.io/forms/${formId}`, "_blank")
    }
    return false
  }

  return (
    <Button onClick={openYouform} className={className} variant={variant}>
      {text}
    </Button>
  )
}

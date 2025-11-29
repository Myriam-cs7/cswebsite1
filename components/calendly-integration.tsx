"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CalendlyButtonProps {
  url: string
  text: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export default function CalendlyButton({ url, text, className = "", variant = "default" }: CalendlyButtonProps) {
  // Charger le script Calendly
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Fonction pour ouvrir Calendly
  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url,
      })
    } else {
      // Fallback si le script n'est pas chargé
      window.open(url, "_blank")
    }
    return false
  }

  return (
    <Button onClick={openCalendly} className={className} variant={variant}>
      {text}
    </Button>
  )
}

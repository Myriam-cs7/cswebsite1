"use client"

import { Button } from "@/components/ui/button"

interface CalendlyLinkProps {
  url: string
  text: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

export default function CalendlyLinkButton({ url, text, className = "", variant = "default" }: CalendlyLinkProps) {
  return (
    <Button onClick={() => window.open(url, "_blank")} className={className} variant={variant}>
      {text}
    </Button>
  )
}

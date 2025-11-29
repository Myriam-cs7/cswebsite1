"use client"

import { Button } from "@/components/ui/button"

interface YouformLinkProps {
  formId: string
  text: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

export default function YouformLinkButton({ formId, text, className = "", variant = "default" }: YouformLinkProps) {
  return (
    <Button
      onClick={() => window.open(`https://app.youform.io/forms/${formId}`, "_blank")}
      className={className}
      variant={variant}
    >
      {text}
    </Button>
  )
}

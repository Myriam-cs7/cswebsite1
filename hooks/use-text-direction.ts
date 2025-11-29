"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/components/translations"

export function useTextDirection() {
  const { language } = useTranslation()
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    // Set RTL direction for Arabic
    if (language === "ar") {
      setDirection("rtl")
      document.documentElement.dir = "rtl"
      document.documentElement.classList.add("rtl")
    } else {
      setDirection("ltr")
      document.documentElement.dir = "ltr"
      document.documentElement.classList.remove("rtl")
    }
  }, [language])

  return direction
}

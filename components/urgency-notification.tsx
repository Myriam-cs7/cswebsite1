"use client"

import { useState, useEffect } from "react"
import { X, Clock, Users, TrendingUp } from "lucide-react"

type NotificationType = "timer" | "social" | "stock"

interface UrgencyNotificationProps {
  type?: NotificationType
  message?: string
  duration?: number
  position?: "top" | "bottom"
}

export default function UrgencyNotification({
  type = "timer",
  message,
  duration = 7000,
  position = "bottom",
}: UrgencyNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)

  // Messages par défaut selon le type
  const defaultMessages = {
    timer: "Limited time offer: Get 20% off your first month when you sign up today!",
    social: "5 luxury brands signed up in the last 24 hours",
    stock: "Only 3 spots left for our premium onboarding package",
  }

  // Icônes selon le type
  const icons = {
    timer: <Clock className="h-5 w-5 text-[#cfaa5c]" />,
    social: <Users className="h-5 w-5 text-[#cfaa5c]" />,
    stock: <TrendingUp className="h-5 w-5 text-[#cfaa5c]" />,
  }

  // Afficher la notification après un délai
  useEffect(() => {
    // Ne pas afficher si déjà vue
    if (hasBeenSeen) return

    // Afficher après 3 secondes
    const timer = setTimeout(() => {
      setIsVisible(true)

      // Masquer après la durée spécifiée
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, duration)

      return () => clearTimeout(hideTimer)
    }, 3000)

    return () => clearTimeout(timer)
  }, [duration, hasBeenSeen])

  // Marquer comme vue et masquer
  const handleClose = () => {
    setIsVisible(false)
    setHasBeenSeen(true)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed ${position === "top" ? "top-4" : "bottom-4"} left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md animate-fadeInUp`}
      role="alert"
      aria-live="polite"
    >
      <div className="bg-[#1A1A1A] border border-[#cfaa5c]/30 text-white rounded-lg shadow-lg p-4 mx-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="flex-1 text-sm">{message || defaultMessages[type]}</div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

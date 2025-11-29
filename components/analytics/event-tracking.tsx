"use client"

import type React from "react"

import { useEffect } from "react"

type EventType = "page_view" | "click" | "scroll" | "form_submit" | "conversion"

interface TrackEventProps {
  eventType: EventType
  eventData?: Record<string, any>
}

export function trackEvent({ eventType, eventData = {} }: TrackEventProps) {
  // Cette fonction serait connectée à votre outil d'analyse (Google Analytics, Mixpanel, etc.)
  if (typeof window !== "undefined") {
    console.log(`[Analytics] Event tracked: ${eventType}`, eventData)

    // Exemple d'intégration avec Google Analytics 4
    if (typeof window.gtag === "function") {
      window.gtag("event", eventType, eventData)
    }

    // Exemple d'intégration avec Facebook Pixel
    if (typeof window.fbq === "function") {
      window.fbq("track", eventType, eventData)
    }
  }
}

interface UseTrackEventProps {
  eventType: EventType
  eventData?: Record<string, any>
  trigger?: "mount" | "unmount" | "both"
}

export function useTrackEvent({ eventType, eventData = {}, trigger = "mount" }: UseTrackEventProps) {
  useEffect(() => {
    if (trigger === "mount" || trigger === "both") {
      trackEvent({ eventType, eventData })
    }

    return () => {
      if (trigger === "unmount" || trigger === "both") {
        trackEvent({ eventType, eventData: { ...eventData, event_end: true } })
      }
    }
  }, [eventType, trigger])
}

export function TrackPageView({ pageName, pageData = {} }: { pageName: string; pageData?: Record<string, any> }) {
  useTrackEvent({
    eventType: "page_view",
    eventData: {
      page_name: pageName,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
      ...pageData,
    },
  })

  return null
}

export function TrackClick({
  id,
  children,
  eventData = {},
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { eventData?: Record<string, any> }) {
  const handleClick = (e: React.MouseEvent) => {
    trackEvent({
      eventType: "click",
      eventData: {
        element_id: id,
        element_text: typeof children === "string" ? children : "non-text element",
        ...eventData,
      },
    })

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <div {...props} id={id} onClick={handleClick}>
      {children}
    </div>
  )
}

export function TrackConversion({
  id,
  value,
  currency = "EUR",
  eventData = {},
}: {
  id: string
  value: number
  currency?: string
  eventData?: Record<string, any>
}) {
  useEffect(() => {
    trackEvent({
      eventType: "conversion",
      eventData: {
        conversion_id: id,
        value,
        currency,
        ...eventData,
      },
    })
  }, [id, value, currency])

  return null
}

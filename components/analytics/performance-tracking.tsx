"use client"

import { useEffect } from "react"

export function trackPerformance() {
  if (typeof window === "undefined" || !window.performance) return null

  try {
    const performanceEntries = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const paintEntries = window.performance.getEntriesByType("paint")

    const firstPaint = paintEntries.find((entry) => entry.name === "first-paint")
    const firstContentfulPaint = paintEntries.find((entry) => entry.name === "first-contentful-paint")

    const performanceMetrics = {
      // Temps de chargement de la page
      pageLoadTime: performanceEntries.loadEventEnd - performanceEntries.startTime,

      // Temps jusqu'au premier rendu
      firstPaint: firstPaint ? firstPaint.startTime : null,

      // Temps jusqu'au premier rendu de contenu
      firstContentfulPaint: firstContentfulPaint ? firstContentfulPaint.startTime : null,

      // Temps jusqu'à l'interactivité
      timeToInteractive: performanceEntries.domInteractive - performanceEntries.startTime,

      // Temps de réponse du serveur
      serverResponseTime: performanceEntries.responseEnd - performanceEntries.requestStart,

      // Temps de traitement du DOM
      domProcessingTime: performanceEntries.domComplete - performanceEntries.domInteractive,
    }

    console.log("[Performance Metrics]", performanceMetrics)

    // Envoi des métriques à votre service d'analyse
    if (typeof window.gtag === "function") {
      window.gtag("event", "performance_metrics", performanceMetrics)
    }

    return performanceMetrics
  } catch (error) {
    console.error("[Performance Tracking Error]", error)
    return null
  }
}

export function PerformanceTracker() {
  useEffect(() => {
    // Attendre que la page soit complètement chargée
    if (document.readyState === "complete") {
      trackPerformance()
    } else {
      window.addEventListener("load", trackPerformance)
      return () => window.removeEventListener("load", trackPerformance)
    }
  }, [])

  return null
}

export function usePerformanceTracking() {
  useEffect(() => {
    // Mesurer le temps de rendu du composant
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      console.log(`[Component Render Time] ${renderTime.toFixed(2)}ms`)
    }
  }, [])
}

"use client"

import { useEffect, useState, useRef, type ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  id?: string
  minHeight?: string
  priority?: boolean
}

export default function LazySectionEnhanced({
  children,
  className = "",
  threshold = 0.1,
  id,
  minHeight = "200px",
  priority = false,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(priority)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Si priority est true, on considère la section comme déjà visible
    if (priority) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Une fois visible, on peut arrêter d'observer
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      { threshold, rootMargin: "200px 0px" }, // Préchargement anticipé
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [threshold, priority])

  return (
    <section ref={sectionRef} className={className} id={id}>
      {isVisible ? (
        children
      ) : (
        <div className="animate-pulse bg-gray-100 dark:bg-gray-800" style={{ minHeight }} aria-hidden="true" />
      )}
    </section>
  )
}

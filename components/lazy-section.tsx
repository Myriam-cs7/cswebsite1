"use client"

import { useEffect, useState, useRef, type ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  id?: string
}

export default function LazySection({ children, className = "", threshold = 0.1, id }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
      { threshold },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [threshold])

  return (
    <section ref={sectionRef} className={className} id={id}>
      {isVisible ? children : <div className="min-h-[200px]" />}
    </section>
  )
}

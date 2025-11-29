"use client"

import { useState, useEffect } from "react"

type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl"

const breakpoints: Record<BreakpointKey, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", handler)

    return () => {
      mediaQuery.removeEventListener("change", handler)
    }
  }, [query])

  return matches
}

export function useBreakpoint(key: BreakpointKey): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[key]}px)`)
}

export function useIsMobile(): boolean {
  return !useBreakpoint("md")
}

export function useIsTablet(): boolean {
  const isTabletOrLarger = useBreakpoint("md")
  const isDesktop = useBreakpoint("lg")
  return isTabletOrLarger && !isDesktop
}

export function useIsDesktop(): boolean {
  return useBreakpoint("lg")
}

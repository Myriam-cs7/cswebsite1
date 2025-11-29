"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { setCookie, getCookie } from "cookies-next"

// Define language score interface
interface LanguageScore {
  code: string
  score: number
}

// Available languages
const AVAILABLE_LANGUAGES = ["en", "fr", "es", "ar", "pt"]
const DEFAULT_LANGUAGE = "en"

export function useLanguageScoring() {
  const router = useRouter()
  const [languageScores, setLanguageScores] = useState<LanguageScore[]>([
    { code: "en", score: 0 },
    { code: "fr", score: 0 },
    { code: "es", score: 0 },
    { code: "ar", score: 0 },
    { code: "pt", score: 0 },
  ])
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE)
  const initialized = useRef(false)

  // Initialize language scores on component mount
  useEffect(() => {
    if (initialized.current) return

    initializeLanguageScores()
    initialized.current = true
  }, [])

  // Initialize language scores based on various factors
  const initializeLanguageScores = () => {
    const scores: LanguageScore[] = AVAILABLE_LANGUAGES.map((lang) => ({
      code: lang,
      score: calculateInitialScore(lang),
    }))

    // Sort by score (highest first)
    scores.sort((a, b) => b.score - a.score)

    // Get the highest scoring language
    const preferredLanguage = scores[0].code

    // Set the current language
    const savedLanguage = getCookie("language") as string
    const languageToUse = savedLanguage || preferredLanguage

    setCurrentLanguage(languageToUse)
    setLanguageScores(scores)

    // Save to cookie if not already set
    if (!savedLanguage) {
      setCookie("language", languageToUse, { maxAge: 30 * 24 * 60 * 60 }) // 30 days
    }
  }

  // Calculate initial score for each language based on various factors
  const calculateInitialScore = (languageCode: string): number => {
    let score = 0

    // Factor 1: Browser language preferences
    if (typeof navigator !== "undefined") {
      const browserLanguages = navigator.languages || [navigator.language]
      browserLanguages.forEach((lang, index) => {
        const langCode = lang.split("-")[0].toLowerCase()
        if (langCode === languageCode) {
          // Give higher score to languages that appear earlier in the preferences list
          score += 50 - index * 10
        }
      })
    }

    // Factor 2: Previously selected language (from cookie)
    const savedLanguage = getCookie("language") as string
    if (savedLanguage === languageCode) {
      score += 100 // Heavily favor previously selected language
    }

    // Factor 3: Geolocation-based scoring (simplified example)
    if (typeof Intl !== "undefined") {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      // French regions
      if (languageCode === "fr" && (userTimeZone.includes("Paris") || userTimeZone.includes("Europe/Paris"))) {
        score += 30
      }

      // English regions
      if (
        languageCode === "en" &&
        (userTimeZone.includes("America") || userTimeZone.includes("London") || userTimeZone.includes("Europe/London"))
      ) {
        score += 30
      }

      // Spanish regions
      if (
        languageCode === "es" &&
        (userTimeZone.includes("Madrid") ||
          userTimeZone.includes("Mexico") ||
          userTimeZone.includes("America/Argentina"))
      ) {
        score += 30
      }

      // Arabic regions
      if (
        languageCode === "ar" &&
        (userTimeZone.includes("Asia/Riyadh") ||
          userTimeZone.includes("Africa/Cairo") ||
          userTimeZone.includes("Asia/Dubai"))
      ) {
        score += 30
      }

      // Portuguese regions
      if (
        languageCode === "pt" &&
        (userTimeZone.includes("Europe/Lisbon") || userTimeZone.includes("America/Sao_Paulo"))
      ) {
        score += 30
      }
    }

    return score
  }

  // Update scores when user selects a language
  const selectLanguage = (languageCode: string) => {
    // Don't update if it's already the current language
    if (languageCode === currentLanguage) return

    // Update scores
    const updatedScores = languageScores.map((lang) => {
      if (lang.code === languageCode) {
        return { ...lang, score: lang.score + 50 } // Increase score for selected language
      }
      return lang
    })

    setLanguageScores(updatedScores)
    setCurrentLanguage(languageCode)

    // Save selection to cookie
    setCookie("language", languageCode, { maxAge: 30 * 24 * 60 * 60 }) // 30 days

    // Also save to localStorage for better persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("language", languageCode)
    }
  }

  return {
    currentLanguage,
    languageScores,
    selectLanguage,
  }
}

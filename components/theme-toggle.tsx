"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark" | "system"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  // Effet pour initialiser le thème depuis localStorage
  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Détecter la préférence système
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }
  }, [])

  // Effet pour appliquer le thème
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  // Fonction pour changer le thème
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark"
      if (prevTheme === "dark") return "system"
      return "light"
    })
  }

  if (!mounted) {
    // Rendu côté serveur ou premier rendu
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Changer le thème (actuellement: ${theme})`}
    >
      {theme === "dark" ? (
        <Moon size={20} />
      ) : theme === "light" ? (
        <Sun size={20} />
      ) : (
        <div className="relative w-5 h-5">
          <Sun size={20} className="absolute inset-0 transition-opacity opacity-100 dark:opacity-0" />
          <Moon size={20} className="absolute inset-0 transition-opacity opacity-0 dark:opacity-100" />
        </div>
      )}
    </button>
  )
}

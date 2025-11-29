"use client"

import { useState, useEffect } from "react"

interface CSRFTokenProps {
  onTokenReceived?: (token: string) => void
}

export function CSRFToken({ onTokenReceived }: CSRFTokenProps) {
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    // Fonction pour générer un token CSRF
    const generateCSRFToken = () => {
      const array = new Uint8Array(32)
      window.crypto.getRandomValues(array)
      return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
    }

    // Générer un nouveau token
    const newToken = generateCSRFToken()
    setToken(newToken)

    // Stocker le token dans localStorage ou sessionStorage
    sessionStorage.setItem("csrf_token", newToken)

    // Appeler le callback si fourni
    if (onTokenReceived) {
      onTokenReceived(newToken)
    }
  }, [onTokenReceived])

  return <input type="hidden" name="csrf_token" value={token} />
}

export function useCSRFToken() {
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    // Récupérer le token depuis sessionStorage
    const storedToken = sessionStorage.getItem("csrf_token")

    if (storedToken) {
      setToken(storedToken)
    } else {
      // Générer un nouveau token si aucun n'existe
      const array = new Uint8Array(32)
      window.crypto.getRandomValues(array)
      const newToken = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")

      sessionStorage.setItem("csrf_token", newToken)
      setToken(newToken)
    }
  }, [])

  // Fonction pour ajouter le token CSRF aux en-têtes de requête
  const addCSRFHeader = (headers: HeadersInit = {}): HeadersInit => {
    return {
      ...headers,
      "X-CSRF-Token": token,
    }
  }

  return { token, addCSRFHeader }
}

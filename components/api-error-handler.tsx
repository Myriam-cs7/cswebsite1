"use client"

import { useState, useEffect } from "react"

export type ApiErrorType =
  | "network_error"
  | "timeout_error"
  | "server_error"
  | "validation_error"
  | "auth_error"
  | "not_found"
  | "unknown_error"

export interface ApiError {
  type: ApiErrorType
  message: string
  statusCode?: number
  details?: Record<string, any>
  timestamp: number
}

interface ApiErrorHandlerProps {
  error?: ApiError | null
  onDismiss?: () => void
  autoHideDuration?: number
}

export function ApiErrorHandler({ error, onDismiss, autoHideDuration = 5000 }: ApiErrorHandlerProps) {
  const [visible, setVisible] = useState(!!error)

  useEffect(() => {
    setVisible(!!error)

    if (error && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onDismiss) onDismiss()
      }, autoHideDuration)

      return () => clearTimeout(timer)
    }
  }, [error, autoHideDuration, onDismiss])

  if (!error || !visible) return null

  const getErrorTitle = (type: ApiErrorType): string => {
    switch (type) {
      case "network_error":
        return "Erreur de connexion"
      case "timeout_error":
        return "Délai d'attente dépassé"
      case "server_error":
        return "Erreur serveur"
      case "validation_error":
        return "Erreur de validation"
      case "auth_error":
        return "Erreur d'authentification"
      case "not_found":
        return "Ressource non trouvée"
      default:
        return "Erreur inattendue"
    }
  }

  const getErrorIcon = (type: ApiErrorType): string => {
    switch (type) {
      case "network_error":
        return "🌐"
      case "timeout_error":
        return "⏱️"
      case "server_error":
        return "🖥️"
      case "validation_error":
        return "❌"
      case "auth_error":
        return "🔒"
      case "not_found":
        return "🔍"
      default:
        return "⚠️"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white rounded-lg shadow-lg border border-red-100 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 text-2xl">{getErrorIcon(error.type)}</div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{getErrorTitle(error.type)}</h3>
            <p className="mt-1 text-sm text-gray-500">{error.message}</p>
            {error.statusCode && <p className="mt-1 text-xs text-gray-400">Code: {error.statusCode}</p>}
          </div>
          <button
            type="button"
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => {
              setVisible(false)
              if (onDismiss) onDismiss()
            }}
          >
            <span className="sr-only">Fermer</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
      <div className="h-1 bg-red-500 animate-pulse" />
    </div>
  )
}

export function useApiErrorHandler() {
  const [apiError, setApiError] = useState<ApiError | null>(null)

  const handleApiError = (error: any): ApiError => {
    let processedError: ApiError

    if (error.name === "AbortError") {
      processedError = {
        type: "timeout_error",
        message: "La requête a pris trop de temps à s'exécuter.",
        timestamp: Date.now(),
      }
    } else if (!navigator.onLine) {
      processedError = {
        type: "network_error",
        message: "Vérifiez votre connexion internet et réessayez.",
        timestamp: Date.now(),
      }
    } else if (error.response) {
      // Erreur avec réponse du serveur
      const statusCode = error.response.status

      if (statusCode >= 500) {
        processedError = {
          type: "server_error",
          message: "Une erreur est survenue sur nos serveurs. Veuillez réessayer plus tard.",
          statusCode,
          timestamp: Date.now(),
        }
      } else if (statusCode === 404) {
        processedError = {
          type: "not_found",
          message: "La ressource demandée n'a pas été trouvée.",
          statusCode,
          timestamp: Date.now(),
        }
      } else if (statusCode === 401 || statusCode === 403) {
        processedError = {
          type: "auth_error",
          message:
            statusCode === 401
              ? "Vous devez être connecté pour effectuer cette action."
              : "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
          statusCode,
          timestamp: Date.now(),
        }
      } else if (statusCode === 422 || statusCode === 400) {
        processedError = {
          type: "validation_error",
          message: "Les données fournies ne sont pas valides.",
          statusCode,
          details: error.response.data,
          timestamp: Date.now(),
        }
      } else {
        processedError = {
          type: "unknown_error",
          message: "Une erreur inattendue est survenue.",
          statusCode,
          timestamp: Date.now(),
        }
      }
    } else {
      // Erreur sans réponse du serveur
      processedError = {
        type: "unknown_error",
        message: error.message || "Une erreur inattendue est survenue.",
        timestamp: Date.now(),
      }
    }

    setApiError(processedError)
    return processedError
  }

  const clearApiError = () => setApiError(null)

  return {
    apiError,
    handleApiError,
    clearApiError,
  }
}

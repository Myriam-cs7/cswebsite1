"use client"

import type React from "react"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    // Envoyer l'erreur à un service de suivi des erreurs comme Sentry
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.captureException(error)
    }

    // Appeler le gestionnaire d'erreurs personnalisé si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Afficher le fallback personnalisé ou le message d'erreur par défaut
      return (
        this.props.fallback || (
          <div className="error-boundary-fallback">
            <div className="container mx-auto px-4 py-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Une erreur est survenue</h2>
              <p className="mb-6">
                Nous sommes désolés pour ce désagrément. Notre équipe a été notifiée et travaille à résoudre le
                problème.
              </p>
              <p className="text-sm text-gray-500 mb-6">{this.state.error?.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Rafraîchir la page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void,
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

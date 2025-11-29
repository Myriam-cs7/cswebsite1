"use client"

import type React from "react"

import { useState, useEffect, type ComponentType } from "react"
import dynamic from "next/dynamic"

interface DynamicImportProps {
  importFn: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
}

export function DynamicImport({ importFn, fallback, props = {} }: DynamicImportProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadComponent = async () => {
      try {
        setLoading(true)
        const module = await importFn()

        if (isMounted) {
          setComponent(() => module.default)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading dynamic component:", err)
          setError(err instanceof Error ? err : new Error("Failed to load component"))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadComponent()

    return () => {
      isMounted = false
    }
  }, [importFn])

  if (loading) {
    return fallback || <div className="p-4 animate-pulse">Chargement...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Erreur lors du chargement du composant: {error.message}</div>
  }

  if (!Component) {
    return null
  }

  return <Component {...props} />
}

export function createDynamicComponent<T>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    ssr?: boolean
    loading?: React.ReactNode
  } = {},
) {
  const { ssr = false, loading } = options

  return dynamic(importFn, {
    ssr,
    loading: loading ? () => <>{loading}</> : undefined,
  })
}

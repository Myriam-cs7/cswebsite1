"use client"

import type React from "react"

import { useCallback, useRef } from "react"

/**
 * Hook personnalisé pour mémoriser une fonction callback
 * Évite les re-rendus inutiles en conservant la référence de la fonction
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList = [],
): T {
  const callbackRef = useRef<T>(callback)

  // Mettre à jour la référence si le callback change
  callbackRef.current = callback

  // Créer une fonction mémorisée qui appelle la référence actuelle
  return useCallback(((...args) => callbackRef.current(...args)) as T, dependencies)
}

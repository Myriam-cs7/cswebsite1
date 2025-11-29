"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Fallback to placeholder if image fails to load
  useEffect(() => {
    setImageSrc(src)
    setError(false)
  }, [src])

  // Generate a simple blur data URL if none provided
  const defaultBlurDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={error ? "/placeholder.svg" : imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        loading={priority ? "eager" : "lazy"}
      />
      {!isLoaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true"></div>}
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useTranslation } from "./translations"

/**
 * Composant spécifique pour améliorer le support de l'arabe
 * Ce composant force l'application des traductions arabes et la direction RTL
 */
export default function ArabicSupport() {
  const { language } = useTranslation()

  // Ajoutez la vérification dans l'effet principal
  useEffect(() => {
    // Fonction spécifique pour appliquer les styles et traductions arabes
    const applyArabicSupport = () => {
      if (language === "ar") {
        console.log("Applying Arabic support...")

        // 1. Forcer la direction RTL
        document.documentElement.dir = "rtl"
        document.documentElement.classList.add("rtl")
        document.body.classList.add("rtl")

        // 2. Ajouter une classe spécifique pour l'arabe
        document.body.classList.add("lang-ar")

        // 3. Forcer l'application des styles RTL
        const style = document.createElement("style")
        style.id = "arabic-support-styles"
        style.textContent = `
          /* Styles spécifiques pour l'arabe */
          .rtl {
            direction: rtl;
            text-align: right;
          }
        
          .rtl .ml-auto {
            margin-right: auto !important;
            margin-left: 0 !important;
          }
        
          .rtl .mr-auto {
            margin-left: auto !important;
            margin-right: 0 !important;
          }
        
          .rtl .text-left {
            text-align: right !important;
          }
        
          .rtl .text-right {
            text-align: left !important;
          }
        
          /* Inverser les marges et paddings */
          .rtl .mr-1, .rtl .mr-2, .rtl .mr-3, .rtl .mr-4, .rtl .mr-5, .rtl .mr-6 {
            margin-left: 0.25rem !important;
            margin-right: 0 !important;
          }
        
          .rtl .ml-1, .rtl .ml-2, .rtl .ml-3, .rtl .ml-4, .rtl .ml-5, .rtl .ml-6 {
            margin-right: 0.25rem !important;
            margin-left: 0 !important;
          }
        
          /* Ajuster les flex directions */
          .rtl .flex-row {
            flex-direction: row-reverse !important;
          }
        
          /* Police spécifique pour l'arabe */
          .lang-ar {
            font-family: 'Amiri', serif !important;
          }
        
          .lang-ar h1, .lang-ar h2, .lang-ar h3, .lang-ar h4, .lang-ar h5, .lang-ar h6 {
            font-family: 'Amiri', serif !important;
          }
        
          .lang-ar p, .lang-ar span, .lang-ar div, .lang-ar button, .lang-ar input {
            font-family: 'Amiri', serif !important;
          }
        `

        // Supprimer l'ancien style s'il existe
        const oldStyle = document.getElementById("arabic-support-styles")
        if (oldStyle) {
          oldStyle.remove()
        }

        // Ajouter le nouveau style
        document.head.appendChild(style)
      } else {
        // Nettoyer les styles spécifiques à l'arabe si on change de langue
        document.documentElement.dir = "ltr"
        document.documentElement.classList.remove("rtl")
        document.body.classList.remove("rtl")
        document.body.classList.remove("lang-ar")

        const oldStyle = document.getElementById("arabic-support-styles")
        if (oldStyle) {
          oldStyle.remove()
        }
      }
    }

    // Appliquer immédiatement
    applyArabicSupport()
  }, [language])

  return null // Ce composant ne rend rien visuellement
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, Send, ImageIcon, Upload } from "lucide-react"
import Image from "next/image"
import { useIsMobile, useIsTablet, useIsDesktop } from "@/hooks/use-media-query"
import { useTranslation } from "@/utils/dummy-translations"

export default function HeroBlockResponsive({ id, content }) {
  // Ajouter une vérification pour s'assurer que content existe
  const safeContent = content || {}

  // Utiliser une destructuration avec des valeurs par défaut
  const {
    // On garde ces variables pour compatibilité
    title = "", 
    subtitle = "",
    description = "",
    buttonText = "",
    secondaryButtonText = "",
    showChatbot = true,
    backgroundColor = "bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]",
    textColor = "text-white",
    backgroundImage = "",
    customClass = "",
    // Lien par défaut pour le formulaire
    primaryButtonLink = "https://app.youform.com/forms/gxc7dqht",
    // Lien par défaut pour Calendly
    calendlyUrl = "https://calendly.com/cairesolutions/30min",
  } = safeContent

  const { language, t } = useTranslation()
  const [showVideo, setShowVideo] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // États pour l'animation de la conversation
  const [messageIndex, setMessageIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showProductCard, setShowProductCard] = useState(false)
  const [showUserPhoto, setShowUserPhoto] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [userPhoto, setUserPhoto] = useState(null)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const chatContainerRef = useRef(null)
  const fileInputRef = useRef(null)
  const hasLoadedRef = useRef(false)
  const languageRef = useRef(language)

  // Hooks responsive
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  // -- TEXTES EN DUR ET CORRIGÉS --
  const staticTranslations = {
    // Titre séparé en deux pour la mise en page
    titlePart1: "Your new unfair advantage in",
    titlePart2: "beauty & wellness",
    subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
    
    // Nouveaux boutons
    tryFree: "Free Trial",
    watchDemo: "Book a Private Demo",
    
    // Textes du Chatbot
    online: "Online",
    askAbout: "Ask about skincare...",
    uploadPhoto: "Upload a Photo",
    simulate: "Simulate a skin analysis and get a luxury product recommendation.",
    send: "Send",
    photoSkin: "Here's a photo of my skin.",
    royalCaviar: "Royal Caviar Serum",
    enriched: "Enriched with rare marine extracts",
    viewDetails: "View Details",
    uploadSkinPhoto: "Upload skin photo",
  }
  // ------------------------------

  // Fonction pour ouvrir Youform (Nouvel onglet sur mobile pour éviter les bugs)
  const openYouform = () => {
    window.open("https://app.youform.com/forms/gxc7dqht", "_blank");
    return false
  }

  // Fonction pour ouvrir Calendly (Nouvel onglet = 100% fiable)
  const openCalendly = () => {
    // On force l'ouverture dans un nouvel onglet, c'est plus sûr sur mobile
    const targetUrl = calendlyUrl || "https://calendly.com/cairesolutions/30min";
    window.open(targetUrl, "_blank");
    return false
  }

  // Précharger les traductions nécessaires
  useEffect(() => {
    if (hasLoadedRef.current && languageRef.current === language) return
    languageRef.current = language

    const baseMessages = [
      {
        type: "assistant",
        content: "Hello, I'm Glowbot, your personal luxury skincare assistant. How can I help you today?",
        typingSpeed: 30,
        delay: 500,
      },
      {
        type: "user",
        content: "I'm looking for an effective anti-aging product for fine lines and hydration. I have combination skin with dry areas on my cheeks.",
        typingSpeed: 0,
        delay: 1000,
      },
      {
        type: "assistant",
        content: "I'd be happy to help! Would you like to share a photo of your skin so I can better assess your needs?",
        typingSpeed: 30,
        delay: 1200,
      },
      {
        type: "user-photo",
        content: "Here's a photo of my skin.",
        typingSpeed: 0,
        delay: 1000,
      },
      {
        type: "assistant",
        content: "Thank you for sharing this photo. Based on what I can see and your concerns about fine lines and hydration, I recommend a product with caviar extract and peptides. These ingredients work together to reduce fine lines while providing deep hydration for your combination skin.",
        typingSpeed: 30,
        delay: 1200,
      },
      {
        type: "assistant",
        content: "Here's a product that would be perfect for you:",
        typingSpeed: 30,
        delay: 800,
        withProduct: true,
      },
    ]

    setMessages(baseMessages)
    setIsLoading(false)
    hasLoadedRef.current = true
  }, [language])

  // Démarrer la conversation automatiquement
  useEffect(() => {
    if (!isLoading) {
      startConversation()
    }
  }, [isLoading])

  // Auto-scroll vers le bas du chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messageIndex, currentText, showProductCard, showUserPhoto])

  const startConversation = () => {
    setMessageIndex(0)
    setCurrentText("")
    setIsComplete(false)
    setShowProductCard(false)
    setShowUserPhoto(false)
    processNextMessage(0)
  }

  const processNextMessage = (index) => {
    if (index >= messages.length) {
      setIsComplete(true)
      return
    }

    const message = messages[index]

    if (message.type === "assistant") {
      setShowTyping(true)
      setCurrentText("")

      setTimeout(() => {
        let charIndex = 0
        const text = message.content

        const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
            const newText = text.substring(0, charIndex + 1)
            setCurrentText(newText)
            charIndex++
          } else {
            clearInterval(typingInterval)

            if (message.withProduct) {
              setTimeout(() => {
                setShowProductCard(true)
                setShowTyping(false)

                setTimeout(() => {
                  setMessageIndex(index + 1)
                  processNextMessage(index + 1)
                }, 1000)
              }, 500)
            } else {
              setTimeout(() => {
                setShowTyping(false)
                setMessageIndex(index + 1)
                processNextMessage(index + 1)
              }, message.delay)
            }
          }
        }, message.typingSpeed)

        return () => clearInterval(typingInterval)
      }, message.delay)
    } else if (message.type === "user-photo") {
      setTimeout(() => {
        setShowUserPhoto(true)
        setMessageIndex(index + 1)
        processNextMessage(index + 1)
      }, message.delay)
    } else {
      setTimeout(() => {
        setMessageIndex(index + 1)
        processNextMessage(index + 1)
      }, message.delay)
    }
  }

  const restartConversation = () => {
    startConversation()
  }

  const handleAttachClick = () => {
    setShowAttachMenu(!showAttachMenu)
  }

  const handlePhotoUpload = () => {
    fileInputRef.current?.click()
    setShowAttachMenu(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUserPhoto(URL.createObjectURL(file))
    }
  }

  const sectionStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center

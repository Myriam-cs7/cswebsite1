"use client"

import { useState, useRef, useEffect } from "react"
// Importer depuis notre nouveau fichier de traductions factices
import { useTranslation } from "@/utils/dummy-translations"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Paperclip, Send, ImageIcon, Upload } from "lucide-react"

export default function HeroBlock({ id, content }) {
  // Ajouter une vérification pour s'assurer que content existe
  const safeContent = content || {}

  // Utiliser une destructuration avec des valeurs par défaut
  const {
    title = "Your new unfair advantage in beauty & wellness"
    subtitle = "Your smartest way to increase bookings, loyalty, and product sales — without extra staff"
    description = "",
    buttonText = "Start Free Trial",
    secondaryButtonText = "Get a Demo",
    showChatbot = true,
    backgroundColor = "bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]",
    textColor = "text-white",
    backgroundImage = "",
    customClass = "",
    primaryButtonLink = "https://app.youform.com/forms/gxc7dqht",
    calendlyUrl = "https://calendly.com/cairesolutions/30min",
  } = safeContent

  const { language, t, tAsync, preloadKeys } = useTranslation()
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

  // Fonction pour ouvrir Youform dans un popup
  const openYouform = () => {
    const url = `https://app.youform.com/forms/gxc7dqht`
    // @ts-ignore - Youform est défini globalement par le script
    if (typeof window !== "undefined" && window.Youform) {
      window.Youform.openPopup(url, {
        mode: "popup",
        hideHeader: true,
        hideFooter: true,
        opacity: 85,
        onSubmit: () => {
          console.log("Formulaire soumis!")
        },
      })
    } else {
      // Fallback si le script n'est pas chargé
      window.open(url)
    }
    return false
  }

  // Fonction pour ouvrir Calendly dans un popup
  const openCalendly = () => {
    // @ts-ignore - Calendly est défini globalement par le script
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: calendlyUrl, // URL Calendly provenant des props
      })
    } else {
      // Fallback si le script n'est pas chargé
      window.open(calendlyUrl, "_blank")
    }
    return false
  }

  // Précharger les traductions nécessaires - utiliser useEffect sans dépendances
  useEffect(() => {
    // Ne charger que si la langue a changé
    if (hasLoadedRef.current && languageRef.current === language) return
    languageRef.current = language

    // Définir les messages statiques avec traduction
    const baseMessages = [
      {
        type: "assistant",
        content: "Hello, I'm Glowbot, your personal luxury skincare assistant. How can I help you today?",
        typingSpeed: 30,
        delay: 500,
      },
      {
        type: "user",
        content:
          "I'm looking for an effective anti-aging product for fine lines and hydration. I have combination skin with dry areas on my cheeks.",
        typingSpeed: 0,
        delay: 1000,
      },
      {
        type: "assistant",
        content:
          "I'd be happy to help! Would you like to share a photo of your skin so I can better assess your needs?",
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
        content:
          "Thank you for sharing this photo. Based on what I can see and your concerns about fine lines and hydration, I recommend a product with caviar extract and peptides. These ingredients work together to reduce fine lines while providing deep hydration for your combination skin.",
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

    // Mettre à jour les messages et marquer comme chargé
    setMessages(baseMessages)
    setIsLoading(false)
    hasLoadedRef.current = true
  }, [language, calendlyUrl]) // Uniquement dépendant de language

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

      // Attendre avant de commencer à taper
      setTimeout(() => {
        let charIndex = 0
        const text = message.content

        const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
            // Assurons-nous que le texte complet est correctement affiché
            const newText = text.substring(0, charIndex + 1)
            setCurrentText(newText)
            charIndex++
          } else {
            clearInterval(typingInterval)

            // Afficher la carte produit si ce message en a une
            if (message.withProduct) {
              setTimeout(() => {
                setShowProductCard(true)
                setShowTyping(false) // Masquer l'indicateur de frappe une fois le produit affiché

                // Passer au message suivant après avoir affiché le produit
                setTimeout(() => {
                  setMessageIndex(index + 1)
                  processNextMessage(index + 1)
                }, 1000)
              }, 500)
            } else {
              // Attendre un court instant pour que le message soit lu avant de passer au suivant
              setTimeout(() => {
                setShowTyping(false) // Masquer l'indicateur de frappe
                setMessageIndex(index + 1)
                processNextMessage(index + 1)
              }, message.delay)
            }
          }
        }, message.typingSpeed)

        return () => clearInterval(typingInterval)
      }, message.delay)
    } else if (message.type === "user-photo") {
      // Afficher la photo de l'utilisateur
      setTimeout(() => {
        setShowUserPhoto(true)
        setMessageIndex(index + 1)
        processNextMessage(index + 1)
      }, message.delay)
    } else {
      // Les messages utilisateur apparaissent immédiatement après un délai
      setTimeout(() => {
        setMessageIndex(index + 1)
        processNextMessage(index + 1)
      }, message.delay)
    }
  }

  // Fonction pour réinitialiser et redémarrer la conversation
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

  // Appliquer les styles personnalisés
  const sectionStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }

  // Déterminer les classes CSS
  const sectionClasses = `relative py-20 px-6 ${backgroundColor} ${textColor} ${customClass}`

  // Textes en anglais
  const staticTranslations = {
    clientsDeserve: "Your clients deserve",
    exceptionalExperience: "an exceptional skincare experience",
    solutionApart: "and you, a solution that sets you apart.",
    tryFree: "Start Free Trial",
    watchDemo: "Get a Demo",
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

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      {/* Optional Video Background */}
      <div className="absolute inset-0 z-[-1] opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-[#cfaa5c]/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8 text-center md:text-left">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#cfaa5c] via-[#e0c070] to-[#cfaa5c] bg-clip-text text-transparent inline-block relative">
              {staticTranslations.clientsDeserve}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffffff]/60 to-transparent animate-shimmer-luxury"></span>
            </span>
            <span className="text-white"> {staticTranslations.exceptionalExperience} </span>
            <span className="bg-gradient-to-r from-[#cfaa5c] via-[#e0c070] to-[#cfaa5c] bg-clip-text text-transparent inline-block relative">
              {staticTranslations.solutionApart}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffffff]/60 to-transparent animate-shimmer-luxury"></span>
            </span>
          </h1>

          <h2 className="font-montserrat text-xl md:text-2xl font-medium mb-8 text-white">{subtitle}</h2>

          {description && <p className="font-montserrat text-lg text-white mb-8">{description}</p>}

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
            <Button
              className="bg-[#cfaa5c] hover:bg-[#b89548] transition-colors duration-300 text-black text-lg px-8 py-3 rounded-full"
              onClick={openYouform}
            >
              {buttonText || staticTranslations.tryFree}
            </Button>
            <Button
              variant="outline"
              className="border-white text-white text-lg px-8 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors duration-300"
              onClick={openCalendly}
            >
              {secondaryButtonText || staticTranslations.watchDemo}
            </Button>
          </div>

          {/* Video Modal */}
          {showVideo && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowVideo(false)}
            >
              <div className="bg-white rounded-lg p-2 w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
                  {/* Replace with actual video */}
                  <div className="text-center p-8">
                    <p className="text-gray-500 mb-2">Video Placeholder</p>
                    <p className="text-sm text-gray-400">Your product demo video would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showChatbot && (
          <div className="md:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full overflow-hidden w-16 h-16 flex items-center justify-center bg-black">
                    <Image
                      src="/images/logo.svg"
                      alt="cAIre Solutions Logo"
                      width={72}
                      height={72}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-black text-lg">Glowbot</span>
                    <span className="text-xs text-gray-500">{staticTranslations.online}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-500">{staticTranslations.online}</span>
                </div>
              </div>

              <div
                ref={chatContainerRef}
                className="space-y-4 mb-6 h-[320px] overflow-y-auto px-1 py-2"
                style={{ minHeight: "320px", position: "relative" }}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#cfaa5c]"></div>
                  </div>
                ) : (
                  <>
                    {/* Messages affichés jusqu'à l'index actuel */}
                    {messages.slice(0, messageIndex).map((message, index) => (
                      <div
                        key={index}
                        className={`${
                          message.type === "assistant"
                            ? "bg-gray-100 rounded-lg p-3 max-w-[80%]"
                            : "bg-[#cfaa5c] text-black rounded-lg p-3 max-w-[80%] ml-auto"
                        }`}
                      >
                        <p className={message.type === "assistant" ? "text-gray-800" : "text-black"}>
                          {message.content}
                        </p>
                      </div>
                    ))}

                    {/* Afficher la photo de l'utilisateur si nécessaire */}
                    {showUserPhoto && (
                      <div className="bg-[#cfaa5c] text-black rounded-lg p-3 max-w-[80%] ml-auto">
                        <p className="text-black mb-2">{staticTranslations.photoSkin}</p>
                        <div>
                          <Image
                            src="/images/skin-sample.png"
                            alt="User skin photo"
                            width={200}
                            height={200}
                            className="w-full h-auto"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </div>
                    )}

                    {/* Message en cours de saisie et indicateur de frappe */}
                    {showTyping && (
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        {/* Le texte en cours de génération */}
                        <p className="text-gray-800 whitespace-pre-wrap">{currentText}</p>

                        {/* Indicateur de frappe (bulles) - affiché uniquement si le texte n'est pas complet */}
                        {currentText.length < messages[messageIndex]?.content.length && (
                          <div className="flex gap-1 mt-1">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Carte produit */}
                    {showProductCard && (
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex flex-col">
                          <div className="bg-white rounded-lg p-3 mb-2">
                            <div className="flex flex-col">
                              <div className="flex justify-center mb-3">
                                <div className="w-32 h-32">
                                  <Image
                                    src="/images/royal-caviar-serum.png"
                                    alt={staticTranslations.royalCaviar}
                                    width={128}
                                    height={128}
                                    className="object-contain w-full h-full"
                                    loading="eager"
                                  />
                                </div>
                              </div>
                              <div className="text-center">
                                <h4 className="font-medium text-sm">{staticTranslations.royalCaviar}</h4>
                                <p className="text-xs text-gray-600">{staticTranslations.enriched}</p>
                                <div className="flex items-center justify-center mt-1">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg
                                        key={star}
                                        className="w-3 h-3 text-[#cfaa5c]"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-600 ml-1">4.9/5</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-xs">
                              <p>
                                Perfect for your concerns! This luxury serum contains beluga caviar extract, SYN-COLL
                                peptide, evening primrose oil, and hyaluronic acid to reduce fine lines and provide deep
                                hydration for your combination skin.
                              </p>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="font-bold text-sm">€300</span>
                              <button className="bg-[#cfaa5c] text-black text-xs px-3 py-1 rounded-md">
                                {staticTranslations.viewDetails}
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-800 text-sm">
                            Would you like to know more about this product or see other recommendations?
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder={staticTranslations.askAbout}
                  className="bg-gray-100 rounded-lg py-3 px-4 w-full pr-24 focus:outline-none focus:ring-2 focus:ring-[#cfaa5c]"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  aria-label={staticTranslations.askAbout}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-[#cfaa5c] transition-colors"
                      onClick={handleAttachClick}
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-5 w-5" />
                    </button>

                    {/* Menu d'attachement */}
                    {showAttachMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg p-2 w-48 animate-fadeIn">
                        <button
                          className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded-md"
                          onClick={handlePhotoUpload}
                        >
                          <ImageIcon className="h-4 w-4 text-[#cfaa5c]" />
                          <span className="text-sm">{staticTranslations.uploadSkinPhoto}</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    className="text-xs bg-[#cfaa5c] text-black px-3 py-1 rounded-md flex items-center gap-1"
                    onClick={restartConversation}
                    aria-label="Send message"
                  >
                    <Send className="h-3 w-3" />
                    {staticTranslations.send}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center">
                <button
                  className="bg-[#cfaa5c] text-black px-4 py-2 rounded-full hover:bg-[#b89548] transition-colors duration-300 flex items-center gap-2"
                  onClick={handlePhotoUpload}
                  aria-label="Upload a photo"
                >
                  <Upload className="h-4 w-4" />
                  {staticTranslations.uploadPhoto}
                </button>
                <p className="mt-2 text-xs text-center text-gray-500 italic">{staticTranslations.simulate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

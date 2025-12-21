"use client"

import { useState, useEffect, useRef } from "react"
import { Paperclip, Send, ImageIcon, Upload, ArrowRight } from "lucide-react"
import Image from "next/image"
// On pointe vers vos hooks existants que vous avez déjà
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query"
import { useTranslation } from "@/utils/dummy-translations"

export default function HeroBlockResponsive({ id, content }: { id?: string, content?: any }) {
  const safeContent = content || {}

  // Vos réglages par défaut
  const {
    title = "",
    subtitle = "",
    buttonText = "Start Free Trial",
    secondaryButtonText = "Get a Demo",
    showChatbot = true,
    backgroundColor = "bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]",
    textColor = "text-white",
    customClass = "",
    primaryButtonLink = "https://app.youform.com/forms/gxc7dqht",
    calendlyUrl = "https://calendly.com/cairesolutions/30min",
  } = safeContent

  const { language } = useTranslation()
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [showProductCard, setShowProductCard] = useState(false)
  const [showUserPhoto, setShowUserPhoto] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasLoadedRef = useRef(false)
  const languageRef = useRef(language) // Fix pour éviter l'erreur de type

  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  // Vos textes originaux
  const staticTranslations = {
    titlePart1: "Your new unfair advantage in",
    titlePart2: "beauty & wellness",
    subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
    tryFree: "Start Free Trial",
    watchDemo: "Get a Demo",
    online: "Online",
    askAbout: "Ask about skincare...",
    uploadSkinPhoto: "Upload skin photo",
    simulate: "Simulate a skin analysis and get a luxury product recommendation.",
    send: "Send",
    photoSkin: "Here's a photo of my skin.",
    royalCaviar: "Royal Caviar Serum",
    enriched: "Enriched with rare marine extracts",
    viewDetails: "View Details",
    uploadPhoto: "Upload Photo"
  }

  const handleAttachClick = () => setShowAttachMenu(!showAttachMenu)
  const handlePhotoUpload = () => { fileInputRef.current?.click(); setShowAttachMenu(false) }
  
  // Initialisation du Chatbot (Votre logique originale)
  useEffect(() => {
    if (hasLoadedRef.current) return // On retire la dépendance à languageRef pour simplifier
    
    const baseMessages = [
      { type: "assistant", content: "Hello, I'm Glowbot, your personal luxury skincare assistant. How can I help you today?", typingSpeed: 30, delay: 500 },
      { type: "user", content: "I'm looking for an effective anti-aging product for fine lines. I have combination skin.", typingSpeed: 0, delay: 1000 },
      { type: "assistant", content: "I'd be happy to help! Based on your needs, I recommend a product with caviar extract and peptides.", typingSpeed: 30, delay: 1200 },
      { type: "assistant", content: "Here's a product that would be perfect for you:", typingSpeed: 30, delay: 800, withProduct: true },
    ]
    setMessages(baseMessages)
    setIsLoading(false)
    hasLoadedRef.current = true
  }, [])

  useEffect(() => { if (!isLoading) startConversation() }, [isLoading])
  
  // Auto-scroll
  useEffect(() => { 
    if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight 
  }, [messageIndex, currentText, showProductCard, showUserPhoto])

  const startConversation = () => {
    setMessageIndex(0); setCurrentText(""); setShowProductCard(false); setShowUserPhoto(false); processNextMessage(0);
  }

  const processNextMessage = (index: number) => {
    if (index >= messages.length) return
    const message = messages[index]

    if (message.type === "assistant") {
      setShowTyping(true); setCurrentText("");
      setTimeout(() => {
        let charIndex = 0
        const text = message.content
        const typingInterval = setInterval(() => {
          if (charIndex < text.length) {
            setCurrentText(text.substring(0, charIndex + 1)); charIndex++;
          } else {
            clearInterval(typingInterval)
            if (message.withProduct) {
              setTimeout(() => {
                setShowProductCard(true); setShowTyping(false);
                setTimeout(() => { setMessageIndex(index + 1); processNextMessage(index + 1); }, 1000)
              }, 500)
            } else {
              setTimeout(() => {
                setShowTyping(false); setMessageIndex(index + 1); processNextMessage(index + 1);
              }, message.delay)
            }
          }
        }, message.typingSpeed)
        return () => clearInterval(typingInterval)
      }, message.delay)
    } else {
      setTimeout(() => { setMessageIndex(index + 1); processNextMessage(index + 1); }, message.delay)
    }
  }

  const titleClasses = isMobile ? "text-3xl leading-tight" : isTablet ? "text-4xl leading-tight" : "text-5xl leading-tight"
  const subtitleClasses = isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl"

  return (
    <section id={id} className={`relative py-20 px-4 md:px-6 ${backgroundColor} ${textColor} ${customClass} overflow-hidden min-h-screen flex items-center`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-black to-black z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        
        {/* TEXTE GAUCHE */}
        <div className="w-full md:w-1/2 mb-16 md:mb-0 pr-0 md:pr-12 text-center md:text-left pt-20 md:pt-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 mx-auto md:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#cfaa5c] animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 tracking-widest uppercase">Meet Glowbot AI</span>
          </div>

          <h1 className={`font-serif font-bold mb-6 ${titleClasses}`}>
            <span className="bg-gradient-to-r from-[#cfaa5c] via-[#e0c070] to-[#cfaa5c] bg-clip-text text-transparent">
              {staticTranslations.titlePart1}
            </span>
            <span className="text-white"> {staticTranslations.titlePart2} </span>
          </h1>

          <h2 className={`font-light mb-10 text-gray-300 ${subtitleClasses}`}>{staticTranslations.subtitle}</h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
            <a href={primaryButtonLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-[#cfaa5c] hover:bg-[#b89548] text-black text-lg px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
                {buttonText || staticTranslations.tryFree}
                </button>
            </a>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                <button className="border border-white/20 bg-transparent text-white text-lg px-8 py-4 rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                {secondaryButtonText || staticTranslations.watchDemo}
                <ArrowRight className="w-5 h-5" />
                </button>
            </a>
          </div>
        </div>

        {/* CHATBOT DROITE */}
        {showChatbot && (
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-md border border-gray-200 relative transform transition-transform duration-700 hover:scale-[1.02]">
              <div className="bg-[#f8f9fa] p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-black shadow-md border border-[#cfaa5c]/30">
                    <span className="text-[#cfaa5c] font-bold text-xs">CS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">Glowbot</span>
                    <span className="text-xs text-green-600 flex items-center gap-1">Online</span>
                  </div>
                </div>
              </div>

              <div ref={chatContainerRef} className="bg-[#fff] h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.slice(0, messageIndex).map((message, index) => (
                  <div key={index} className={`flex w-full ${message.type === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div className={`${message.type === "assistant" ? "bg-gray-100 text-gray-800 rounded-tl-none" : "bg-[#cfaa5c] text-black rounded-tr-none"} rounded-2xl p-4 max-w-[85%] text-sm leading-relaxed`}>
                        {message.content}
                    </div>
                  </div>
                ))}
                {showTyping && (
                  <div className="flex w-full justify-start">
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                        <p className="text-gray-800 text-sm">{currentText}</p>
                      </div>
                  </div>
                )}
                {showProductCard && (
                  <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-[240px]">
                      <div className="p-6 bg-[#f8f8f8] flex justify-center">
                         <Image src="/images/royal-caviar-serum.png" alt="Serum" width={100} height={100} className="object-contain" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-sm text-gray-900 mb-1">{staticTranslations.royalCaviar}</h4>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                            <span className="font-bold text-[#cfaa5c]">€300</span>
                            <span className="bg-black text-white text-[10px] px-3 py-1.5 rounded-full">View</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center">
                    <input type="text" placeholder={staticTranslations.askAbout} className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </div>
                <button className="p-3 rounded-full bg-[#cfaa5c] text-black" onClick={() => startConversation()}>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

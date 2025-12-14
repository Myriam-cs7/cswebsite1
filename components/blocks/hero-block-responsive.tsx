"use client"

import { useState, useEffect, useRef } from "react"
// J'ai remplacé l'import Button par des boutons HTML natifs pour éviter les erreurs de build
import { Paperclip, Send, ImageIcon, Upload, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useIsMobile, useIsTablet, useIsDesktop } from "@/hooks/use-media-query"
import { useTranslation } from "@/utils/dummy-translations"

export default function HeroBlockResponsive({ id, content }: { id?: string, content?: any }) {
  const safeContent = content || {}

  const {
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
    primaryButtonLink = "https://app.youform.com/forms/gxc7dqht",
    calendlyUrl = "https://calendly.com/cairesolutions/30min",
  } = safeContent

  const { language, t } = useTranslation()
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showProductCard, setShowProductCard] = useState(false)
  const [showUserPhoto, setShowUserPhoto] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const hasLoadedRef = useRef(false)
  const languageRef = useRef(language)

  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  const staticTranslations = {
    titlePart1: "Your new unfair advantage in",
    titlePart2: "beauty & wellness",
    subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
    tryFree: "Start Free Trial", // Remis le texte original
    watchDemo: "Get a Demo", // Remis le texte original
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

  const handleAttachClick = () => setShowAttachMenu(!showAttachMenu)
  const handlePhotoUpload = () => { fileInputRef.current?.click(); setShowAttachMenu(false) }
  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) setUserPhoto(URL.createObjectURL(file))
  }
  const restartConversation = () => startConversation()

  useEffect(() => {
    if (hasLoadedRef.current && languageRef.current === language) return
    languageRef.current = language

    const baseMessages = [
      { type: "assistant", content: "Hello, I'm Glowbot, your personal luxury skincare assistant. How can I help you today?", typingSpeed: 30, delay: 500 },
      { type: "user", content: "I'm looking for an effective anti-aging product for fine lines and hydration. I have combination skin with dry areas on my cheeks.", typingSpeed: 0, delay: 1000 },
      { type: "assistant", content: "I'd be happy to help! Would you like to share a photo of your skin so I can better assess your needs?", typingSpeed: 30, delay: 1200 },
      { type: "user-photo", content: "Here's a photo of my skin.", typingSpeed: 0, delay: 1000 },
      { type: "assistant", content: "Thank you for sharing this photo. Based on what I can see and your concerns about fine lines and hydration, I recommend a product with caviar extract and peptides.", typingSpeed: 30, delay: 1200 },
      { type: "assistant", content: "Here's a product that would be perfect for you:", typingSpeed: 30, delay: 800, withProduct: true },
    ]
    setMessages(baseMessages)
    setIsLoading(false)
    hasLoadedRef.current = true
  }, [language])

  useEffect(() => { if (!isLoading) startConversation() }, [isLoading])
  useEffect(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight }, [messageIndex, currentText, showProductCard, showUserPhoto])

  const startConversation = () => {
    setMessageIndex(0); setCurrentText(""); setIsComplete(false); setShowProductCard(false); setShowUserPhoto(false); processNextMessage(0);
  }

  const processNextMessage = (index: number) => {
    if (index >= messages.length) { setIsComplete(true); return; }
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
    } else if (message.type === "user-photo") {
      setTimeout(() => { setShowUserPhoto(true); setMessageIndex(index + 1); processNextMessage(index + 1); }, message.delay)
    } else {
      setTimeout(() => { setMessageIndex(index + 1); processNextMessage(index + 1); }, message.delay)
    }
  }

  const sectionStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  }
  const sectionClasses = `relative py-12 md:py-20 px-4 md:px-6 ${backgroundColor} ${textColor} ${customClass}`
  const titleClasses = isMobile ? "text-3xl leading-tight" : isTablet ? "text-4xl leading-tight" : "text-5xl leading-tight"
  const subtitleClasses = isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl"

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      <div className="absolute inset-0 z-[-1] opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-[#cfaa5c]/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8 text-center md:text-left">
          
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 animate-in fade-in slide-in-from-top-2 duration-700">
            Dubaï — Paris
          </p>

          <h1 className={`font-playfair font-bold mb-4 ${titleClasses} text-white`}>
            {staticTranslations.titlePart1}{" "}
            <span className="bg-gradient-to-r from-[#cfaa5c] via-[#e0c070] to-[#cfaa5c] bg-clip-text text-transparent inline-block relative">
              {staticTranslations.titlePart2}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffffff]/60 to-transparent animate-shimmer-luxury"></span>
            </span>
          </h1>

          <h2 className={`font-montserrat font-medium mb-8 text-white ${subtitleClasses}`}>
            {staticTranslations.subtitle}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
            {/* BOUTON 1 : YouForm (Lien direct) */}
            <a href={primaryButtonLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-[#cfaa5c] hover:bg-[#b89548] transition-colors duration-300 text-black text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 rounded-full min-h-[44px] min-w-[44px] font-semibold">
                {staticTranslations.tryFree}
                </button>
            </a>

            {/* BOUTON 2 : Calendly (Lien direct) */}
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                <button className="border border-white/20 bg-transparent text-white text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors duration-300 min-h-[44px] min-w-[44px]">
                {staticTranslations.watchDemo}
                <ArrowRight className="w-4 h-4" />
                </button>
            </a>
          </div>
        </div>

        {/* CHATBOT */}
        {showChatbot && (
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-200">
              {/* Contenu Chatbot */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="rounded-full overflow-hidden w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-black">
                    <Image src="/images/logo.svg" alt="Glowbot" width={72} height={72} className="object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-black text-base md:text-lg">Glowbot</span>
                    <span className="text-xs text-gray-500">{staticTranslations.online}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-500">{staticTranslations.online}</span>
                </div>
              </div>

              <div ref={chatContainerRef} className="space-y-4 mb-4 md:mb-6 h-[250px] md:h-[320px] overflow-y-auto px-1 py-2" style={{ minHeight: isMobile ? "250px" : "320px", position: "relative" }}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#cfaa5c]"></div></div>
                ) : (
                  <>
                    {messages.slice(0, messageIndex).map((message, index) => (
                      <div key={index} className={`flex w-full ${message.type === "assistant" ? "justify-start" : "justify-end"}`}>
                        <div className={`${message.type === "assistant" ? "bg-gray-100 text-gray-800 rounded-tl-none" : "bg-[#cfaa5c] text-black rounded-tr-none"} rounded-2xl p-3 max-w-[85%] text-sm md:text-base`}>
                            {message.content}
                        </div>
                      </div>
                    ))}
                    {showUserPhoto && (
                      <div className="flex w-full justify-end">
                          <div className="bg-[#cfaa5c] text-black rounded-2xl rounded-tr-none p-2 md:p-3 max-w-[80%]">
                            <p className="text-black mb-2 text-sm md:text-base">{staticTranslations.photoSkin}</p>
                            <Image src="/images/skin-sample.png" alt="User skin" width={200} height={200} className="w-full h-auto rounded-lg" />
                          </div>
                      </div>
                    )}
                    {showTyping && (
                      <div className="flex w-full justify-start">
                          <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                            <p className="text-gray-800 whitespace-pre-wrap text-sm md:text-base">{currentText}</p>
                          </div>
                      </div>
                    )}
                    {showProductCard && (
                      <div className="flex w-full justify-start">
                          <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                            <div className="bg-white rounded-lg p-2 md:p-3 mb-2">
                                <div className="flex justify-center mb-3">
                                    <div className="w-24 h-24 md:w-32 md:h-32">
                                        <Image src="/images/royal-caviar-serum.png" alt={staticTranslations.royalCaviar} width={128} height={128} className="object-contain w-full h-full" />
                                    </div>
                                </div>
                                <h4 className="font-medium text-xs md:text-sm text-center">{staticTranslations.royalCaviar}</h4>
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="font-bold text-sm">€300</span>
                                    <button className="bg-[#cfaa5c] text-black text-xs px-3 py-1 rounded-md">{staticTranslations.viewDetails}</button>
                                </div>
                            </div>
                          </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="relative">
                <input type="text" placeholder={staticTranslations.askAbout} className="bg-gray-100 rounded-lg py-3 px-4 w-full pr-24 focus:outline-none focus:ring-2 focus:ring-[#cfaa5c] text-base" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button className="text-gray-500 hover:text-[#cfaa5c] p-2" onClick={handleAttachClick}><Paperclip className="h-5 w-5" /></button>
                  {showAttachMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg p-2 w-48 animate-fadeIn z-50">
                        <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-100 rounded-md" onClick={handlePhotoUpload}>
                          <ImageIcon className="h-4 w-4 text-[#cfaa5c]" /><span className="text-sm">{staticTranslations.uploadSkinPhoto}</span>
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </div>
                  )}
                  <button className="text-xs bg-[#cfaa5c] text-black px-3 py-1 rounded-md flex items-center gap-1" onClick={restartConversation}><Send className="h-3 w-3" />{staticTranslations.send}</button>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <button className="bg-[#cfaa5c] text-black px-4 py-2 rounded-full hover:bg-[#b89548] transition-colors duration-300 flex items-center gap-2" onClick={handlePhotoUpload}>
                  <Upload className="h-4 w-4" />{staticTranslations.uploadPhoto}
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

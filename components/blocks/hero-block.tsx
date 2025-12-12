"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "@/utils/dummy-translations"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Paperclip, Send, ImageIcon, Upload } from "lucide-react"

export default function HeroBlock({ id, content }) {
  const safeContent = content || {}

  // On garde tes paramètres par défaut
  const {
    title = "", 
    subtitle = "",
    description = "",
    buttonText = "",
    secondaryButtonText = "",
    showChatbot = true,
    backgroundColor = "bg-[#0a0a0a]", // J'ai forcé le noir profond du design system ici
    textColor = "text-white",
    backgroundImage = "",
    customClass = "",
    primaryButtonLink = "https://app.youform.com/forms/gxc7dqht",
    calendlyUrl = "https://calendly.com/cairesolutions/30min",
  } = safeContent

  const { language, t } = useTranslation()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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

  // -- TEXTES EN DUR (Préservés) --
  const staticTranslations = {
    // J'ai mis à jour le titre ici pour qu'il colle au design "Beauty & Wellness"
    titlePart1: "Your new unfair advantage in",
    titlePart2: "beauty & wellness",
    subtitle: "Your smartest way to increase bookings, loyalty, and product sales without extra staff.",
    tryFree: "Free Trial",
    watchDemo: "Book a Private Demo",
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

  // Fonctions Chatbot (Préservées à 100%)
  const handleAttachClick = () => setShowAttachMenu(!showAttachMenu)
  const handlePhotoUpload = () => { fileInputRef.current?.click(); setShowAttachMenu(false) }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setUserPhoto(URL.createObjectURL(file))
  }
  const restartConversation = () => startConversation()

  // Initialisation Chatbot (Préservée à 100%)
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

  const processNextMessage = (index) => {
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
  
  // J'ai nettoyé les classes ici pour le fond noir pur
  const sectionClasses = `relative py-20 px-6 bg-[#0a0a0a] ${textColor} ${customClass} overflow-hidden`

  return (
    <section id={id} className={sectionClasses} style={sectionStyle}>
      {/* Fond d'ambiance (Glow Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#cfaa5c]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- COLONNE GAUCHE (Refaite Design Luxe) --- */}
        <div className="space-y-8 text-center lg:text-left">
          
          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-medium">
            Dubaï — Paris
          </p>

          {/* TITRE H1 : C'est ici que j'ai appliqué le style Vogue/Luxe + Text-balance */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] text-balance font-medium">
             {staticTranslations.titlePart1} <br className="hidden md:block" />
             <span className="text-[#cfaa5c] italic pr-2">
                {staticTranslations.titlePart2}
             </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {staticTranslations.subtitle}
          </p>

          {/* BOUTONS (Tes liens sont préservés) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            {/* YouForm Link */}
            <a href="https://app.youform.com/forms/gxc7dqht" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#cfaa5c] hover:bg-[#b89548] text-black font-semibold rounded-full px-8 py-6 h-auto text-lg w-full sm:w-auto transition-all duration-300">
                  {staticTranslations.tryFree}
                </Button>
            </a>

            {/* Calendly Link */}
            <a href="https://calendly.com/cairesolutions/30min" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="bg-transparent border border-white/30 text-white font-medium rounded-full px-8 py-6 h-auto text-lg w-full sm:w-auto hover:bg-white/10 transition-all duration-300">
                  {staticTranslations.watchDemo}
                </Button>
            </a>
          </div>
        </div>

        {/* --- COLONNE DROITE (Ton Chatbot Intact) --- */}
        {showChatbot && (
          <div className="relative mx-auto w-full max-w-md lg:mr-0">
            <div className="bg-white rounded-3xl p-6 shadow-2xl relative z-20 overflow-hidden border border-gray-100">
              {/* Header Chatbot */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full overflow-hidden w-10 h-10 flex items-center justify-center bg-black">
                     {/* J'ai ajusté la taille du logo pour que ça soit plus propre */}
                     <span className="text-[#cfaa5c] font-bold text-xs">CS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm">Glowbot</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-gray-500">{staticTranslations.online}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone Messages */}
              <div ref={chatContainerRef} className="space-y-4 mb-6 h-[320px] overflow-y-auto px-1 py-2 scrollbar-hide" style={{ minHeight: "320px", position: "relative" }}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#cfaa5c]"></div></div>
                ) : (
                  <>
                    {messages.slice(0, messageIndex).map((message, index) => (
                      <div key={index} className={`${message.type === "assistant" ? "bg-gray-50 text-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[85%] text-sm" : "bg-[#cfaa5c] text-black rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto text-sm font-medium"}`}>
                        <p>{message.content}</p>
                      </div>
                    ))}
                    {showUserPhoto && (
                      <div className="bg-[#cfaa5c] text-black rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto text-sm">
                        <p className="mb-2">{staticTranslations.photoSkin}</p>
                        <Image src="/images/skin-sample.png" alt="User skin" width={200} height={200} className="w-full h-auto rounded-lg" />
                      </div>
                    )}
                    {showTyping && (
                      <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    )}
                    {showProductCard && (
                      <div className="bg-gray-50 rounded-2xl p-4 ml-0 mr-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="w-full h-32 relative mb-3 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                              <Image src="/images/royal-caviar-serum.png" alt={staticTranslations.royalCaviar} width={128} height={128} className="object-contain" />
                          </div>
                          <p className="text-gray-900 font-medium text-sm mb-1">{staticTranslations.royalCaviar}</p>
                          <p className="text-gray-500 text-xs mb-3">{staticTranslations.enriched}</p>
                          <button className="w-full py-2 bg-[#cfaa5c] text-black text-xs font-bold rounded-lg hover:bg-[#b8954a] transition-colors">
                              {staticTranslations.viewDetails}
                          </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Zone Input */}
              <div className="relative">
                <input type="text" placeholder={staticTranslations.askAbout} className="bg-gray-50 border-0 rounded-xl py-3 pl-4 pr-12 text-sm text-gray-600 focus:ring-1 focus:ring-[#cfaa5c] focus:bg-white transition-all w-full" value={userInput} onChange={(e) => setUserInput(e.target.value)} readOnly />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button className="text-gray-400 hover:text-[#cfaa5c]" onClick={handleAttachClick}><Paperclip className="h-4 w-4" /></button>
                  {showAttachMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white shadow-xl rounded-xl p-2 w-48 animate-in fade-in zoom-in-95 z-50 border border-gray-100">
                        <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors" onClick={handlePhotoUpload}>
                          <ImageIcon className="h-4 w-4 text-[#cfaa5c]" /><span className="text-xs font-medium text-gray-700">{staticTranslations.uploadSkinPhoto}</span>
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </div>
                  )}
                  <div className="w-8 h-8 bg-[#cfaa5c] rounded-lg flex items-center justify-center text-black shadow-sm cursor-pointer" onClick={restartConversation}>
                    <Send className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#cfaa5c]/20 text-[#8a6d2c] rounded-full text-xs font-semibold hover:bg-[#cfaa5c]/30 transition-colors" onClick={handlePhotoUpload}>
                  <Upload className="h-3 w-3" /> {staticTranslations.uploadPhoto}
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-3 italic">
                  {staticTranslations.simulate}
              </p>
            </div>
            
             {/* Décoration arrière-plan du chatbot */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#cfaa5c]/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl -z-10"></div>
          </div>
        )}
      </div>
    </section>
  )
}

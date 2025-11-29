"use client"

import { useState, useEffect } from "react"
import { useSiteConfig } from "../site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { ColorPicker } from "./color-picker"
import { BlockManager } from "./block-manager"
import { LanguageManager } from "./language-manager"
import { SettingsManager } from "./settings-manager"

export default function AdminPanel() {
  const { config, updateConfig } = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("blocks")

  // Add an authentication check to the AdminPanel component

  // At the top of the file, add a state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Add a login function
  const handleLogin = () => {
    // In a real implementation, you would use a secure authentication method
    // This is just a simple example for demonstration
    if (password === "caire2025") {
      // Replace with your desired password
      setIsAuthenticated(true)
      setShowLoginModal(false)
      setPassword("")
      setError("")
      // Store authentication in localStorage to persist between page refreshes
      if (typeof window !== "undefined") {
        localStorage.setItem("caireAdminAuth", "true")
      }
    } else {
      setError("Mot de passe incorrect")
    }
  }

  // Check for existing authentication on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("caireAdminAuth") === "true"
      setIsAuthenticated(isAuth)
    }
  }, [])

  // Add a logout function
  const handleLogout = () => {
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem("caireAdminAuth")
    }
  }

  // Fonction pour mettre à jour les couleurs du site
  const updateColors = (type: "primary" | "secondary", color: string) => {
    const newConfig = { ...config }
    if (type === "primary") {
      newConfig.primaryColor = color
    } else {
      newConfig.secondaryColor = color
    }
    updateConfig(newConfig)
  }

  // Fonction pour mettre à jour le logo
  const updateLogo = (logoUrl: string) => {
    const newConfig = { ...config }
    newConfig.logo = logoUrl
    updateConfig(newConfig)
  }

  // Replace the return statement with this conditional rendering
  return (
    <>
      {/* Admin button - only visible when authenticated or when showing login modal */}
      {(isAuthenticated || showLoginModal) && (
        <button
          onClick={() => (isAuthenticated ? setIsOpen(!isOpen) : setShowLoginModal(true))}
          className="fixed bottom-4 right-4 z-50 bg-[#cfaa5c] text-white p-4 rounded-full shadow-lg hover:bg-[#b89548] transition-all"
          aria-label="Ouvrir le panneau d'administration"
        >
          {isOpen ? <X size={24} /> : <span className="font-bold">Éditer</span>}
        </button>
      )}

      {/* Login trigger button - only visible when not authenticated */}
      {!isAuthenticated && !showLoginModal && (
        <button
          onClick={() => setShowLoginModal(true)}
          className="fixed bottom-4 right-4 z-50 bg-black text-[#cfaa5c] p-2 rounded-full shadow-lg hover:bg-gray-900 transition-all opacity-30 hover:opacity-100"
          aria-label="Admin Login"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </button>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Authentification Admin</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#cfaa5c] focus:border-[#cfaa5c]"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cfaa5c]"
                >
                  Annuler
                </button>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cfaa5c] hover:bg-[#b89548] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cfaa5c]"
                >
                  Connexion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel - only visible when authenticated and open */}
      {isAuthenticated && isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Panneau d'Administration</h2>
              <div className="flex items-center gap-2">
                <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
                  Déconnexion
                </button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
              <div className="border-b px-4">
                <TabsList className="h-12">
                  <TabsTrigger value="blocks">Blocs de contenu</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                  <TabsTrigger value="colors">Apparence</TabsTrigger>
                  <TabsTrigger value="languages">Langues</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="blocks" className="mt-0">
                  <BlockManager />
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <SettingsManager />
                </TabsContent>

                <TabsContent value="colors" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Apparence du Site</CardTitle>
                      <CardDescription>Personnalisez les couleurs et l'identité visuelle de votre site</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Logo</h3>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="logo"
                            value={config.logo}
                            onChange={(e) => updateLogo(e.target.value)}
                            placeholder="/images/logo.png"
                          />
                          {config.logo && (
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                              <img
                                src={config.logo || "/placeholder.svg"}
                                alt="Logo"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Couleur Principale</h3>
                        <div className="flex items-center gap-4">
                          <ColorPicker
                            color={config.primaryColor}
                            onChange={(color) => updateColors("primary", color)}
                          />
                          <div className="flex-1">
                            <Input
                              value={config.primaryColor}
                              onChange={(e) => updateColors("primary", e.target.value)}
                            />
                          </div>
                          <div
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: config.primaryColor }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Couleur Secondaire</h3>
                        <div className="flex items-center gap-4">
                          <ColorPicker
                            color={config.secondaryColor}
                            onChange={(color) => updateColors("secondary", color)}
                          />
                          <div className="flex-1">
                            <Input
                              value={config.secondaryColor}
                              onChange={(e) => updateColors("secondary", e.target.value)}
                            />
                          </div>
                          <div
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: config.secondaryColor }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Prévisualisation</h3>
                        <div className="p-6 border rounded-lg">
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                              <div
                                className="w-16 h-16 rounded-full"
                                style={{ backgroundColor: config.primaryColor }}
                              ></div>
                              <div>
                                <h4 className="font-bold text-lg">Couleur principale</h4>
                                <p className="text-sm text-gray-500">{config.primaryColor}</p>
                              </div>
                            </div>

                            <div className="flex gap-4 items-center">
                              <div
                                className="w-16 h-16 rounded-full"
                                style={{ backgroundColor: config.secondaryColor }}
                              ></div>
                              <div>
                                <h4 className="font-bold text-lg">Couleur secondaire</h4>
                                <p className="text-sm text-gray-500">{config.secondaryColor}</p>
                              </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                              <Button style={{ backgroundColor: config.primaryColor, color: "#fff" }}>
                                Bouton principal
                              </Button>
                              <Button
                                variant="outline"
                                style={{ borderColor: config.secondaryColor, color: config.secondaryColor }}
                              >
                                Bouton secondaire
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="languages" className="mt-0">
                  <LanguageManager />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useSiteConfig } from "../site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Plus, Trash2 } from "lucide-react"
import { ColorPicker } from "./color-picker"
import { MediaLibrary } from "./media-library"

export function BlockEditor({ blockId, onClose }) {
  const { config, updateConfig } = useSiteConfig()
  const [block, setBlock] = useState(null)
  const [activeTab, setActiveTab] = useState("content")
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [currentMediaField, setCurrentMediaField] = useState("")

  useEffect(() => {
    const foundBlock = config.sections.find((section) => section.id === blockId)
    if (foundBlock) {
      setBlock({ ...foundBlock })
    }
  }, [blockId, config.sections])

  if (!block) return <div>Chargement...</div>

  const handleSave = () => {
    const newSections = config.sections.map((section) => (section.id === blockId ? block : section))

    const newConfig = { ...config, sections: newSections }
    updateConfig(newConfig)
    onClose()
  }

  const updateField = (field, value) => {
    setBlock((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateContentField = (field, value) => {
    setBlock((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }))
  }

  const handleMediaSelect = (mediaUrl) => {
    if (currentMediaField.includes("[")) {
      // Handle nested fields like "ceo.image" or "team[0].image"
      const parts = currentMediaField.split(".")

      if (parts[0] === "ceo") {
        const newCeo = { ...block.content.ceo, image: mediaUrl }
        updateContentField("ceo", newCeo)
      } else if (parts[0].startsWith("team[")) {
        const indexMatch = parts[0].match(/team\[(\d+)\]/)
        if (indexMatch && indexMatch[1]) {
          const index = Number.parseInt(indexMatch[1])
          const newTeam = [...block.content.team]
          newTeam[index] = { ...newTeam[index], image: mediaUrl }
          updateContentField("team", newTeam)
        }
      } else if (parts[0].startsWith("items[")) {
        const indexMatch = parts[0].match(/items\[(\d+)\]/)
        if (indexMatch && indexMatch[1]) {
          const index = Number.parseInt(indexMatch[1])
          const newItems = [...block.content.items]
          newItems[index] = { ...newItems[index], image: mediaUrl }
          updateContentField("items", newItems)
        }
      }
    } else {
      updateContentField(currentMediaField, mediaUrl)
    }

    setShowMediaLibrary(false)
    setCurrentMediaField("")
  }

  const openMediaLibrary = (fieldName) => {
    setCurrentMediaField(fieldName)
    setShowMediaLibrary(true)
  }

  // Rendu spécifique selon le type de bloc
  const renderBlockEditor = () => {
    switch (block.template) {
      case "hero":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={block.content.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={block.content.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Texte du bouton principal</Label>
                <Input
                  id="buttonText"
                  value={block.content.buttonText || ""}
                  onChange={(e) => updateContentField("buttonText", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryButtonText">Texte du bouton secondaire</Label>
                <Input
                  id="secondaryButtonText"
                  value={block.content.secondaryButtonText || ""}
                  onChange={(e) => updateContentField("secondaryButtonText", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundImage">Image d'arrière-plan</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundImage"
                  value={block.content.backgroundImage || ""}
                  onChange={(e) => updateContentField("backgroundImage", e.target.value)}
                  placeholder="/images/hero-bg.jpg"
                />
                <Button variant="outline" onClick={() => openMediaLibrary("backgroundImage")}>
                  Parcourir
                </Button>
              </div>
              {block.content.backgroundImage && (
                <div className="mt-2 border rounded p-2 bg-gray-50">
                  <img
                    src={block.content.backgroundImage || "/placeholder.svg"}
                    alt="Aperçu"
                    className="h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="showChatbot"
                checked={block.content.showChatbot || false}
                onCheckedChange={(checked) => updateContentField("showChatbot", checked)}
              />
              <Label htmlFor="showChatbot">Afficher le chatbot</Label>
            </div>
          </div>
        )

      case "brand":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={block.content.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                value={block.content.subtitle || ""}
                onChange={(e) => updateContentField("subtitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={block.content.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={block.content.image || ""}
                  onChange={(e) => updateContentField("image", e.target.value)}
                  placeholder="/images/beauty-cs.png"
                />
                <Button variant="outline" onClick={() => openMediaLibrary("image")}>
                  Parcourir
                </Button>
              </div>
              {block.content.image && (
                <div className="mt-2 border rounded p-2 bg-gray-50">
                  <img
                    src={block.content.image || "/placeholder.svg"}
                    alt="Aperçu"
                    className="h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case "about-us":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="about-us-title">Titre de la section</Label>
              <Input
                id="about-us-title"
                value={block.content.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about-us-subtitle">Sous-titre</Label>
              <Input
                id="about-us-subtitle"
                value={block.content.subtitle || ""}
                onChange={(e) => updateContentField("subtitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about-us-description">Description</Label>
              <Textarea
                id="about-us-description"
                value={block.content.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={3}
              />
            </div>

            {/* CEO Section */}
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium text-lg">Informations CEO</h3>

              <div className="space-y-2">
                <Label htmlFor="ceo-name">Nom</Label>
                <Input
                  id="ceo-name"
                  value={block.content.ceo?.name || ""}
                  onChange={(e) => {
                    const newCeo = { ...block.content.ceo, name: e.target.value }
                    updateContentField("ceo", newCeo)
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ceo-position">Poste</Label>
                <Input
                  id="ceo-position"
                  value={block.content.ceo?.position || ""}
                  onChange={(e) => {
                    const newCeo = { ...block.content.ceo, position: e.target.value }
                    updateContentField("ceo", newCeo)
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ceo-bio">Biographie</Label>
                <Textarea
                  id="ceo-bio"
                  value={block.content.ceo?.bio || ""}
                  onChange={(e) => {
                    const newCeo = { ...block.content.ceo, bio: e.target.value }
                    updateContentField("ceo", newCeo)
                  }}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ceo-image">Photo</Label>
                <div className="flex gap-2">
                  <Input
                    id="ceo-image"
                    value={block.content.ceo?.image || ""}
                    onChange={(e) => {
                      const newCeo = { ...block.content.ceo, image: e.target.value }
                      updateContentField("ceo", newCeo)
                    }}
                    placeholder="/placeholder.svg?height=400&width=400"
                  />
                  <Button variant="outline" onClick={() => openMediaLibrary("ceo.image")}>
                    Parcourir
                  </Button>
                </div>
                {block.content.ceo?.image && (
                  <div className="mt-2 border rounded p-2 bg-gray-50">
                    <img
                      src={block.content.ceo.image || "/placeholder.svg"}
                      alt="Aperçu"
                      className="h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Team Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">Équipe</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newTeam = [
                      ...(block.content.team || []),
                      {
                        name: "Nouveau membre",
                        position: "Poste",
                        bio: "Biographie du membre",
                        image: "/placeholder.svg?height=200&width=200",
                      },
                    ]
                    updateContentField("team", newTeam)
                  }}
                >
                  <Plus size={16} className="mr-2" /> Ajouter un membre
                </Button>
              </div>

              {(block.content.team || []).map((member, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Membre {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newTeam = [...block.content.team]
                        newTeam.splice(index, 1)
                        updateContentField("team", newTeam)
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`team-${index}-name`}>Nom</Label>
                    <Input
                      id={`team-${index}-name`}
                      value={member.name || ""}
                      onChange={(e) => {
                        const newTeam = [...block.content.team]
                        newTeam[index].name = e.target.value
                        updateContentField("team", newTeam)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`team-${index}-position`}>Poste</Label>
                    <Input
                      id={`team-${index}-position`}
                      value={member.position || ""}
                      onChange={(e) => {
                        const newTeam = [...block.content.team]
                        newTeam[index].position = e.target.value
                        updateContentField("team", newTeam)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`team-${index}-bio`}>Biographie</Label>
                    <Textarea
                      id={`team-${index}-bio`}
                      value={member.bio || ""}
                      onChange={(e) => {
                        const newTeam = [...block.content.team]
                        newTeam[index].bio = e.target.value
                        updateContentField("team", newTeam)
                      }}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`team-${index}-image`}>Photo</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`team-${index}-image`}
                        value={member.image || ""}
                        onChange={(e) => {
                          const newTeam = [...block.content.team]
                          newTeam[index].image = e.target.value
                          updateContentField("team", newTeam)
                        }}
                        placeholder="/placeholder.svg?height=200&width=200"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentMediaField(`team[${index}].image`)
                          setShowMediaLibrary(true)
                        }}
                      >
                        Parcourir
                      </Button>
                    </div>
                    {member.image && (
                      <div className="mt-2 border rounded p-2 bg-gray-50">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt="Aperçu"
                          className="h-16 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "features":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="features-title">Titre de la section</Label>
              <Input
                id="features-title"
                value={block.content.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features-description">Description</Label>
              <Textarea
                id="features-description"
                value={block.content.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Fonctionnalités</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItems = [
                      ...(block.content.items || []),
                      {
                        title: "Nouvelle fonctionnalité",
                        description: "Description de la fonctionnalité",
                        icon: "Star",
                      },
                    ]
                    updateContentField("items", newItems)
                  }}
                >
                  <Plus size={16} className="mr-2" /> Ajouter
                </Button>
              </div>

              {(block.content.items || []).map((item, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Fonctionnalité {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newItems = [...block.content.items]
                        newItems.splice(index, 1)
                        updateContentField("items", newItems)
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`feature-${index}-title`}>Titre</Label>
                    <Input
                      id={`feature-${index}-title`}
                      value={item.title || ""}
                      onChange={(e) => {
                        const newItems = [...block.content.items]
                        newItems[index].title = e.target.value
                        updateContentField("items", newItems)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`feature-${index}-description`}>Description</Label>
                    <Textarea
                      id={`feature-${index}-description`}
                      value={item.description || ""}
                      onChange={(e) => {
                        const newItems = [...block.content.items]
                        newItems[index].description = e.target.value
                        updateContentField("items", newItems)
                      }}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`feature-${index}-icon`}>Icône</Label>
                    <select
                      id={`feature-${index}-icon`}
                      value={item.icon || "Star"}
                      onChange={(e) => {
                        const newItems = [...block.content.items]
                        newItems[index].icon = e.target.value
                        updateContentField("items", newItems)
                      }}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="Star">Étoile</option>
                      <option value="Shield">Bouclier</option>
                      <option value="Heart">Cœur</option>
                      <option value="Code">Code</option>
                      <option value="Settings">Paramètres</option>
                      <option value="Zap">Éclair</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`feature-${index}-image`}>Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`feature-${index}-image`}
                        value={item.image || ""}
                        onChange={(e) => {
                          const newItems = [...block.content.items]
                          newItems[index].image = e.target.value
                          updateContentField("items", newItems)
                        }}
                        placeholder="/images/feature.jpg"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentMediaField(`items[${index}].image`)
                          setShowMediaLibrary(true)
                        }}
                      >
                        Parcourir
                      </Button>
                    </div>
                    {item.image && (
                      <div className="mt-2 border rounded p-2 bg-gray-50">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt="Aperçu"
                          className="h-16 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "benefits":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="benefits-title">Titre de la section</Label>
              <Input
                id="benefits-title"
                value={block.content.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits-description">Description</Label>
              <Textarea
                id="benefits-description"
                value={block.content.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Avantages</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItems = [
                      ...(block.content.items || []),
                      {
                        title: "Nouvel avantage",
                        description: "Description de l'avantage",
                        image: "/placeholder.svg?height=200&width=200",
                      },
                    ]
                    updateContentField("items", newItems)
                  }}
                >
                  <Plus size={16} className="mr-2" /> Ajouter
                </Button>
              </div>

              {(block.content.items || []).map((item, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Avantage {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newItems = [...block.content.items]
                        newItems.splice(index, 1)
                        updateContentField("items", newItems)
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`benefit-${index}-title`}>Titre</Label>
                    <Input
                      id={`benefit-${index}-title`}
                      value={item.title || ""}
                      onChange={(e) => {
                        const newItems = [...block.content.items]
                        newItems[index].title = e.target.value
                        updateContentField("items", newItems)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`benefit-${index}-description`}>Description</Label>
                    <Textarea
                      id={`benefit-${index}-description`}
                      value={item.description || ""}
                      onChange={(e) => {
                        const newItems = [...block.content.items]
                        newItems[index].description = e.target.value
                        updateContentField("items", newItems)
                      }}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`benefit-${index}-image`}>Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`benefit-${index}-image`}
                        value={item.image || ""}
                        onChange={(e) => {
                          const newItems = [...block.content.items]
                          newItems[index].image = e.target.value
                          updateContentField("items", newItems)
                        }}
                        placeholder="/placeholder.svg?height=200&width=200"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentMediaField(`items[${index}].image`)
                          setShowMediaLibrary(true)
                        }}
                      >
                        Parcourir
                      </Button>
                    </div>
                    {item.image && (
                      <div className="mt-2 border rounded p-2 bg-gray-50">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt="Aperçu"
                          className="h-16 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      // Dans la fonction renderBlockEditor, ajoutez un cas pour "why-choose"
      case "why-choose":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="why-choose-title">Titre de la section</Label>
              <Input
                id="why-choose-title"
                value={block.content.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="why-choose-description">Description</Label>
              <Textarea
                id="why-choose-description"
                value={block.content.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Raisons</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newReasons = [
                      ...(block.content.reasons || []),
                      {
                        title: "Nouvelle raison",
                        description: "Description de la raison",
                        icon: "Check",
                      },
                    ]
                    updateContentField("reasons", newReasons)
                  }}
                >
                  <Plus size={16} className="mr-2" /> Ajouter
                </Button>
              </div>

              {(block.content.reasons || []).map((reason, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Raison {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newReasons = [...block.content.reasons]
                        newReasons.splice(index, 1)
                        updateContentField("reasons", newReasons)
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`reason-${index}-title`}>Titre</Label>
                    <Input
                      id={`reason-${index}-title`}
                      value={reason.title || ""}
                      onChange={(e) => {
                        const newReasons = [...block.content.reasons]
                        newReasons[index].title = e.target.value
                        updateContentField("reasons", newReasons)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`reason-${index}-description`}>Description</Label>
                    <Textarea
                      id={`reason-${index}-description`}
                      value={reason.description || ""}
                      onChange={(e) => {
                        const newReasons = [...block.content.reasons]
                        newReasons[index].description = e.target.value
                        updateContentField("reasons", newReasons)
                      }}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`reason-${index}-icon`}>Icône</Label>
                    <select
                      id={`reason-${index}-icon`}
                      value={reason.icon || "Check"}
                      onChange={(e) => {
                        const newReasons = [...block.content.reasons]
                        newReasons[index].icon = e.target.value
                        updateContentField("reasons", newReasons)
                      }}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="Check">Coche</option>
                      <option value="Award">Trophée</option>
                      <option value="Shield">Bouclier</option>
                      <option value="Clock">Horloge</option>
                      <option value="Users">Utilisateurs</option>
                      <option value="Zap">Éclair</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      // Ajoutez d'autres templates selon vos besoins
      default:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p>Éditeur générique pour le bloc de type: {block.template || "personnalisé"}</p>
              <p className="text-sm text-gray-500 mt-1">Vous pouvez modifier les propriétés de base ci-dessous.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generic-title">Titre</Label>
              <Input
                id="generic-title"
                value={block.content?.title || ""}
                onChange={(e) => updateContentField("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="generic-description">Description</Label>
              <Textarea
                id="generic-description"
                value={block.content?.description || ""}
                onChange={(e) => updateContentField("description", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          {renderBlockEditor()}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="block-title">Titre du bloc (administratif)</Label>
            <Input id="block-title" value={block.title} onChange={(e) => updateField("title", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="block-description">Description du bloc (administratif)</Label>
            <Textarea
              id="block-description"
              value={block.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="block-visible"
              checked={block.visible}
              onCheckedChange={(checked) => updateField("visible", checked)}
            />
            <Label htmlFor="block-visible">Bloc visible</Label>
          </div>
        </TabsContent>

        <TabsContent value="style" className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label>Couleur d'arrière-plan</Label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={block.content?.backgroundColor || "#ffffff"}
                onChange={(color) => updateContentField("backgroundColor", color)}
              />
              <div className="flex-1">
                <Input
                  value={block.content?.backgroundColor || "#ffffff"}
                  onChange={(e) => updateContentField("backgroundColor", e.target.value)}
                />
              </div>
              <div
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: block.content?.backgroundColor || "#ffffff" }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Couleur du texte</Label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={block.content?.textColor || "#000000"}
                onChange={(color) => updateContentField("textColor", color)}
              />
              <div className="flex-1">
                <Input
                  value={block.content?.textColor || "#000000"}
                  onChange={(e) => updateContentField("textColor", e.target.value)}
                />
              </div>
              <div
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: block.content?.textColor || "#000000" }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="padding">Espacement (padding)</Label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <Label htmlFor="padding-top" className="text-xs">
                  Haut
                </Label>
                <Input
                  id="padding-top"
                  value={block.content?.padding?.top || "0"}
                  onChange={(e) =>
                    updateContentField("padding", {
                      ...(block.content?.padding || {}),
                      top: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="padding-right" className="text-xs">
                  Droite
                </Label>
                <Input
                  id="padding-right"
                  value={block.content?.padding?.right || "0"}
                  onChange={(e) =>
                    updateContentField("padding", {
                      ...(block.content?.padding || {}),
                      right: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="padding-bottom" className="text-xs">
                  Bas
                </Label>
                <Input
                  id="padding-bottom"
                  value={block.content?.padding?.bottom || "0"}
                  onChange={(e) =>
                    updateContentField("padding", {
                      ...(block.content?.padding || {}),
                      bottom: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="padding-left" className="text-xs">
                  Gauche
                </Label>
                <Input
                  id="padding-left"
                  value={block.content?.padding?.left || "0"}
                  onChange={(e) =>
                    updateContentField("padding", {
                      ...(block.content?.padding || {}),
                      left: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-class">Classes CSS personnalisées</Label>
            <Input
              id="custom-class"
              value={block.content?.customClass || ""}
              onChange={(e) => updateContentField("customClass", e.target.value)}
              placeholder="ma-classe-personnalisee"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Enregistrer
        </Button>
      </div>

      {showMediaLibrary && (
        <MediaLibrary
          isOpen={showMediaLibrary}
          onClose={() => setShowMediaLibrary(false)}
          onSelect={handleMediaSelect}
        />
      )}
    </div>
  )
}

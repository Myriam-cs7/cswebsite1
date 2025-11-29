"use client"

import { useState } from "react"
import { useSiteConfig } from "../site-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, EyeOff, Plus, Trash2, Move, Settings } from "lucide-react"
import { BlockEditor } from "./block-editor"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

export function BlockManager() {
  const { config, updateConfig, toggleSectionVisibility } = useSiteConfig()
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [availableBlocks, setAvailableBlocks] = useState([
    { id: "hero", name: "Section Héro", template: "hero" },
    { id: "brand", name: "Section Marque", template: "brand" },
    { id: "features", name: "Fonctionnalités", template: "features" },
    { id: "about", name: "À Propos", template: "about" },
    { id: "about-us", name: "Notre Équipe", template: "about-us" },
    { id: "why-choose", name: "Pourquoi Choisir cAIre", template: "why-choose" },
    { id: "benefits", name: "Avantages", template: "benefits" },
    { id: "testimonials", name: "Témoignages", template: "testimonials" },
    { id: "pricing", name: "Tarifs", template: "pricing" },
    { id: "cta", name: "Appel à l'Action", template: "cta" },
    { id: "faq", name: "FAQ", template: "faq" },
  ])
  const [showBlockLibrary, setShowBlockLibrary] = useState(false)

  // Trier les sections par ordre
  const sortedSections = [...config.sections].sort((a, b) => a.order - b.order)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(sortedSections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    const newConfig = { ...config, sections: updatedItems }
    updateConfig(newConfig)
  }

  const addNewBlock = (template) => {
    const newBlock = {
      id: `${template}-${Date.now()}`,
      title: `Nouveau bloc ${template}`,
      description: "Description du bloc",
      visible: true,
      order: config.sections.length + 1,
      template: template,
      content: getDefaultContentForTemplate(template),
    }

    const newConfig = {
      ...config,
      sections: [...config.sections, newBlock],
    }

    updateConfig(newConfig)
    setShowBlockLibrary(false)
  }

  const deleteBlock = (blockId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce bloc ?")) {
      const newSections = config.sections.filter((section) => section.id !== blockId)

      // Réorganiser les indices
      const reorderedSections = newSections.map((section, index) => ({
        ...section,
        order: index + 1,
      }))

      const newConfig = { ...config, sections: reorderedSections }
      updateConfig(newConfig)
    }
  }

  const getDefaultContentForTemplate = (template) => {
    switch (template) {
      case "hero":
        return {
          title: "Titre principal",
          description: "Description de votre service",
          buttonText: "Essayer maintenant",
          secondaryButtonText: "En savoir plus",
          showChatbot: true,
        }
      case "brand":
        return {
          title: "cAIre Solutions",
          subtitle: "AI-Powered Skincare",
          description:
            "Combining French luxury expertise with cutting-edge technology for personalized skincare consultations",
          image: "/images/beauty-cs.png",
        }
      case "about-us":
        return {
          title: "About Us",
          subtitle: "Meet Our Team",
          description:
            "Our team combines decades of experience in the French luxury beauty industry with cutting-edge AI expertise to create solutions that maintain the personalized, high-touch experience of in-store consultations in the digital realm.",
          ceo: {
            name: "Sophie Laurent",
            position: "CEO & Founder",
            bio: "With over 15 years of experience in the luxury beauty industry, Sophie founded cAIre Solutions with a vision to bridge the gap between traditional French skincare expertise and modern AI technology.",
            image: "/placeholder.svg?height=400&width=400",
          },
          team: [
            {
              name: "Jean Dupont",
              position: "CTO",
              bio: "Expert in AI and machine learning with a background in developing personalized recommendation systems.",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Marie Leclerc",
              position: "Head of Skincare Science",
              bio: "Dermatologist with extensive research experience in skincare formulations and ingredients.",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Alexandre Martin",
              position: "Head of Client Success",
              bio: "Luxury retail expert ensuring our clients receive the highest level of service and support.",
              image: "/placeholder.svg?height=200&width=200",
            },
          ],
        }
      case "features":
        return {
          title: "Nos fonctionnalités",
          description: "Découvrez ce que nous proposons",
          items: [
            { title: "Fonctionnalité 1", description: "Description de la fonctionnalité", icon: "Star" },
            { title: "Fonctionnalité 2", description: "Description de la fonctionnalité", icon: "Shield" },
            { title: "Fonctionnalité 3", description: "Description de la fonctionnalité", icon: "Heart" },
          ],
        }
      case "why-choose":
        return {
          title: "Why Choose cAIre",
          description:
            "Discover the advantages that make our AI-powered skincare solutions stand out from the competition.",
          reasons: [
            {
              title: "Luxury Expertise",
              description:
                "Built specifically for premium skincare brands with deep understanding of luxury market needs.",
              icon: "Award",
            },
            {
              title: "Brand Protection",
              description: "Our AI maintains your brand voice and positioning, ensuring consistent luxury experience.",
              icon: "Shield",
            },
            {
              title: "Quick Implementation",
              description: "Get up and running in weeks, not months, with our streamlined onboarding process.",
              icon: "Clock",
            },
          ],
        }
      // Ajoutez d'autres templates selon vos besoins
      default:
        return {}
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des blocs</h2>
        <Dialog open={showBlockLibrary} onOpenChange={setShowBlockLibrary}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un bloc
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Bibliothèque de blocs</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {availableBlocks.map((block) => (
                <Card
                  key={block.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => addNewBlock(block.template)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-full h-24 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                      <span className="text-gray-400">{block.name}</span>
                    </div>
                    <h3 className="font-medium">{block.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {sortedSections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center justify-between p-4 border rounded-md ${
                        section.visible ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div {...provided.dragHandleProps} className="cursor-move">
                          <Move className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className={section.visible ? "font-medium" : "font-medium text-gray-400"}>
                            {section.title}
                          </span>
                          <span className="text-xs text-gray-500">{section.template || "Section personnalisée"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSectionVisibility(section.id)}
                          title={section.visible ? "Masquer" : "Afficher"}
                        >
                          {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingBlock(section.id)}>
                          <Settings size={14} className="mr-1" /> Éditer
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteBlock(section.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingBlock && (
        <Dialog open={!!editingBlock} onOpenChange={(open) => !open && setEditingBlock(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Éditer le bloc</DialogTitle>
            </DialogHeader>
            <BlockEditor blockId={editingBlock} onClose={() => setEditingBlock(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

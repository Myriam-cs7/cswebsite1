"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Search } from "lucide-react"

export function MediaLibrary({ isOpen, onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [mediaItems, setMediaItems] = useState([
    { id: 1, url: "/images/logo.png", name: "Logo", type: "image" },
    { id: 2, url: "/images/serum.webp", name: "Serum", type: "image" },
    { id: 3, url: "/images/beauty-skincare.png", name: "Beauty Skincare", type: "image" },
    // Ajoutez d'autres éléments médias ici
  ])

  // Simuler le chargement des médias depuis une API
  useEffect(() => {
    // Dans une implémentation réelle, vous chargeriez les médias depuis votre API
    // fetch('/api/media').then(res => res.json()).then(data => setMediaItems(data))
  }, [])

  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    // Simuler un téléchargement
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setUploadProgress(0)

        // Simuler l'ajout du fichier à la bibliothèque
        const newMediaItems = [...mediaItems]

        Array.from(files).forEach((file, index) => {
          // Dans une implémentation réelle
          // vous téléchargeriez le fichier sur votre serveur et récupéreriez l'URL
          const fileUrl = URL.createObjectURL(file)

          newMediaItems.push({
            id: mediaItems.length + index + 1,
            url: fileUrl,
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : "file",
            size: file.size,
            uploadedAt: new Date().toISOString(),
          })
        })

        setMediaItems(newMediaItems)
        setActiveTab("browse")
      }
    }, 200)
  }

  const filteredMedia = mediaItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Bibliothèque de médias</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="browse">Parcourir</TabsTrigger>
            <TabsTrigger value="upload">Télécharger</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher des médias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 overflow-y-auto max-h-[400px] p-1">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-md overflow-hidden cursor-pointer hover:border-[#cfaa5c] transition-colors"
                    onClick={() => onSelect(item.url)}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      {item.type === "image" ? (
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 text-xs truncate">{item.name}</div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">Aucun média trouvé</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-10 w-10 text-gray-400" />
                <h3 className="font-medium">Déposez vos fichiers ici</h3>
                <p className="text-sm text-gray-500">ou</p>

                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="bg-[#cfaa5c] text-white px-4 py-2 rounded-md hover:bg-[#b89548] transition-colors">
                    Parcourir les fichiers
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                </Label>

                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF jusqu'à 10MB</p>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>T����������léchargement en cours...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#cfaa5c] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

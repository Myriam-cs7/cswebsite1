"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Globe } from "lucide-react"
import { FlagIcon } from "../flag-icons"

export function LanguageManager() {
  const [activeLanguage, setActiveLanguage] = useState("en")
  const [languages, setLanguages] = useState([
    { code: "en", name: "English", flag: "en" },
    { code: "fr", name: "Français", flag: "fr" },
  ])

  // Dans une implémentation réelle, vous chargeriez les traductions depuis votre API
  const [translations, setTranslations] = useState({
    en: {
      nav: {
        about: "About",
        features: "Features",
        benefits: "Benefits",
        pricing: "Pricing",
        blog: "Blog",
      },
      hero: {
        title: "Transform customer experience and build loyal relationships",
        description:
          "AI-powered skincare consultations that combine French luxury expertise with cutting-edge technology",
      },
      // Autres traductions...
    },
    fr: {
      nav: {
        about: "À propos",
        features: "Fonctionnalités",
        benefits: "Avantages",
        pricing: "Tarifs",
        blog: "Blog",
      },
      hero: {
        title: "Transformez l'expérience client et créez des relations fidèles",
        description:
          "Consultations de soins de la peau alimentées par l'IA qui combinent l'expertise du luxe français et la technologie de pointe",
      },
      // Autres traductions...
    },
  })

  const updateTranslation = (path, value) => {
    const pathArray = path.split(".")
    const newTranslations = { ...translations }

    let current = newTranslations[activeLanguage]
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {}
      }
      current = current[pathArray[i]]
    }

    current[pathArray[pathArray.length - 1]] = value
    setTranslations(newTranslations)
  }

  const handleSave = () => {
    // Dans une implémentation réelle, vous enverriez les traductions à votre API
    alert("Traductions enregistrées avec succès!")
  }

  const addNewLanguage = () => {
    const code = prompt("Entrez le code de la langue (ex: es, de, it):")
    if (!code) return

    const name = prompt("Entrez le nom de la langue (ex: Español, Deutsch, Italiano):")
    if (!name) return

    // Ajouter la nouvelle langue
    setLanguages([...languages, { code, name, flag: code }])

    // Créer un objet de traduction vide pour la nouvelle langue
    setTranslations({
      ...translations,
      [code]: { ...translations.en }, // Copier les traductions anglaises comme point de départ
    })

    // Activer la nouvelle langue
    setActiveLanguage(code)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des langues</h2>
        <Button onClick={addNewLanguage}>
          <Globe className="mr-2 h-4 w-4" /> Ajouter une langue
        </Button>
      </div>

      <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
        <TabsList>
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code} className="flex items-center gap-2">
              <FlagIcon code={lang.flag} className="w-4 h-4" />
              {lang.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Traductions pour la barre de navigation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`nav-about-${lang.code}`}>À propos</Label>
                    <Input
                      id={`nav-about-${lang.code}`}
                      value={translations[lang.code]?.nav?.about || ""}
                      onChange={(e) => updateTranslation("nav.about", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`nav-features-${lang.code}`}>Fonctionnalités</Label>
                    <Input
                      id={`nav-features-${lang.code}`}
                      value={translations[lang.code]?.nav?.features || ""}
                      onChange={(e) => updateTranslation("nav.features", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`nav-benefits-${lang.code}`}>Avantages</Label>
                    <Input
                      id={`nav-benefits-${lang.code}`}
                      value={translations[lang.code]?.nav?.benefits || ""}
                      onChange={(e) => updateTranslation("nav.benefits", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`nav-pricing-${lang.code}`}>Tarifs</Label>
                    <Input
                      id={`nav-pricing-${lang.code}`}
                      value={translations[lang.code]?.nav?.pricing || ""}
                      onChange={(e) => updateTranslation("nav.pricing", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`nav-blog-${lang.code}`}>Blog</Label>
                    <Input
                      id={`nav-blog-${lang.code}`}
                      value={translations[lang.code]?.nav?.blog || ""}
                      onChange={(e) => updateTranslation("nav.blog", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section Héro</CardTitle>
                <CardDescription>Traductions pour la section principale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`hero-title-${lang.code}`}>Titre</Label>
                  <Input
                    id={`hero-title-${lang.code}`}
                    value={translations[lang.code]?.hero?.title || ""}
                    onChange={(e) => updateTranslation("hero.title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`hero-description-${lang.code}`}>Description</Label>
                  <Textarea
                    id={`hero-description-${lang.code}`}
                    value={translations[lang.code]?.hero?.description || ""}
                    onChange={(e) => updateTranslation("hero.description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ajoutez d'autres sections de traduction selon vos besoins */}

            <div className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Enregistrer les traductions
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

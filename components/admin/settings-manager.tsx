"use client"

import { useState } from "react"
import { useSiteConfig } from "../site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export function SettingsManager() {
  const { config, updateConfig } = useSiteConfig()
  const [settings, setSettings] = useState({
    siteName: config.siteName || "cAIre Solutions",
    siteDescription: config.siteDescription || "AI-powered skincare consultations",
    contactEmail: config.contactEmail || "contact@caire-solutions.com",
    contactPhone: config.contactPhone || "+33 1 23 45 67 89",
    contactAddress: config.contactAddress || "Paris, France",
    socialLinks: config.socialLinks || {
      linkedin: "https://linkedin.com/company/caire-solutions",
      instagram: "https://instagram.com/caire_solutions",
      twitter: "https://twitter.com/caire_solutions",
      tiktok: "https://tiktok.com/@caire_solutions",
    },
    seo: config.seo || {
      title: "cAIre Solutions | AI-powered Skincare Consultations",
      description: "AI-powered skincare consultations combining French luxury expertise with cutting-edge technology",
      keywords: "AI, skincare, luxury, consultations, beauty tech",
      ogImage: "/images/og-image.jpg",
    },
    analytics: config.analytics || {
      googleAnalyticsId: "",
      facebookPixelId: "",
      enabledAnalytics: false,
    },
  })

  const handleSave = () => {
    const newConfig = { ...config, ...settings }
    updateConfig(newConfig)
    alert("Paramètres enregistrés avec succès!")
  }

  const updateSetting = (path, value) => {
    const pathArray = path.split(".")
    const newSettings = { ...settings }

    let current = newSettings
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]]
    }

    current[pathArray[pathArray.length - 1]] = value
    setSettings(newSettings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>Configurez les informations de base de votre site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Nom du site</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => updateSetting("siteName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Description du site</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => updateSetting("siteDescription", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations de contact</CardTitle>
          <CardDescription>Configurez les coordonnées affichées sur votre site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={settings.contactEmail}
              onChange={(e) => updateSetting("contactEmail", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Téléphone</Label>
            <Input
              id="contactPhone"
              value={settings.contactPhone}
              onChange={(e) => updateSetting("contactPhone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactAddress">Adresse</Label>
            <Input
              id="contactAddress"
              value={settings.contactAddress}
              onChange={(e) => updateSetting("contactAddress", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Réseaux sociaux</CardTitle>
          <CardDescription>Configurez les liens vers vos réseaux sociaux</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={settings.socialLinks.linkedin}
              onChange={(e) => updateSetting("socialLinks.linkedin", e.target.value)}
              placeholder="https://linkedin.com/company/votre-entreprise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={settings.socialLinks.instagram}
              onChange={(e) => updateSetting("socialLinks.instagram", e.target.value)}
              placeholder="https://instagram.com/votre_compte"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">X (anciennement Twitter)</Label>
            <Input
              id="twitter"
              value={settings.socialLinks.twitter}
              onChange={(e) => updateSetting("socialLinks.twitter", e.target.value)}
              placeholder="https://x.com/votre_compte"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              value={settings.socialLinks.tiktok}
              onChange={(e) => updateSetting("socialLinks.tiktok", e.target.value)}
              placeholder="https://tiktok.com/@votre_compte"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
          <CardDescription>Optimisez votre site pour les moteurs de recherche</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">Titre SEO</Label>
            <Input
              id="seoTitle"
              value={settings.seo.title}
              onChange={(e) => updateSetting("seo.title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">Description SEO</Label>
            <Textarea
              id="seoDescription"
              value={settings.seo.description}
              onChange={(e) => updateSetting("seo.description", e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoKeywords">Mots-clés (séparés par des virgules)</Label>
            <Input
              id="seoKeywords"
              value={settings.seo.keywords}
              onChange={(e) => updateSetting("seo.keywords", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogImage">Image Open Graph</Label>
            <Input
              id="ogImage"
              value={settings.seo.ogImage}
              onChange={(e) => updateSetting("seo.ogImage", e.target.value)}
              placeholder="/images/og-image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytique</CardTitle>
          <CardDescription>Configurez les outils d'analyse pour suivre les performances de votre site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="enableAnalytics"
              checked={settings.analytics.enabledAnalytics}
              onCheckedChange={(checked) => updateSetting("analytics.enabledAnalytics", checked)}
            />
            <Label htmlFor="enableAnalytics">Activer l'analytique</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleAnalyticsId">ID Google Analytics</Label>
            <Input
              id="googleAnalyticsId"
              value={settings.analytics.googleAnalyticsId}
              onChange={(e) => updateSetting("analytics.googleAnalyticsId", e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebookPixelId">ID Facebook Pixel</Label>
            <Input
              id="facebookPixelId"
              value={settings.analytics.facebookPixelId}
              onChange={(e) => updateSetting("analytics.facebookPixelId", e.target.value)}
              placeholder="XXXXXXXXXX"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
        </Button>
      </div>
    </div>
  )
}

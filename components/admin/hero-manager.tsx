"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Check } from "lucide-react"
import { type HeroContent } from "@/lib/site-data"

interface HeroManagerProps {
  hero: HeroContent
  onUpdate: (hero: HeroContent) => void
}

export function HeroManager({ hero, onUpdate }: HeroManagerProps) {
  const [formData, setFormData] = useState<HeroContent>(hero)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFormData(hero)
  }, [hero])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ana Sayfa İçeriği</h1>
        <p className="text-muted-foreground">Hero bölümündeki metinleri düzenleyin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Bölümü</CardTitle>
          <CardDescription>
            Ana sayfanın üst kısmında görüntülenen başlık ve alt başlık
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Ana Başlık</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ana başlık metni"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Alt Başlık</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Alt başlık açıklaması"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaText">Ana Buton Metni</Label>
                <Input
                  id="ctaText"
                  value={formData.ctaText}
                  onChange={(e) => setFormData(prev => ({ ...prev, ctaText: e.target.value }))}
                  placeholder="Ürünleri Keşfet"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaSecondaryText">İkinci Buton Metni</Label>
                <Input
                  id="ctaSecondaryText"
                  value={formData.ctaSecondaryText}
                  onChange={(e) => setFormData(prev => ({ ...prev, ctaSecondaryText: e.target.value }))}
                  placeholder="İletişime Geç"
                />
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              {saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Kaydedildi
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Değişiklikleri Kaydet
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

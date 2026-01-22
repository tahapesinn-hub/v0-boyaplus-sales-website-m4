"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Check } from "lucide-react"
import { type SeoMeta } from "@/lib/site-data"

interface SeoManagerProps {
  seo: SeoMeta
  onUpdate: (seo: SeoMeta) => void
}

export function SeoManager({ seo, onUpdate }: SeoManagerProps) {
  const [formData, setFormData] = useState<SeoMeta>(seo)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFormData(seo)
  }, [seo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">SEO Ayarları</h1>
        <p className="text-muted-foreground">Sitenin arama motoru optimizasyonu ayarları</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meta Bilgileri</CardTitle>
          <CardDescription>
            Google ve diğer arama motorlarında görüntülenen bilgiler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Sayfa Başlığı (Title)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Boyaplus | Premium Türk Boya Markası"
              />
              <p className="text-xs text-muted-foreground">
                Tarayıcı sekmesinde ve arama sonuçlarında görünür. Önerilen: 50-60 karakter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Açıklama (Description)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Site açıklaması"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Arama sonuçlarında başlık altında görünür. Önerilen: 150-160 karakter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Anahtar Kelimeler</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="boya, türk boya, iç cephe, dış cephe"
              />
              <p className="text-xs text-muted-foreground">
                Virgülle ayırarak yazın
              </p>
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

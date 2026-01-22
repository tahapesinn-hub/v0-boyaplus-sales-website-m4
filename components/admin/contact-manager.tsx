"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Check } from "lucide-react"
import { type ContactInfo } from "@/lib/site-data"

interface ContactManagerProps {
  contact: ContactInfo
  onUpdate: (contact: ContactInfo) => void
}

export function ContactManager({ contact, onUpdate }: ContactManagerProps) {
  const [formData, setFormData] = useState<ContactInfo>(contact)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFormData(contact)
  }, [contact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">İletişim Bilgileri</h1>
        <p className="text-muted-foreground">İletişim sayfasındaki bilgileri düzenleyin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İletişim Detayları</CardTitle>
          <CardDescription>
            Telefon, e-posta, adres ve WhatsApp bilgileri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+90 555 123 45 67"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Numarası (Ülke kodu ile)</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="905551234567"
                />
                <p className="text-xs text-muted-foreground">
                  Başında + olmadan, sadece rakamlarla yazın
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="info@boyaplus.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Tam adres"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Çalışma Saatleri</Label>
              
              <div className="space-y-2">
                <Label htmlFor="weekdays" className="text-sm font-normal text-muted-foreground">
                  Hafta içi
                </Label>
                <Input
                  id="weekdays"
                  value={formData.workingHours.weekdays}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, weekdays: e.target.value }
                  }))}
                  placeholder="Pazartesi - Cuma: 08:00 - 18:00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="saturday" className="text-sm font-normal text-muted-foreground">
                  Cumartesi
                </Label>
                <Input
                  id="saturday"
                  value={formData.workingHours.saturday}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, saturday: e.target.value }
                  }))}
                  placeholder="Cumartesi: 09:00 - 14:00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sunday" className="text-sm font-normal text-muted-foreground">
                  Pazar
                </Label>
                <Input
                  id="sunday"
                  value={formData.workingHours.sunday}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, sunday: e.target.value }
                  }))}
                  placeholder="Pazar: Kapalı"
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

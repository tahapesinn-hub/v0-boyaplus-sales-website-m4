"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Paintbrush, Home, Droplets, Shield, Palette } from "lucide-react"

interface Service {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  features: string[]
  is_active: boolean
  sort_order: number
}

const iconMap: Record<string, React.ElementType> = {
  Paintbrush,
  Home,
  Droplets,
  Shield,
  Palette,
}

const emptyService = {
  name: "",
  slug: "",
  description: "",
  icon: "Paintbrush",
  features: [] as string[],
  is_active: true,
  sort_order: 0,
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState(emptyService)
  const [featuresInput, setFeaturesInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services")
      const data = await res.json()
      setServices(Array.isArray(data) ? data : [])
    } catch {
      setServices([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ı/g, "i")
      .replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }

  const handleOpenCreate = () => {
    setEditingService(null)
    setFormData({ ...emptyService, sort_order: services.length })
    setFeaturesInput("")
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      features: service.features || [],
      is_active: service.is_active,
      sort_order: service.sort_order,
    })
    setFeaturesInput((service.features || []).join(", "))
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const features = featuresInput.split(",").map((f) => f.trim()).filter(Boolean)
    const slug = formData.slug || generateSlug(formData.name)

    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingService ? "update" : "create",
          id: editingService?.id,
          ...formData,
          slug,
          features,
        }),
      })
      await fetchServices()
      setIsDialogOpen(false)
    } catch {
      alert("Bir hata olustu")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediginize emin misiniz?")) return
    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      })
      await fetchServices()
    } catch {
      alert("Silme islemi basarisiz")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Hizmet Yonetimi</h1>
          <p className="text-sm text-muted-foreground">Sundugunuz hizmetleri yonetin</p>
        </div>
        <Button onClick={handleOpenCreate} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Hizmet
        </Button>
      </div>

      <div className="grid gap-4">
        {services.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Henuz hizmet eklenmemis. Yeni bir hizmet ekleyerek baslayabilirsiniz.
            </CardContent>
          </Card>
        ) : (
          services.map((service) => {
            const IconComp = iconMap[service.icon] || Paintbrush
            return (
              <Card key={service.id}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground text-sm sm:text-base">{service.name}</h3>
                          {!service.is_active && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Pasif</span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                        {service.features && service.features.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {service.features.slice(0, 3).map((f, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{f}</span>
                            ))}
                            {service.features.length > 3 && (
                              <span className="text-xs bg-muted px-2 py-1 rounded">+{service.features.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 self-end sm:self-start">
                      <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleOpenEdit(service)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{editingService ? "Hizmet Duzenle" : "Yeni Hizmet Ekle"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="svc-name">Hizmet Adi *</Label>
              <Input
                id="svc-name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ornek: Ic Cephe Boyama"
                className="text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-slug">URL Slug</Label>
              <Input
                id="svc-slug"
                value={formData.slug}
                onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                placeholder="Otomatik olusturulur"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-desc">Aciklama *</Label>
              <Textarea
                id="svc-desc"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Hizmet aciklamasi"
                rows={3}
                className="text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-icon">Ikon</Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(iconMap).map(([key, Icon]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, icon: key }))}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      formData.icon === key
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="svc-features">Ozellikler (virgul ile ayirin)</Label>
              <Input
                id="svc-features"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Ozellik 1, Ozellik 2, Ozellik 3"
                className="text-base"
              />
            </div>
            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="svc-active"
                checked={formData.is_active}
                onChange={(e) => setFormData((p) => ({ ...p, is_active: e.target.checked }))}
                className="rounded w-5 h-5"
              />
              <Label htmlFor="svc-active" className="text-base">Aktif</Label>
            </div>
            <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                Iptal
              </Button>
              <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? "Kaydediliyor..." : editingService ? "Guncelle" : "Ekle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

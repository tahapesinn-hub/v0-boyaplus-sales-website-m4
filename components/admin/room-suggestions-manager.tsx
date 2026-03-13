"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, GripVertical, Home, Sofa, UtensilsCrossed, Bed, Bath, Briefcase, Building2, Palette, X } from "lucide-react"

interface RoomSuggestion {
  id: string
  room_name: string
  slug: string
  description: string
  color_suggestions: string[]
  button_text: string
  button_link: string
  icon: string
  sort_order: number
  is_active: boolean
}

const ICONS = [
  { name: "Home", icon: Home },
  { name: "Sofa", icon: Sofa },
  { name: "UtensilsCrossed", icon: UtensilsCrossed },
  { name: "Bed", icon: Bed },
  { name: "Bath", icon: Bath },
  { name: "Briefcase", icon: Briefcase },
  { name: "Building2", icon: Building2 },
  { name: "Palette", icon: Palette },
]

const getIconComponent = (iconName: string) => {
  const found = ICONS.find(i => i.name === iconName)
  return found ? found.icon : Home
}

export function RoomSuggestionsManager() {
  const [rooms, setRooms] = useState<RoomSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<RoomSuggestion | null>(null)
  const [newColorInput, setNewColorInput] = useState("")
  
  const [formData, setFormData] = useState({
    room_name: "",
    description: "",
    color_suggestions: [] as string[],
    button_text: "Detaylari Gor",
    button_link: "/blog",
    icon: "Home",
    is_active: true,
  })

  useEffect(() => {
    fetchRooms()
  }, [])

  async function fetchRooms() {
    try {
      // Admin icin tum kayitlari getir (aktif ve pasif)
      const res = await fetch("/api/room-suggestions?all=true")
      const data = await res.json()
      // API { section, rooms } formatinda donuyor
      const roomsArray = data.rooms || data
      setRooms(Array.isArray(roomsArray) ? roomsArray : [])
    } catch {
      setRooms([])
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      room_name: "",
      description: "",
      color_suggestions: [],
      button_text: "Detaylari Gor",
      button_link: "/blog",
      icon: "Home",
      is_active: true,
    })
    setEditingRoom(null)
    setNewColorInput("")
  }

  function openEditDialog(room: RoomSuggestion) {
    setEditingRoom(room)
    setFormData({
      room_name: room.room_name,
      description: room.description,
      color_suggestions: room.color_suggestions || [],
      button_text: room.button_text,
      button_link: room.button_link,
      icon: room.icon,
      is_active: room.is_active,
    })
    setIsDialogOpen(true)
  }

  function addColor() {
    if (newColorInput.trim() && !formData.color_suggestions.includes(newColorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        color_suggestions: [...prev.color_suggestions, newColorInput.trim()]
      }))
      setNewColorInput("")
    }
  }

  function removeColor(color: string) {
    setFormData(prev => ({
      ...prev,
      color_suggestions: prev.color_suggestions.filter(c => c !== color)
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const slug = formData.room_name
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

    const body = {
      ...formData,
      slug,
      sort_order: editingRoom?.sort_order || rooms.length + 1,
    }

    try {
      if (editingRoom) {
        await fetch("/api/room-suggestions", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingRoom.id, ...body }),
        })
      } else {
        await fetch("/api/room-suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      
      fetchRooms()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Kaydetme hatasi:", error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu mekan onerisini silmek istediginize emin misiniz?")) return
    
    try {
      await fetch(`/api/room-suggestions?id=${id}`, {
        method: "DELETE",
      })
      fetchRooms()
    } catch (error) {
      console.error("Silme hatasi:", error)
    }
  }

  async function toggleActive(room: RoomSuggestion) {
    try {
      await fetch("/api/room-suggestions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: room.id, is_active: !room.is_active }),
      })
      fetchRooms()
    } catch (error) {
      console.error("Guncelleme hatasi:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Mekana Gore Renk Onerileri</h2>
          <p className="text-sm text-muted-foreground">
            Ana sayfada gorunecek mekan ve renk onerilerini yonetin
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Yeni Mekan Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRoom ? "Mekan Duznenle" : "Yeni Mekan Ekle"}
              </DialogTitle>
              <DialogDescription>
                Mekan bilgilerini ve renk onerilerini girin
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room_name">Mekan Adi</Label>
                <Input
                  id="room_name"
                  value={formData.room_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, room_name: e.target.value }))}
                  placeholder="Ornek: Salon"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Aciklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Bu mekan icin renk onerileri hakkinda kisa aciklama"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Renk Onerileri</Label>
                <div className="flex gap-2">
                  <Input
                    value={newColorInput}
                    onChange={(e) => setNewColorInput(e.target.value)}
                    placeholder="Renk adi ekle"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                  />
                  <Button type="button" variant="outline" onClick={addColor}>
                    Ekle
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.color_suggestions.map((color, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1 pr-1">
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="ml-1 hover:bg-muted rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Ikon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICONS.map((icon) => {
                        const IconComp = icon.icon
                        return (
                          <SelectItem key={icon.name} value={icon.name}>
                            <div className="flex items-center gap-2">
                              <IconComp className="w-4 h-4" />
                              {icon.name}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="button_text">Buton Metni</Label>
                  <Input
                    id="button_text"
                    value={formData.button_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="button_link">Buton Linki</Label>
                <Input
                  id="button_link"
                  value={formData.button_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, button_link: e.target.value }))}
                  placeholder="/blog"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingRoom ? "Guncelle" : "Ekle"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Iptal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Room Cards */}
      <div className="grid gap-4">
        {rooms.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Palette className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Henuz mekan onerisi yok</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Ilk mekan onerinizi ekleyerek baslayın
              </p>
            </CardContent>
          </Card>
        ) : (
          rooms.map((room) => {
            const IconComp = getIconComponent(room.icon)
            return (
              <Card key={room.id} className={!room.is_active ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="w-5 h-5 cursor-grab" />
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{room.room_name}</h3>
                        {!room.is_active && (
                          <Badge variant="secondary" className="text-xs">Pasif</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {room.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(room.color_suggestions || []).map((color, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={room.is_active}
                        onCheckedChange={() => toggleActive(room)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(room)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(room.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

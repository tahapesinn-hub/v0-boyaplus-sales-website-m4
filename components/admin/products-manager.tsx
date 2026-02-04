"use client"

import React from "react"
import { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, ImagePlus, X, GripVertical } from "lucide-react"
import type { Product, Category } from "@/lib/site-data"

interface ProductsManagerProps {
  products: Product[]
  categories: Category[]
  onAdd: (product: Product) => void
  onUpdate: (id: string, product: Product) => void
  onDelete: (id: string) => void
}

const MAX_IMAGES = 10

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  slug: "",
  category: "İç Cephe Boyaları",
  categorySlug: "ic-cephe",
  description: "",
  features: [],
  coverage: "",
  dryingTime: "",
  price: "",
  colors: [],
  images: [],
}

export function ProductsManager({ products, categories, onAdd, onUpdate, onDelete }: ProductsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Omit<Product, "id">>(emptyProduct)
  const [featuresInput, setFeaturesInput] = useState("")
  const [colorsInput, setColorsInput] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")

  const resetForm = () => {
    setFormData(emptyProduct)
    setFeaturesInput("")
    setColorsInput("")
    setNewImageUrl("")
    setEditingProduct(null)
  }

  const handleOpenCreate = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    // Eski image alanını images'a dönüştür
    const existingImages = product.images || (product.image ? [product.image] : [])
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      categorySlug: product.categorySlug,
      description: product.description,
      features: product.features,
      coverage: product.coverage,
      dryingTime: product.dryingTime,
      price: product.price,
      colors: product.colors || [],
      images: existingImages,
    })
    setFeaturesInput(product.features.join(", "))
    setColorsInput((product.colors || []).join(", "))
    setNewImageUrl("")
    setIsDialogOpen(true)
  }

  const handleCategoryChange = (categorySlug: string) => {
    const category = categories.find(c => c.slug === categorySlug)
    if (category && category.slug !== "tumu") {
      setFormData(prev => ({
        ...prev,
        category: category.name,
        categorySlug: category.slug,
      }))
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ğ/g, "g")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return
    if ((formData.images || []).length >= MAX_IMAGES) {
      alert(`En fazla ${MAX_IMAGES} görsel ekleyebilirsiniz.`)
      return
    }
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl.trim()],
    }))
    setNewImageUrl("")
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }))
  }

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const images = [...(formData.images || [])]
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= images.length) return
    [images[index], images[newIndex]] = [images[newIndex], images[index]]
    setFormData(prev => ({ ...prev, images }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const features = featuresInput.split(",").map(f => f.trim()).filter(Boolean)
    const colors = colorsInput.split(",").map(c => c.trim()).filter(Boolean)
    
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      ...formData,
      slug: formData.slug || generateSlug(formData.name),
      features,
      colors,
      image: formData.images?.[0] || "", // Geriye uyumluluk için ilk görseli image'a da ata
    }

    if (editingProduct) {
      onUpdate(editingProduct.id, productData)
    } else {
      onAdd(productData)
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      onDelete(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ürün Yönetimi</h1>
          <p className="text-muted-foreground">Ürünlerinizi ekleyin, düzenleyin veya silin</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ürün Ekle
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Ürün görseli */}
                {(product.images?.[0] || product.image) && (
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={product.images?.[0] || product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.style.display = "none"
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.colors.slice(0, 3).map((color, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{color}</span>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    )}
                    {(product.images?.length || 0) > 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {product.images?.length} görsel
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleOpenEdit(product)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ürün Adı *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ürün adını girin"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="Otomatik oluşturulur"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select value={formData.categorySlug} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.slug !== "tumu").map((cat) => (
                      <SelectItem key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Fiyat</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Örn: 250 TL veya Teklif alın"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ürün açıklaması"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coverage">Verim</Label>
                <Input
                  id="coverage"
                  value={formData.coverage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverage: e.target.value }))}
                  placeholder="Örn: 10-12 m²/L"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dryingTime">Kuruma Süresi</Label>
                <Input
                  id="dryingTime"
                  value={formData.dryingTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, dryingTime: e.target.value }))}
                  placeholder="Örn: 2-4 saat"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Özellikler (virgülle ayırın)</Label>
              <Input
                id="features"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Özellik 1, Özellik 2, Özellik 3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="colors">Renkler (virgülle ayırın)</Label>
              <Input
                id="colors"
                value={colorsInput}
                onChange={(e) => setColorsInput(e.target.value)}
                placeholder="Beyaz, Krem, Gri"
              />
            </div>

            {/* Çoklu Görsel Yönetimi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Görseller (Maks. {MAX_IMAGES})</Label>
                <span className="text-sm text-muted-foreground">
                  {(formData.images || []).length} / {MAX_IMAGES}
                </span>
              </div>
              
              {/* Görsel Ekleme */}
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Görsel URL'si girin (https://...)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddImage()
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddImage}
                  disabled={(formData.images || []).length >= MAX_IMAGES}
                >
                  <ImagePlus className="w-4 h-4" />
                </Button>
              </div>

              {/* Mevcut Görseller */}
              {(formData.images || []).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(formData.images || []).map((img, index) => (
                    <div 
                      key={index} 
                      className="relative group aspect-square rounded-lg overflow-hidden bg-muted border border-border"
                    >
                      <img 
                        src={img} 
                        alt={`Görsel ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23999' strokeWidth='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E"
                        }}
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                          Ana
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {index > 0 && (
                          <Button 
                            type="button" 
                            size="icon" 
                            variant="secondary" 
                            className="h-7 w-7"
                            onClick={() => handleMoveImage(index, "up")}
                          >
                            <GripVertical className="w-3 h-3 rotate-90" />
                          </Button>
                        )}
                        <Button 
                          type="button" 
                          size="icon" 
                          variant="destructive" 
                          className="h-7 w-7"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        {index < (formData.images || []).length - 1 && (
                          <Button 
                            type="button" 
                            size="icon" 
                            variant="secondary" 
                            className="h-7 w-7"
                            onClick={() => handleMoveImage(index, "down")}
                          >
                            <GripVertical className="w-3 h-3 -rotate-90" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                İlk görsel ana görsel olarak kullanılır. Görselleri sürükleyerek sıralayabilirsiniz.
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">
                {editingProduct ? "Güncelle" : "Ekle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

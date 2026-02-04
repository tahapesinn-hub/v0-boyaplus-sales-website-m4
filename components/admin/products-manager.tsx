"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Product, Category } from "@/lib/site-data"

interface ProductsManagerProps {
  products: Product[]
  categories: Category[]
  onAdd: (product: Product) => void
  onUpdate: (id: string, product: Product) => void
  onDelete: (id: string) => void
}

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
  image: "",
}

export function ProductsManager({ products, categories, onAdd, onUpdate, onDelete }: ProductsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Omit<Product, "id">>(emptyProduct)
  const [featuresInput, setFeaturesInput] = useState("")
  const [colorsInput, setColorsInput] = useState("")

  const resetForm = () => {
    setFormData(emptyProduct)
    setFeaturesInput("")
    setColorsInput("")
    setEditingProduct(null)
  }

  const handleOpenCreate = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
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
      image: product.image || "",
    })
    setFeaturesInput(product.features.join(", "))
    setColorsInput((product.colors || []).join(", "))
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
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.colors.map((color, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{color}</span>
                      ))}
                    </div>
                  )}
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

            <div className="space-y-2">
              <Label htmlFor="image">Görsel URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://..."
              />
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

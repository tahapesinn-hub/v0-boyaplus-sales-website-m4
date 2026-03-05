"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus, Save, Trash2, Globe, FileText, ShoppingBag, Check, BookOpen, Wrench } from "lucide-react"

interface SeoPage {
  id: string
  page_type: "page" | "product" | "blog" | "service"
  page_key: string
  page_label: string
  title: string
  meta_description: string
  keywords: string
  h1: string
  h2: string
  canonical_url: string
  robots: string
  include_sitemap: boolean
  updated_at: string
}

type SeoForm = Omit<SeoPage, "id" | "updated_at">

const emptyForm: SeoForm = {
  page_type: "page",
  page_key: "",
  page_label: "",
  title: "",
  meta_description: "",
  keywords: "",
  h1: "",
  h2: "",
  canonical_url: "",
  robots: "index",
  include_sitemap: true,
}

export function SeoManager() {
  const [pages, setPages] = useState<SeoPage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"all" | "page" | "product" | "blog" | "service">("all")
  const [selectedPage, setSelectedPage] = useState<SeoPage | null>(null)
  const [form, setForm] = useState<SeoForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [newForm, setNewForm] = useState<SeoForm>(emptyForm)
  const [successMsg, setSuccessMsg] = useState("")

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch("/api/seo")
      const data = await res.json()
      if (Array.isArray(data)) setPages(data)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  useEffect(() => {
    if (selectedPage) {
      setForm({
        page_type: selectedPage.page_type,
        page_key: selectedPage.page_key,
        page_label: selectedPage.page_label,
        title: selectedPage.title || "",
        meta_description: selectedPage.meta_description || "",
        keywords: selectedPage.keywords || "",
        h1: selectedPage.h1 || "",
        h2: selectedPage.h2 || "",
        canonical_url: selectedPage.canonical_url || "",
        robots: selectedPage.robots || "index",
        include_sitemap: selectedPage.include_sitemap ?? true,
      })
    }
  }, [selectedPage])

  const filtered = pages.filter((p) => {
    const matchSearch =
      p.page_label.toLowerCase().includes(search.toLowerCase()) ||
      p.page_key.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === "all" || p.page_type === filterType
    return matchSearch && matchType
  })

  const handleSave = async () => {
    if (!selectedPage) return
    setSaving(true)
    try {
      await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedPage.id, ...form }),
      })
      setSuccessMsg("SEO ayarlari kaydedildi!")
      setTimeout(() => setSuccessMsg(""), 3000)
      await fetchPages()
      setSelectedPage((prev) =>
        prev ? { ...prev, ...form, updated_at: new Date().toISOString() } : null
      )
    } catch {
      /* ignore */
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = async () => {
    if (!newForm.page_key || !newForm.page_label) return
    try {
      await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      })
      setAddOpen(false)
      setNewForm(emptyForm)
      await fetchPages()
    } catch {
      /* ignore */
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu SEO kaydini silmek istediginize emin misiniz?")) return
    try {
      await fetch("/api/seo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (selectedPage?.id === id) setSelectedPage(null)
      await fetchPages()
    } catch {
      /* ignore */
    }
  }

  const descLength = form.meta_description?.length || 0
  const titleLength = form.title?.length || 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SEO Yonetimi</h1>
          <p className="text-sm text-muted-foreground">
            Sayfa ve urun SEO ayarlarini duzenleyin, sitemap kontrolu yapin.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Sayfa Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni SEO Sayfasi Ekle</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Label>Sayfa Tipi</Label>
                <Select
                  value={newForm.page_type}
                  onValueChange={(v) =>
                    setNewForm({ ...newForm, page_type: v as "page" | "product" | "blog" | "service" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Sayfa</SelectItem>
                    <SelectItem value="product">Urun</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="service">Hizmet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>URL Yolu (orn: /urunler/boya-adi)</Label>
                <Input
                  value={newForm.page_key}
                  onChange={(e) => setNewForm({ ...newForm, page_key: e.target.value })}
                  placeholder="/urunler/boya-adi"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Sayfa Etiketi</Label>
                <Input
                  value={newForm.page_label}
                  onChange={(e) => setNewForm({ ...newForm, page_label: e.target.value })}
                  placeholder="Boya Adi Detay"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Sayfa Basligi (Title)</Label>
                <Input
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="Sayfa Basligi | Boyaplus"
                />
              </div>
              <Button onClick={handleAdd}>Ekle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Sayfa ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tum Sayfalar</SelectItem>
            <SelectItem value="page">Sayfalar</SelectItem>
            <SelectItem value="product">Urunler</SelectItem>
            <SelectItem value="blog">Blog Yazilari</SelectItem>
            <SelectItem value="service">Hizmetler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-700 text-sm">
          <Check className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page List */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {filtered.length} sayfa bulundu
          </p>
          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => setSelectedPage(page)}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                  selectedPage?.id === page.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                {page.page_type === "page" && (
                  <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                )}
                {page.page_type === "product" && (
                  <ShoppingBag className="w-4 h-4 text-orange-500 shrink-0" />
                )}
                {page.page_type === "blog" && (
                  <BookOpen className="w-4 h-4 text-green-500 shrink-0" />
                )}
                {page.page_type === "service" && (
                  <Wrench className="w-4 h-4 text-purple-500 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{page.page_label}</p>
                  <p className="text-xs text-muted-foreground truncate">{page.page_key}</p>
                </div>
                {page.robots === "noindex" && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 shrink-0">
                    noindex
                  </span>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">Sayfa bulunamadi.</p>
            )}
          </div>
        </div>

        {/* Edit Panel */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-lg">{selectedPage.page_label}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedPage.page_key}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(selectedPage.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <Label>Sayfa Basligi (Title Tag)</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Sayfa Basligi | Boyaplus"
                  />
                  <p className={`text-xs ${titleLength > 60 ? "text-red-500" : "text-muted-foreground"}`}>
                    {titleLength}/60 karakter (Onerilen: 50-60)
                  </p>
                </div>

                {/* Meta Description */}
                <div className="flex flex-col gap-2">
                  <Label>Meta Aciklama</Label>
                  <Textarea
                    value={form.meta_description}
                    onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                    placeholder="Sayfa hakkinda kisa aciklama..."
                    rows={3}
                  />
                  <p className={`text-xs ${descLength > 160 ? "text-red-500" : "text-muted-foreground"}`}>
                    {descLength}/160 karakter (Onerilen: 120-160)
                  </p>
                </div>

                {/* Keywords */}
                <div className="flex flex-col gap-2">
                  <Label>Anahtar Kelimeler</Label>
                  <Input
                    value={form.keywords}
                    onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                    placeholder="boya, ic cephe, dis cephe, boyaplus"
                  />
                  <p className="text-xs text-muted-foreground">Virgul ile ayirin</p>
                </div>

                {/* H1 & H2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>H1 Basligi</Label>
                    <Input
                      value={form.h1}
                      onChange={(e) => setForm({ ...form, h1: e.target.value })}
                      placeholder="Ana baslik"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>H2 Basligi</Label>
                    <Input
                      value={form.h2}
                      onChange={(e) => setForm({ ...form, h2: e.target.value })}
                      placeholder="Alt baslik"
                    />
                  </div>
                </div>

                {/* Canonical URL */}
                <div className="flex flex-col gap-2">
                  <Label>Canonical URL</Label>
                  <Input
                    value={form.canonical_url}
                    onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                    placeholder="https://boyaplus.com/urunler"
                  />
                </div>

                {/* Robots & Sitemap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Robots</Label>
                    <Select
                      value={form.robots}
                      onValueChange={(v) => setForm({ ...form, robots: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index">{"index (Google tarasin)"}</SelectItem>
                        <SelectItem value="noindex">{"noindex (Google taramasin)"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Sitemap</Label>
                    <Select
                      value={form.include_sitemap ? "yes" : "no"}
                      onValueChange={(v) => setForm({ ...form, include_sitemap: v === "yes" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{"Sitemap'e dahil et"}</SelectItem>
                        <SelectItem value="no">{"Sitemap'ten cikar"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Google Preview */}
                <div className="flex flex-col gap-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Google Onizleme
                  </Label>
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <p className="text-blue-600 text-lg leading-tight truncate">
                      {form.title || "Sayfa Basligi"}
                    </p>
                    <p className="text-green-700 text-sm truncate">
                      {"boyaplus.com"}{selectedPage.page_key}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {form.meta_description || "Meta aciklama buraya gelecek..."}
                    </p>
                  </div>
                </div>

                {/* Save */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Son guncelleme:{" "}
                    {selectedPage.updated_at
                      ? new Date(selectedPage.updated_at).toLocaleString("tr-TR")
                      : "-"}
                  </p>
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Globe className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <h3 className="text-lg font-medium text-foreground">Sayfa Secin</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sol taraftan bir sayfa secerek SEO ayarlarini duzenleyin.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

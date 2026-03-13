"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, Pencil, Trash2, Eye, EyeOff, Save, Search, 
  FileText, Clock, Calendar, Tag, FolderPlus,
  Bold, Italic, Heading1, Heading2, List, Link as LinkIcon
} from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  read_time: number
  image_url?: string
  is_published: boolean
  created_at: string
}

interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  is_active: boolean
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Genel",
  author: "Boyaplus Uzman Ekibi",
  read_time: 5,
  image_url: "",
  is_published: false,
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "", color: "#3b82f6" })
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("posts")

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog")
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/blog/categories")
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch {
      setCategories([])
    }
  }, [])

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [fetchPosts, fetchCategories])

  // Istatistikler
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.is_published).length,
    draft: posts.filter(p => !p.is_published).length,
    categories: categories.length,
  }

  // Filtreleme
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || post.category === filterCategory
    const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "published" && post.is_published) ||
                          (filterStatus === "draft" && !post.is_published)
    return matchesSearch && matchesCategory && matchesStatus
  })

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }

  function calculateReadTime(content: string) {
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  }

  function openCreateDialog() {
    setEditingPost(null)
    setForm({ ...emptyForm, category: categories[0]?.name || "Genel" })
    setIsDialogOpen(true)
  }

  function openEditDialog(post: BlogPost) {
    setEditingPost(post)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category,
      author: post.author,
      read_time: post.read_time,
      image_url: post.image_url || "",
      is_published: post.is_published,
    })
    setIsDialogOpen(true)
  }

  async function handleSubmit() {
    if (!form.title || !form.content) return
    setSaving(true)

    const slug = form.slug || generateSlug(form.title)
    const read_time = calculateReadTime(form.content)
    const excerpt = form.excerpt || form.content.substring(0, 160) + "..."
    const payload = { ...form, slug, read_time, excerpt }

    try {
      const method = editingPost ? "PUT" : "POST"
      const body = editingPost ? { id: editingPost.id, ...payload } : payload

      await fetch("/api/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      await fetchPosts()
      setIsDialogOpen(false)
      setForm(emptyForm)
    } catch (error) {
      console.error("Blog kaydetme hatasi:", error)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(post: BlogPost) {
    if (!confirm(`"${post.title}" yazisini silmek istediginize emin misiniz?`)) return
    try {
      await fetch(`/api/blog?id=${post.id}&slug=${post.slug}`, { method: "DELETE" })
      await fetchPosts()
    } catch (error) {
      console.error("Blog silme hatasi:", error)
    }
  }

  async function togglePublish(post: BlogPost) {
    try {
      await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, slug: post.slug, is_published: !post.is_published, title: post.title, excerpt: post.excerpt, category: post.category }),
      })
      await fetchPosts()
    } catch (error) {
      console.error("Yayin durumu degistirme hatasi:", error)
    }
  }

  async function handleAddCategory() {
    if (!categoryForm.name) return
    setSaving(true)
    try {
      await fetch("/api/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      })
      await fetchCategories()
      setIsCategoryDialogOpen(false)
      setCategoryForm({ name: "", description: "", color: "#3b82f6" })
    } catch (error) {
      console.error("Kategori ekleme hatasi:", error)
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Bu kategoriyi silmek istediginize emin misiniz?")) return
    try {
      await fetch(`/api/blog/categories?id=${id}`, { method: "DELETE" })
      await fetchCategories()
    } catch (error) {
      console.error("Kategori silme hatasi:", error)
    }
  }

  function insertFormatting(type: string) {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = form.content.substring(start, end)
    let newText = ""

    switch (type) {
      case "bold": newText = `**${selectedText || "kalin metin"}**`; break
      case "italic": newText = `*${selectedText || "italik metin"}*`; break
      case "h1": newText = `\n# ${selectedText || "Baslik 1"}\n`; break
      case "h2": newText = `\n## ${selectedText || "Baslik 2"}\n`; break
      case "list": newText = `\n- ${selectedText || "Liste ogesi"}\n`; break
      case "link": newText = `[${selectedText || "link metni"}](url)`; break
    }

    const newContent = form.content.substring(0, start) + newText + form.content.substring(end)
    setForm({ ...form, content: newContent })
  }

  function getCategoryColor(categoryName: string) {
    const cat = categories.find(c => c.name === categoryName)
    return cat?.color || "#6b7280"
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Blog Yonetimi</h2>
            <p className="text-sm text-muted-foreground">Iceriklerinizi profesyonelce yonetin</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(true)} className="flex-1 sm:flex-none">
              <FolderPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Kategori</span>
            </Button>
            <Button onClick={openCreateDialog} className="flex-1 sm:flex-none">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Yazi
            </Button>
          </div>
        </div>

        {/* Istatistik Kartlari */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Toplam</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{stats.published}</p>
                  <p className="text-xs text-muted-foreground">Yayinda</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{stats.draft}</p>
                  <p className="text-xs text-muted-foreground">Taslak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{stats.categories}</p>
                  <p className="text-xs text-muted-foreground">Kategori</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="posts" className="flex-1 sm:flex-none">Yazilar</TabsTrigger>
          <TabsTrigger value="categories" className="flex-1 sm:flex-none">Kategoriler</TabsTrigger>
        </TabsList>

        {/* Yazilar Tab */}
        <TabsContent value="posts" className="space-y-4 mt-4">
          {/* Arama ve Filtreleme */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Yazi ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[160px] text-base">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tum Kategoriler</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[130px] text-base">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tum Durumlar</SelectItem>
                <SelectItem value="published">Yayinda</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Yazi Listesi */}
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Yazi Bulunamadi</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || filterCategory !== "all" || filterStatus !== "all"
                    ? "Filtrelere uygun yazi bulunamadi"
                    : "Henuz blog yazisi eklenmemis"}
                </p>
                <Button onClick={openCreateDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ilk Yaziyi Ekle
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 p-3 sm:p-4">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: getCategoryColor(post.category) }}
                          >
                            {post.category}
                          </span>
                          {post.is_published ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Yayinda</span>
                          ) : (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Taslak</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {post.excerpt || post.content.substring(0, 120)}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.read_time} dk
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.created_at).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center justify-end gap-1 p-2 sm:p-3 border-t sm:border-t-0 sm:border-l bg-muted/30">
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => togglePublish(post)}>
                          {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => openEditDialog(post)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive" onClick={() => handleDelete(post)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Kategoriler Tab */}
        <TabsContent value="categories" className="space-y-4 mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const postCount = posts.filter(p => p.category === cat.name).length
              return (
                <Card key={cat.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.color + "20" }}>
                          <Tag className="w-5 h-5" style={{ color: cat.color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{cat.name}</h3>
                          <p className="text-xs text-muted-foreground">{postCount} yazi</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteCategory(cat.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {cat.description && <p className="text-sm text-muted-foreground mt-2">{cat.description}</p>}
                  </CardContent>
                </Card>
              )
            })}
            <Card className="border-dashed cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setIsCategoryDialogOpen(true)}>
              <CardContent className="p-4 flex items-center justify-center h-full min-h-[100px]">
                <div className="text-center">
                  <FolderPlus className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Yeni Kategori Ekle</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Yazi Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Yaziyi Duzenle" : "Yeni Blog Yazisi"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Baslik *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Yazi basligi" className="text-base" />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Otomatik olusturulur" className="text-base" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    )) : <SelectItem value="Genel">Genel</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Yazar</Label>
                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Yazar adi" className="text-base" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gorsel URL</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="text-base" />
            </div>

            <div className="space-y-2">
              <Label>Ozet</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Kisa ozet (SEO icin onemli)" rows={2} className="text-base" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Icerik *</Label>
                <div className="flex gap-1">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("bold")} title="Kalin"><Bold className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("italic")} title="Italik"><Italic className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("h1")} title="Baslik 1"><Heading1 className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("h2")} title="Baslik 2"><Heading2 className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("list")} title="Liste"><List className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("link")} title="Link"><LinkIcon className="w-4 h-4" /></Button>
                </div>
              </div>
              <Textarea name="content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Blog yazisi icerigi... (Markdown desteklenir)" rows={12} className="text-base font-mono min-h-[200px]" />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="is_published" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="rounded w-5 h-5" />
              <Label htmlFor="is_published" className="text-base">Hemen Yayinla</Label>
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">Iptal</Button>
            <Button onClick={handleSubmit} disabled={saving || !form.title || !form.content} className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Kategori Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="w-[95vw] max-w-md p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Yeni Kategori Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Kategori Adi *</Label>
              <Input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} placeholder="Ornek: Dis Cephe" className="text-base" />
            </div>
            <div className="space-y-2">
              <Label>Aciklama</Label>
              <Input value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} placeholder="Kategori aciklamasi" className="text-base" />
            </div>
            <div className="space-y-2">
              <Label>Renk</Label>
              <div className="flex flex-wrap gap-2">
                {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#6b7280"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setCategoryForm({ ...categoryForm, color })}
                    className={`w-8 h-8 rounded-full transition-all ${categoryForm.color === color ? "ring-2 ring-offset-2 ring-primary scale-110" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)} className="w-full sm:w-auto">Iptal</Button>
            <Button onClick={handleAddCategory} disabled={saving || !categoryForm.name} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              {saving ? "Ekleniyor..." : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

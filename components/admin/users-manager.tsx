"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, X, User, Shield, UserCog } from "lucide-react"
import type { AdminUser } from "@/lib/site-data"

interface UsersManagerProps {
  users: AdminUser[]
  currentUserId: string
  onAdd: (user: AdminUser) => void
  onUpdate: (id: string, user: AdminUser) => void
  onDelete: (id: string) => void
}

export function UsersManager({ users, currentUserId, onAdd, onUpdate, onDelete }: UsersManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "editor" as "admin" | "editor",
  })

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      name: "",
      role: "editor",
    })
  }

  const handleAdd = () => {
    if (!formData.username || !formData.password || !formData.name) {
      alert("Lütfen tüm alanları doldurun")
      return
    }

    // Kullanıcı adı benzersiz olmalı
    const exists = users.find(u => u.username === formData.username)
    if (exists) {
      alert("Bu kullanıcı adı zaten kullanılıyor")
      return
    }

    const newUser: AdminUser = {
      id: Date.now().toString(),
      username: formData.username,
      password: formData.password,
      name: formData.name,
      role: formData.role,
      createdAt: new Date().toISOString(),
    }
    onAdd(newUser)
    resetForm()
    setIsAdding(false)
  }

  const handleEdit = (user: AdminUser) => {
    setEditingId(user.id)
    setFormData({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role,
    })
  }

  const handleUpdate = () => {
    if (!editingId || !formData.username || !formData.password || !formData.name) {
      alert("Lütfen tüm alanları doldurun")
      return
    }

    // Kullanıcı adı benzersiz olmalı (kendi hariç)
    const exists = users.find(u => u.username === formData.username && u.id !== editingId)
    if (exists) {
      alert("Bu kullanıcı adı zaten kullanılıyor")
      return
    }

    const currentUser = users.find(u => u.id === editingId)
    if (!currentUser) return

    const updatedUser: AdminUser = {
      ...currentUser,
      username: formData.username,
      password: formData.password,
      name: formData.name,
      role: formData.role,
    }
    onUpdate(editingId, updatedUser)
    resetForm()
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    // Kendini silmeye çalışıyorsa engelle
    if (id === currentUserId) {
      alert("Kendinizi silemezsiniz!")
      return
    }

    // En az bir admin kalmalı
    const admins = users.filter(u => u.role === "admin" && u.id !== id)
    if (admins.length === 0) {
      alert("En az bir yönetici (admin) kullanıcı kalmalıdır!")
      return
    }

    if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      onDelete(id)
    }
  }

  const getRoleLabel = (role: "admin" | "editor") => {
    return role === "admin" ? "Yönetici" : "Editör"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Kullanıcı Yönetimi</h2>
          <p className="text-muted-foreground">Admin paneline erişebilen kullanıcıları yönetin</p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kullanıcı
          </Button>
        )}
      </div>

      {/* Ekleme / Düzenleme Formu */}
      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{editingId ? "Kullanıcı Düzenle" : "Yeni Kullanıcı Ekle"}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAdding(false)
                  setEditingId(null)
                  resetForm()
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Kullanıcının adı soyadı"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Giriş için kullanılacak"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parola</Label>
                <Input
                  id="password"
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Giriş parolası"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "editor" })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="admin">Yönetici (Tam Yetki)</option>
                  <option value="editor">Editör (Sınırlı Yetki)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? "Güncelle" : "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setEditingId(null)
                  resetForm()
                }}
              >
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kullanıcı Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id} className={user.id === currentUserId ? "border-primary" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {user.role === "admin" ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {user.name}
                      {user.id === currentUserId && (
                        <span className="text-xs text-primary ml-2">(Siz)</span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.role === "admin" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {getRoleLabel(user.role)}
                </span>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(user)}
                    disabled={isAdding || editingId !== null}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    disabled={isAdding || editingId !== null || user.id === currentUserId}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <UserCog className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Kullanıcı Bulunamadı</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Henüz hiç kullanıcı eklenmemiş. Yeni kullanıcı ekleyerek başlayın.
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              İlk Kullanıcıyı Ekle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

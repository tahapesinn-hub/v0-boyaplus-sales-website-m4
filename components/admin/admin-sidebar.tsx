"use client"

import { cn } from "@/lib/utils"
import { Package, Home, Phone, Search, Users, FolderOpen, Wrench, BookOpen, Palette } from "lucide-react"

type AdminTab = "products" | "categories" | "hero" | "contact" | "services" | "blog" | "rooms" | "seo" | "users"

interface AdminSidebarProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
}

const menuItems = [
  { id: "products" as AdminTab, label: "Ürün Yönetimi", icon: Package },
  { id: "categories" as AdminTab, label: "Kategori Yönetimi", icon: FolderOpen },
  { id: "hero" as AdminTab, label: "Ana Sayfa İçeriği", icon: Home },
  { id: "contact" as AdminTab, label: "İletişim Bilgileri", icon: Phone },
  { id: "services" as AdminTab, label: "Hizmet Yönetimi", icon: Wrench },
  { id: "blog" as AdminTab, label: "Blog Yönetimi", icon: BookOpen },
  { id: "rooms" as AdminTab, label: "Renk Onerileri", icon: Palette },
  { id: "seo" as AdminTab, label: "SEO Ayarları", icon: Search },
  { id: "users" as AdminTab, label: "Kullanıcı Yönetimi", icon: Users },
]

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-background border-r min-h-[calc(100vh-65px)] hidden lg:block">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
              activeTab === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

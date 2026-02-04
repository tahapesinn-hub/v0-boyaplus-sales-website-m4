"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, ExternalLink, RotateCcw, Menu, X, Package, Home, Phone, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"

type AdminTab = "products" | "hero" | "contact" | "seo" | "users"

interface AdminHeaderProps {
  onLogout: () => void
  onReset: () => void
  activeTab?: AdminTab
  onTabChange?: (tab: AdminTab) => void
  currentUserName?: string
}

const menuItems = [
  { id: "products" as AdminTab, label: "Ürün Yönetimi", icon: Package },
  { id: "hero" as AdminTab, label: "Ana Sayfa İçeriği", icon: Home },
  { id: "contact" as AdminTab, label: "İletişim Bilgileri", icon: Phone },
  { id: "seo" as AdminTab, label: "SEO Ayarları", icon: Search },
  { id: "users" as AdminTab, label: "Kullanıcı Yönetimi", icon: Users },
]

export function AdminHeader({ onLogout, onReset, activeTab, onTabChange, currentUserName }: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onTabChange && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          )}
          <Link href="/admin" className="text-xl font-bold text-foreground">
            Boyaplus <span className="text-primary">Admin</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {currentUserName && (
            <span className="hidden md:block text-sm text-muted-foreground mr-2">
              Merhaba, <span className="font-medium text-foreground">{currentUserName}</span>
            </span>
          )}
          <Button variant="outline" size="sm" asChild className="hidden sm:flex bg-transparent">
            <Link href="/" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Siteyi Görüntüle</span>
              <span className="md:hidden">Site</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (confirm("Tüm veriler varsayılana sıfırlanacak. Emin misiniz?")) {
                onReset()
              }
            }}
            className="hidden sm:flex"
          >
            <RotateCcw className="w-4 h-4 sm:mr-2" />
            <span className="hidden md:inline">Sıfırla</span>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Çıkış</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && onTabChange && (
        <div className="lg:hidden border-t bg-background">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  setMobileMenuOpen(false)
                }}
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
            <div className="pt-4 border-t mt-4 flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                <Link href="/" target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Siteyi Görüntüle
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-transparent"
                onClick={() => {
                  if (confirm("Tüm veriler varsayılana sıfırlanacak. Emin misiniz?")) {
                    onReset()
                  }
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Sıfırla
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

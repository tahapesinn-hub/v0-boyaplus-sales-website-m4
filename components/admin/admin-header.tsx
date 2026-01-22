"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, ExternalLink, RotateCcw } from "lucide-react"

interface AdminHeaderProps {
  onLogout: () => void
  onReset: () => void
}

export function AdminHeader({ onLogout, onReset }: AdminHeaderProps) {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xl font-bold text-foreground">
            Boyaplus <span className="text-primary">Admin</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              Siteyi Görüntüle
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
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Sıfırla
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış
          </Button>
        </div>
      </div>
    </header>
  )
}

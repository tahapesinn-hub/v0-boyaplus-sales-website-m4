"use client"

import { useState } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useSiteData } from "@/hooks/use-site-data"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProductsManager } from "@/components/admin/products-manager"
import { HeroManager } from "@/components/admin/hero-manager"
import { ContactManager } from "@/components/admin/contact-manager"
import { SeoManager } from "@/components/admin/seo-manager"
import { UsersManager } from "@/components/admin/users-manager"

type AdminTab = "products" | "hero" | "contact" | "seo" | "users"

export default function AdminPage() {
  const { isAuthenticated, currentUser, isLoading: authLoading, login, logout } = useAdminAuth()
  const { 
    data, 
    isLoading: dataLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateHero,
    updateContact,
    updateSeo,
    addUser,
    updateUser,
    deleteUser,
    resetToDefaults,
  } = useSiteData()
  
  const [activeTab, setActiveTab] = useState<AdminTab>("products")

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />
  }

  // Kullanıcı listesi yoksa varsayılan kullanıcıları kullan
  const users = data.users || []

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader 
        onLogout={logout} 
        onReset={resetToDefaults} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUserName={currentUser?.name}
      />
      
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6 lg:p-8">
          {activeTab === "products" && (
            <ProductsManager
              products={data.products}
              onAdd={addProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          )}
          
          {activeTab === "hero" && (
            <HeroManager
              hero={data.hero}
              onUpdate={updateHero}
            />
          )}
          
          {activeTab === "contact" && (
            <ContactManager
              contact={data.contact}
              onUpdate={updateContact}
            />
          )}
          
          {activeTab === "seo" && (
            <SeoManager
              seo={data.seo}
              onUpdate={updateSeo}
            />
          )}
          
          {activeTab === "users" && (
            <UsersManager
              users={users}
              currentUserId={currentUser?.id || ""}
              onAdd={addUser}
              onUpdate={updateUser}
              onDelete={deleteUser}
            />
          )}
        </main>
      </div>
    </div>
  )
}

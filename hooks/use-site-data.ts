"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  type SiteData, 
  type Product, 
  type HeroContent, 
  type ContactInfo, 
  type SeoMeta,
  type AdminUser,
  type Category,
  defaultSiteData 
} from "@/lib/site-data"

const STORAGE_KEY = "boyaplus_site_data"

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)

  // localStorage'dan veri yükle
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SiteData
        setData(parsed)
      } catch {
        setData(defaultSiteData)
      }
    }
    setIsLoading(false)
  }, [])

  // Veriyi kaydet
  const saveData = useCallback((newData: SiteData) => {
    setData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }, [])

  // Ürün işlemleri
  const updateProducts = useCallback((products: Product[]) => {
    const newData = { ...data, products }
    saveData(newData)
  }, [data, saveData])

  const addProduct = useCallback((product: Product) => {
    const newProducts = [...data.products, product]
    updateProducts(newProducts)
  }, [data.products, updateProducts])

  const updateProduct = useCallback((id: string, product: Product) => {
    const newProducts = data.products.map(p => p.id === id ? product : p)
    updateProducts(newProducts)
  }, [data.products, updateProducts])

  const deleteProduct = useCallback((id: string) => {
    const newProducts = data.products.filter(p => p.id !== id)
    updateProducts(newProducts)
  }, [data.products, updateProducts])

  // Hero içerik güncelle
  const updateHero = useCallback((hero: HeroContent) => {
    const newData = { ...data, hero }
    saveData(newData)
  }, [data, saveData])

  // İletişim bilgilerini güncelle
  const updateContact = useCallback((contact: ContactInfo) => {
    const newData = { ...data, contact }
    saveData(newData)
  }, [data, saveData])

  // SEO ayarlarını güncelle
  const updateSeo = useCallback((seo: SeoMeta) => {
    const newData = { ...data, seo }
    saveData(newData)
  }, [data, saveData])

  // Kategori işlemleri
  const addCategory = useCallback((category: Category) => {
    const newCategories = [...(data.categories || []), category]
    const newData = { ...data, categories: newCategories }
    saveData(newData)
  }, [data, saveData])

  const updateCategory = useCallback((id: string, category: Category) => {
    const newCategories = (data.categories || []).map(c => c.id === id ? category : c)
    const newData = { ...data, categories: newCategories }
    saveData(newData)
  }, [data, saveData])

  const deleteCategory = useCallback((id: string) => {
    const newCategories = (data.categories || []).filter(c => c.id !== id)
    const newData = { ...data, categories: newCategories }
    saveData(newData)
  }, [data, saveData])

  // Kullanıcı işlemleri
  const addUser = useCallback((user: AdminUser) => {
    const newUsers = [...(data.users || []), user]
    const newData = { ...data, users: newUsers }
    saveData(newData)
  }, [data, saveData])

  const updateUser = useCallback((id: string, user: AdminUser) => {
    const newUsers = (data.users || []).map(u => u.id === id ? user : u)
    const newData = { ...data, users: newUsers }
    saveData(newData)
  }, [data, saveData])

  const deleteUser = useCallback((id: string) => {
    const newUsers = (data.users || []).filter(u => u.id !== id)
    const newData = { ...data, users: newUsers }
    saveData(newData)
  }, [data, saveData])

  // Tüm veriyi sıfırla
  const resetToDefaults = useCallback(() => {
    saveData(defaultSiteData)
  }, [saveData])

  return {
    data,
    isLoading,
    updateProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateHero,
    updateContact,
    updateSeo,
    addUser,
    updateUser,
    deleteUser,
    resetToDefaults,
  }
}

// Sadece okuma için hook (site sayfaları için)
export function useSiteDataReadOnly() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SiteData
        setData(parsed)
      } catch {
        setData(defaultSiteData)
      }
    }
    setIsLoading(false)
  }, [])

  return { data, isLoading }
}

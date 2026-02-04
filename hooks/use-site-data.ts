"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { 
  Product, 
  Category, 
  HeroContent, 
  ContactInfo, 
  SeoMeta,
  AdminUser,
  SiteData
} from "@/lib/site-data"
import { defaultSiteData } from "@/lib/site-data"

const supabase = createClient()

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)

  // Verileri Supabase'den cek
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Kategorileri cek
      const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .order("created_at")
      
      // Urunleri cek
      const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at")
      
      // Site ayarlarini cek
      const { data: settings } = await supabase
        .from("site_settings")
        .select("*")
      
      // Admin kullanicilarini cek
      const { data: users } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at")

      // Ayarlari parse et
      const heroSetting = settings?.find(s => s.key === "hero")
      const contactSetting = settings?.find(s => s.key === "contact")
      const seoSetting = settings?.find(s => s.key === "seo")

      setData({
        products: products?.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: p.category,
          categorySlug: p.category_slug,
          description: p.description,
          features: p.features || [],
          coverage: p.coverage,
          dryingTime: p.drying_time,
          price: p.price,
          colors: p.colors || [],
          images: p.images || [],
        })) || [],
        categories: categories?.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
        })) || [],
        hero: heroSetting?.value || defaultSiteData.hero,
        contact: contactSetting?.value || defaultSiteData.contact,
        seo: seoSetting?.value || defaultSiteData.seo,
        users: users?.map(u => ({
          id: u.id,
          username: u.username,
          password: u.password,
          name: u.name,
          role: u.role,
          createdAt: u.created_at,
        })) || [],
      })
    } catch (error) {
      console.error("Veri cekme hatasi:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Urun ekle
  const addProduct = useCallback(async (product: Product) => {
    const { error } = await supabase.from("products").insert({
      name: product.name,
      slug: product.slug,
      category: product.category,
      category_slug: product.categorySlug,
      description: product.description,
      features: product.features,
      coverage: product.coverage,
      drying_time: product.dryingTime,
      price: product.price,
      colors: product.colors,
      images: product.images,
    })
    if (!error) fetchData()
  }, [fetchData])

  // Urun guncelle
  const updateProduct = useCallback(async (id: string, product: Product) => {
    const { error } = await supabase.from("products").update({
      name: product.name,
      slug: product.slug,
      category: product.category,
      category_slug: product.categorySlug,
      description: product.description,
      features: product.features,
      coverage: product.coverage,
      drying_time: product.dryingTime,
      price: product.price,
      colors: product.colors,
      images: product.images,
    }).eq("id", id)
    if (!error) fetchData()
  }, [fetchData])

  // Urun sil
  const deleteProduct = useCallback(async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (!error) fetchData()
  }, [fetchData])

  // Kategori ekle
  const addCategory = useCallback(async (category: Category) => {
    const { error } = await supabase.from("categories").insert({
      name: category.name,
      slug: category.slug,
    })
    if (!error) fetchData()
  }, [fetchData])

  // Kategori guncelle
  const updateCategory = useCallback(async (id: string, category: Category) => {
    const { error } = await supabase.from("categories").update({
      name: category.name,
      slug: category.slug,
    }).eq("id", id)
    if (!error) fetchData()
  }, [fetchData])

  // Kategori sil
  const deleteCategory = useCallback(async (id: string) => {
    const { error } = await supabase.from("categories").delete().eq("id", id)
    if (!error) fetchData()
  }, [fetchData])

  // Hero guncelle
  const updateHero = useCallback(async (hero: HeroContent) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "hero", value: hero, updated_at: new Date().toISOString() }, { onConflict: "key" })
    if (!error) fetchData()
  }, [fetchData])

  // Contact guncelle
  const updateContact = useCallback(async (contact: ContactInfo) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "contact", value: contact, updated_at: new Date().toISOString() }, { onConflict: "key" })
    if (!error) fetchData()
  }, [fetchData])

  // SEO guncelle
  const updateSeo = useCallback(async (seo: SeoMeta) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "seo", value: seo, updated_at: new Date().toISOString() }, { onConflict: "key" })
    if (!error) fetchData()
  }, [fetchData])

  // Kullanici ekle
  const addUser = useCallback(async (user: AdminUser) => {
    const { error } = await supabase.from("admin_users").insert({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role,
    })
    if (!error) fetchData()
  }, [fetchData])

  // Kullanici guncelle
  const updateUser = useCallback(async (id: string, user: AdminUser) => {
    const { error } = await supabase.from("admin_users").update({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role,
    }).eq("id", id)
    if (!error) fetchData()
  }, [fetchData])

  // Kullanici sil
  const deleteUser = useCallback(async (id: string) => {
    const { error } = await supabase.from("admin_users").delete().eq("id", id)
    if (!error) fetchData()
  }, [fetchData])

  // Sifirla (Supabase ile kullanildiginda sadece yeniden yukler)
  const resetToDefaults = useCallback(async () => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
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
    refetch: fetchData,
  }
}

// Salt okunur versiyon (ziyaretci sayfalari icin)
export function useSiteDataReadOnly() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kategorileri cek
        const { data: categories } = await supabase
          .from("categories")
          .select("*")
          .order("created_at")
        
        // Urunleri cek
        const { data: products } = await supabase
          .from("products")
          .select("*")
          .order("created_at")
        
        // Site ayarlarini cek
        const { data: settings } = await supabase
          .from("site_settings")
          .select("*")

        // Ayarlari parse et
        const heroSetting = settings?.find(s => s.key === "hero")
        const contactSetting = settings?.find(s => s.key === "contact")
        const seoSetting = settings?.find(s => s.key === "seo")

        setData({
          products: products?.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            category: p.category,
            categorySlug: p.category_slug,
            description: p.description,
            features: p.features || [],
            coverage: p.coverage,
            dryingTime: p.drying_time,
            price: p.price,
            colors: p.colors || [],
            images: p.images || [],
          })) || [],
          categories: categories?.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
          })) || [],
          hero: heroSetting?.value || defaultSiteData.hero,
          contact: contactSetting?.value || defaultSiteData.contact,
          seo: seoSetting?.value || defaultSiteData.seo,
          users: [],
        })
      } catch (error) {
        console.error("Veri cekme hatasi:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading }
}

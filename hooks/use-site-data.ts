"use client"

import { useState, useEffect, useCallback } from "react"
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

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/data")
      if (!res.ok) throw new Error("Failed to fetch")
      const json = await res.json()
      
      setData({
        categories: json.categories || defaultSiteData.categories,
        products: json.products || defaultSiteData.products,
        hero: json.hero || defaultSiteData.hero,
        contact: json.contact || defaultSiteData.contact,
        seo: json.seo || defaultSiteData.seo,
        users: json.users || defaultSiteData.users,
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

  const addProduct = useCallback(async (product: Product) => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    fetchData()
  }, [fetchData])

  const updateProduct = useCallback(async (id: string, product: Product) => {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...product }),
    })
    fetchData()
  }, [fetchData])

  const deleteProduct = useCallback(async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchData()
  }, [fetchData])

  const addCategory = useCallback(async (category: Category) => {
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    })
    fetchData()
  }, [fetchData])

  const updateCategory = useCallback(async (id: string, category: Category) => {
    await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...category }),
    })
    fetchData()
  }, [fetchData])

  const deleteCategory = useCallback(async (id: string) => {
    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchData()
  }, [fetchData])

  const updateHero = useCallback(async (hero: HeroContent) => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "hero", value: hero }),
    })
    fetchData()
  }, [fetchData])

  const updateContact = useCallback(async (contact: ContactInfo) => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "contact", value: contact }),
    })
    fetchData()
  }, [fetchData])

  const updateSeo = useCallback(async (seo: SeoMeta) => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "seo", value: seo }),
    })
    fetchData()
  }, [fetchData])

  const addUser = useCallback(async (user: AdminUser) => {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    fetchData()
  }, [fetchData])

  const updateUser = useCallback(async (id: string, user: AdminUser) => {
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...user }),
    })
    fetchData()
  }, [fetchData])

  const deleteUser = useCallback(async (id: string) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchData()
  }, [fetchData])

  const resetToDefaults = useCallback(() => {
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
  }
}

export function useSiteDataReadOnly() {
  const [data, setData] = useState<SiteData>(defaultSiteData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data")
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        
        setData({
          categories: json.categories || defaultSiteData.categories,
          products: json.products || defaultSiteData.products,
          hero: json.hero || defaultSiteData.hero,
          contact: json.contact || defaultSiteData.contact,
          seo: json.seo || defaultSiteData.seo,
          users: json.users || defaultSiteData.users,
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

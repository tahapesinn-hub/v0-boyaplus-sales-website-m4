import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"
import { defaultSiteData } from "@/lib/site-data"

export async function GET() {
  // Environment variable kontrolu
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(defaultSiteData)
  }

  try {
    const [categories, products, settings, users] = await Promise.all([
      supabaseRest({ table: "categories", order: "created_at.asc" }),
      supabaseRest({ table: "products", order: "created_at.asc" }),
      supabaseRest({ table: "site_settings" }),
      supabaseRest({ table: "admin_users" }),
    ])

    const mappedProducts = (products || []).map((p: Record<string, unknown>) => ({
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
    }))

    const settingsArr = settings || []
    const heroSetting = settingsArr.find((s: Record<string, unknown>) => s.key === "hero")
    const contactSetting = settingsArr.find((s: Record<string, unknown>) => s.key === "contact")
    const seoSetting = settingsArr.find((s: Record<string, unknown>) => s.key === "seo")

    const mappedUsers = (users || []).map((u: Record<string, unknown>) => ({
      id: u.id,
      username: u.username,
      password: u.password,
      name: u.name,
      role: u.role,
      createdAt: u.created_at,
    }))

    return NextResponse.json({
      categories: categories || [],
      products: mappedProducts,
      hero: heroSetting?.value || null,
      contact: contactSetting?.value || null,
      seo: seoSetting?.value || null,
      users: mappedUsers,
    })
  } catch (error) {
    console.error("[v0] Data API error:", error)
    // Hata durumunda varsayilan verileri don
    return NextResponse.json(defaultSiteData)
  }
}

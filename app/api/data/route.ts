import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const [categoriesRes, productsRes, settingsRes, usersRes] = await Promise.all([
      supabase.from("categories").select("*").order("created_at"),
      supabase.from("products").select("*").order("created_at"),
      supabase.from("site_settings").select("*"),
      supabase.from("admin_users").select("*"),
    ])

    const categories = categoriesRes.data || []
    const products = (productsRes.data || []).map((p: Record<string, unknown>) => ({
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

    const settings = settingsRes.data || []
    const heroSetting = settings.find((s: Record<string, unknown>) => s.key === "hero")
    const contactSetting = settings.find((s: Record<string, unknown>) => s.key === "contact")
    const seoSetting = settings.find((s: Record<string, unknown>) => s.key === "seo")

    const users = (usersRes.data || []).map((u: Record<string, unknown>) => ({
      id: u.id,
      username: u.username,
      password: u.password,
      name: u.name,
      role: u.role,
      createdAt: u.created_at,
    }))

    return NextResponse.json({
      categories,
      products,
      hero: heroSetting?.value || null,
      contact: contactSetting?.value || null,
      seo: seoSetting?.value || null,
      users,
    })
  } catch (error) {
    console.error("Data fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const [categories, products, settings, users] = await Promise.all([
      sql`SELECT * FROM categories ORDER BY created_at`,
      sql`SELECT * FROM products ORDER BY created_at`,
      sql`SELECT * FROM site_settings`,
      sql`SELECT * FROM admin_users`,
    ])

    const mappedProducts = products.map((p) => ({
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

    const heroSetting = settings.find((s) => s.key === "hero")
    const contactSetting = settings.find((s) => s.key === "contact")
    const seoSetting = settings.find((s) => s.key === "seo")

    const mappedUsers = users.map((u) => ({
      id: u.id,
      username: u.username,
      password: u.password,
      name: u.name,
      role: u.role,
      createdAt: u.created_at,
    }))

    return NextResponse.json({
      categories,
      products: mappedProducts,
      hero: heroSetting?.value || null,
      contact: contactSetting?.value || null,
      seo: seoSetting?.value || null,
      users: mappedUsers,
    })
  } catch (error) {
    console.error("Data fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

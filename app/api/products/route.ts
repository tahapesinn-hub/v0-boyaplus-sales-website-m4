import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const p = await request.json()
    await supabaseRest({
      table: "products",
      method: "POST",
      body: {
        name: p.name, slug: p.slug, category: p.category, category_slug: p.categorySlug,
        description: p.description, features: p.features || [], coverage: p.coverage,
        drying_time: p.dryingTime, price: p.price, colors: p.colors || [], images: p.images || [],
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...p } = await request.json()
    await supabaseRest({
      table: "products",
      method: "PATCH",
      filters: { "id": `eq.${id}` },
      body: {
        name: p.name, slug: p.slug, category: p.category, category_slug: p.categorySlug,
        description: p.description, features: p.features || [], coverage: p.coverage,
        drying_time: p.dryingTime, price: p.price, colors: p.colors || [], images: p.images || [],
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await supabaseRest({ table: "products", method: "DELETE", filters: { "id": `eq.${id}` } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

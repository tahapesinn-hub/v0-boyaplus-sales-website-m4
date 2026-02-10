import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const p = await request.json()
    await sql`
      INSERT INTO products (name, slug, category, category_slug, description, features, coverage, drying_time, price, colors, images)
      VALUES (${p.name}, ${p.slug}, ${p.category}, ${p.categorySlug}, ${p.description}, ${JSON.stringify(p.features || [])}, ${p.coverage}, ${p.dryingTime}, ${p.price}, ${JSON.stringify(p.colors || [])}, ${JSON.stringify(p.images || [])})
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...p } = await request.json()
    await sql`
      UPDATE products SET
        name = ${p.name}, slug = ${p.slug}, category = ${p.category}, category_slug = ${p.categorySlug},
        description = ${p.description}, features = ${JSON.stringify(p.features || [])}, coverage = ${p.coverage},
        drying_time = ${p.dryingTime}, price = ${p.price}, colors = ${JSON.stringify(p.colors || [])}, images = ${JSON.stringify(p.images || [])}
      WHERE id = ${id}
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await sql`DELETE FROM products WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

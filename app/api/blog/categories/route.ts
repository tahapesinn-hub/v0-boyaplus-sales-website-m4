import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json([])
  }

  try {
    const categories = await supabaseRest({
      table: "blog_categories",
      select: "*",
      filters: { is_active: "eq.true" },
      order: "sort_order.asc",
    })
    return NextResponse.json(categories || [])
  } catch (error) {
    console.error("[v0] Blog categories GET error:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, color } = body

    if (!name) {
      return NextResponse.json({ error: "Kategori adi zorunludur" }, { status: 400 })
    }

    const slug = name
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const result = await supabaseRest({
      table: "blog_categories",
      method: "POST",
      body: { name, slug, description, color: color || "#3b82f6" },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Blog category POST error:", error)
    return NextResponse.json({ error: "Kategori eklenemedi" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 })
    }

    const result = await supabaseRest({
      table: "blog_categories",
      method: "PATCH",
      filters: { id: `eq.${id}` },
      body: updates,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Blog category PATCH error:", error)
    return NextResponse.json({ error: "Kategori guncellenemedi" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 })
    }

    await supabaseRest({
      table: "blog_categories",
      method: "DELETE",
      filters: { id: `eq.${id}` },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Blog category DELETE error:", error)
    return NextResponse.json({ error: "Kategori silinemedi" }, { status: 500 })
  }
}

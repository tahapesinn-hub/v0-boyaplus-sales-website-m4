import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ section: null, rooms: [] })
  }

  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get("all") === "true" // Admin icin tum kayitlari getir

    const [sectionData, roomsData] = await Promise.all([
      supabaseRest({
        table: "home_sections",
        filters: { section_key: "eq.room_colors" },
      }),
      supabaseRest({
        table: "room_color_suggestions",
        filters: all ? {} : { is_active: "eq.true" },
        order: "sort_order.asc",
      }),
    ])

    const section = Array.isArray(sectionData) && sectionData.length > 0 ? sectionData[0] : null
    const rooms = Array.isArray(roomsData) ? roomsData : []

    return NextResponse.json({ section, rooms })
  } catch (error) {
    console.error("[v0] Room suggestions GET error:", error)
    return NextResponse.json({ section: null, rooms: [] })
  }
}

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()
    
    const result = await supabaseRest({
      table: "room_color_suggestions",
      method: "POST",
      body: {
        room_name: body.room_name,
        slug: body.slug,
        description: body.description,
        color_suggestions: body.color_suggestions || [],
        button_text: body.button_text || "Detaylari Gor",
        button_link: body.button_link || "/blog",
        icon: body.icon || "Home",
        sort_order: body.sort_order || 0,
        is_active: body.is_active !== false,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Room suggestions POST error:", error)
    return NextResponse.json({ error: "Failed to create room suggestion" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    updates.updated_at = new Date().toISOString()

    const result = await supabaseRest({
      table: "room_color_suggestions",
      method: "PATCH",
      filters: { id: `eq.${id}` },
      body: updates,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Room suggestions PATCH error:", error)
    return NextResponse.json({ error: "Failed to update room suggestion" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    await supabaseRest({
      table: "room_color_suggestions",
      method: "DELETE",
      filters: { id: `eq.${id}` },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Room suggestions DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete room suggestion" }, { status: 500 })
  }
}

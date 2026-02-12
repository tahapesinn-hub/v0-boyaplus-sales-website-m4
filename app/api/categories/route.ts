import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const c = await request.json()
    await supabaseRest({ table: "categories", method: "POST", body: { name: c.name, slug: c.slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...c } = await request.json()
    await supabaseRest({ table: "categories", method: "PATCH", filters: { "id": `eq.${id}` }, body: { name: c.name, slug: c.slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await supabaseRest({ table: "categories", method: "DELETE", filters: { "id": `eq.${id}` } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

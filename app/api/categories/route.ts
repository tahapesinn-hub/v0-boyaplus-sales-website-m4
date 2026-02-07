import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase()
    const category = await request.json()
    const { error } = await supabase.from("categories").insert({
      name: category.name,
      slug: category.slug,
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabase()
    const { id, ...category } = await request.json()
    const { error } = await supabase.from("categories").update({
      name: category.name,
      slug: category.slug,
    }).eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabase()
    const { id } = await request.json()
    const { error } = await supabase.from("categories").delete().eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

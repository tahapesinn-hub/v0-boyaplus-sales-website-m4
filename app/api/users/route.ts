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
    const user = await request.json()
    const { error } = await supabase.from("admin_users").insert({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role,
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabase()
    const { id, ...user } = await request.json()
    const { error } = await supabase.from("admin_users").update({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role,
    }).eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabase()
    const { id } = await request.json()
    const { error } = await supabase.from("admin_users").delete().eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

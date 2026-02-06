import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const body = await request.json()
    const username = String(body.username || "").trim()
    const password = String(body.password || "").trim()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Missing credentials" }, { status: 400 })
    }
    
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.id,
        username: data.username,
        name: data.name,
        role: data.role,
        createdAt: data.created_at,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 })
  }
}

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, error: "DB_NOT_CONFIGURED" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const body = await request.json()
    const username = String(body.username || "").trim()
    const password = String(body.password || "").trim()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "MISSING_CREDS" }, { status: 400 })
    }
    
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ success: false, error: "DB_ERROR: " + error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ success: false, error: "NO_USER_FOUND" }, { status: 401 })
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown"
    return NextResponse.json({ success: false, error: "CATCH_ERROR: " + message }, { status: 500 })
  }
}

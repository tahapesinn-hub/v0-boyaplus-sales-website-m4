import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    console.log("[v0] Auth attempt:", { username, password })
    
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle()

    console.log("[v0] Auth result:", { data, error })

    if (error || !data) {
      console.log("[v0] Auth failed - error:", error, "data:", data)
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
  } catch (error) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 })
  }
}

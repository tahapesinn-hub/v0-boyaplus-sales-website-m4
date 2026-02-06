import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { username, password } = await request.json()
    
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle()

    if (error || !data) {
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

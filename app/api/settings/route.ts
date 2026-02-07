import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { key, value } = await request.json()
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

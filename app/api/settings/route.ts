import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const { key, value } = await request.json()
    await supabaseRest({
      table: "site_settings",
      method: "POST",
      upsert: true,
      body: { key, value, updated_at: new Date().toISOString() },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

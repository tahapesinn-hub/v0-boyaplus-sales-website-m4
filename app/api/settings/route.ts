import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const { key, value } = await request.json()
    await sql`
      INSERT INTO site_settings (key, value, updated_at) VALUES (${key}, ${JSON.stringify(value)}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = NOW()
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const username = String(body.username || "").trim()
    const password = String(body.password || "").trim()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "MISSING_CREDS" }, { status: 400 })
    }

    const users = await supabaseRest({
      table: "admin_users",
      filters: {
        "username": `eq.${username}`,
        "password": `eq.${password}`,
      },
    })

    if (!users || users.length === 0) {
      return NextResponse.json({ success: false, error: "NO_USER_FOUND" }, { status: 401 })
    }

    const user = users[0]
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.created_at,
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown"
    return NextResponse.json({ success: false, error: "CATCH_ERROR: " + message }, { status: 500 })
  }
}

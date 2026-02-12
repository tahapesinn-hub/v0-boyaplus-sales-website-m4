import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const u = await request.json()
    await supabaseRest({ table: "admin_users", method: "POST", body: { username: u.username, password: u.password, name: u.name, role: u.role } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...u } = await request.json()
    await supabaseRest({ table: "admin_users", method: "PATCH", filters: { "id": `eq.${id}` }, body: { username: u.username, password: u.password, name: u.name, role: u.role } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await supabaseRest({ table: "admin_users", method: "DELETE", filters: { "id": `eq.${id}` } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await supabaseRest({
      table: "seo_pages",
      select: "*",
    })
    // Sort client-side
    const sorted = Array.isArray(data)
      ? data.sort((a: { page_type: string; page_label: string }, b: { page_type: string; page_label: string }) =>
          a.page_type.localeCompare(b.page_type) || a.page_label.localeCompare(b.page_label)
        )
      : []
    return NextResponse.json(sorted)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = await supabaseRest({
      table: "seo_pages",
      method: "POST",
      body: {
        page_type: body.page_type,
        page_key: body.page_key,
        page_label: body.page_label,
        title: body.title || "",
        meta_description: body.meta_description || "",
        keywords: body.keywords || "",
        h1: body.h1 || "",
        h2: body.h2 || "",
        canonical_url: body.canonical_url || "",
        robots: body.robots || "index",
        include_sitemap: body.include_sitemap ?? true,
      },
    })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to create SEO entry" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...body } = await request.json()
    body.updated_at = new Date().toISOString()
    const data = await supabaseRest({
      table: "seo_pages",
      method: "PATCH",
      filters: { id: `eq.${id}` },
      body,
    })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to update SEO entry" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await supabaseRest({
      table: "seo_pages",
      method: "DELETE",
      filters: { id: `eq.${id}` },
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete SEO entry" }, { status: 500 })
  }
}

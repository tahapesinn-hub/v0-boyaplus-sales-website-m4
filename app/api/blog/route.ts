import { supabaseRest } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json([])
  }

  try {
    const posts = await supabaseRest({
      table: "blog_posts",
      select: "*",
      order: "created_at.desc",
    })
    return NextResponse.json(posts || [])
  } catch (error) {
    console.error("[v0] Blog GET error:", error)
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const slug = body.slug || body.title.toLowerCase()
      .replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u")
      .replace(/ö/g, "o").replace(/ç/g, "c").replace(/ı/g, "i")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)

    const postData = {
      title: body.title,
      slug,
      excerpt: body.excerpt || "",
      content: body.content,
      category: body.category || "Genel",
      author: body.author || "Boyaplus",
      image_url: body.image_url || "",
      is_published: body.is_published || false,
      read_time: body.read_time || Math.ceil(body.content.split(" ").length / 200),
    }

    const result = await supabaseRest({
      table: "blog_posts",
      method: "POST",
      body: postData,
    })

    // SEO kaydini otomatik ekle
    if (postData.is_published) {
      try {
        await supabaseRest({
          table: "seo_pages",
          method: "POST",
          body: {
            page_key: `/blog/${slug}`,
            page_type: "blog",
            page_label: body.title,
            title: `${body.title} | Boyaplus Blog`,
            meta_description: body.excerpt || body.content.substring(0, 160),
            keywords: body.category,
            robots: "index",
            include_sitemap: true,
          },
        })
      } catch {
        // SEO kaydi zaten varsa devam et
      }
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Blog yazisi eklenemedi" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body

    updateData.updated_at = new Date().toISOString()

    await supabaseRest({
      table: "blog_posts",
      method: "PATCH",
      filters: { id: `eq.${id}` },
      body: updateData,
    })

    // SEO kaydini guncelle
    if (body.slug && body.is_published) {
      try {
        await supabaseRest({
          table: "seo_pages",
          method: "PATCH",
          filters: { page_key: `eq./blog/${body.slug}` },
          body: {
            page_label: updateData.title,
            title: `${updateData.title} | Boyaplus Blog`,
            meta_description: updateData.excerpt,
            include_sitemap: true,
          },
        })
      } catch {
        // Yoksa ekle
        await supabaseRest({
          table: "seo_pages",
          method: "POST",
          body: {
            page_key: `/blog/${body.slug}`,
            page_type: "blog",
            page_label: updateData.title,
            title: `${updateData.title} | Boyaplus Blog`,
            meta_description: updateData.excerpt,
            keywords: updateData.category || "blog",
            robots: "index",
            include_sitemap: true,
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Blog yazisi guncellenemedi" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const slug = searchParams.get("slug")

    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 })
    }

    await supabaseRest({
      table: "blog_posts",
      method: "DELETE",
      filters: { id: `eq.${id}` },
    })

    // SEO kaydini da sil
    if (slug) {
      try {
        await supabaseRest({
          table: "seo_pages",
          method: "DELETE",
          filters: { page_key: `eq./blog/${slug}` },
        })
      } catch {
        // SEO kaydi yoksa devam et
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Blog yazisi silinemedi" }, { status: 500 })
  }
}

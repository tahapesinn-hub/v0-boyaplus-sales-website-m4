import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase()
    const product = await request.json()
    const { error } = await supabase.from("products").insert({
      name: product.name,
      slug: product.slug,
      category: product.category,
      category_slug: product.categorySlug,
      description: product.description,
      features: product.features,
      coverage: product.coverage,
      drying_time: product.dryingTime,
      price: product.price,
      colors: product.colors,
      images: product.images,
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabase()
    const { id, ...product } = await request.json()
    const { error } = await supabase.from("products").update({
      name: product.name,
      slug: product.slug,
      category: product.category,
      category_slug: product.categorySlug,
      description: product.description,
      features: product.features,
      coverage: product.coverage,
      drying_time: product.dryingTime,
      price: product.price,
      colors: product.colors,
      images: product.images,
    }).eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabase()
    const { id } = await request.json()
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

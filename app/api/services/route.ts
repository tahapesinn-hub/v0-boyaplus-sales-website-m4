import { supabaseRest } from "@/lib/db"

export async function GET() {
  try {
    const services = await supabaseRest({
      table: "services",
      select: "*",
      order: "sort_order.asc",
    })
    return Response.json(Array.isArray(services) ? services : [])
  } catch {
    return Response.json([])
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, ...data } = body

    if (action === "create") {
      const result = await supabaseRest({
        table: "services",
        method: "POST",
        body: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          icon: data.icon || "Paintbrush",
          features: data.features || [],
          is_active: data.is_active !== false,
          sort_order: data.sort_order || 0,
        },
      })
      return Response.json(result)
    }

    if (action === "update" && data.id) {
      const result = await supabaseRest({
        table: "services",
        method: "PATCH",
        filters: { id: `eq.${data.id}` },
        body: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          icon: data.icon,
          features: data.features,
          is_active: data.is_active,
          sort_order: data.sort_order,
        },
      })
      return Response.json(result)
    }

    if (action === "delete" && data.id) {
      await supabaseRest({
        table: "services",
        method: "DELETE",
        filters: { id: `eq.${data.id}` },
      })
      return Response.json({ success: true })
    }

    return Response.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 })
  }
}

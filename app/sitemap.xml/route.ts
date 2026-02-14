import { supabaseRest } from "@/lib/db"

const SITE_URL = "https://boyaplus.com"

export async function GET() {
  try {
    const pages = await supabaseRest(
      "seo_pages?include_sitemap=eq.true&robots=eq.index&select=page_key,updated_at"
    )

    const urls = (Array.isArray(pages) ? pages : []).map(
      (page: { page_key: string; updated_at: string }) => `
  <url>
    <loc>${SITE_URL}${page.page_key}</loc>
    <lastmod>${page.updated_at ? new Date(page.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.page_key === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { "Content-Type": "application/xml" } }
    )
  }
}

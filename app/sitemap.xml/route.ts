import { supabaseRest } from "@/lib/db"
import { blogPosts } from "@/lib/blog-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const SITE_URL = "https://www.boyaplus.com.tr"

// Statik sayfalar - her zaman sitemap'te olacak
const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/urunler", priority: "0.9", changefreq: "weekly" },
  { loc: "/hizmetlerimiz", priority: "0.9", changefreq: "weekly" },
  { loc: "/blog", priority: "0.9", changefreq: "weekly" },
  { loc: "/iletisim", priority: "0.7", changefreq: "monthly" },
]

export async function GET() {
  const today = new Date().toISOString().split("T")[0]

  // 1. Statik sayfa URL'leri
  const staticUrls = STATIC_PAGES.map(
    (p) => `
  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )

  // 2. Veritabanindan urun URL'leri
  let productUrls: string[] = []
  try {
    const products = await supabaseRest({
      table: "products",
      select: "slug,created_at",
    })
    if (Array.isArray(products)) {
      productUrls = products.map(
        (p: { slug: string; created_at: string }) => `
  <url>
    <loc>${SITE_URL}/urunler/${p.slug}</loc>
    <lastmod>${p.created_at ? new Date(p.created_at).toISOString().split("T")[0] : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
    }
  } catch {
    // Urunler alinamazsa statik sayfalar yine doner
  }

  // 3. SEO sayfalarindan ek URL'ler
  let seoUrls: string[] = []
  try {
    const seoPages = await supabaseRest({
      table: "seo_pages",
      select: "page_key,updated_at",
      filters: {
        include_sitemap: "eq.true",
        robots: "eq.index",
      },
    })
    if (Array.isArray(seoPages)) {
      // Statik ve urun sayfalarinda zaten olan URL'leri atla
      const existingPaths = new Set([
        ...STATIC_PAGES.map((p) => p.loc),
        ...(productUrls.length > 0 ? [`/urunler/`] : []),
      ])
      seoUrls = seoPages
        .filter((p: { page_key: string }) => !existingPaths.has(p.page_key))
        .map(
          (page: { page_key: string; updated_at: string }) => `
  <url>
    <loc>${SITE_URL}${page.page_key}</loc>
    <lastmod>${page.updated_at ? new Date(page.updated_at).toISOString().split("T")[0] : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
        )
    }
  } catch {
    // SEO sayfalari alinamazsa devam et
  }

  // 4. Blog yazilarinin URL'leri
  const blogUrls = blogPosts.map(
    (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...productUrls, ...blogUrls, ...seoUrls].join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

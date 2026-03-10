export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const SITE_URL = "https://www.boyaplus.com.tr"

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

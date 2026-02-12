const SUPABASE_URL = () => process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface QueryOptions {
  table: string
  select?: string
  filters?: Record<string, string>
  body?: Record<string, unknown>
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  upsert?: boolean
  single?: boolean
}

export async function supabaseRest({ table, select = "*", filters = {}, body, method = "GET", upsert = false, single = false }: QueryOptions) {
  const url = new URL(`${SUPABASE_URL()}/rest/v1/${table}`)
  
  if (method === "GET") {
    url.searchParams.set("select", select)
  }
  
  for (const [key, value] of Object.entries(filters)) {
    url.searchParams.set(key, value)
  }

  const headers: Record<string, string> = {
    "apikey": SUPABASE_KEY(),
    "Authorization": `Bearer ${SUPABASE_KEY()}`,
    "Content-Type": "application/json",
  }

  if (upsert) {
    headers["Prefer"] = "resolution=merge-duplicates"
  }

  if (method === "GET" && single) {
    headers["Accept"] = "application/vnd.pgrst.object+json"
  }

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Supabase REST error ${res.status}: ${errorBody}`)
  }

  if (method === "DELETE" || res.status === 204) {
    return null
  }

  return res.json()
}

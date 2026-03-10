import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getContactFallback } from "@/lib/site-data"
import { supabaseRest } from "@/lib/db"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Boya Rehberi ve Uzman Ipuclari",
  description: "Ic cephe ve dis cephe boyama rehberleri, boya secim kilavuzu, profesyonel boyama ipuclari. Boyaplus uzman ekibinden bilgilendirici icerikler.",
  alternates: {
    canonical: "https://www.boyaplus.com.tr/blog",
  },
  openGraph: {
    title: "Blog - Boya Rehberi ve Uzman Ipuclari | Boyaplus",
    description: "Ic cephe ve dis cephe boyama rehberleri, profesyonel boyama ipuclari.",
    url: "https://www.boyaplus.com.tr/blog",
  },
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  read_time: number
  created_at: string
  is_published: boolean
}

async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return []
  }

  try {
    const posts = await supabaseRest({
      table: "blog_posts",
      select: "id,title,slug,excerpt,category,author,read_time,created_at,is_published",
      filters: { is_published: "eq.true" },
      order: "created_at.desc",
    })
    return Array.isArray(posts) ? posts : []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const contact = getContactFallback()
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-foreground text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
                Boya Rehberi ve Uzman Ipuclari
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Boyama projeleriniz icin ihtiyaciniz olan tum bilgiler. 
                Adim adim rehberler, profesyonel teknikler ve dogru urun secimi ipuclari.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Henuz blog yazisi bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.read_time} dk
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString("tr-TR")}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                        >
                          Devamini Oku
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 text-center p-8 rounded-2xl bg-muted/50 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Projeniz icin Uzman Destegi
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Boyama projeleriniz hakkinda sorulariniz mi var? Uzman ekibimiz size yardimci olsun.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Bize Ulasin
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer contact={contact} />
    </div>
  )
}

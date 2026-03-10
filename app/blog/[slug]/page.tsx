import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getContactFallback } from "@/lib/site-data"
import { supabaseRest } from "@/lib/db"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"

const SITE_URL = "https://www.boyaplus.com.tr"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  read_time: number
  created_at: string
  updated_at: string
  is_published: boolean
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return null
  }

  try {
    const posts = await supabaseRest({
      table: "blog_posts",
      select: "*",
      filters: { slug: `eq.${slug}`, is_published: "eq.true" },
    })
    return Array.isArray(posts) && posts.length > 0 ? posts[0] : null
  } catch {
    return null
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return []
  }

  try {
    const posts = await supabaseRest({
      table: "blog_posts",
      select: "id,title,slug,excerpt,category",
      filters: { is_published: "eq.true" },
      order: "created_at.desc",
    })
    return Array.isArray(posts) ? posts.filter((p: BlogPost) => p.slug !== currentSlug).slice(0, 3) : []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      locale: "tr_TR",
      siteName: "Boyaplus",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const contact = getContactFallback()
  const relatedPosts = await getRelatedPosts(slug)

  // schema.org Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Boyaplus",
      url: SITE_URL,
    },
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.category,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tum Yazilar
              </Link>

              {/* Article Header */}
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.read_time} dk okuma
                  </span>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>

              {/* Internal Links - Urunler ve Ana Sayfa */}
              <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Boyaplus ile Tanismak Ister misiniz?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Premium kalite boya urunlerimizi inceleyerek projeniz icin en dogru secimi yapin.
                  Uzman ekibimiz teknik destek ve urun onerileri icin her zaman yaninda.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/urunler"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Urunlerimizi Incele
                  </Link>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Bize Ulasin
                  </Link>
                </div>
              </div>

              {/* Category Tag */}
              <div className="mt-8">
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Diger Yazilar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all group"
                  >
                    <span className="text-xs text-primary font-medium">{p.category}</span>
                    <h3 className="text-sm font-semibold text-foreground mt-2 group-hover:text-primary transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer contact={contact} />
    </div>
  )
}

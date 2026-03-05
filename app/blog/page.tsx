import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { blogPosts } from "@/lib/blog-data"
import { getContactFallback } from "@/lib/site-data"

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

export default function BlogPage() {
  const contact = getContactFallback()

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

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

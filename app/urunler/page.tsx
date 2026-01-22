"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductsGrid } from "@/components/products/products-grid"
import { CategoryFilter } from "@/components/products/category-filter"
import { categories } from "@/lib/site-data"
import { useSiteDataReadOnly } from "@/hooks/use-site-data"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

function ProductsContent() {
  const { data, isLoading } = useSiteDataReadOnly()
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get("kategori") || "tumu"

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  
  const filteredProducts = categorySlug === "tumu" 
    ? data.products 
    : data.products.filter(p => p.categorySlug === categorySlug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-foreground text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ürünlerimiz
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Premium kalite boya çözümleri ile mekanlarınıza değer katın. 
                Her ihtiyaca uygun geniş ürün yelpazemizi keşfedin.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <CategoryFilter 
              categories={categories} 
              activeCategory={categorySlug} 
            />
            
            <ProductsGrid products={filteredProducts} />
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Bu kategoride ürün bulunamadı.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer contact={data.contact} />
      <WhatsAppButton whatsapp={data.contact.whatsapp} />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  )
}

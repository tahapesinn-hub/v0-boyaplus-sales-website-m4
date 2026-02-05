import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Product, Category } from "@/lib/site-data"

interface ProductsPreviewProps {
  products: Product[]
  categories: Category[]
}

const categoryDescriptions: Record<string, string> = {
  "ic-cephe": "Mat, ipek mat ve saten seçenekleriyle iç mekanlarınız için özel formüller.",
  "dis-cephe": "Her hava koşuluna dayanıklı, UV korumalı dış cephe çözümleri.",
  "ahsap": "Ahşap yüzeyleri besleyen ve koruyan özel ahşap boyaları ve vernikler.",
  "metal": "Metal yüzeyleri koruyan pas önleyici profesyonel boyalar.",
}

export function ProductsPreview({ products, categories }: ProductsPreviewProps) {
  const productCategories = categories
    .slice(0, 3)
    .map(cat => ({
      title: cat.name,
      description: categoryDescriptions[cat.slug] || "",
      href: `/urunler?kategori=${cat.slug}`,
      productCount: products.filter(p => p.categorySlug === cat.slug).length,
    }))

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">
              Ürün Kategorileri
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              İhtiyacınıza Uygun Çözümler
            </h2>
          </div>
          <Button variant="outline" asChild className="w-fit bg-transparent">
            <Link href="/urunler">
              Tüm Ürünler
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productCategories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-foreground"
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-foreground" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-primary-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-primary-foreground/80 mb-2 leading-relaxed">
                  {category.description}
                </p>
                <p className="text-xs text-primary-foreground/60 mb-4">
                  {category.productCount} ürün
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary-foreground group-hover:underline">
                  Keşfet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

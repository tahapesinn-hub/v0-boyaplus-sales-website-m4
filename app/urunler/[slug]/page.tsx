"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { useSiteDataReadOnly } from "@/hooks/use-site-data"
import { ArrowLeft, Check, Clock, Layers, MessageCircle, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProductPage() {
  const params = useParams<{ slug: string }>()
  const { data, isLoading } = useSiteDataReadOnly()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const product = data.products.find(p => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  // Görselleri al (images varsa onu, yoksa image'ı array olarak)
  const images = product.images?.length ? product.images : (product.image ? [product.image] : [])
  const hasImages = images.length > 0

  const whatsappMessage = `Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/urunler" className="text-muted-foreground hover:text-foreground transition-colors">
                Ürünler
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <Link 
              href="/urunler" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Ürünler
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image Gallery */}
              <div className="space-y-4">
                {/* Ana Görsel */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl relative overflow-hidden">
                  {hasImages ? (
                    <>
                      <img 
                        src={images[activeImageIndex]} 
                        alt={`${product.name} - Görsel ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                      {/* Navigasyon oklari */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
                            aria-label="Önceki görsel"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
                            aria-label="Sonraki görsel"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          {/* Gorsel sayaci */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-sm">
                            {activeImageIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-primary/30" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-background/90 backdrop-blur-sm text-sm font-medium rounded-full text-foreground">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Görseller */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={cn(
                          "w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                          activeImageIndex === index 
                            ? "border-primary ring-2 ring-primary/20" 
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} - Küçük görsel ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none"
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">Mevcut Renkler</h2>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Özellikler</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm">Kaplama Alanı</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{product.coverage}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Kuruma Süresi</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{product.dryingTime}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-border space-y-4">
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white">
                      <a 
                        href={`https://wa.me/${data.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        WhatsApp ile Sipariş
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="flex-1 bg-transparent">
                      <a href={`tel:${data.contact.phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        Ara
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products CTA */}
        <section className="py-12 md:py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Diğer Ürünlerimizi Keşfedin
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Premium kalite boya çözümlerimizin tamamını inceleyerek projeniz için en uygun ürünü bulun.
            </p>
            <Button asChild>
              <Link href="/urunler">Tüm Ürünlere Göz At</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer contact={data.contact} />
      <WhatsAppButton whatsapp={data.contact.whatsapp} message={whatsappMessage} />
    </div>
  )
}

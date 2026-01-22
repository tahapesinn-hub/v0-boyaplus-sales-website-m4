"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { ProductsPreview } from "@/components/home/products-preview"
import { CTASection } from "@/components/home/cta-section"
import { useSiteDataReadOnly } from "@/hooks/use-site-data"

export default function HomePage() {
  const { data, isLoading } = useSiteDataReadOnly()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection hero={data.hero} />
        <FeaturesSection />
        <ProductsPreview products={data.products} />
        <CTASection contact={data.contact} />
      </main>
      <Footer contact={data.contact} />
      <WhatsAppButton whatsapp={data.contact.whatsapp} />
    </div>
  )
}

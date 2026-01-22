"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfoDisplay } from "@/components/contact/contact-info-display"
import { useSiteDataReadOnly } from "@/hooks/use-site-data"

export default function ContactPage() {
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
        {/* Page Header */}
        <section className="bg-foreground text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                İletişim
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Projeleriniz için teklif almak veya sorularınızı sormak için bizimle iletişime geçin. 
                En kısa sürede size dönüş yapacağız.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <ContactInfoDisplay contact={data.contact} />
              <ContactForm whatsapp={data.contact.whatsapp} />
            </div>
          </div>
        </section>
      </main>
      <Footer contact={data.contact} />
      <WhatsAppButton whatsapp={data.contact.whatsapp} />
    </div>
  )
}

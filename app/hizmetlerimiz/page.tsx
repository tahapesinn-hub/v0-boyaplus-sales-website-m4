import { Metadata } from "next"
import { supabaseRest } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Home, Shield, Paintbrush, Palette, Droplets, CheckCircle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Boyaplus",
  description: "Profesyonel boya ve kaplama hizmetleri. Ic cephe, dis cephe, ahsap boyama, dekoratif uygulamalar ve su yalitimi.",
  keywords: "boya hizmeti, ic cephe boyama, dis cephe boyama, ahsap boyama, dekoratif boya, su yalitimi",
  alternates: {
    canonical: "https://www.boyaplus.com.tr/hizmetlerimiz",
  },
  openGraph: {
    title: "Hizmetlerimiz | Boyaplus",
    description: "Profesyonel boya ve kaplama hizmetleri.",
    url: "https://www.boyaplus.com.tr/hizmetlerimiz",
  },
}

interface Service {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  features: string[]
  is_active: boolean
  sort_order: number
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Shield,
  Paintbrush,
  Palette,
  Droplets,
}

async function getServices(): Promise<Service[]> {
  try {
    const services = await supabaseRest({
      table: "services",
      select: "*",
      filters: { is_active: "eq.true" },
      order: "sort_order.asc",
    })
    return Array.isArray(services) ? services : []
  } catch {
    return []
  }
}

export default async function HizmetlerimizPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Profesyonel Boya Hizmetleri
              </h1>
              <p className="text-lg text-muted-foreground">
                Uzman ekibimiz ve premium malzemelerimizle mekanlarinizi yeniden hayata donduruyoruz.
                Her projede kalite ve musterj memnuniyeti oncelligimiz.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Paintbrush
                return (
                  <Card key={service.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/hizmetlerimiz/${service.slug}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Detayli Bilgi
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {services.length === 0 && (
              <div className="text-center py-12">
                <Paintbrush className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Hizmetler yukleniyor...</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Projeniz icin Ucretsiz Keşif
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Uzman ekibimiz projenizi yerinde incelesin ve size en uygun cozumu sunalim.
              Ucretsiz kesif icin hemen iletisime gecin.
            </p>
            <Link href="/iletisim">
              <Button size="lg" variant="secondary">
                Iletisime Gecin
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

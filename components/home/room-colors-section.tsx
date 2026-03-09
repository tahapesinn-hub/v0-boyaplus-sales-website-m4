"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sofa, 
  UtensilsCrossed, 
  Bed, 
  Bath, 
  Briefcase, 
  Building2,
  Home,
  Palette,
  ArrowRight
} from "lucide-react"

interface RoomSuggestion {
  id: string
  room_name: string
  slug: string
  description: string
  color_suggestions: string[]
  button_text: string
  button_link: string
  icon: string
  sort_order: number
  is_active: boolean
}

interface SectionData {
  title: string
  subtitle: string
  is_active: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sofa,
  UtensilsCrossed,
  Bed,
  Bath,
  Briefcase,
  Building2,
  Home,
  Palette,
}

export function RoomColorsSection() {
  const [section, setSection] = useState<SectionData | null>(null)
  const [rooms, setRooms] = useState<RoomSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/room-suggestions")
        const data = await res.json()
        setSection(data.section)
        setRooms(data.rooms || [])
      } catch {
        // Varsayilan veriler kullan
        setSection({
          title: "Mekana Gore Renk Onerileri",
          subtitle: "Evinizin her kosesi icin uzman ekibimizin onerilerini kesfedin",
          is_active: true
        })
        setRooms([
          { id: "1", room_name: "Salon", slug: "salon", description: "Salonunuz icin sicak ve davetkar renkler secin.", color_suggestions: ["Krem Beyaz", "Soft Gri", "Bej"], button_text: "Detaylari Gor", button_link: "/blog", icon: "Sofa", sort_order: 1, is_active: true },
          { id: "2", room_name: "Mutfak", slug: "mutfak", description: "Mutfaginizda enerji veren canli renkler tercih edin.", color_suggestions: ["Beyaz", "Acik Yesil", "Limon Sarisi"], button_text: "Detaylari Gor", button_link: "/blog", icon: "UtensilsCrossed", sort_order: 2, is_active: true },
          { id: "3", room_name: "Yatak Odasi", slug: "yatak-odasi", description: "Huzurlu bir uyku icin dinlendirici pastel tonlari kullanin.", color_suggestions: ["Lavanta", "Pudra Pembe", "Acik Mavi"], button_text: "Detaylari Gor", button_link: "/blog", icon: "Bed", sort_order: 3, is_active: true },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (!section?.is_active || rooms.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Palette className="w-3 h-3 mr-1" />
            Uzman Onerileri
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            {section.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {section.subtitle}
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => {
            const IconComponent = iconMap[room.icon] || Home
            return (
              <Card 
                key={room.id} 
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl">{room.room_name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {room.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Color Suggestions */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Onerilen Renkler:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {room.color_suggestions.map((color, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs font-normal"
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-primary/5"
                  >
                    <Link href={room.button_link}>
                      {room.button_text}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Hangi renklerin size uygun oldugunu bilmiyor musunuz?
          </p>
          <Button asChild size="lg">
            <Link href="/iletisim">
              Ucretsiz Renk Danismanligi Alin
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

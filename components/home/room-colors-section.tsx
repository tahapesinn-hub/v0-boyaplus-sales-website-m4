"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  Sofa, 
  UtensilsCrossed, 
  Bed, 
  Bath,
  Palette,
  ArrowRight,
  Check,
  Sparkles
} from "lucide-react"

// Renk paletleri - her rengin hex kodu ve ismi
const COLOR_PALETTES = {
  neutrals: [
    { name: "Saf Beyaz", hex: "#FFFFFF", textDark: true },
    { name: "Krem", hex: "#F5F5DC", textDark: true },
    { name: "Bej", hex: "#E8DCC4", textDark: true },
    { name: "Soft Gri", hex: "#D3D3D3", textDark: true },
    { name: "Antrasit", hex: "#36454F", textDark: false },
  ],
  warm: [
    { name: "Seftali", hex: "#FFCBA4", textDark: true },
    { name: "Terrakota", hex: "#E2725B", textDark: false },
    { name: "Hardal", hex: "#FFDB58", textDark: true },
    { name: "Turuncu", hex: "#FF8C42", textDark: true },
    { name: "Bordo", hex: "#800020", textDark: false },
  ],
  cool: [
    { name: "Buz Mavisi", hex: "#D6EAF8", textDark: true },
    { name: "Gok Mavisi", hex: "#87CEEB", textDark: true },
    { name: "Okyanus", hex: "#006994", textDark: false },
    { name: "Lavanta", hex: "#E6E6FA", textDark: true },
    { name: "Adaçayi", hex: "#9DC183", textDark: true },
  ],
  pastels: [
    { name: "Pudra Pembe", hex: "#F4C2C2", textDark: true },
    { name: "Mint", hex: "#98FB98", textDark: true },
    { name: "Lila", hex: "#C8A2C8", textDark: true },
    { name: "Vanilya", hex: "#F3E5AB", textDark: true },
    { name: "Bebek Mavisi", hex: "#89CFF0", textDark: true },
  ],
}

// Mekan tipleri
const ROOMS = [
  { id: "salon", name: "Salon", icon: Sofa, recommended: ["Krem", "Soft Gri", "Bej", "Seftali"] },
  { id: "mutfak", name: "Mutfak", icon: UtensilsCrossed, recommended: ["Saf Beyaz", "Mint", "Hardal", "Buz Mavisi"] },
  { id: "yatak", name: "Yatak Odasi", icon: Bed, recommended: ["Lavanta", "Pudra Pembe", "Vanilya", "Buz Mavisi"] },
  { id: "banyo", name: "Banyo", icon: Bath, recommended: ["Saf Beyaz", "Buz Mavisi", "Mint", "Soft Gri"] },
]

// SVG Room Visualizer Component
function RoomVisualizer({ color, room }: { color: string; room: string }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-muted/30 to-muted/60 rounded-2xl overflow-hidden shadow-inner">
      {/* Arka duvar */}
      <div 
        className="absolute inset-x-[10%] top-[5%] bottom-[35%] rounded-t-lg transition-colors duration-500 shadow-lg"
        style={{ backgroundColor: color }}
      />
      
      {/* Sol duvar (perspektif) */}
      <div 
        className="absolute left-0 top-[5%] bottom-[35%] w-[10%] transition-colors duration-500"
        style={{ 
          backgroundColor: color,
          filter: "brightness(0.85)",
          clipPath: "polygon(100% 0, 100% 100%, 0 90%, 0 10%)"
        }}
      />
      
      {/* Sag duvar (perspektif) */}
      <div 
        className="absolute right-0 top-[5%] bottom-[35%] w-[10%] transition-colors duration-500"
        style={{ 
          backgroundColor: color,
          filter: "brightness(0.85)",
          clipPath: "polygon(0 0, 0 100%, 100% 90%, 100% 10%)"
        }}
      />

      {/* Tavan */}
      <div className="absolute inset-x-[10%] top-0 h-[5%] bg-white/90" />
      
      {/* Zemin */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-amber-100/80 to-amber-50/60" />
      
      {/* Zemin cizgileri - parke efekti */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] opacity-20">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-full h-px bg-amber-900/30"
            style={{ bottom: `${i * 12.5}%` }}
          />
        ))}
      </div>

      {/* Pencere */}
      <div className="absolute left-[15%] top-[12%] w-[25%] h-[35%] bg-sky-200/60 rounded border-4 border-white shadow-inner">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full border-r-2 border-white/80" />
        </div>
        <div className="absolute inset-0 flex flex-col">
          <div className="h-1/2 border-b-2 border-white/80" />
        </div>
        {/* Perde */}
        <div className="absolute -left-2 -top-2 w-[110%] h-[15%] bg-white/80 rounded-t" />
      </div>

      {/* Resim cercevesi */}
      <div className="absolute right-[15%] top-[15%] w-[20%] h-[25%] bg-gradient-to-br from-amber-100 to-orange-100 rounded border-4 border-amber-800/60 shadow-md" />

      {/* Mobilya - Mekana gore degisir */}
      {room === "salon" && (
        <>
          {/* Koltuk */}
          <div className="absolute bottom-[35%] left-[20%] w-[35%] h-[18%] bg-gray-600 rounded-t-xl shadow-lg" />
          <div className="absolute bottom-[35%] left-[18%] w-[4%] h-[12%] bg-gray-700 rounded-l" />
          <div className="absolute bottom-[35%] right-[43%] w-[4%] h-[12%] bg-gray-700 rounded-r" />
          {/* Sehpa */}
          <div className="absolute bottom-[35%] right-[25%] w-[15%] h-[8%] bg-amber-700 rounded shadow" />
        </>
      )}

      {room === "mutfak" && (
        <>
          {/* Mutfak tezgahi */}
          <div className="absolute bottom-[35%] left-[10%] right-[30%] h-[20%] bg-gray-200 rounded-t shadow-lg" />
          <div className="absolute bottom-[35%] left-[10%] right-[30%] h-[3%] bg-gray-800" />
          {/* Ocak */}
          <div className="absolute bottom-[52%] left-[25%] w-[15%] h-[3%] bg-gray-900 rounded flex justify-around items-center px-1">
            <div className="w-2 h-2 rounded-full bg-gray-700" />
            <div className="w-2 h-2 rounded-full bg-gray-700" />
          </div>
        </>
      )}

      {room === "yatak" && (
        <>
          {/* Yatak */}
          <div className="absolute bottom-[35%] left-[15%] w-[45%] h-[20%] bg-white rounded-t shadow-lg border-2 border-gray-200" />
          <div className="absolute bottom-[50%] left-[15%] w-[15%] h-[8%] bg-gray-100 rounded border border-gray-200" />
          <div className="absolute bottom-[50%] left-[32%] w-[15%] h-[8%] bg-gray-100 rounded border border-gray-200" />
          {/* Komodin */}
          <div className="absolute bottom-[35%] right-[25%] w-[10%] h-[12%] bg-amber-600 rounded-t shadow" />
        </>
      )}

      {room === "banyo" && (
        <>
          {/* Lavabo */}
          <div className="absolute bottom-[35%] left-[15%] w-[25%] h-[15%] bg-white rounded-t shadow-lg border-2 border-gray-100" />
          {/* Ayna */}
          <div className="absolute bottom-[55%] left-[18%] w-[19%] h-[20%] bg-sky-100/50 rounded border-4 border-gray-300 shadow-inner" />
          {/* Dus */}
          <div className="absolute bottom-[35%] right-[15%] w-[25%] h-[30%] bg-gray-100/50 rounded-t border-2 border-gray-200" />
        </>
      )}

      {/* Isik efekti */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
    </div>
  )
}

export function RoomColorsSection() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0])
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTES.neutrals[1]) // Krem
  const [activePalette, setActivePalette] = useState<keyof typeof COLOR_PALETTES>("neutrals")

  const allColors = Object.values(COLOR_PALETTES).flat()
  const isRecommended = selectedRoom.recommended.includes(selectedColor.name)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Sparkles className="w-3 h-3" />
            Interaktif Renk Secici
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            Hayalinizdeki Rengi Gorun
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Renk secin, mekan secin ve duvarlarinizda nasil gorunecegini aninda gorun
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Sol Taraf - Renk Visualizer */}
          <div className="space-y-6">
            {/* Room Preview */}
            <div className="relative">
              <RoomVisualizer color={selectedColor.hex} room={selectedRoom.id} />
              
              {/* Secili renk bilgisi overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3 bg-background/95 backdrop-blur rounded-full pl-1 pr-4 py-1 shadow-lg border">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-inner"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <p className="text-sm font-semibold">{selectedColor.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedColor.hex}</p>
                  </div>
                </div>
                
                {isRecommended && (
                  <Badge className="bg-green-500/90 text-white gap-1 shadow-lg">
                    <Check className="w-3 h-3" />
                    Onerilen
                  </Badge>
                )}
              </div>
            </div>

            {/* Mekan Secimi */}
            <div className="flex flex-wrap gap-2 justify-center">
              {ROOMS.map((room) => {
                const Icon = room.icon
                return (
                  <Button
                    key={room.id}
                    variant={selectedRoom.id === room.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRoom(room)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {room.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Sag Taraf - Renk Paleti */}
          <div className="space-y-6">
            {/* Palet Kategorileri */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "neutrals" as const, label: "Notr Tonlar" },
                { key: "warm" as const, label: "Sicak Tonlar" },
                { key: "cool" as const, label: "Soguk Tonlar" },
                { key: "pastels" as const, label: "Pastel Tonlar" },
              ].map((palette) => (
                <Button
                  key={palette.key}
                  variant={activePalette === palette.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActivePalette(palette.key)}
                  className="text-sm"
                >
                  {palette.label}
                </Button>
              ))}
            </div>

            {/* Renk Grid */}
            <div className="grid grid-cols-5 gap-3">
              {COLOR_PALETTES[activePalette].map((color) => {
                const isSelected = selectedColor.hex === color.hex
                const isRoomRecommended = selectedRoom.recommended.includes(color.name)
                
                return (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "group relative aspect-square rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105",
                      isSelected && "ring-2 ring-primary ring-offset-2 scale-105"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {/* Renk ismi tooltip */}
                    <span className={cn(
                      "absolute inset-x-0 bottom-0 text-[10px] font-medium py-1 bg-black/40 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity truncate px-1",
                      color.textDark ? "text-white" : "text-white"
                    )}>
                      {color.name}
                    </span>
                    
                    {/* Onerilen badge */}
                    {isRoomRecommended && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                    
                    {/* Secili check */}
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          color.textDark ? "bg-black/20" : "bg-white/20"
                        )}>
                          <Check className={cn(
                            "w-4 h-4",
                            color.textDark ? "text-black" : "text-white"
                          )} />
                        </span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Mekan icin onerilen renkler */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">{selectedRoom.name} icin Onerilen Renkler</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.recommended.map((colorName) => {
                  const color = allColors.find(c => c.name === colorName)
                  if (!color) return null
                  
                  return (
                    <button
                      key={colorName}
                      onClick={() => {
                        setSelectedColor(color)
                        // Dogru paleti bul ve sec
                        for (const [key, colors] of Object.entries(COLOR_PALETTES)) {
                          if (colors.some(c => c.name === colorName)) {
                            setActivePalette(key as keyof typeof COLOR_PALETTES)
                            break
                          }
                        }
                      }}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm",
                        selectedColor.name === colorName 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      {colorName}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <Link href="/iletisim">
                  Ucretsiz Renk Danismanligi
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link href="/urunler">
                  Boya Urunlerimiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

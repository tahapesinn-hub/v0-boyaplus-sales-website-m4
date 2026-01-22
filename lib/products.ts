export interface Product {
  id: string
  name: string
  slug: string
  category: string
  categorySlug: string
  description: string
  features: string[]
  coverage: string
  dryingTime: string
  price: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Boyaplus İç Cephe Mat",
    slug: "ic-cephe-mat",
    category: "İç Cephe Boyaları",
    categorySlug: "ic-cephe",
    description: "Yüksek örtücülük ve mat görünüm sağlayan premium iç cephe boyası. Solvent içermez, koku yapmaz.",
    features: ["Yüksek örtücülük", "Mat görünüm", "Koku yapmaz", "Kolay uygulama"],
    coverage: "10-12 m²/L",
    dryingTime: "2-4 saat",
    price: "Teklif alın",
  },
  {
    id: "2",
    name: "Boyaplus İç Cephe İpek Mat",
    slug: "ic-cephe-ipek-mat",
    category: "İç Cephe Boyaları",
    categorySlug: "ic-cephe",
    description: "Zarif ipek mat görünümü ile duvarlarınıza şıklık katan premium boya. Leke tutmaz, kolay temizlenir.",
    features: ["İpek mat görünüm", "Leke tutmaz", "Silinebilir", "Yıkanabilir"],
    coverage: "10-12 m²/L",
    dryingTime: "2-4 saat",
    price: "Teklif alın",
  },
  {
    id: "3",
    name: "Boyaplus İç Cephe Saten",
    slug: "ic-cephe-saten",
    category: "İç Cephe Boyaları",
    categorySlug: "ic-cephe",
    description: "Parlak ve saten görünüm sağlayan premium iç cephe boyası. Banyo ve mutfak için ideal.",
    features: ["Saten parlaklık", "Nem dayanımı", "Küf önleyici", "Hijyenik"],
    coverage: "10-12 m²/L",
    dryingTime: "2-4 saat",
    price: "Teklif alın",
  },
  {
    id: "4",
    name: "Boyaplus Dış Cephe Premium",
    slug: "dis-cephe-premium",
    category: "Dış Cephe Boyaları",
    categorySlug: "dis-cephe",
    description: "Zorlu hava koşullarına karşı maksimum koruma sağlayan profesyonel dış cephe boyası.",
    features: ["UV koruması", "Su itici", "Nefes alabilir", "10 yıl garanti"],
    coverage: "8-10 m²/L",
    dryingTime: "4-6 saat",
    price: "Teklif alın",
  },
  {
    id: "5",
    name: "Boyaplus Dış Cephe Elastik",
    slug: "dis-cephe-elastik",
    category: "Dış Cephe Boyaları",
    categorySlug: "dis-cephe",
    description: "Çatlak köprüleme özelliği ile mükemmel esneklik sağlayan dış cephe boyası.",
    features: ["Çatlak köprüleme", "Elastik yapı", "Su geçirmez", "Renk kalıcılığı"],
    coverage: "6-8 m²/L",
    dryingTime: "4-6 saat",
    price: "Teklif alın",
  },
  {
    id: "6",
    name: "Boyaplus Ahşap Koruyucu",
    slug: "ahsap-koruyucu",
    category: "Ahşap Boyaları",
    categorySlug: "ahsap",
    description: "Ahşabı besleyen ve koruyan özel formüllü ahşap koruyucu. Doğal görünümü korur.",
    features: ["Ahşabı besler", "UV koruması", "Su itici", "Doğal görünüm"],
    coverage: "8-10 m²/L",
    dryingTime: "6-8 saat",
    price: "Teklif alın",
  },
  {
    id: "7",
    name: "Boyaplus Ahşap Vernik",
    slug: "ahsap-vernik",
    category: "Ahşap Boyaları",
    categorySlug: "ahsap",
    description: "Parlak ve mat seçenekleriyle ahşap yüzeylerinizi koruyan premium vernik.",
    features: ["Şeffaf koruma", "Çizilmeye dayanıklı", "Kolay uygulama", "Hızlı kuruma"],
    coverage: "12-14 m²/L",
    dryingTime: "4-6 saat",
    price: "Teklif alın",
  },
  {
    id: "8",
    name: "Boyaplus Metal Boya",
    slug: "metal-boya",
    category: "Metal Boyaları",
    categorySlug: "metal",
    description: "Pas önleyici formülü ile metal yüzeyleri koruyan profesyonel metal boyası.",
    features: ["Pas önleyici", "Direkt uygulama", "Yüksek yapışma", "Uzun ömür"],
    coverage: "10-12 m²/L",
    dryingTime: "6-8 saat",
    price: "Teklif alın",
  },
]

export const categories = [
  { name: "Tümü", slug: "tumu" },
  { name: "İç Cephe Boyaları", slug: "ic-cephe" },
  { name: "Dış Cephe Boyaları", slug: "dis-cephe" },
  { name: "Ahşap Boyaları", slug: "ahsap" },
  { name: "Metal Boyaları", slug: "metal" },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "tumu") return products
  return products.filter(p => p.categorySlug === categorySlug)
}

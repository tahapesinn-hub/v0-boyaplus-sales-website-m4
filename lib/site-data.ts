// Site genelinde kullanılacak veri tipleri ve varsayılan değerler

export interface AdminUser {
  id: string
  username: string
  password: string
  name: string
  role: "admin" | "editor"
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

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
  colors?: string[]
  image?: string // Geriye uyumluluk için
  images?: string[] // Çoklu görsel desteği (max 10)
}

export interface HeroContent {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  address: string
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
}

export interface SeoMeta {
  title: string
  description: string
  keywords: string
}

export interface SiteData {
  products: Product[]
  categories: Category[]
  hero: HeroContent
  contact: ContactInfo
  seo: SeoMeta
  users: AdminUser[]
}

export const defaultCategories: Category[] = [
  { id: "1", name: "İç Cephe Boyaları", slug: "ic-cephe" },
  { id: "2", name: "Dış Cephe Boyaları", slug: "dis-cephe" },
  { id: "3", name: "Ahşap Boyaları", slug: "ahsap" },
  { id: "4", name: "Metal Boyaları", slug: "metal" },
]

// Geriye uyumluluk için
export const categories = [
  { name: "Tümü", slug: "tumu" },
  ...defaultCategories.map(c => ({ name: c.name, slug: c.slug }))
]

export const defaultProducts: Product[] = [
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
    colors: ["Beyaz", "Kırık Beyaz", "Krem"],
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
    colors: ["Beyaz", "Fildişi", "Gri"],
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
    colors: ["Beyaz", "Krem", "Bej"],
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
    colors: ["Beyaz", "Krem", "Gri", "Bej"],
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
    colors: ["Beyaz", "Kırık Beyaz"],
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
    colors: ["Şeffaf", "Ceviz", "Meşe", "Tik"],
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
    colors: ["Şeffaf Parlak", "Şeffaf Mat"],
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
    colors: ["Siyah", "Beyaz", "Gri", "Yeşil", "Mavi"],
  },
]

export const defaultHero: HeroContent = {
  title: "Mekanlarınıza Renk ve Hayat Katın",
  subtitle: "Boyaplus ile premium kalite iç ve dış cephe boyaları. 25 yıllık tecrübemizle projeleriniz için en iyi çözümleri sunuyoruz.",
  buttonText: "Ürünleri Keşfet",
  buttonLink: "/urunler",
}

export const defaultContact: ContactInfo = {
  phone: "+90 555 123 45 67",
  whatsapp: "905551234567",
  email: "info@boyaplus.com",
  address: "Organize Sanayi Bölgesi, 5. Cadde No: 42, Pendik, İstanbul",
  workingHours: {
    weekdays: "Pazartesi - Cuma: 08:00 - 18:00",
    saturday: "Cumartesi: 09:00 - 14:00",
    sunday: "Pazar: Kapalı",
  },
}

export const defaultSeo: SeoMeta = {
  title: "Boyaplus | Premium Türk Boya Markası",
  description: "Boyaplus ile duvarlarınıza hayat verin. Premium kalite iç ve dış cephe boyaları, profesyonel çözümler.",
  keywords: "boya, türk boya, iç cephe, dış cephe, premium boya, boyaplus",
}

export const defaultUsers: AdminUser[] = [
  {
    id: "1",
    username: "admin",
    password: "boyaplusadmin",
    name: "Ana Yönetici",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
]

export const defaultSiteData: SiteData = {
  products: defaultProducts,
  categories: defaultCategories,
  hero: defaultHero,
  contact: defaultContact,
  seo: defaultSeo,
  users: defaultUsers,
}

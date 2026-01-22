import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { type ContactInfo } from "@/lib/site-data"

interface FooterProps {
  contact: ContactInfo
}

export function Footer({ contact }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">B+</span>
              </div>
              <span className="text-xl font-bold text-foreground">Boyaplus</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium kalite boya çözümleri ile mekanlarınıza değer katıyoruz. 
              25 yıllık tecrübemizle yanınızdayız.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Hızlı Linkler</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/urunler" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ürünler
              </Link>
              <Link href="/iletisim" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                İletişim
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Ürünlerimiz</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/urunler?kategori=ic-cephe" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                İç Cephe Boyaları
              </Link>
              <Link href="/urunler?kategori=dis-cephe" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dış Cephe Boyaları
              </Link>
              <Link href="/urunler?kategori=ahsap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ahşap Boyaları
              </Link>
              <Link href="/urunler?kategori=metal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Metal Boyaları
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">İletişim</h3>
            <div className="flex flex-col gap-3">
              <a 
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{contact.phone}</span>
              </a>
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{contact.address.split(',').slice(-2).join(',').trim()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Boyaplus. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

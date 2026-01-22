import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"
import { type ContactInfo } from "@/lib/site-data"

interface CTASectionProps {
  contact: ContactInfo
}

export function CTASection({ contact }: CTASectionProps) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center bg-foreground rounded-2xl p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Projeniz İçin Teklif Alın
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
            Uzman ekibimiz projeniz için en uygun çözümleri sunmak için hazır. 
            WhatsApp üzerinden hızlıca iletişime geçin veya bizi arayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <a 
                href={`https://wa.me/${contact.whatsapp}?text=Merhaba,%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp ile Yazın
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 h-5 w-5" />
                {contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

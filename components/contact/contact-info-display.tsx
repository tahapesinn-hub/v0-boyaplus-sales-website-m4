import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ContactInfo } from "@/lib/site-data"

interface ContactInfoDisplayProps {
  contact: ContactInfo
}

export function ContactInfoDisplay({ contact }: ContactInfoDisplayProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Bize Ulaşın
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Premium boya çözümlerimiz hakkında bilgi almak, toptan sipariş vermek 
          veya projeleriniz için teklif almak için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      {/* WhatsApp CTA */}
      <div className="p-6 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              WhatsApp ile Hızlı İletişim
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              En hızlı yanıt için WhatsApp üzerinden bize yazın.
            </p>
            <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <a 
                href={`https://wa.me/${contact.whatsapp}?text=Merhaba,%20ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp ile Yazın
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
            <a 
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">E-posta</h3>
            <a 
              href={`mailto:${contact.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Adres</h3>
            <p className="text-muted-foreground">
              {contact.address.split(',').map((line, i) => (
                <span key={i}>
                  {line.trim()}
                  {i < contact.address.split(',').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Çalışma Saatleri</h3>
            <p className="text-muted-foreground">
              {contact.workingHours}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

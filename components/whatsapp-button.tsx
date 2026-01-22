"use client"

import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  whatsapp: string
  message?: string
}

export function WhatsAppButton({ 
  whatsapp, 
  message = "Merhaba, ürünleriniz hakkında bilgi almak istiyorum." 
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline font-medium">WhatsApp</span>
    </a>
  )
}

"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"

interface ContactFormProps {
  whatsapp: string
}

export function ContactForm({ whatsapp }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-xl border border-border bg-card text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Mesajınız Alındı
        </h3>
        <p className="text-muted-foreground mb-6">
          En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Yeni Mesaj Gönder
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 rounded-xl border border-border bg-card">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Mesaj Gönderin
      </h2>
      <p className="text-muted-foreground mb-6">
        Formu doldurun, size en kısa sürede dönüş yapalım.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Adınız Soyadınız" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="0555 123 45 67" 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="ornek@email.com" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Konu</Label>
          <Input 
            id="subject" 
            name="subject" 
            placeholder="Konu başlığı" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mesajınız</Label>
          <Textarea 
            id="message" 
            name="message" 
            placeholder="Mesajınızı buraya yazın..." 
            rows={5}
            required 
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            "Gönderiliyor..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Mesaj Gönder
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

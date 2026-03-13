import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.boyaplus.com.tr'),
  title: {
    default: 'Boyaplus | Premium Boya Markasi - Ic ve Dis Cephe Boyalari',
    template: '%s | Boyaplus',
  },
  description: 'Boyaplus ile mekanlariniza deger katin. Premium kalite ic cephe, dis cephe, ahsap ve metal boyalari. Turkiye geneli profesyonel boya cozumleri ve uygun fiyatlar.',
  keywords: ['boya', 'ic cephe boya', 'dis cephe boya', 'ahsap boya', 'metal boya', 'premium boya', 'boyaplus', 'duvar boyasi', 'boya fiyatlari', 'boya cesitleri', 'turk boya markasi'],
  authors: [{ name: 'Boyaplus' }],
  creator: 'Boyaplus',
  publisher: 'Boyaplus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.boyaplus.com.tr',
    siteName: 'Boyaplus',
    title: 'Boyaplus | Premium Boya Markasi',
    description: 'Premium kalite ic ve dis cephe boyalari. Turkiye geneli profesyonel boya cozumleri.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boyaplus | Premium Boya Markasi',
    description: 'Premium kalite ic ve dis cephe boyalari. Turkiye geneli profesyonel boya cozumleri.',
  },
  alternates: {
    canonical: 'https://www.boyaplus.com.tr',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Boyaplus",
              url: "https://www.boyaplus.com.tr",
              logo: "https://www.boyaplus.com.tr/icon.svg",
              description:
                "Premium kalite ic ve dis cephe boyalari. Turkiye geneli profesyonel boya cozumleri.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Istanbul",
                addressCountry: "TR",
              },
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Turkish",
              },
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Boyaplus",
              url: "https://www.boyaplus.com.tr",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.boyaplus.com.tr/urunler?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}

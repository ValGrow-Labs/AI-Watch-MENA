import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'AI Watch MENA — The Intelligence Behind the MENA AI Economy',
    template: '%s | AI Watch MENA',
  },
  description:
    'Premium regional AI intelligence platform covering artificial intelligence developments, funding, policy, and enterprise AI across the Middle East and North Africa.',
  keywords: [
    'AI MENA',
    'Middle East AI',
    'artificial intelligence Saudi Arabia',
    'AI UAE',
    'MENA tech',
    'AI funding',
    'AI policy',
    'sovereign AI',
    'Arabic AI',
    'AI Watch MENA',
  ],
  authors: [{ name: 'AI Watch MENA' }],
  creator: 'AI Watch MENA',
  publisher: 'AI Watch MENA',
  metadataBase: new URL('https://aiwatchmena.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://aiwatchmena.com',
    siteName: 'AI Watch MENA',
    title: 'AI Watch MENA — The Intelligence Behind the MENA AI Economy',
    description:
      'Premium regional AI intelligence platform covering the Middle East and North Africa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Watch MENA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Watch MENA',
    description: 'The Intelligence Behind the MENA AI Economy.',
    creator: '@AIWatchMENA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Origami AI | Fold Complexity Into Intelligent AI Agents',
  description: 'The Origami AI builds secure, customized AI agents that automate your business — without disrupting your workflow.',
  keywords: ['AI agents', 'business automation', 'customer support AI', 'sales automation', 'HR automation'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'The Origami AI | Fold Complexity Into Intelligent AI Agents',
    description: 'The Origami AI builds secure, customized AI agents that automate your business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}


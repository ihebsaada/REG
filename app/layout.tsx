import '@/styles/index.css'

import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Respect Environment Group',
  description: 'Respect Environment Group website',
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

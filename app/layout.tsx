import '@/styles/index.css'
import '@/styles/index.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { toPlainText } from '@portabletext/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Inter as FontSans } from 'next/font/google'
import { draftMode } from 'next/headers'
import { headers } from 'next/headers'
import { Suspense } from 'react'

import { Footer } from '@/components/global/Footer'
import { GlobalRequestLoader } from '@/components/global/GlobalRequestLoader'
import { Navbar } from '@/components/global/Navbar'
import { ThemeProvider } from '@/components/global/theme-provider'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { Toaster } from '@/components/ui/toaster'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'))
const baseUrl = process.env.VERCEL_URL
export const locales = ['en', 'fr', 'ar'] as const

export async function generateMetadata(): Promise<Metadata> {
  const lang = 'en'
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(lang),
    loadHomePage(lang),
  ])
  const ogImage = urlForOpenGraphImage(settings?.ogImage)

  return {
    title: homePage?.title
      ? {
          template: `%s`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      title: homePage?.title || 'Respect Environment Group',
      description: homePage?.overview
        ? toPlainText(homePage.overview)
        : 'Join REG in revolutionizing recycling and demolition practices across Tunisia!',
      url: baseUrl,
      siteName: 'Respect Environment Group',
      type: 'website',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: homePage?.title || 'Respect Environment Group',
      description: homePage?.overview
        ? toPlainText(homePage.overview)
        : undefined,
    },
    metadataBase: new URL(`https://${baseUrl}`),
    appleWebApp: {
      capable: true,
      title: homePage?.title,
      statusBarStyle: 'black-translucent',
    },
    icons: [
      { rel: 'icon', url: `https://${baseUrl}` },
      { rel: 'icon', url: `https://${baseUrl}/metadata/favicon-16x16.png` },
      {
        rel: 'apple-touch-icon',
        url: `https://${baseUrl}/metadata/apple-touch-icon.png`,
      },
      {
        rel: 'mask-icon',
        url: `https://${baseUrl}/metadata/safari-pinned-tab.svg`,
        color: '#1e9146',
      },
      {
        rel: 'shortcut icon',
        url: `https://${baseUrl}/metadata/favicon.ico`,
      },
    ],
    manifest: `https://${baseUrl}/manifest.json`,
    robots: 'index, follow',
    abstract: homePage?.overview ? toPlainText(homePage.overview) : undefined,
    applicationName: homePage?.title,
    authors: [{ name: homePage?.title, url: `https://${baseUrl}` }],
    category: 'Services for renewable energy',
    classification:
      "Join REG in revolutionizing recycling and demolition practices across Tunisia! Let's build a greener, cleaner future together. #RecycleSmart #SustainableDemolition",
    creator: 'Arfacod',
    generator: 'Next.js',
    publisher: 'Vercel',
    keywords: ['Recycle Smart', 'Sustainable Demolition'],
    referrer: 'origin',
    other: {
      'og:image:alt': 'My Website',
      'apple-mobile-web-app-title': 'Respect Environment Group',
      'application-name': 'Respect Environment Group',
      'msapplication-TileColor': '#1e9146',
      'theme-color': '#ffffff',
    },
  }
}
const GOOGLE_TAG_MANAGER_ID = process.env.GOOGLE_TAG_MANAGER_ID

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export function generateStaticParams() {
  return locales.map((l) => ({ locale: l }))
}
export const viewport: Viewport = {
  themeColor: '#000',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = 'en'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        <LanguageProvider initialLanguage={lang}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 👇 Se monte une fois, patch fetch globalement */}
            <GlobalRequestLoader />
            <div className="flex flex-col min-h-screen">
              <Suspense>
                <Navbar />
              </Suspense>
              <Suspense>{children}</Suspense>
              <Footer />
              <Toaster />
              <ScrollToTop />
              <SpeedInsights />
              <Analytics />
              <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID as string} />
            </div>
            {draftMode().isEnabled && <VisualEditing />}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

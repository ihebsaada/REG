import '@/styles/index.css'

import Script from 'next/script'
import { toPlainText } from '@portabletext/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Inter as FontSans } from 'next/font/google'
import { draftMode } from 'next/headers'
// import { headers } from 'next/headers'
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000')

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
      url: siteUrl,
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
    // metadataBase: new URL(`https://${siteUrl}`),
    metadataBase: new URL(`https://${siteUrl}`),
    appleWebApp: {
      capable: true,
      title: homePage?.title,
      statusBarStyle: 'black-translucent',
    },
    icons: [
      {
        rel: 'icon',
        url: new URL('/metadata/favicon-32x32.png', siteUrl).toString(),
      },
      {
        rel: 'icon',
        url: new URL('/metadata/favicon-16x16.png', siteUrl).toString(),
      },
      {
        rel: 'apple-touch-icon',
        url: new URL('/metadata/apple-touch-icon.png', siteUrl).toString(),
      },
      {
        rel: 'mask-icon',
        url: new URL('/metadata/safari-pinned-tab.svg', siteUrl).toString(),
        color: '#1e9146',
      },
      {
        rel: 'shortcut icon',
        url: new URL('/metadata/favicon.ico', siteUrl).toString(),
      },
    ],
    // manifest: new URL('/manifest.json', siteUrl).toString(),
    manifest: new URL('/manifest.webmanifest', siteUrl).toString(),
    robots: 'index, follow',
    abstract: homePage?.overview ? toPlainText(homePage.overview) : undefined,
    applicationName: homePage?.title,
    authors: [{ name: homePage?.title, url: siteUrl }],
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
              <Script
                id="gtm-init"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
                  `,
                }}
              />
              <Script
                id="gtm-script"
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`}
              />
            </div>
            {draftMode().isEnabled && <VisualEditing />}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

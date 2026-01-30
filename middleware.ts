// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// const locales = ['en', 'fr', 'ar'] as const
// const defaultLocale = 'en'

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   // Ignore Next internals, API, studio, fichiers statiques
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') ||
//     pathname.startsWith('/studio') ||
//     pathname.match(/\.[^/]+$/)
//   ) {
//     return NextResponse.next()
//   }

//   // Page racine / : redirige vers la locale par défaut
//   if (pathname === '/') {
//     const url = req.nextUrl.clone()
//     url.pathname = `/${defaultLocale}`
//     return NextResponse.rewrite(url)
//   }

//   // Détecte si une locale est déjà présente dans l'URL
//   const hasLocale = locales.some(
//     (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
//   )

//   if (hasLocale) {
//     // Ajoute la locale détectée dans les request headers
//     const current =
//       locales.find(
//         (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
//       ) ?? defaultLocale

//     const h = new Headers(req.headers)
//     h.set('x-locale', current)
//     return NextResponse.next({ request: { headers: h } })
//   }

//   // Sinon redirige vers la locale par défaut
//   const url = req.nextUrl.clone()
//   url.pathname = `/${defaultLocale}${pathname}`
//   return NextResponse.rewrite(url)
// }

// export const config = {
//   matcher: ['/((?!_next|.*\\..*|api|studio).*)'],
// }
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const locales = ['en', 'fr', 'ar'] as const
const defaultLocale = 'en'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ Ignore Next internals, API, studio, fichiers statiques, well-known, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/.well-known') || // ✅ IMPORTANT
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Page racine / : redirige vers la locale par défaut
  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}`
    return NextResponse.rewrite(url)
  }

  // Détecte si une locale est déjà présente dans l'URL
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )

  if (hasLocale) {
    const current =
      locales.find(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
      ) ?? defaultLocale

    const h = new Headers(req.headers)
    h.set('x-locale', current)
    return NextResponse.next({ request: { headers: h } })
  }

  // Sinon redirige vers la locale par défaut
  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // ✅ on exclut aussi .well-known ici
    '/((?!_next|api|studio|\\.well-known|.*\\..*).*)',
  ],
}

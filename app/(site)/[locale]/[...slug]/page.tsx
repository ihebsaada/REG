import { toPlainText } from '@portabletext/react'
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import HandleLink from '@/components/global/HandleLink'
import { Page } from '@/components/pages/page/Page'
import { getDictionary } from '@/lib/i18n'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage } from '@/sanity/loader/loadQuery'

const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Locale = 'en' | 'fr' | 'ar'

type RouteParams = {
  locale: Locale
  slug: string[]
}

type Props = {
  params: RouteParams
}

function getSlugFromParams(params: RouteParams) {
  return params.slug.join('/')
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const lang: Locale = params.locale ?? 'en'
  const slug = getSlugFromParams(params)

  const { data: page } = await loadPage(slug, lang)

  return {
    title: page?.title,
    description: page?.overview
      ? toPlainText(page.overview)
      : (await parent).description,
  }
}

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'fr', 'ar']

  const slugs: any[] = await generateStaticSlugs('page')

  return locales.flatMap((locale) =>
    slugs.map((entry) => {
      const value =
        typeof entry === 'string'
          ? entry
          : typeof entry?.slug === 'string'
            ? entry.slug
            : entry?.slug?.current ?? ''

      return {
        locale,
        slug: value.split('/'),
      }
    }),
  )
}

export default async function PageSlugRoute({ params }: Props) {
  const lang: Locale = params.locale ?? 'en'
  const slug = getSlugFromParams(params)

  const [initial, dict] = await Promise.all([
    loadPage(slug, lang),
    getDictionary(lang),
  ])

  if (draftMode().isEnabled) {
    return (
      <PagePreview
        initial={initial}
        params={{ slug }}
        dict={dict}
        lang={lang}
      />
    )
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} dict={dict} lang={lang} />
}

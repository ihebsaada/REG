import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { ProjectPage } from '@/components/pages/project/ProjectPage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadProjectBySlug } from '@/sanity/loader/loadQuery'
const ProjectPreview = dynamic(
  () => import('@/components/pages/project/ProjectPreview'),
)

type Props = {
  params: { slug: string; locale: 'en' | 'fr' | 'ar' }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const lang = params.locale ?? 'en'

  const { data: project } = await loadProjectBySlug(params.slug, lang)
  const ogImage = urlForOpenGraphImage(project?.coverImage)

  return {
    title: project?.title,
    description: project?.overview
      ? toPlainText(project.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('project')
}

export default async function ProjectSlugRoute({ params }: Props) {
  const lang = params.locale ?? 'en'

  const initial = await loadProjectBySlug(params.slug, lang)

  if (draftMode().isEnabled) {
    return <ProjectPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <ProjectPage data={initial.data} />
}

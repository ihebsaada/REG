import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)
    ?.width(1200)
    .height(627)
    .fit('crop')
    .auto('format')
    .url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
  locale: string = 'en',
): string | undefined {
  const loc = locale.startsWith('/') ? locale.slice(1) : locale
  switch (documentType) {
    case 'home':
      return `/${loc}`
    case 'page':
    case 'internalLink':
      return slug ? `/${loc}/${slug}` : undefined
    case 'project':
      return slug ? `/${loc}/projects/${slug}` : undefined
    case 'post':
      return slug ? `/${loc}/posts/${slug}` : undefined
    case 'innovation':
      return slug ? `/${loc}/innovations/${slug}` : undefined
    case 'opportunity':
      return slug ? `/${loc}/tenders/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

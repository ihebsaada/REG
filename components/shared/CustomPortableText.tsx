import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import dynamic from 'next/dynamic'
import type { Image } from 'sanity'

import { TimelineSection } from '@/components/shared/TimelineSection'

import { VideoPlayer } from './VideoPlayer'
// These might be client components, so load them dynamically with ssr: false
const ImageBox = dynamic(() => import('@/components/shared/ImageBox'), {
  ssr: false,
  loading: () => null,
})

// const TimelineSection = dynamic(
//   () => import('@/components/shared/TimelineSection'),
//   { ssr: false, loading: () => null },
// )

// const VideoPlayer = dynamic(
//   () => import('./VideoPlayer'),
//   { ssr: false, loading: () => null },
// )

type CustomPortableTextProps = {
  paragraphClasses?: string
  // we keep `any` because Sanity can return different shapes
  value: any
  inline?: boolean
}

/**
 * Normalise les valeurs PortableText :
 * - Si un bloc est de type "internationalizedArrayTextValue",
 *   on renvoie directement son champ `value` (qui contient les vrais blocks).
 */
function normalizePortableText(value: any): PortableTextBlock[] {
  if (!value) return []

  // single object
  if (!Array.isArray(value)) {
    if (value._type === 'internationalizedArrayTextValue') {
      return normalizePortableText(value.value)
    }
    if (value._type === 'block') {
      return [value as PortableTextBlock]
    }
    return []
  }

  // array
  return value.flatMap((block: any) => {
    if (block?._type === 'internationalizedArrayTextValue') {
      const inner = block?.value
      if (Array.isArray(inner)) {
        return inner as PortableTextBlock[]
      }
      return []
    }

    return block as PortableTextBlock
  })
}

export function CustomPortableText({
  paragraphClasses,
  value,
  inline = false, // default keeps old behavior
}: CustomPortableTextProps) {
  const normalized = normalizePortableText(value)

  if (!normalized.length) return null

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        if (inline) {
          return <span className={paragraphClasses}>{children}</span>
        }
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => (
        <a
          className="underline transition hover:opacity-50"
          href={value?.href}
          rel="noreferrer noopener"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => (
        <div className="my-6 space-y-2">
          <ImageBox
            image={value}
            alt={value.alt}
            classesWrapper="relative aspect-[16/9]"
            src={''}
          />
          {value?.caption && (
            <div className="font-sans text-sm text-gray-600">
              {value.caption}
            </div>
          )}
        </div>
      ),
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
      videoType: ({ value }) => {
        const { url } = value || {}
        return <VideoPlayer url={url} />
      },
    },
  }

  return <PortableText components={components} value={normalized} />
}

export default CustomPortableText

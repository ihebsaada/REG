import { stegaClean } from '@sanity/client/stega'

import ImageBox from '@/components/shared/ImageBox'
import type { MilestoneItem } from '@/types'

export function TimelineItem({
  isLast,
  milestone,
}: {
  isLast: boolean
  milestone: MilestoneItem
}) {
  const { description, duration, image, tags, title } = milestone
  const startYear = duration?.start
    ? stegaClean(duration.start).substring(0, 4)
    : undefined
  const endYear = duration?.end ? stegaClean(duration.end).substring(0, 4) : 'Now'

  return (
    <div className={`flex min-h-[200px] font-sans ${!isLast && 'pb-2'}`}>
      <div className="flex flex-col">
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden rounded-md bg-black"
          style={{ width: '65px', height: '65px' }}
        >
          <ImageBox
            image={image}
            alt={title || 'Timeline item icon'}
            size="10vw"
            width={65}
            height={65}
            src={''}
          />
        </div>
        {/* Vertical line */}
        {!isLast && <div className="mt-2 w-px grow self-center bg-gray-200" />}
      </div>
      <div className="flex-initial pl-4">
        {/* Title */}
        <div className="font-bold text-black">{title}</div>
        {/* Tags */}
        <div className="text-sm text-gray-600 ">
          {tags?.map((tag, key) => (
            <span key={`${tag}-${key}`}>
              {tag}
              <span className="mx-1">●</span>
            </span>
          ))}
          {startYear} - {endYear}
        </div>
        {/* Description */}
        <div className="pb-5 pt-3 font-serif text-gray-600">{description}</div>
      </div>
    </div>
  )
}

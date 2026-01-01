'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import HandleLink from '@/components/global/HandleLink'
import { useLanguage } from '@/components/LanguageProvider'
/* import { siteConfig } from '@/config/site' */
import { cn } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem } from '@/types'

interface Props {
  className?: string
  menuItems: MenuItem[]
}

export function MainNav(props: Props) {
  const pathname = usePathname()

  const { menuItems, className } = props
  const { language } = useLanguage()

  const restItems = menuItems.filter((item) => item?._type !== 'home')
  return (
    <div className={className}>
      <nav className="flex items-center gap-8 text-sm">
        <HandleLink
          key="workflow"
          href={'/workflow/flow.html'}
          target="_blank"
          className={cn(
            'transition-colors hover:text-green-500 no-wrap',
            'text-foreground',
          )}
        >
          WorkFlow
        </HandleLink>
        {restItems.map((item, key) => {
          const href = resolveHref(item?._type, item?.slug, language)
          if (!href) {
            return null
          }
          return (
            <HandleLink
              key={key}
              href={href}
              className={cn(
                'transition-colors hover:text-green-500 no-wrap',
                pathname?.startsWith(href)
                  ? 'text-green-500 font-bold'
                  : 'text-foreground',
              )}
            >
              {item.title}
            </HandleLink>
          )
        })}
      </nav>
    </div>
  )
}

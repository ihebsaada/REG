'use client'

import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

import HandleLink from '@/components/global/HandleLink'
import { useDictionary } from '@/lib/useDictionary'

type NextBreadcrumbProps = {
  homeElement: ReactNode
  separator: ReactNode
  containerClasses?: string
  listClasses?: string
  activeClasses?: string
  capitalizeLinks?: boolean
}

export const NextBreadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: NextBreadcrumbProps) => {
  const paths = usePathname()
  const pathNames = paths?.split('/').filter((path) => path)

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <HandleLink href={'/'}>{homeElement}</HandleLink>
        </li>
        {pathNames && pathNames.length > 0 && separator}
        {pathNames?.map((link, index) => {
          let href = `/${pathNames?.slice(0, index + 1).join('/')}`

          let itemClasses = paths === href ? `${activeClasses}` : listClasses
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                {index < pathNames.length - 1 ? (
                  <HandleLink href={href}>{itemLink}</HandleLink>
                ) : (
                  itemLink
                )}
              </li>
              {pathNames?.length !== index + 1 && separator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export const AppBreadcrumb = () => {
  const { dict } = useDictionary()

  return (
    <NextBreadcrumb
      homeElement={
        <span className="text-gray-400 hover:text-gray-500">
          <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
          <span className="sr-only">{dict.breadcrumb.home}</span>
        </span>
      }
      separator="/"
      containerClasses="flex items-center gap-x-2 text-sm text-gray-400"
      listClasses="flex items center gap-x-2 hover:text-gray-500"
      activeClasses="font-bold text-gray-900 dark:text-gray-300"
      capitalizeLinks={true}
    />
  )
}

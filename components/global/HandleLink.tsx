'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { ReactNode } from 'react'

import { loadingBus } from '@/lib/loadingBus'

interface Props extends LinkProps {
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export default function HandleLink({
  children,
  href,
  className,
  onClick,
  target,
  rel,
  ...props
}: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (e.defaultPrevented) {
      return
    }

    const hrefString = typeof href === 'string' ? href : href.toString()

    if (target) {
      e.preventDefault()
      window.open(
        hrefString,
        target,
        target === '_blank' ? 'noopener,noreferrer' : undefined,
      )
      return
    }

    e.preventDefault()
    if (pathname === hrefString) return

    loadingBus.emit(true)
    router.push(hrefString)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
      {...props}
    >
      {children}
    </Link>
  )
}

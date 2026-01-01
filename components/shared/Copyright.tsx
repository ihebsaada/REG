import Link from 'next/link'

import HandleLink from '@/components/global/HandleLink'

interface CopyrightProps {
  className?: string
  brand?: string
  copyright?: React.ReactNode
}

export function Copyright({
  className = '',
  brand,
  copyright,
}: CopyrightProps) {
  return (
    <div
      className={`p-6 text-center bg-green-200 dark:bg-green-700 text-sm ${className}`}
    >
      <p className="font-semibold text-green-600 dark:text-green-200">
        {brand}
      </p>
      <p className="text-green-600 dark:text-green-400 hover:text-green-500">
        {copyright}
      </p>
      {/* <Link
        className="text-green-600 dark:text-green-400 hover:text-green-500"
        href="/"
      >
        {copyright}
      </HandleLink> */}
    </div>
  )
}

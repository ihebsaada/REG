'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { loadingBus } from '@/lib/loadingBus'

export function GlobalRequestLoader() {
  const [active, setActive] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = loadingBus.subscribe((state) => {
      if (state === true) setActive(true)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    setActive((prev) => (prev ? false : prev))
  }, [pathname])

  // UI
  return active ? (
    <div className="fixed top-[72px] left-0 w-full z-[9999] flex justify-center pointer-events-none">
      <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin bg-white/80 shadow" />
      <span className="ml-2 text-green-700 font-semibold text-sm bg-white/80 px-2 py-1 rounded shadow">
        Loading…
      </span>
    </div>
  ) : null
}

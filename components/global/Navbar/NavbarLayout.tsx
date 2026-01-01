'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import HandleLink from '@/components/global/HandleLink'
import { useLanguage } from '@/components/LanguageProvider'
import { MobileNav } from '@/components/shared/MobileNav'
import { PopoverSettings } from '@/components/shared/PopoverSettings'
import { Button } from '@/components/ui/button'
import type { SettingsPayload } from '@/types'

import { MainNav } from './main-nav'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar({ data }: NavbarProps) {
  const menuItems = data?.menuItems || []
  const socialNetworks = data?.socialNetworks
  const homeItem = menuItems.find((item) => item?._type === 'home')
  const { language, setLanguage } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const languageOptions = [
    { code: 'en', icon: '/images/en.png' },
    { code: 'ar', icon: '/images/ar.png' },
    { code: 'fr', icon: '/images/fr.png' },
  ]

  const currentLanguage = languageOptions.find(
    (lang) => lang.code === language.toLowerCase(),
  )

  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode)
    setDropdownOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 gap-x-8 max-w-screen-2xl">
        <HandleLink href="/" className="flex items-center gap-x-2">
          <Image
            className="w-14"
            src="/images/logo.svg"
            alt={`Logo for ${homeItem?.title}`}
            width={48}
            height={48}
          />
          <span className="inline-block mr-8 text-sm font-bold md:hidden lg:inline-block md:text-md min-w-fit">
            {homeItem?.title}
          </span>
        </HandleLink>
        <MainNav menuItems={menuItems} className="hidden md:flex" />

        <MobileNav data={data} />
        <div className="items-center justify-between flex-1 hidden md:flex gap-x-2 md:justify-end">
          <HandleLink href="/tenders" className="hidden md:block">
            <Button className="px-8 font-bold text-white bg-green-500 border-2 border-transparent hover:bg-transparent hover:text-green-500 hover:border-green-500">
              Opportunities
            </Button>
          </HandleLink>
          <nav className="flex items-center w-auto gap-1 md:gap-2">
            <PopoverSettings socialNetworks={socialNetworks} />
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 w-[21px] h-[21px]"
                aria-label="Toggle Language"
              >
                <Image
                  src={currentLanguage?.icon || '/images/en.png'}
                  alt={`Current Language`}
                  width={30} // Standardized size
                  height={30}
                />
              </button>
              {dropdownOpen && (
                <div
                  className={`absolute mt-2 bg-white border border-gray-200 rounded shadow-md ${
                    true ? 'left-0' : 'right-0'
                  }`}
                  style={{ transform: 'translate(-6.43px, 12px)' }}
                >
                  {languageOptions.map((lang) => (
                    // <HandleLink href="">
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-2 ${
                        lang.code === 'ar' ? 'p-0.5' : 'p-[5px]'
                      } hover:bg-gray-100 w-[33px] h-[33px]`}
                    >
                      <Image
                        src={lang.icon}
                        alt={`Select Language`}
                        width={33}
                        height={33}
                        unoptimized
                      />
                    </button>
                    // </HandleLink>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

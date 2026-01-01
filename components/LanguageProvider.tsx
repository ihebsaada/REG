'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

const SUPPORTED_LANGS = ['en', 'fr', 'ar'] as const
type Lang = (typeof SUPPORTED_LANGS)[number]

interface LanguageProviderProps {
  children: ReactNode
  initialLanguage?: Lang
}

export const LanguageProvider = ({
  children,
  initialLanguage = 'en',
}: LanguageProviderProps) => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const [language, setLanguageState] = useState<Lang>(initialLanguage)

  useEffect(() => {
    const urlLang = params?.locale as string | undefined

    if (urlLang && SUPPORTED_LANGS.includes(urlLang as Lang)) {
      if (urlLang !== language) {
        setLanguageState(urlLang as Lang)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', urlLang)
      }
      return
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang')
      if (stored && SUPPORTED_LANGS.includes(stored as Lang)) {
        if (stored !== language) {
          setLanguageState(stored as Lang)
        }
        return
      }
    }

    // fallback already handled by initialLanguage, no need to reset here
  }, [params, language])

  const setLanguage = (lng: string) => {
    const nextLang = SUPPORTED_LANGS.includes(lng as Lang)
      ? (lng as Lang)
      : 'en'

    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', nextLang)
    }

    if (!pathname) {
      setLanguageState(nextLang)
      return
    }

    const parts = pathname.split('/')

    if (SUPPORTED_LANGS.includes(parts[1] as Lang)) {
      parts[1] = nextLang
    } else {
      parts.splice(1, 0, nextLang)
    }

    const newPath = parts.join('/')
    router.push(newPath)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

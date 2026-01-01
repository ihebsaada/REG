// lib/useDictionary.tsx
'use client'

import { useMemo } from 'react'

import { useLanguage } from '@/components/LanguageProvider'

import { dictionaries } from './i18n'
import { getLocalizedString } from './i18n-utils'

export function useDictionary() {
  const { language } = useLanguage()

  // JSON dictionary (buttons, nav labels, etc.)
  const dict = useMemo(
    () =>
      dictionaries[language as keyof typeof dictionaries] ?? dictionaries.en,
    [language],
  )

  // Helper to resolve localized Sanity fields with current lang
  const tLocalized = (value: any) =>
    getLocalizedString(value, language as keyof typeof dictionaries)

  return { dict, language, tLocalized }
}

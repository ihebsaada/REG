// import en from '../public/locales/en/en.json'
// import fr from '../public/locales/fr/fr.json'
// import ar from '../public/locales/ar/ar.json'

// export const dictionaries = { en, fr, ar }
// export function getDictionary(locale: string) {
//   return dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en
// }
// lib/i18n.ts
import ar from '../public/locales/ar/ar.json'
import en from '../public/locales/en/en.json'
import fr from '../public/locales/fr/fr.json'

export const dictionaries = { en, fr, ar }

export type SupportedLocale = keyof typeof dictionaries

export function getDictionary(locale: string) {
  return dictionaries[locale as SupportedLocale] ?? dictionaries.en
}

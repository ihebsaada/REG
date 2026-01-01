// // lib/i18n-utils.ts
// export function getLocalizedString(value: any): string {
//   if (!value) return ''

//   // Si c'est déjà une string, tout va bien
//   if (typeof value === 'string') return value

//   // Si c'est un objet i18n { _type, ar, en, fr }
//   if (typeof value === 'object') {
//     const lang =
//       typeof window !== 'undefined'
//         ? localStorage.getItem('lang') || 'en'
//         : 'en'

//     if (typeof value[lang] === 'string') return value[lang]
//     if (typeof value.en === 'string') return value.en
//   }

//   return ''
// }
// lib/i18n-utils.ts
import type { SupportedLocale } from './i18n'

export function getLocalizedString(value: any, lang: SupportedLocale): string {
  if (!value) return ''

  // Already a simple string
  if (typeof value === 'string') return value

  // Sanity-style localized object: { _type?, en?, fr?, ar? }
  if (typeof value === 'object') {
    if (typeof value[lang] === 'string') return value[lang]
    if (typeof value.en === 'string') return value.en
  }

  return ''
}

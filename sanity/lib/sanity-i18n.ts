export type Locale = 'en' | 'fr' | 'ar'

/** Return localized string from Sanity localeString */
export function getLocalizedString(
  field: { [key in Locale]?: string } | string | undefined,
  lang: Locale = 'en',
): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || ''
}

/** Return localized rich text array from Sanity localeBlock */
export function getLocalizedBlocks(
  field: { [key in Locale]?: any[] } | any[] | undefined,
  lang: Locale = 'en',
): any[] {
  if (!field) return []
  if (Array.isArray(field)) return field
  return field[lang] || field.en || []
}

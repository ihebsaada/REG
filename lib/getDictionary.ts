// lib/getDictionary.ts
import { headers } from 'next/headers'

// Server-safe helper for loading the right locale JSON file.
// Works in any server component rendered through the App Router.
export async function getDictionary(locale?: string) {
  let detected = locale

  // Detect locale from middleware header if not passed in
  if (!detected) {
    const h = headers()
    detected =
      h.get('x-locale') ||
      h.get('accept-language')?.split(',')[0]?.slice(0, 2) ||
      'en'
  }

  try {
    // Load the corresponding JSON file dynamically
    const dict = (
      await import(`../public/locales/${detected}/${detected}.json`)
    ).default
    return dict
  } catch {
    // Fallback to English if file missing or locale invalid
    const dict = (await import(`../public/locales/en/en.json`)).default
    return dict
  }
}

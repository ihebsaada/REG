import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Respect Environment Group',
    short_name: 'REG',
    display: 'standalone',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    icons: [
      {
        src: '/metadata/android-chrome-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/metadata/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/metadata/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

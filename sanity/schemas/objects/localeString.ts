// sanity/schemas/objects/localeString.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'string',
    }),
    defineField({
      name: 'ar',
      title: 'العربية',
      type: 'string',
    }),
  ],
})

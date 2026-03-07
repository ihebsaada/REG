// sanity/schemas/objects/localeBlock.ts
import { defineArrayMember, defineField, defineType } from 'sanity'

const portableTextArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    initialValue: [],
    of: [
      defineArrayMember({
        type: 'block',
        lists: [],
        styles: [],
        marks: {
          decorators: [
            { title: 'Italic', value: 'em' },
            { title: 'Strong', value: 'strong' },
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [{ name: 'href', type: 'url', title: 'Url' }],
            },
          ],
        },
      }),
    ],
    validation: (Rule) =>
      Rule.custom((val) => {
        if (val === undefined) return true
        return Array.isArray(val) ? true : 'Must be an array (PortableText).'
      }),
  })

export default defineType({
  name: 'localeBlock',
  title: 'Localized text (PortableText)',
  type: 'object',

  // ✅ important: forme complète quand l'objet est créé
  initialValue: () => ({ en: [], fr: [], ar: [] }),

  fields: [
    portableTextArray('en', 'English'),
    portableTextArray('fr', 'Français'),
    portableTextArray('ar', 'العربية'),
  ],
})

import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeRichBlock',
  title: 'Localized Rich PortableText',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'videoType' }),
        defineArrayMember({ name: 'timeline', type: 'timeline' }),
        defineArrayMember({
          type: 'image',
          name: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ title: 'Caption', name: 'caption', type: 'string' }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screen readers. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'videoType' }),
        defineArrayMember({ name: 'timeline', type: 'timeline' }),
        defineArrayMember({
          type: 'image',
          name: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ title: 'Caption', name: 'caption', type: 'string' }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screen readers. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ar',
      title: 'العربية',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'videoType' }),
        defineArrayMember({ name: 'timeline', type: 'timeline' }),
        defineArrayMember({
          type: 'image',
          name: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ title: 'Caption', name: 'caption', type: 'string' }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screen readers. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),
  ],
})

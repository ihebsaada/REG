import { PlugIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'innovations_page',
  title: 'Innovations Page',
  type: 'document',
  icon: PlugIcon,
  fields: [
    // ===== LEGACY =====
    defineField({
      name: 'title',
      description: 'This field is the title of your page. (legacy)',
      title: 'Title (legacy)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the page subheader. (legacy)',
      title: 'Description (legacy)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'Url' }],
              },
            ],
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),

    // ===== NOUVEAU LOCALISÉ =====
    defineField({
      name: 'titleLocalized',
      description: 'Localized title (en / fr / ar).',
      title: 'Title (localized)',
      type: 'localeString', // { en?, fr?, ar? }
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'overviewLocalized',
      description: 'Localized description (en / fr / ar).',
      title: 'Description (localized)',
      type: 'localeBlock', // { en?, fr?, ar? }
      options: { collapsible: true, collapsed: true },
      validation: (rule) => rule.required(),
    }),

    // ===== ITEMS =====
    defineField({
      name: 'items',
      title: 'Items',
      description:
        'These are the sections that will appear on your innovations page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'innovation' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title', // legacy pour l’instant
    },
    prepare({ title }) {
      return {
        subtitle: 'Innovations',
        title,
      }
    },
  },
})

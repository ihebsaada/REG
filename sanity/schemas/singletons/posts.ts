import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'posts_page',
  title: 'Posts Page',
  type: 'document',
  icon: DocumentTextIcon,
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
      title: 'Title (localized)',
      type: 'localeString', // { en?, fr?, ar? }
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'overviewLocalized',
      title: 'Description (localized)',
      type: 'localeBlock', // { en?, fr?, ar? }
      options: { collapsible: true, collapsed: true },
    }),

    // Optionnel mais utile si tu veux un texte plus long :
    defineField({
      name: 'description',
      title: 'Extra Description (legacy)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: 'descriptionLocalized',
      title: 'Extra Description (localized)',
      type: 'localeBlock',
      options: { collapsible: true, collapsed: true },
    }),

    // ===== ITEMS =====
    defineField({
      name: 'items',
      title: 'Items',
      description:
        'These are the sections that will appear on your posts page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'post' }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { subtitle: 'Posts', title }
    },
  },
})

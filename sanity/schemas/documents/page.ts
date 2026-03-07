import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    // ===== LOCALISÉ =====
    defineField({
      name: 'titleLocalized',
      title: 'Title (localized)',
      type: 'localeString',
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'overviewLocalized',
      title: 'Overview (localized)',
      type: 'localeBlock', // ✅ minimal comme legacy overview
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'bodyLocalized',
      title: 'Body (localized)',
      type: 'localeRichBlock', // ✅ riche comme legacy body (blockContent)
      options: { collapsible: true, collapsed: true },
    }),

    // ===== LEGACY =====
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title (legacy)',
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader. (legacy)',
      title: 'Overview (legacy)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [], // legacy sans Link
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),

    defineField({
      type: 'blockContent',
      name: 'body',
      title: 'Body (legacy)',
    }),

    defineField({ type: 'images', name: 'images', title: 'Images' }),
    defineField({ type: 'videos', name: 'videos', title: 'Videos' }),
    defineField({
      type: 'certifications',
      name: 'certifications',
      title: 'Certifications',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { subtitle: 'Page', title }
    },
  },
})

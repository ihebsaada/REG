// sanity/schemas/singletons/projects.ts
import { PackageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'projects_page',
  title: 'Projects Page',
  type: 'document',
  icon: PackageIcon,
  // liveEdit: true,
  fields: [
    // 🔹 Titre localisé
    defineField({
      name: 'titleLocalized',
      title: 'Title (localized)',
      type: 'localeString',
      description: 'Localized title for the projects page (en / fr / ar).',
    }),

    // 🔹 Ancien titre
    defineField({
      name: 'title',
      description:
        'This field is the title of your page. (legacy, non localized)',
      title: 'Title (legacy)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // 🔹 Overview localisé
    defineField({
      name: 'overviewLocalized',
      title: 'Description (localized)',
      type: 'localeBlock',
      description: 'Localized description for this page (en / fr / ar).',
    }),

    // 🔹 Ancien overview
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the page subheader. (legacy, non localized)',
      title: 'Description (legacy)',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),

    defineField({
      name: 'items',
      title: 'Items',
      description:
        'These are the sections that will appear on your projects page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Projects',
        title,
      }
    },
  },
})

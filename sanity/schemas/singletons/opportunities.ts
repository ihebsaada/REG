import { SparklesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'opportunities_page',
  title: 'Opportunities Page',
  type: 'document',
  icon: SparklesIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    // 🆕 Nouveau champ : Titre multilingue
    defineField({
      name: 'titleLocalized',
      description:
        'Multilingual page title (en / fr / ar). If filled, it will be used instead of the legacy Title.',
      title: 'Title (localized)',
      type: 'localeString',
    }),

    defineField({
      name: 'title',
      description: 'This field is the title of your page.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // 🆕 Nouveau champ : Overview multilingue
    defineField({
      name: 'overviewLocalized',
      description:
        'Multilingual description (en / fr / ar). If filled, it will be used instead of the legacy Description.',
      title: 'Description (localized)',
      type: 'localeBlock',
    }),

    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the page subheader.',
      title: 'Description',
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
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
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
        'These are the sections that will appear on your opportunities page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'opportunity' }],
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
        subtitle: 'Opportunities',
        title,
      }
    },
  },
})

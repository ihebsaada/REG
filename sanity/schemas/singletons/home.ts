import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // ===== Legacy (on garde) =====
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Description',
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
      validation: (rule) => rule.max(155).required(),
    }),

    // ===== Nouveau: localisé =====
    defineField({
      name: 'titleLocalized',
      title: 'Title (localized)',
      type: 'localeString', // { en?, fr?, ar? }
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'overviewLocalized',
      title: 'Description (localized)',
      type: 'localeBlock', // { en?, fr?, ar? } -> PortableText[]
      options: { collapsible: true, collapsed: true },
    }),

    // ===== Le reste (inchangé) =====
    defineField({
      name: 'sections',
      title: 'Sections',
      description:
        'These are the sections that will appear on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'customBlock' }],
        }),
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      description:
        'These are the partners that will appear on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'partner' }],
        }),
      ],
    }),
    defineField({
      name: 'opportunity',
      title: 'Opportunity',
      description:
        'This is the opportunity that will appear on your landing page.',
      type: 'reference',
      to: [{ type: 'opportunity' }],
    }),
    defineField({
      name: 'innovation',
      title: 'Innovation',
      description:
        'This is the innovation that will appear on your landing page.',
      type: 'reference',
      to: [{ type: 'innovation' }],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { subtitle: 'Home', title }
    },
  },
})

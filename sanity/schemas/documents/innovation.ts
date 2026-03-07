// sanity/schemas/documents/innovation.ts
import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'innovation',
  title: 'Innovation',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // ===== LEGACY =====
    defineField({
      name: 'title',
      description: 'This field is the title of your innovation. (legacy)',
      title: 'Title (legacy)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      title: 'Overview (legacy)',
      description:
        'Used both for the <meta> description tag for SEO, and innovation subheader.',
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
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Project Description (legacy)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),

    // ===== LOCALIZED =====
    defineField({
      name: 'titleLocalized',
      title: 'Title (localized)',
      description: 'Localized title (en / fr / ar).',
      type: 'localeString',
      options: { collapsible: true, collapsed: true },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overviewLocalized',
      title: 'Overview (localized)',
      description: 'Localized overview (en / fr / ar).',
      type: 'localeBlock', // ✅ minimal comme legacy overview
      options: { collapsible: true, collapsed: true },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'descriptionLocalized',
      title: 'Project Description (localized)',
      description: 'Localized project description (en / fr / ar).',
      type: 'localeRichBlock', // ✅ RICHE comme legacy description
      options: { collapsible: true, collapsed: true },
    }),

    // ===== RESTE (inchangé) =====
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'images',
      name: 'images',
      title: 'Images',
    }),
    defineField({
      type: 'videos',
      name: 'videos',
      title: 'Videos',
    }),
    defineField({
      type: 'certifications',
      name: 'certifications',
      title: 'Certifications',
    }),
    defineField({
      name: 'files',
      title: 'Files',
      type: 'array',
      of: [{ type: 'file', title: 'File' }],
    }),
  ],

  preview: {
    select: {
      titleLegacy: 'title',
      titleEn: 'titleLocalized.en',
      titleFr: 'titleLocalized.fr',
      titleAr: 'titleLocalized.ar',
      media: 'images.0',
    },
    prepare({ titleLegacy, titleEn, titleFr, titleAr, media }) {
      return {
        title:
          titleEn || titleFr || titleAr || titleLegacy || 'Untitled innovation',
        media,
      }
    },
  },
})

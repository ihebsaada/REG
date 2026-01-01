// sanity/schemas/documents/project.ts
import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  // liveEdit: true,
  fields: [
    // 🔹 Nouveau titre localisé
    defineField({
      name: 'titleLocalized',
      title: 'Title (localized)',
      type: 'localeString',
      description: 'Localized title (en / fr / ar).',
    }),

    // 🔹 Ancien titre (legacy, non localisé)
    defineField({
      name: 'title',
      description:
        'This field is the title of your project. (legacy, non localized)',
      title: 'Title (legacy)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

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

    // 🆕 champs qui existaient déjà dans la data (client, site)
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Name of the client for this project.',
    }),

    defineField({
      name: 'site',
      title: 'Project URL',
      type: 'url',
      description: 'Website or external link related to this project.',
    }),

    // 🔹 Nouveau overview localisé (portable text simple)
    defineField({
      name: 'overviewLocalized',
      title: 'Overview (localized)',
      type: 'localeBlock',
      description: 'Localized overview (en / fr / ar).',
    }),

    // 🔹 Ancien overview (legacy)
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and project subheader. (legacy, non localized)',
      title: 'Overview (legacy)',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
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
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. If you choose to add it to the show case projects, this is the image displayed in the list within the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // 🔹 Nouvelle description localisée RICHE (texte + vidéos + images + timeline)
    defineField({
      name: 'descriptionLocalized',
      title: 'Project Description (localized)',
      type: 'localeRichBlock',
      description: 'Localized description (en / fr / ar).',
    }),

    // 🔹 Ancienne description (blockContent avec vidéos) gardée pour fallback
    defineField({
      name: 'description',
      title: 'Project Description (legacy)',
      type: 'blockContent',
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
      of: [
        {
          type: 'file',
          title: 'File',
        },
      ],
    }),
  ],
})

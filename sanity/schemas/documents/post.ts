// import { DocumentIcon } from '@sanity/icons'
// import { format, parseISO } from 'date-fns'
// import { fr } from 'date-fns/locale'
// import { defineArrayMember, defineField, defineType } from 'sanity'

// import authorType from './author'

// export default defineType({
//   name: 'post',
//   title: 'Post',
//   type: 'document',
//   icon: DocumentIcon,
//   // liveEdit: true,
//   fields: [
//     defineField({
//       name: 'title',
//       title: 'Title (legacy)',
//       type: 'string',
//     }),
//     defineField({
//       name: 'titleLocalized',
//       title: 'Title',
//       type: 'localeString',
//       validation: (rule) => rule.required(),
//       options: { collapsible: true, collapsed: true },
//     }),

//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'titleLocalized.en',
//         maxLength: 96,
//         isUnique: (value, context) => context.defaultIsUnique(value, context),
//       },
//       validation: (rule) => rule.required(),
//     }),

//     defineField({
//       name: 'overview',
//       title: 'Overview (legacy)',
//       type: 'array',
//       of: [
//         defineArrayMember({
//           type: 'block',
//           styles: [],
//           lists: [],
//           marks: {
//             annotations: [],
//             decorators: [
//               { title: 'Italic', value: 'em' },
//               { title: 'Strong', value: 'strong' },
//             ],
//           },
//         }),
//       ],
//     }),
//     defineField({
//       name: 'overviewLocalized',
//       title: 'Overview',
//       type: 'localeBlock',
//       validation: (rule) => rule.required(),
//       options: { collapsible: true, collapsed: true },
//     }),

//     defineField({
//       name: 'coverImage',
//       title: 'Cover Image',
//       type: 'image',
//       options: { hotspot: true },
//       validation: (rule) => rule.required(),
//     }),

//     defineField({
//       name: 'tags',
//       title: 'Tags',
//       type: 'array',
//       of: [{ type: 'string' }],
//       options: { layout: 'tags' },
//     }),

//     defineField({
//       name: 'description',
//       title: 'Project Description (legacy)',
//       type: 'array',
//       of: [defineArrayMember({ type: 'block' })],
//     }),
//     defineField({
//       name: 'descriptionLocalized',
//       title: 'Project Description',
//       type: 'localeBlock',
//       options: { collapsible: true, collapsed: true },
//     }),

//     defineField({
//       name: 'date',
//       title: 'Date',
//       type: 'datetime',
//       initialValue: () => new Date().toISOString(),
//     }),
//     defineField({
//       name: 'author',
//       title: 'Author',
//       type: 'reference',
//       to: [{ type: authorType.name }],
//     }),
//     defineField({
//       type: 'images',
//       name: 'images',
//       title: 'Images',
//     }),
//     defineField({
//       type: 'videos',
//       name: 'videos',
//       title: 'Videos',
//     }),
//     defineField({
//       type: 'certifications',
//       name: 'certifications',
//       title: 'Certifications',
//     }),
//     defineField({
//       name: 'files',
//       title: 'Files',
//       type: 'array',
//       of: [{ type: 'file', title: 'File' }],
//     }),
//   ],
//   preview: {
//     select: {
//       title: 'titleLocalized.en',
//       titleLegacy: 'title',
//       author: 'author.name',
//       date: 'date',
//       media: 'coverImage',
//     },
//     prepare({ title, titleLegacy, media, author, date }) {
//       const subtitles = [
//         author && `by ${author}`,
//         date &&
//           `on ${format(parseISO(date), 'dd/LL/yyyy', {
//             locale: fr,
//           })}`,
//       ].filter(Boolean)

//       return {
//         title: title || titleLegacy || 'Untitled',
//         media,
//         subtitle: subtitles.join(' '),
//       }
//     },
//   },
// })
import { DocumentIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { defineArrayMember, defineField, defineType } from 'sanity'

import authorType from './author'

const portableTextMembers = [
  defineArrayMember({
    type: 'block',
    styles: [],
    lists: [],
    marks: {
      annotations: [],
      decorators: [
        { title: 'Italic', value: 'em' },
        { title: 'Strong', value: 'strong' },
      ],
    },
  }),
  defineArrayMember({
    type: 'videoType',
  }),
]

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (legacy)',
      type: 'string',
    }),
    defineField({
      name: 'titleLocalized',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titleLocalized.en',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      title: 'Overview (legacy)',
      type: 'array',
      of: portableTextMembers,
    }),
    defineField({
      name: 'overviewLocalized',
      title: 'Overview',
      type: 'localeBlock',
      validation: (rule) => rule.required(),
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'description',
      title: 'Project Description (legacy)',
      type: 'array',
      of: portableTextMembers,
    }),
    defineField({
      name: 'descriptionLocalized',
      title: 'Project Description',
      type: 'localeBlock',
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
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
      title: 'titleLocalized.en',
      titleLegacy: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, titleLegacy, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date &&
          `on ${format(parseISO(date), 'dd/LL/yyyy', {
            locale: fr,
          })}`,
      ].filter(Boolean)

      return {
        title: title || titleLegacy || 'Untitled',
        media,
        subtitle: subtitles.join(' '),
      }
    },
  },
})

// import { defineArrayMember, defineField, defineType } from 'sanity'

// export default defineType({
//   name: 'localeRichBlock',
//   title: 'Localized Rich PortableText',
//   type: 'object',
//   fields: [
//     defineField({
//       name: 'en',
//       title: 'English',
//       type: 'array',
//       of: [
//         defineArrayMember({ type: 'block' }),
//         defineArrayMember({ type: 'videoType' }),
//         defineArrayMember({ name: 'timeline', type: 'timeline' }),
//         defineArrayMember({
//           type: 'image',
//           name: 'image',
//           title: 'Image',
//           options: { hotspot: true },
//           fields: [
//             defineField({ title: 'Caption', name: 'caption', type: 'string' }),
//             defineField({
//               name: 'alt',
//               type: 'string',
//               title: 'Alt text',
//               description:
//                 'Alternative text for screen readers. Falls back on caption if not set',
//             }),
//           ],
//         }),
//       ],
//     }),
//     defineField({
//       name: 'fr',
//       title: 'Français',
//       type: 'array',
//       of: [
//         defineArrayMember({ type: 'block' }),
//         defineArrayMember({ type: 'videoType' }),
//         defineArrayMember({ name: 'timeline', type: 'timeline' }),
//         defineArrayMember({
//           type: 'image',
//           name: 'image',
//           title: 'Image',
//           options: { hotspot: true },
//           fields: [
//             defineField({ title: 'Caption', name: 'caption', type: 'string' }),
//             defineField({
//               name: 'alt',
//               type: 'string',
//               title: 'Alt text',
//               description:
//                 'Alternative text for screen readers. Falls back on caption if not set',
//             }),
//           ],
//         }),
//       ],
//     }),
//     defineField({
//       name: 'ar',
//       title: 'العربية',
//       type: 'array',
//       of: [
//         defineArrayMember({ type: 'block' }),
//         defineArrayMember({ type: 'videoType' }),
//         defineArrayMember({ name: 'timeline', type: 'timeline' }),
//         defineArrayMember({
//           type: 'image',
//           name: 'image',
//           title: 'Image',
//           options: { hotspot: true },
//           fields: [
//             defineField({ title: 'Caption', name: 'caption', type: 'string' }),
//             defineField({
//               name: 'alt',
//               type: 'string',
//               title: 'Alt text',
//               description:
//                 'Alternative text for screen readers. Falls back on caption if not set',
//             }),
//           ],
//         }),
//       ],
//     }),
//   ],
// })
import { defineArrayMember, defineField, defineType } from 'sanity'

const richOf = [
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
]

const localeRichField = (name: 'en' | 'fr' | 'ar', title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    initialValue: [],
    of: richOf,
  })

export default defineType({
  name: 'localeRichBlock',
  title: 'Localized Rich PortableText',
  type: 'object',

  // ✅ IMPORTANT: fonction (évite des edge cases de patching)
  initialValue: () => ({ en: [], fr: [], ar: [] }),

  fields: [
    localeRichField('en', 'English'),
    localeRichField('fr', 'Français'),
    localeRichField('ar', 'العربية'),
  ],
})

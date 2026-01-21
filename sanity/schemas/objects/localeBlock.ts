// // sanity/schemas/objects/localeBlock.ts
// import { defineArrayMember, defineField, defineType } from 'sanity'

// const blockField = defineField({
//   name: 'value',
//   type: 'array',
//   of: [
//     defineArrayMember({
//       type: 'block',
//       marks: {
//         decorators: [
//           { title: 'Italic', value: 'em' },
//           { title: 'Strong', value: 'strong' },
//         ],
//       },
//     }),
//   ],
// })

// export default defineType({
//   name: 'localeBlock',
//   title: 'Localized rich text',
//   type: 'object',
//   fields: [
//     { ...blockField, name: 'en', title: 'English' },
//     { ...blockField, name: 'fr', title: 'Français' },
//     { ...blockField, name: 'ar', title: 'العربية' },
//   ],
// })
// sanity/schemas/objects/localeBlock.ts
import { defineArrayMember, defineField, defineType } from 'sanity'

const blockField = defineField({
  name: 'value',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      lists: [],
      styles: [],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },
          { title: 'Strong', value: 'strong' },
        ],
      },
    }),
  ],
})

export default defineType({
  name: 'localeBlock',
  title: 'Localized text',
  type: 'object',
  fields: [
    { ...blockField, name: 'en', title: 'English' },
    { ...blockField, name: 'fr', title: 'Français' },
    { ...blockField, name: 'ar', title: 'العربية' },
  ],
})

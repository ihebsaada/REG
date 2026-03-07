import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sectionStatItem',
  title: 'Section Stat Item',
  type: 'object',
  fields: [
    // Legacy plain fields
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),

    // Localized fields
    defineField({
      name: 'titleLocalized',
      title: 'Title (localized)',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitleLocalized',
      title: 'Subtitle (localized)',
      type: 'localeString',
    }),
    defineField({
      name: 'overviewLocalized',
      title: 'Description (localized)',
      type: 'localeBlock',
    }),
  ],
})

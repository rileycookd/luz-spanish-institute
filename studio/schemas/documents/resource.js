import { IoBriefcase } from 'react-icons/io5'

export default {
  type: 'document',
  name: 'resource',
  title: 'Resource',
  icon: IoBriefcase,
  fieldsets: [
    { name: 'labels', title: 'Labels' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The relative route name (i.e. "my-resource-name")',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        { type: 'teacher' }
      ]
    },
    {
      name: 'locked',
      title: 'Members only',
      type: 'boolean',
      fieldset: 'labels'
    },
    {
      name: 'category',
      type: 'reference',
      to: [
        { type: 'category' }
      ],
      fieldset: 'labels'
    },
    {
      name: 'language',
      type: 'reference',
      to: [
        { type: 'language' }
      ],
      fieldset: 'labels'
    },
    {
      name: 'level',
      type: 'reference',
      to: [
        { type: 'level' }
      ],
      fieldset: 'labels'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    },
  ]
}
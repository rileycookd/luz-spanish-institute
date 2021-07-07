import SlugInput from 'sanity-plugin-better-slug'
import { IoBriefcase } from 'react-icons/io5'

export default {
  type: 'document',
  name: 'resource',
  title: 'Resource',
  icon: IoBriefcase,
  fieldsets: [
    { name: 'labels', title: 'Labels' }
  ],
  initialValue: {
    locked: false,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      initialValue: 'https://ameliolanguageinstitute.com/resources',
      type: 'url',
      hidden: true
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The relative route name (i.e. "my-resource-name")',
      inputComponent: SlugInput,
      options: {
        source: 'title',
        basePath: (document) => `${document.pathPrefix || 'resources'}`,
        maxLength: 100,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'pathPrefix',
      title: 'pathPrefix',
      hidden: true,
      type: 'string',
      initialValue: 'resources'
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
    {
      name: 'image',
      title: 'Main image',
      type: 'mainImage'
    }
  ]
}
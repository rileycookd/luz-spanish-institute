import { MdSettings } from 'react-icons/md'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'create', 'delete'],
  icon: MdSettings,
  fields: [
    {
      name: 'title',
      title: 'Site title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      description: 'These will be the default meta tags on all pages that have not set their own',
      type: 'openGraph'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'defaultNav',
      title: 'Default nav menu',
      type: 'reference',
      to: [
        { type: 'navigationMenu' }
      ]
    }
  ]
}

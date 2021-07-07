import { BsLayoutTextWindow } from 'react-icons/bs'

export default {
  name: 'page',
  title: 'Page',
  icon: BsLayoutTextWindow,
  type: 'document',
  
  liveEdit: false,
  // Uncomment the next line to remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fieldsets: [
    { 
      name: 'header', 
      title: 'Header', 
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string'
    },
    {
      name: 'navMenu',
      type: 'reference',
      title: 'Navigation menu',
      // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
      to: [{ type: 'navigationMenu' }],
      description: 'Which nav menu should be shown, if any',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'hero' },
        { type: 'testimonialGroup' },
        { type: 'infoBlock' },
        { type: 'classTypesList' },
        { type: 'form' },
      ],
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      description: 'Set page meta info for SEO',
      type: 'openGraph'
    },
  ]
}

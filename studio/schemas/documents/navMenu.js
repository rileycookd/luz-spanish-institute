import { MdMenu } from "react-icons/md"

export default {
  type: 'document',
  name: 'navigationMenu',
  icon: MdMenu,
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'array',
      name: 'items',
      title: 'Navigation items',
      of: [
        { type: 'cta', title: 'Link' },
        { type: 'ctaGroup', title: 'Link group' }
      ]
    },
    {
      type: 'array',
      name: 'ctas',
      of: [
        { type: 'cta', title: 'Link' },
        { type: 'ctaGroup', title: 'Link group' }
      ]
    }
  ]
}
import { RiLayoutBottom2Line } from "react-icons/ri"

export default {
  type: 'document',
  name: 'footer',
  icon: RiLayoutBottom2Line,
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
        { type: 'ctaGroup', title: 'Link group' },
      ]
    },
  ]
}
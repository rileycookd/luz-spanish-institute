import { BiChevronDownCircle } from 'react-icons/bi'

export default {
  name: 'dropdownCtaGroup',
  title: 'Link group',
  icon: BiChevronDownCircle,
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [
        { type: 'dropdownCta' },
      ]
    }
  ]
}
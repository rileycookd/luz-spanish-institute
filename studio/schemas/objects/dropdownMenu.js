import { BiChevronDownCircle } from 'react-icons/bi'

export default {
  name: 'dropdownMenu',
  title: 'Dropdown menu',
  icon: BiChevronDownCircle,
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      description: '(max: 4)',
      of: [
        { type: 'dropdownCtaGroup'},
        { type: 'dropdownThumbnailCta' }
      ]
    },
    {
      title: 'Main CTA',
      name: 'cta',
      type: 'dropdownCta',
    }
  ]
}
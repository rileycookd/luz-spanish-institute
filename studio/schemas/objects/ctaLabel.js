import { MdLink } from 'react-icons/md'
import description from './description.js'

export default {
  title: 'Labeled CTA',
  name: 'ctaLabel',
  icon: MdLink,
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subheading',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Link',
      name: 'cta',
      type: 'cta',
      description: 'Leave the title blank if a Call-To-Action is not needed'
    }
  ]
}
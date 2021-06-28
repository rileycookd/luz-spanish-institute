import { GoListOrdered } from 'react-icons/go'

export default {
  name: 'questionOrdering',
  title: 'Ordered items',
  type: 'object',
  icon: GoListOrdered,
  fields: [
    {
      name: 'items',
      description: 'Put all the parts in their correct order',
      type: 'array',
      of: [
        { type: 'string' }
      ],
      validation: Rule => Rule.required().min(2)
    },
  ],
  preview: {
    select: {
      length: 'items'
    },
    prepare ({ length }) {
      const num = length ? length.length : 0
      const title = length ? length.join(" ") : 'Empty'
      return {
        title,
        subtitle: `${num} part${num !== 1 ? 's' : ''}`
      }
    }
  }
}
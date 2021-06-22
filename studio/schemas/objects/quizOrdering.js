import { GiChoice } from 'react-icons/gi'

export default {
  name: 'quizOrdering',
  title: 'Ordering',
  type: 'object',
  icon: GiChoice,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'string'
    },
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
      return {
        title: 'Ordering',
        subtitle: `${num} part${num !== 1 ? 's' : ''}`
      }
    }
  }
}
import { GoListOrdered } from 'react-icons/go'

export default {
  name: 'quizOrdering',
  title: 'Ordering',
  type: 'object',
  icon: GoListOrdered,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'string'
    },
    {
      name: 'questions',
      type: 'array',
      of: [
        { type: 'questionOrdering' }
      ],
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      length: 'questions'
    },
    prepare ({ length }) {
      const num = length ? length.length : 0
      return {
        title: 'Ordering',
        subtitle: `${num} question${num !== 1 ? 's' : ''}`
      }
    }
  }
}
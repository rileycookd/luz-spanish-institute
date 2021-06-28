import { GiChoice } from 'react-icons/gi'

export default {
  name: 'quizMultipleChoice',
  title: 'Multiple choice',
  type: 'object',
  icon: GiChoice,
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
        { type: 'questionMultipleChoice' }
      ]
    },
  ],
  preview: {
    select: {
      length: 'questions'
    },
    prepare ({ length }) {
      const num = length.length
      return {
        title: 'Multiple choice',
        subtitle: `${num} question${num > 1 ? 's' : ''}`
      }
    }
  }
}
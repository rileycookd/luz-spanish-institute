import { BiColumns } from 'react-icons/bi'

export default {
  name: 'quizCategories',
  title: 'Categories',
  icon: BiColumns,
  type: 'object',
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
      name: 'categories',
      type: 'array',
      of: [
        { type: 'optionCategory'}
      ],
      validation: Rule => Rule.required().min(2)
    }
  ],
  preview: {
    select: {
      length: 'categories'
    },
    prepare ({ length }) {
      const num = length.length
      return {
        title: 'Categories',
        subtitle: `${num} categor${num > 1 ? 'ies' : 'y'}`
      }
    }
  }
}
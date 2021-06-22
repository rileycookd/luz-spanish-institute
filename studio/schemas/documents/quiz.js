import { ImPencil2 } from 'react-icons/im'

export default {
  name: 'quiz',
  title: 'Quiz',
  icon: ImPencil2,
  type: 'document',
  fieldsets: [
    { name: 'labels', title: 'Labels' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Quiz title',
      type: 'string',
    },
    {
      name: 'locked',
      title: 'Members only',
      type: 'boolean',
      fieldset: 'labels'
    },
    {
      name: 'category',
      type: 'reference',
      to: [
        { type: 'category' }
      ],
      fieldset: 'labels'
    },
    {
      name: 'language',
      type: 'reference',
      to: [
        { type: 'language' }
      ],
      fieldset: 'labels'
    },
    {
      name: 'level',
      type: 'reference',
      to: [
        { type: 'level' }
      ],
      fieldset: 'labels'
    },
    {
      name: 'shuffleAnswers',
      title: 'Random answer order?',
      type: 'boolean'
    },
    {
      name: 'shuffleQuestions',
      title: 'Random question order?',
      type: 'boolean'
    },
    {
      name: 'content',
      title: 'Quiz sections',
      type: 'array',
      of: [
        { type: 'quizMultipleChoice' },
        { type: 'quizFillBlank' },
        { type: 'quizFillBlankText' },
        { type: 'quizCategories' },
        { type: 'quizOrdering' }
      ]
    },
  ]
}
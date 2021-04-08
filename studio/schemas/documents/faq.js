import { BsQuestionCircle } from 'react-icons/bs'

export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: BsQuestionCircle,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        { type: 'questionAnswer' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      question0: 'questions.0.question'
    },
    prepare ({ title, question0 }) {

      return {
        title: title,
        subtitle: `${question0} ...`
      }
    }
  }
}

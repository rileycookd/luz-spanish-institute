import { BsQuestionCircle } from 'react-icons/bs'

export default {
  name: 'questionMultipleChoice',
  title: 'Multiple choice question',
  icon: BsQuestionCircle,
  type: 'object',
  fields: [
    {
      name: 'question',
      title: 'Question text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'options',
      type: 'array',
      of: [
        { type: 'optionMultipleChoice' }
      ],
      validation: Rule => Rule.required().min(2).custom(options => {
        if(options.filter(o => o.correct).length > 0) {
          return true
        }
        return 'Must have at least one correct answer'
      })
    }
  ],
  preview: {
    select: {
      title: 'question',
      length: 'options'
    },
    prepare ({ title, length }) {
      const question = title ? title : 'Untitled'
      const num = length && length.length ? length.length : 0
      const numAnswers = length ? length.filter(i => i.correct).length : 0
      return {
        title: question,
        subtitle: `${num} option${num !== 1 ? 's' : ''}, ${numAnswers} answer${numAnswers !== 1 ? 's' : ''}`
      }
    }
  }
}
import { BsQuestionCircle } from 'react-icons/bs'

const validateOptions = (fields => {
  if(fields.options && fields.options.length) {
    let answers = fields.options.filter(o => o.correct)
    if(!fields.selectMultiple && answers && answers.length > 1) {
      return 'Must have only one answer unless "select multiple" is active'
    }
  }
  return true
})

export default {
  name: 'questionMultipleChoice',
  title: 'Multiple choice question',
  icon: BsQuestionCircle,
  type: 'object',
  validation: Rule => Rule.custom(validateOptions),
  fields: [
    {
      name: 'question',
      title: 'Question text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'selectMultiple',
      title: 'Select multiple?',
      description: 'Default is "select one"',
      initialValue: false,
      type: 'boolean'
    },
    {
      name: 'options',
      type: 'array',
      of: [
        { type: 'optionMultipleChoice' }
      ],
      validation: Rule => Rule.required().min(2).custom(options => {
        if(options && options.filter(o => o.correct).length > 0) {
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
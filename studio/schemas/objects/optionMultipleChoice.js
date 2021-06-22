import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr'

export default {
  name: 'optionMultipleChoice',
  title: 'Option',
  icon: GrCheckbox,
  type: 'object',
  fields: [
    {
      type: 'string', 
      name: 'option'
    },
    {
      type: 'boolean',
      name: 'correct',
    }
  ],
  preview: {
    select: {
      correct: 'correct',
      title: 'option'
    },
    prepare ({ correct, title }) {
      
      return {
        title,
        subtitle: `${correct ? 'Correct' : ''}`
      }
    }
  }
}
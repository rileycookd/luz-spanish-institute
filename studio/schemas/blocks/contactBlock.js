import { AiOutlineMessage } from 'react-icons/ai'

export default {
  name: 'contactBlock',
  title: 'Contact block',
  type: 'object',
  icon: AiOutlineMessage,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'info'
    },
  ],
  preview: {
    prepare () {
      return {
        title: 'Contact block',
      }
    }
  }
}
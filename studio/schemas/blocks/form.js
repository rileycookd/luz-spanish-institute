import { BsPencilSquare } from 'react-icons/bs'

export default {
  name: "form",
  type: "object",
  title: "Form",
  icon: BsPencilSquare,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'form',
      type: 'string',
      title: 'Form',
      description: 'Select form type',
      options: {
        list: ['register', 'contact', 'demo']
      }
    }
  ],
  preview: {
    select: {
      subtitle: 'title'
    },
    prepare ({ subtitle }) {
      return {
        title: 'Form',
        subtitle
      }
    }
  }
}
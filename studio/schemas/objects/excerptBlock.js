import { IoInformationCircleOutline } from 'react-icons/io5'

export default {
  name: 'excerptBlock',
  title: 'Excerpt',
  type: 'object',
  icon: IoInformationCircleOutline,
  fields: [
    {
      name: 'content',
      title: 'Text',
      type: 'text'
    }
  ],
  preview: {
    select: {
      text: 'content'
    },
    prepare ({ text }) {
      const excerpt = text.length >= 120 ? `"${text.substring(0, 120)}..."` : `"${text}"`
      return {
        title: `Excerpt block`,
        subtitle: excerpt
      }
    }
  }
}
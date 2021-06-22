import { IoInformationCircleOutline } from 'react-icons/io5'

export default {
  name: 'exampleBlock',
  title: 'Example',
  type: 'object',
  icon: IoInformationCircleOutline,
  fields: [
    {
      name: 'content',
      title: 'Text',
      type: 'blockText'
    }
  ],
  preview: {
    select: {
      text: 'content'
    },
    prepare ({ text }) {
      let previewText = ''
      if(text && text.length && text[0].children.length) {
        previewText = text[0].children
          .filter(ch => ch._type === 'span' && ch.text)
          .map(ch => ch.text).join('')
      }
      const excerpt = previewText.length >= 60 ? `"${previewText.substring(0, 60)}..."` : `"${previewText}"`
      return {
        title: `Example block`,
        subtitle: excerpt
      }
    }
  }
}
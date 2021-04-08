import { BsFileRichtext } from 'react-icons/bs'

export default {
  name: 'infoBlock',
  title: 'Info block',
  type: 'object',
  icon: BsFileRichtext,
  fieldsets: [
    { name: 'info', title: 'Info section' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'info'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(Optional)',
      fieldset: 'info'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockText',
      fieldset: 'info'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        { type: 'mainImage' },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'reverse',
      title: 'Reverse order',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      subtitle: 'title'
    },
    prepare ({ subtitle }) {
      return {
        title: 'Info block',
        subtitle
      }
    }
  }
}
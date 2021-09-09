import { AiFillFileAdd } from 'react-icons/ai'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { parseISO, format } from 'date-fns'

export default {
  type: 'document',
  name: 'class',
  title: 'Class',
  icon: FaChalkboardTeacher, 
  fields: [
    {
      title: 'Start time',
      name: 'start',
      type: 'datetime'
    },
    {
      title: 'End time',
      name: 'end',
      type: 'datetime'
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: '(optional)'
    },
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Completed', value: 'completed'},
          {title: 'Canceled', value: 'canceled'}
        ],
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.precision(2)
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          title: 'Homework',
          name: 'homework',
          type: 'homework'
        },
        {
          title: 'Link',
          name: 'link',
          type: 'cta'
        },
        {
          title: 'Resource',
          name: 'resource',
          type: 'reference',
          to: [
            { type: 'resource' }
          ]
        },
        // {
        //   title: 'Image',
        //   name: 'image',
        //   type: 'mainImage'
        // },
        // {
        //   title: 'File',
        //   name: 'file',
        //   type: 'file',
        //   icon: AiFillFileAdd,
        //   fields: [
        //     {
        //       name: 'title',
        //       type: 'string',
        //       title: 'Title',
        //       options: {
        //         isHighlighted: true
        //       }
        //     },
        //   ]
        // },
      ]
    },
  ],
  preview: {
    select: {
      start: 'start',
      end: 'end',
      title: 'title'
    },
    prepare ({ start, end, title }) {
      let parsedStart = parseISO(start)
      let parsedEnd = parseISO(end)
      let formattedStart = format(parsedStart, "dd/MM/yy kk:mm")
      let formattedEnd = format(parsedEnd, "kk:mm")

      return {
        title: `${title ? title : 'Class'}`,
        subtitle: `${formattedStart} - ${formattedEnd}`
      }
    }
  }
}
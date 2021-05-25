import { IoMdPerson } from 'react-icons/io'

export default {
  name: 'teacher',
  type: 'document',
  title: 'Teacher',
  icon: IoMdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Full name'
    },
    {
      title: 'Languages',
      name: 'languages',
      type: 'array',
      options: {
        layout: 'tags'
      },
      of: [
        {
          type: 'reference',
          to: [
            {type: 'language'},
          ]
        }
      ],
      validation: Rule => Rule.unique()
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'availability'
    }
  ]
}

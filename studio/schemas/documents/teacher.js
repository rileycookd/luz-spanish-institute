import { IoMdPerson } from 'react-icons/io'
import availability from '../objects/availability'

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
      title: 'Languages taught',
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
      type: 'array',
      description: 'Add available days and times',
      of: [
        { type: 'availability' }
      ],
      validation: Rule => Rule.custom(availability => {
      
        var days = availability.map(d => ( d.day ))
        var isDuplicate = days.some((item, idx) => { 
            return days.indexOf(item) != idx 
        });
        return isDuplicate
          ? 'Days cannot be repeated'
          : true

        
        // const emptyPaths = emptyBlocks.map(
        //   (block, index) => [{_key: block._key}] || [index]
        // )
    
        // return emptyPaths.length === 0
        //   ? true
        //   : {
        //       message: 'Paragraph cannot be empty',
        //       paths: emptyPaths
        //     }
      })
    }
  ]
}

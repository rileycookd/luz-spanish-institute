import { MdToday } from 'react-icons/md'

export default {
  name: 'classDayTime',
  title: 'Class schedule',
  type: 'object',
  icon: MdToday,
  fields: [
    {
      title: 'Day',
      name: 'day',
      type: 'string',
      options: {
        list: [
          {title: 'Sunday', value: 'sunday'},
          {title: 'Monday', value: 'monday'},
          {title: 'Tuesday', value: 'tuesday'},
          {title: 'Wednesday', value: 'wednesday'},
          {title: 'Thursday', value: 'thursday'},
          {title: 'Friday', value: 'friday'},
          {title: 'Saturday', value: 'saturday'},
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      // 6. Enable editors to input a point in time using a custom input component
      name: 'time',
      title: 'Time',
      type: 'timeRange',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Choose start and end time of class',
      validation: Rule => Rule.required()
    },
  ],

  preview: {
    select: {
      time: 'time',
      day: 'day',
    },
    prepare({ time, day }) {
      const title = day ? day[0].toUpperCase() + day.slice(1) : 'Please choose a day'
      const subtitle = `${time.start}-${time.end}`
      
      return {
        title,
        subtitle
      }
    }
  }
}
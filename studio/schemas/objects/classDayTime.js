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
          {title: 'Sunday', value: "0"},
          {title: 'Monday', value: "1"},
          {title: 'Tuesday', value: "2"},
          {title: 'Wednesday', value: "3"},
          {title: 'Thursday', value: "4"},
          {title: 'Friday', value: "5"},
          {title: 'Saturday', value: "6"},
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
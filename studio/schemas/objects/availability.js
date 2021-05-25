import { MdToday } from 'react-icons/md'

const verifyAvailability = availableTimes => {
  if(!availableTimes || !availableTimes.length) {
    return 'Please choose available times'
  } else {
    const timeRanges = availableTimes.map(tr => (
      {start: Number(tr.start.replace(/:/g, '')), end: Number(tr.end.replace(/:/g, ''))}
    ))
    let errors = false
    for(let i=1; i<timeRanges.length; i++) {
      if(timeRanges[i].start < timeRanges[i-1].end) errors = true
    }
    return errors ? 'Make sure your open slots don\'t overlap' : true
  }
}

export default {
  name: 'availability',
  title: 'Availability',
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
        layout: 'radio' // <-- defaults to 'dropdown'
      },
      validation: Rule => Rule.required(),
    },
    {
      // 6. Enable editors to input a point in time using a custom input component
      name: 'availableTimes',
      title: 'Available times',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots during each day.',
      validation: Rule => Rule.required().custom(verifyAvailability),
    },
  ],

  preview: {
    select: {
      availability: 'availableTimes',
      day: 'day',
    },
    prepare({ availability, day }) {
      const titleString = day ? day[0].toUpperCase() + day.slice(1) : 'Please choose a day'
      const subtitle = availability && availability.length 
        ? availability.map(a => (`${a.start}-${a.end}`)).join(', ')
        : 'Please choose available times'
      
      return {
        title: titleString,
        subtitle: subtitle
      }
    }
  }
}
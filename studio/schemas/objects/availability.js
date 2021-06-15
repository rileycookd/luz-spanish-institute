import { MdToday } from 'react-icons/md'

const verifyAvailability = availableTimes => {
  if(!availableTimes || !availableTimes.length) {
    return true
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
      name: 'monday',
      title: 'Monday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
    {
      name: 'tuesday',
      title: 'Tuesday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
    {
      name: 'wednesday',
      title: 'Wednesday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
    {
      name: 'thursday',
      title: 'Thursday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
    {
      name: 'friday',
      title: 'Friday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
    {
      name: 'saturday',
      title: 'Saturday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
    {
      name: 'sunday',
      title: 'Sunday',
      type: 'array',
      of: [
        { type: 'timeRange' }
      ],
      description: 'Add available time slots',
      validation: Rule => Rule.custom(verifyAvailability),
    },
  ],

  // preview: {
  //   select: {
  //     availability: 'availableTimes',
  //     day: 'day',
  //   },
  //   prepare({ availability, day }) {
  //     const titleString = day ? day[0].toUpperCase() + day.slice(1) : 'Please choose a day'
  //     const subtitle = availability && availability.length 
  //       ? availability.map(a => (`${a.start}-${a.end}`)).join(', ')
  //       : 'Please choose available times'
      
  //     return {
  //       title: titleString,
  //       subtitle: subtitle
  //     }
  //   }
  // }
}
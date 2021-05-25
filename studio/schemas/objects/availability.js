// 1. Import the TimeInput react component
import TimeInput from '../components/availability'

export default {
  name: 'availability',
  title: 'Availability',
  type: 'object',

  fields: [
    {
      // 6. Enable editors to input a point in time using a custom input component
      name: 'daysAndTimes',
      title: 'Days and Times',
      type: 'string',
      description: 'Add available time slots during each day.',
      inputComponent: TimeInput
    },
  ],

  preview: {
    select: {
      schedule: 'daysAndTimes',
      opensAt: 'opensAt',
      closesAt: 'closesAt'
    },
    prepare({schedule}) {
      return {
        title: 'Yea!',
        subtitle: `${schedule}`
      }
    }
  }
}
const timeList = [
  {value: "00:00", title: "00:00"},
  {value: "00:15", title: "00:15"},
  {value: "00:30", title: "00:30"},
  {value: "00:45", title: "00:45"},
  {value: "01:00", title: "01:00"},
  {value: "01:15", title: "01:15"},
  {value: "01:30", title: "01:30"},
  {value: "01:45", title: "01:45"},
  {value: "02:00", title: "02:00"},
  {value: "02:15", title: "02:15"},
  {value: "02:30", title: "02:30"},
  {value: "02:45", title: "02:45"},
  {value: "03:00", title: "03:00"},
  {value: "03:15", title: "02:15"},
  {value: "03:30", title: "03:30"},
  {value: "03:45", title: "03:45"},
  {value: "04:00", title: "04:00"},
  {value: "04:15", title: "04:15"},
  {value: "04:30", title: "04:30"},
  {value: "04:45", title: "04:45"},
  {value: "05:00", title: "05:00"},
  {value: "05:15", title: "05:15"},
  {value: "05:30", title: "05:30"},
  {value: "05:45", title: "05:45"},
  {value: "06:00", title: "06:00"},
  {value: "06:15", title: "06:15"},
  {value: "06:30", title: "06:30"},
  {value: "06:45", title: "06:45"},
  {value: "07:00", title: "07:00"},
  {value: "07:15", title: "07:15"},
  {value: "07:30", title: "07:30"},
  {value: "07:45", title: "07:45"},
  {value: "08:00", title: "08:00"},
  {value: "08:15", title: "08:15"},
  {value: "08:30", title: "08:30"},
  {value: "08:45", title: "08:45"},
  {value: "09:00", title: "09:00"},
  {value: "09:15", title: "09:15"},
  {value: "09:30", title: "09:30"},
  {value: "09:45", title: "09:45"},
  {value: "10:00", title: "10:00"},
  {value: "10:15", title: "10:15"},
  {value: "10:30", title: "10:30"},
  {value: "10:45", title: "10:45"},
  {value: "11:00", title: "11:00"},
  {value: "11:15", title: "11:15"},
  {value: "11:30", title: "11:30"},
  {value: "11:45", title: "11:45"},
  {value: "12:00", title: "12:00"},
  {value: "12:15", title: "12:15"},
  {value: "12:30", title: "12:30"},
  {value: "12:45", title: "12:45"},
  {value: "13:00", title: "13:00"},
  {value: "13:15", title: "13:15"},
  {value: "13:30", title: "13:30"},
  {value: "13:45", title: "13:45"},
  {value: "14:00", title: "14:00"},
  {value: "14:15", title: "14:15"},
  {value: "14:30", title: "14:30"},
  {value: "14:45", title: "14:45"},
  {value: "15:00", title: "15:00"},
  {value: "15:15", title: "15:15"},
  {value: "15:30", title: "15:30"},
  {value: "15:45", title: "15:45"},
  {value: "16:00", title: "16:00"},
  {value: "16:15", title: "16:15"},
  {value: "16:30", title: "16:30"},
  {value: "16:45", title: "16:45"},
  {value: "17:00", title: "17:00"},
  {value: "17:15", title: "17:15"},
  {value: "17:30", title: "17:30"},
  {value: "17:45", title: "17:45"},
  {value: "18:00", title: "18:00"},
  {value: "18:15", title: "18:15"},
  {value: "18:30", title: "18:30"},
  {value: "18:45", title: "18:45"},
  {value: "19:00", title: "19:00"},
  {value: "19:15", title: "19:15"},
  {value: "19:30", title: "19:30"},
  {value: "19:45", title: "19:45"},
  {value: "20:00", title: "20:00"},
  {value: "20:15", title: "20:15"},
  {value: "20:30", title: "20:30"},
  {value: "20:45", title: "20:45"},
  {value: "21:00", title: "21:00"},
  {value: "21:15", title: "21:15"},
  {value: "21:30", title: "21:30"},
  {value: "21:45", title: "21:45"},
  {value: "22:00", title: "22:00"},
  {value: "22:15", title: "22:15"},
  {value: "22:30", title: "22:30"},
  {value: "22:45", title: "22:45"},
  {value: "23:00", title: "23:00"},
  {value: "23:15", title: "23:15"},
  {value: "23:30", title: "23:30"},
  {value: "23:45", title: "23:45"},
]

const verifyRange = fields => {
  const { start, end } = fields
  if(Number(end.replace(/:/g, '')) < Number(start.replace(/:/g, ''))) {
    return  'End time must be later than start time'
  } else {
    return true
  }
}

import { MdTimelapse } from 'react-icons/md'

export default {
  name: 'timeRange',
  title: 'Time range',
  type: 'object', 
  icon: MdTimelapse,
  validation: Rule => Rule.custom(verifyRange),
  fields: [
    {
      title: 'Start time',
      name: 'start',
      type: 'string',
      initialValue: timeList[32].value,
      options: {
        list: timeList
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'End Time',
      name: 'end',
      type: 'string',
      initialValue: timeList[68].value,
      options: {
        list: timeList
      },
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      start: 'start',
      end: 'end',
    },
    prepare({ start, end }) {
      return {
        title: `${start}-${end}`
      }
    }
  }
}
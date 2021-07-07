import React from 'react'
import { parseISO, format } from 'date-fns'
import { HiMail, HiOutlineMailOpen } from 'react-icons/hi'

export default {
  name: "contactForm",
  title: "Contact form submissions",
  type: "document",
  initialValue: () => ({
    submitDate: new Date().toISOString()
  }),
  fields: [
    {
      title: 'Submitted date',
      name: 'submitDate',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      }
    },
    {
      name: 'opened',
      title: 'Mark as read?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      message: 'message',
      date: 'submitDate',
      opened: 'opened'
    },
    prepare({ name, email, date, message, opened }) {
      let parsedDate = parseISO(date)
      let formattedDate = format(parsedDate, "dd/MM/yy")
      const excerpt = message.length <= 20 ? message : `${message.substring(0, 20)}...`;
      
      const media = opened
      ? <HiOutlineMailOpen />
      : <HiMail />
      return {
        title: `${name} - ${excerpt}`,
        subtitle: `${formattedDate} ${email}`,
        media
      }
    }
  }
}
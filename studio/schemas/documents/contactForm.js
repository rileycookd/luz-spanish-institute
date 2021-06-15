import { parseISO, format } from 'date-fns'
import { BsChatDots } from 'react-icons/bs'

export default {
  name: "contactForm",
  title: "Contact form submissions",
  type: "document",
  icon: BsChatDots,
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
      date: 'submitDate'
    },
    prepare({ name, email, date, message }) {
      let parsedDate = parseISO(date)
      let formattedDate = format(parsedDate, "dd/MM/yy")
      const excerpt = message.length <= 20 ? message : `${message.substring(0, 20)}...`;
      console.log(typeof message)
      return {
        title: name,
        subtitle: `${formattedDate} ${excerpt}`
      }
    }
  }
}
import { FaChalkboardTeacher } from 'react-icons/fa'

export default {
  name: "registrationForm",
  title: "Registrations",
  icon: FaChalkboardTeacher,
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
      title: 'Payment recieved?',
      name: 'payment',
      type: 'boolean',
    },
    {
      name: "name",
      title: "Full name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "classType",
      title: "Class type",
      type: "string",
    },
    {
      name: "level",
      title: "Spanish level",
      type: "string",
    },
    {
      name: "classSize",
      title: "Class Size",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "string",
    },
    {
      name: "frequency",
      title: "Frequency",
      type: "string",
    },
  ],
  preview: {
    select: {
      name: 'name',
      classType: 'classType',
      quantity: 'quantity',
      classSize: 'classSize',
    },
    prepare ({ name, classType, quantity, classSize }) {
      let classSizeString = ''
      if(classSize) {
        classSizeString = `${classSize} student${Number(classSize) > 1 ? 's' : ''}`
      }

      return {
        title: name,
        subtitle: `${classType}: ${quantity}${classSizeString ? `, ${classSizeString}` : ''}`
      }
    }
  }
}
import { FaChalkboardTeacher } from 'react-icons/fa'

export default {
  name: "registrationForm",
  title: "Registrations",
  icon: FaChalkboardTeacher,
  type: "document",
  initialValue: () => ({
    submitDate: new Date().toISOString()
  }),
  fieldsets: [
    {name: 'admin', title: 'Admin'},
    {name: 'application', title: 'Application'}
  ],
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
      },
      fieldset: 'admin',
    },
    {
      title: 'Payment recieved?',
      name: 'payment',
      type: 'boolean',
      fieldset: 'admin',
    },
    {
      title: 'Assigned teacher',
      name: 'teacher',
      type: 'reference',
      to: { type: 'teacher' },
      fieldset: 'admin',
    },
    {
      name: "name",
      title: "Full name",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "classType",
      title: "Class type",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "level",
      title: "Spanish level",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "classSize",
      title: "Class Size",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "frequency",
      title: "Frequency",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "timezone",
      title: "Timezone",
      type: "string",
      fieldset: "application",
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        { type: 'string' }
      ],
      fieldset: "application",
    }
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
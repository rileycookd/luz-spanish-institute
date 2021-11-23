import React from 'react'
import { HiMail, HiOutlineMailOpen } from 'react-icons/hi'
import { GiCheckMark } from 'react-icons/gi'
import ComputedField from 'sanity-plugin-computed-field'
import { FaChalkboardTeacher, FaRubleSign } from 'react-icons/fa'
import { parseISO, format } from 'date-fns'


export default {
  name: "addRegistrationForm",
  title: "Registration",
  icon: FaChalkboardTeacher,
  type: "document",
  initialValue: () => ({
    submitDate: new Date().toISOString()
  }),
  fieldsets: [
    {name: 'admin', title: 'Admin'},
    {name: 'details', title: 'Details'}
  ],
  fields: [
    {
      title: 'Submitted date',
      name: 'submitDate',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'DD MMM YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      },
      fieldset: 'admin',
    },
    {
      name: 'state',
      title: 'Status',
      description: 'Change registration status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Active', value: 'active'},
          {title: 'Paused', value: 'paused'},
        ], // <-- predefined values
        layout: 'radio' // <-- defaults to 'dropdown'
      },
      initialValue: 'pending',
      fieldset: 'admin',
      validation: Rule => Rule.custom((status, context) => {
        let active = status === 'active'
        if (active && !context.document.teacher) {
          return 'Please select a teacher'
        }
        if (active && !context.document.students?.length >= 1) {
          return 'Please add students'
        }
        if (active && !context.document.language) {
          return 'Please choose a language'
        }
        if (active && !context.document.classType) {
          return 'Please select a class type'
        }
        if (active && !context.document.teacher) {
          return 'Please select a teacher'
        }
        if (active && !context.document.classSize) {
          return 'Please enter a class size'
        }
        if (active && !context.document.schedule?.length >= 1) {
          return 'Please add days to the schedule'
        }
        
        return true
      })
    },
    {
      title: 'Assigned teacher',
      name: 'teacher',
      type: 'reference',
      to: { type: 'teacher' },
      fieldset: 'admin',
      description: 'Only displaying teachers in applicant\'s target language',
      options: {
        filter: ({document}) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!document.language) {
            return;

          }
          return {
            filter: '_type == "teacher" && references($language->_id)',
            params: {
              language: document.language
            }
          }
        }
      }
    },
    {
      title: 'Related students',
      description: 'Choose an existing student (create a new student first if needed)',
      name: 'students',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: { type: 'student' },},
      ],
      fieldset: 'details',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'reference',
      to: [
        { type: 'language' }
      ],
      fieldset: 'details'
    },
    {
      name: 'classType',
      title: 'Class type',
      type: 'reference',
      to: [
        { type: 'classType' }
      ],
      fieldset: 'details',
      options: {
        filter: ({document}) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!document.language) {
            return;

          }
          return {
            filter: '_type == "classType" && references($language->_id)',
            params: {
              language: document.language
            }
          }
        }
      },
    },
    {
      name: 'level',
      title: 'Level',
      type: 'reference',
      to: [
        { type: 'level' }
      ],
      fieldset: 'details'
    },
    {
      name: "classSize",
      title: "Class Size",
      type: "string",
      fieldset: 'details',
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        { type: 'classDayTime' }
      ],
      fieldset: "details",
    }
  ],
  preview: {
    select: {
      name: 'name',
      classType: 'classType.title',
      classSize: 'classSize',
      date: 'submitDate',
      accepted: 'accepted',
      student1: 'students.0.name'
    },
    prepare ({ name, student1, accepted, date, classType, quantity, classSize }) {
      let classSizeString = ''
      let parsedDate = parseISO(date)
      let formattedDate = format(parsedDate, "dd/MM/yy")
      if(classSize) {
        classSizeString = `${classSize} student${Number(classSize) > 1 ? 's' : ''}`
      }

      let media = <HiMail />
      if(accepted) {
        media = <GiCheckMark />
      }

      return {
        title: `${student1}${classSize > 1 ? ` + ${classSize}` : ''}`,
        subtitle: `${formattedDate}: ${classType}`,
        media
      }
    }
  }
}
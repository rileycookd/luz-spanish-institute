import { FaUserGraduate } from 'react-icons/fa'

export default {
  name: 'student',
  type: 'document',
  title: 'Student',
  icon: FaUserGraduate,
  fieldsets: [
    {name: 'info', title: 'Student info'},
    {name: 'schedule', title: 'Scheduling'}
  ],
  initialValue: {
    status: false
  },
  fields: [
    {
      name: 'netlifyId',
      title: 'Netlify ID',
      type: 'string',
      hidden: true,
    },
    {
      name: 'status',
      title: 'Currently enrolled?',
      type: 'boolean',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Full name',
      fieldset: 'info'
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      fieldset: 'info'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      fieldset: 'info'
    },
    {
      name: "city",
      title: "City",
      type: "string",
      fieldset: 'info'
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      fieldset: 'info'
    },
    {
      name: "timezone",
      title: "Timezone",
      type: "string",
      fieldset: 'schedule'
    },
    { 
      name: 'schedule',
      title: 'Class schedule',
      type: 'array',
      of: [
        { type: 'classDayTime' }
      ],
      fieldset: 'schedule'
    },
    {
      name: 'classes',
      title: 'Classes',
      type: 'array',
      of: [
        { type: 'class' }
      ]
    },
    {
      name: "level",
      title: "Spanish level",
      type: "reference",
      to: [
        { type: 'level' }
      ]
    },
    {
      title: 'Assigned teacher',
      name: 'teacher',
      type: 'reference',
      to: { type: 'teacher' },
      // description: 'Only displaying teachers in applicant\'s target language',
      // options: {
      //   filter: ({document}) => {
      //     // Always make sure to check for document properties
      //     // before attempting to use them
      //     if (!document.language) {
      //       return;

      //     }
      //     return {
      //       filter: '_type == "teacher" && $language in languages[].language->.title',
      //       params: {
      //         language: document.language
      //       }
      //     }
      //   }
      // }
    },
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [
        { type: 'company' },
      ]
    },
    {
      name: 'image',
      title: 'Client photo',
      type: 'mainImage'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    },
    prepare ({ title, media }) {
      return {
        title,
        media
      }
    }
  }
}
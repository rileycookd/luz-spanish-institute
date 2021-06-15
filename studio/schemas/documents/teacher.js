import ComputedField from 'sanity-plugin-computed-field'
import { IoMdPerson } from 'react-icons/io'
import availability from '../objects/availability'

export default {
  name: 'teacher',
  type: 'document',
  title: 'Teacher',
  icon: IoMdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Full name'
    },

    {
      title: 'Languages taught',
      name: 'languages',
      type: 'array',
      of: [
        {
          type: 'languageLevelGroup',
        }
      ],
      validation: Rule => Rule.unique()
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'availability',
      description: 'Add time slots to open teacher availability',
    },
    {
      name: 'monday', 
      title: 'Monday',
      type: 'string',
      inputComponent: ComputedField,
      options: {
        editable: true,
        buttonText: "Recalculate",
        documentQuerySelection: `
          _id,
          availability,
          "monday": *[_type == "student" && references(^._id) && "monday" in schedule[].day && status == true &&!(_id in path("drafts.**"))] {
            schedule
          }
        `,
        reduceQueryResult: (r) => {
          console.log(r)
          const timeRanges = r.monday.map(m => m.schedule.filter(m => m.day === "monday")[0].time)
          console.log(timeRanges)
          const result = timeRanges.map(tr => `${tr.start}-${tr.end}`).join(', ')
          console.log(result)
          return result
        }
      },
    },
    {
      name: 'image',
      title: 'Teacher photo',
      type: 'mainImage'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      language0: 'languages.0.language.title',
      language1: 'languages.1.language.title',
      language2: 'languages.2.language.title',
      language3: 'languages.3.language.title',
      language4: 'languages.4.language.title',
    },
    prepare ({ title, media, language0, language1, language2, language3, language4 }) {
      const languages = [language0, language1, language2, language3, language4].filter(Boolean)
      const subtitle = languages.length > 0 ? `${languages.join(', ')}` : ''
      return {
        title,
        media,
        subtitle
      }
    }
  }
}

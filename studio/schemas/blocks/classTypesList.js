import { BsListUl } from 'react-icons/bs'

export default {
  name: 'classTypesList',
  title: 'Class types list',
  type: 'object',
  icon: BsListUl,
  fieldsets: [
    { name: 'cta', title: 'CTA' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'cta'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      fieldset: 'cta'
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      fieldset: 'cta'
    },
    {
      name: 'classTypes',
      title: 'Class types',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'classType' }
          ]
        }
      ],
      validation: Rule => Rule.unique()
    }
  ],
  preview: {
    select: {
      classType1: 'classTypes.0.title',
      classType2: 'classTypes.1.title',
      classType3: 'classTypes.2.title',
      classType4: 'classTypes.3.title'
    },
    prepare ({ classType1, classType2, classType3, classType4 }) {
      const classTypes = [classType1, classType2, classType3].filter(Boolean)
      const subtitle = classTypes.length > 0 ? `${classTypes.join(', ')}` : ''
      const hasMoreClassTypes = Boolean(classType4)
      return {
        title: 'Class types list',
        subtitle: hasMoreClassTypes ? `${subtitle}…` : subtitle
      }
    }
  }
}
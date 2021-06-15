import { IoLanguageOutline } from 'react-icons/io5'

export default {
  name: 'languageLevelGroup',
  title: 'Language / Levels',
  icon: IoLanguageOutline,
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'reference',
      to: [
        { type: 'language' }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'levels',
      title: 'Levels',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'level' }
          ]
        }
      ],
      validation: Rule => Rule.min(1).unique()
    }
  ],
  preview: {
    select: {
      language: 'language.title',
      levels0: 'levels.0.title',
      levels1: 'levels.1.title',
      levels2: 'levels.2.title',
      levels3: 'levels.3.title',
      levels4: 'levels.4.title',
      levels5: 'levels.5.title',
    },
    prepare({ language, levels0, levels1, levels2, levels3, levels4, levels5 }) {
      const levels = [levels0, levels1, levels2, levels3, levels4, levels5].filter(Boolean)
      const subtitle = levels.length > 0 ? `${levels.join(', ')}` : ''
      return {
        title: language,
        subtitle
      }
    }
  }
}
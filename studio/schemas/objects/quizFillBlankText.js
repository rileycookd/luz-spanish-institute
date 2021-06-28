import { MdSpaceBar } from 'react-icons/md'

export default {
  name: 'quizFillBlankText',
  title: 'Fill in the Text',
  type: 'object',
  icon: MdSpaceBar,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'string'
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Word bank', value: 'wordBank'},
          // {title: 'Drop down', value: 'dropDown'}
        ], // <-- predefined values
        layout: 'radio' // <-- defaults to 'dropdown'
      }
    },
    {
      name: 'text',
      description: 'EX: This is one [answer] and these are two [answer1; answer2].',
      type: 'text',
      validation: Rule => [
        Rule.custom((text) => {
          const re =  /\[[^\]]*\]/
          const result = text.match(re)
          if (result && result.length) {
            return true
          }  
          return 'Please enter an [answer] in brackets'
        })
      ]
      // validation: Rule => Rule.custom((array, context) => {
      //   if(context.parent.type === "dropDown") {
      //     const re =  /[^;]+/
      //     const errors = array.map(i => i.match(re))
      //     console.log(errors)
      //     // if (result && result.length) {
      //     //   console.log(context)
      //     //   return true
      //     // }  
      //     return 'inexplicable error'
      //   }
        
      //   return true
      // }),
    }
  ],
  preview: {
    select: {
      text: 'text'
    },
    prepare ({ text }) {
      const length = text.match(/\[.*?\]/g).length
      const num = length ? length : 0
      return {
        title: 'Fill in the text',
        subtitle: `${num} blank${num !== 1 ? 's' : ''}`
      }
    }
  }
}
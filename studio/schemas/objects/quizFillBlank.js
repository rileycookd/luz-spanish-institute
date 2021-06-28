import { MdSpaceBar } from 'react-icons/md'

export default {
  name: 'quizFillBlank',
  title: 'Fill in the blank',
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
      name: 'questions',
      description: 'EX: This is one [answer] and these are two [answer1; answer2].',
      type: 'array',
      of: [
        { 
          type: 'string',
          name: 'question',
          validation: Rule => [
            Rule.custom((question) => {
              const re =  /\[[^\]]*\]/
              const result = question.match(re)
              if (result && result.length) {
                return true
              }  
              return 'Please enter an [answer] in brackets'
            })
          ]
        }
      ],
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
      length: 'questions'
    },
    prepare ({ length }) {
      const num = length.length
      return {
        title: 'Fill in the blank',
        subtitle: `${num} question${num > 1 ? 's' : ''}`
      }
    }
  }
}
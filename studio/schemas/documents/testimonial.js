import { BsChatSquareQuote } from 'react-icons/bs'

export default {
  name: "testimonial",
  title: "Testimonial",
  type: 'document',
  icon: BsChatSquareQuote,
  fields: [  
    {
      name: 'name',
      title: 'Client name',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Client location',
      type: 'string'
    },
    {
      name: 'quote',
      title: 'Client quote',
      type: 'text',
    },
    {
      name: 'picture',
      title: 'Client photo',
      type: 'mainImage'
    }
  ]
}
import { BsChatSquareQuote } from 'react-icons/bs'

export default {
  name: "testimonial",
  title: "Testimonial",
  type: 'document',
  icon: BsChatSquareQuote,
  fields: [  
    {
      name: 'student',
      title: 'Student',
      type: 'reference',
      to: [
        { type: 'student' }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'quote',
      title: 'Client quote',
      type: 'text',
    },
  ],
  preview: {
    select: {
      name: 'student.name',
      quote: 'quote',
      photo: 'student.image'
    },
    prepare({ name, quote, photo }) {
      const excerpt = quote.length >= 35 ? `"${quote.substring(0, 35)}..."` : `"${quote}"`
      const title = name ? name : 'Anonymous'
      return {
        title: title,
        subtitle: excerpt,
        media: photo
      }
    }
  }
}
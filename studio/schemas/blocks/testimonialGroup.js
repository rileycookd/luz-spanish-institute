import { BsChatSquareQuote } from 'react-icons/bs'

export default {
  name: 'testimonialGroup',
  title: 'Testimonial group',
  icon: BsChatSquareQuote,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        { 
          type: 'reference', 
          to: [
            { type: 'testimonial' }
          ]
        }
      ],
      validation: Rule => Rule.unique()
    }
  ],
  preview: {
    select: {
      testimonial1: 'testimonials.0.name',
      testimonial2: 'testimonials.1.name',
      testimonial3: 'testimonials.2.name',
      testimonial4: 'testimonials.3.name'
    },
    prepare ({ testimonial1, testimonial2, testimonial3, testimonial4 }) {
      const testimonials = [testimonial1, testimonial2, testimonial3].filter(Boolean)
      const subtitle = testimonials.length > 0 ? `${testimonials.join(', ')}` : ''
      const hasMoretestimonials = Boolean(testimonial4)
      return {
        title: 'Testimonials',
        subtitle: hasMoretestimonials ? `${subtitle}…` : subtitle
      }
    }
  }
}
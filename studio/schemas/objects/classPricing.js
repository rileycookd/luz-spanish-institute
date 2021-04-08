import { BiTimeFive } from 'react-icons/bi'

export default {
  name: 'classPricing',
  title: 'Class pricing',
  icon: BiTimeFive,
  type: 'object',
  fields: [
    {
      name: 'duration',
      title: 'Duration',
      type: 'number',
      description: 'Enter the duration of each class (in minutes)',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Base price',
      type: 'number',
      description: 'Enter the base price for each class (in USD)',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      duration: 'duration',
      price: 'price',
    },
    prepare ({ duration, price }) {
      return {
        title: `${duration} minutes`,
        subtitle: `$${price}`
      }
    }
  }
}
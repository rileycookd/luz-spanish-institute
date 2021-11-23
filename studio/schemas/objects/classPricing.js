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
      title: 'Starting price',
      type: 'number',
      description: 'Enter the total price for each class (in USD)',
      validation: Rule => Rule.required()
    },
    {
      name: 'groupDiscounts',
      title: 'Additional student pricing',
      description: 'Vary pricing based on class size',
      type: 'array',
      of: [
        { type: 'groupDiscount' }
      ]
    }
  ],
  preview: {
    select: {
      duration: 'duration',
      price: 'price',
      discounts: 'groupDiscounts'
    },
    prepare ({ duration, price, discounts }) {
      let subtitle = `$${price}`
      if(discounts) {
        let sizes = discounts.map(d => d.size).sort((a, b) => {
          return a.size - b.size
        })
        let prices = discounts.map(d => d.price).sort((a,b) => {
          return a.price - b.price
        })
        subtitle = `${subtitle} - $${prices[prices.length-1]} | ${prices.length} discount${prices.length > 1 ? 's' : ''}`
      }
      return {
        title: `${duration} minutes`,
        subtitle
      }
    }
  }
}
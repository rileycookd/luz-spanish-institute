import { IoPricetags } from 'react-icons/io5'

export default {
  type: 'object',
  name: 'groupDiscount',
  title: 'Group discount',
  icon: IoPricetags,
  fields: [
    {
      name: 'size',
      title: 'Group size',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Enter total price for each class (in USD)',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      size: 'size',
      price: 'price',
    },
    prepare({ size, price }) {
      let title = 'Undefined'
      if(size && price) title = `${size} student${size > 1 ? 's' : ''} - $${price} ($${Math.round(((price / size) + Number.EPSILON) * 100) / 100} x ${size})`
      return {
        title
      }
    }
  }
}
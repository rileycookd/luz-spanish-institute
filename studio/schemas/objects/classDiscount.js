import { BsGiftFill } from 'react-icons/bs'

export default {
  name: 'packageDiscount',
  title: 'Package discount',
  icon: BsGiftFill,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Package title',
      description: 'i.e. "Monthly"',
      type: 'string'
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number'
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'number',
      description: 'Enter the percentage discount from the total base price (20 = 20%)'
    },
  ],
  preview: {
    select: {
      title: 'title',
      quantity: 'quantity',
      discount: 'discount',
    },
    prepare ({ title, quantity, discount }) {
      const totalClasses = quantity > 1 ? `${quantity} classes` : `${quantity} class`
      return {
        title: title,
        subtitle: `${totalClasses} (${discount}% off)`
      }
    }
  }
}
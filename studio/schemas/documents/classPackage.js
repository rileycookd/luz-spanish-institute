import { BsGiftFill } from 'react-icons/bs'

export default {
  name: 'classPackage',
  title: 'Class package',
  icon: BsGiftFill,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Package title',
      type: 'string'
    },
    {
      name: 'quantity',
      title: 'Number of classes',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.min(1).required(),
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.min(0).max(100),
      description: '(optional) Enter the percentage discount from the total base price (20 = 20%)'
    },
  ],
  preview: {
    select: {
      title: 'title',
      quantity: 'quantity',
      discount: 'discount',
      media: 'icon'
    },
    prepare ({ title, quantity, discount, media }) {
      const totalClasses = quantity > 1 ? `${quantity} classes` : `${quantity} class`
      return {
        title: title,
        subtitle: `${totalClasses} (${discount}% off)`,
        media,
      }
    }
  }
}
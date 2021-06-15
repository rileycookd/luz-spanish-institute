import { FaChalkboardTeacher } from 'react-icons/fa'

export default {
  name: 'classType',
  title: 'Class type',
  icon: FaChalkboardTeacher,
  type: 'document',
  fieldsets: [
    { 
      name: 'classSize', 
      title: 'Class size',
      options: {
        columns: 2
      }
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: '(i.e. "Private lessons")',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The relative route name (i.e. "private-lessons")',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Used for previews',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockText',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Main image',
      description: 'For displays in previews, headers, etc.',
      type: 'mainImage'
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      description: 'Base prices per student by class duration (for min class size)',
      of: [
        { type: 'classPricing' }
      ]
    },
    {
      name: 'min',
      title: 'Min students',
      type: 'number',
      description: '(Optional) Enter the minimum number of students',
      fieldset: 'classSize'
    },
    {
      name: 'max',
      title: 'Max students',
      type: 'number',
      description: '(Optional) Enter the max limit of students',
      fieldset: 'classSize'
    },
    {
      name: 'sizeDiscount',
      title: 'Discount per additional student',
      type: 'number',
      description: '(Optional) Enter percentage discount per additional student (20 = 20%)',
      fieldset: 'classSize',
      validation: Rule => Rule.positive().max(90).error('Discounts must be between 0 and 90%')
    },
    {
      name: 'maxDiscount',
      title: 'Discount limit',
      type: 'number',
      description: '(Optional) Set an upper limit to the percentage discount (80 = 80%)',
      fieldset: 'classSize',
      validation: Rule => Rule.min(Rule.valueOfField('sizeDiscount')).max(90).error('Limit must be between additional student discount and 90%')
    },
    {
      name: 'packages',
      title: 'Package discounts',
      type: 'array',
      of: [
        { type: 'packageDiscount' }
      ]
    },
    {
      name: 'testimonial',
      title: 'Featured testimonial',
      type: 'reference',
      to: [
        { type: 'testimonial' }
      ]
    },
    {
      name: 'faq',
      title: 'Related FAQ',
      type: 'reference',
      to: [
        { type: 'faq' }
      ]
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      max: 'max',
    },
    prepare ({ title, max }) {
      const size = max ? max : 'unlimited'
      return {
        title: title,
        subtitle: `Class size: ${size}`
      }
    }
  }
}
import SlugInput from 'sanity-plugin-better-slug'
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
      description: 'The relative route name (i.e. "my-resource-name")',
      inputComponent: SlugInput,
      options: {
        source: 'title',
        basePath: (document) => `${document.pathPrefix || 'classes'}`,
        maxLength: 100,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'pathPrefix',
      title: 'pathPrefix',
      hidden: true,
      type: 'string',
      initialValue: 'classes'
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        { 
          type: 'reference', 
          to: [
            { type: 'language' }
          ]
        }
      ],
      validation: Rule => Rule.required().unique()
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
      name: 'min',
      title: 'Min students',
      type: 'number',
      description: '(Optional) Enter the minimum number of students',
      fieldset: 'classSize',
      validation: Rule => Rule.required().min(1).max(Rule.valueOfField('max'))
    },
    {
      name: 'max',
      title: 'Max students',
      type: 'number',
      description: '(Optional) Enter the max limit of students',
      fieldset: 'classSize',
      validation: Rule => Rule.required().min(Rule.valueOfField('min'))
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
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [
            { title: 'Class package', type: 'classPackage'}
          ]
        }
      ],
      validation: Rule => Rule.required()
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
      min: 'min',
      max: 'max',
    },
    prepare ({ title, min, max }) {
      return {
        title: title,
        subtitle: `${min} - ${max} student${max > 1 ? 's' : ''}`
      }
    }
  },
  validation: Rule => Rule.custom(fields => {
    let isValid = true
    fields.pricing?.map(p => {
      p.groupDiscounts?.map(d => {
        if(d.size <= fields.min) isValid = `Group discount sizes must be greater than ${fields.min}`
        if(d.size > fields.max) isValid = `Group discount sizes must be less than ${fields.max + 1}`
      })
    })
    return isValid
  }),
}
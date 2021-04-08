import { BsCardHeading } from 'react-icons/bs'

export default {
  name: 'hero',
  title: 'Hero',
  icon: BsCardHeading,
  type: 'object',
  fieldsets: [
    { 
      name: 'cta', 
      title: 'CTA',
      description: '(Optional) only the first optional content will render',
      options: {
        collapsible: true,
        collapsed: true,
      }
    },
    { 
      name: 'navigation', 
      title: 'Navigation',
      description: '(Optional) only the first optional content will render',
      options: {
        collapsible: true,
        collapsed: true,
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: '(Optional)',
    },
    {
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['header', 'hero']
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'mainImage',
      description: 'Add a featured image',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'Call to action',
      fieldset: 'cta'
    },
    {
      name: 'navigation',
      title: 'Featured links',
      type: 'array',
      of: [
        { type: 'ctaLabel' },
      ], 
      fieldset: 'navigation'
    },
  ],
  preview: {
    select: {
      title: 'title',
      kind: 'kind',
    },
    prepare ({title, kind}) {
      let type = kind.charAt(0).toUpperCase() + kind.substring(1);
      return {
        title: type,
        subtitle: title
      }
    }
  }
}
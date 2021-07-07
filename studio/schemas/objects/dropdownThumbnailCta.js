import { MdLink } from 'react-icons/md'

export default {
  title: 'Thumbnail link',
  name: 'dropdownThumbnailCta',
  icon: MdLink,
  type: 'object',
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
      description: 'Only the first value of these will be used'
    }
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Overwrites the title of any referenced page',
      validation: Rule => Rule.max(25).warning('Must be no more than 25 characters')

    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: '(Optional) overwrites the description of any referenced page',
      validation: Rule => Rule.max(25).warning('Must be no more than 25 characters')
    },
    {
      title: 'Landing page',
      name: 'landingPageRoute',
      type: 'reference',
      fieldset: 'link',
      to: [{type: 'route'}]
    },
    {
      title: 'Inner page',
      name: 'innerPageRoute',
      type: 'reference',
      fieldset: 'link',
      to: [
        {type: 'resource'},
        {type: 'classType'}
      ]
    },
    {
      title: 'Path',
      name: 'route',
      fieldset: 'link',
      description: 'Example: /blog',
      type: 'string'
    },
    {
      title: 'External link',
      name: 'link',
      type: 'string',
      description: 'Example: https://www.sanity.io',
      fieldset: 'link'
    },
    {
      title: 'Image',
      description: 'Overrides main image of any referenced page',
      name: 'image',
      type: 'mainImage',
    }
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'landingPageRoute.slug.current',
      route: 'route',
      link: 'link',
      innerPageRoute: 'innerPageRoute.slug.current',
      innerPageTitle: 'innerPageRoute.title',
      innerPageImage: 'innerPageRoute.image'
    },
    prepare ({title, landingPage, innerPageRoute, innerPageTitle, innerPageImage, route, link}) {
      const linkTitle = innerPageTitle || title || 'Missing title'
      let media = innerPageImage || image 
      let subtitle = 'Not set'
      if (landingPage) {
        subtitle = `Route: /${landingPage}`
      }
      if (innerPageRoute) {
        subtitle = `Route: /${innerPageRoute}`
      }
      if (route) {
        subtitle = `Route: ${route}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title: linkTitle,
        subtitle,
        media
      }
    }
  }
}
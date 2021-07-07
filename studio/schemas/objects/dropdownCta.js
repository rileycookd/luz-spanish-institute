import { MdLink } from 'react-icons/md'

export default {
  title: 'Call to action',
  name: 'dropdownCta',
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
      description: 'This will be the link text',
      // validation: Rule => Rule.max(25).warning('Must be no more than 25 characters')

    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: '(Optional)',
      // validation: Rule => Rule.max(25).warning('Must be no more than 25 characters')
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
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'landingPageRoute.slug.current',
      route: 'route',
      link: 'link',
      innerPageRoute: 'innerPageRoute.slug.current',
      innerPageTitle: 'innerPageRoute.title',
    },
    prepare ({title, landingPage, innerPageRoute, innerPageTitle, route, link}) {
      const linkTitle = innerPageTitle || title || 'Missing title'
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
        subtitle
      }
    }
  }
}
import { BiLinkExternal as ExternalLinkIcon } from 'react-icons/bi'

export default {
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  blockEditor: {
    icon: ExternalLinkIcon
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean'
    }
  ]
}
import { VscReferences as InternalLinkIcon } from 'react-icons/vsc'

export default {
  name: 'internalLink',
  type: 'object',
  title: 'Internal Link',
  blockEditor: {
    icon: InternalLinkIcon
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [
        { type: 'resource' },
      ]
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean'
    }
  ]
}
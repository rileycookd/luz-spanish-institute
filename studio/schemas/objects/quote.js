import { GrBlockQuote as icon } from 'react-icons/gr';

export default {
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon,
  fields: [
    {
      name: 'quote',
      title: 'Main quote',
      type: 'text',
      options: {
        isHighlighted: true
      },
      rows: '4'
    },
    {
      name: 'creditName',
      title: 'Author credit',
      type: 'string',
    },
    {
      name: 'creditSource',
      title: 'Source',
      type: 'string',
    }
  ]
}
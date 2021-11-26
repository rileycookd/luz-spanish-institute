import { BsGiftFill } from 'react-icons/bs'
import { parseISO, format } from 'date-fns'


export default {
	name: 'registrationPackage',
	title: 'Registration package',
    icon: BsGiftFill,
	type: 'object',
	fields: [
    {
      name: 'quantity',
      title: 'Number of classes',
      type: 'number',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'active',
      title: 'Paid?',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Start date',
      name: 'start',
      type: 'date',
    },
    {
      name: 'end',
      title: 'End date',
      type: 'date',
    },
		{
			name: 'classes',
      title: 'Classes',
			type: 'array',
      of: [
        { type: 'class' },
      ],
		},
	],
  preview: {
    select: {
      classes: 'classes',
      start: 'start',
      end: 'end',
    },

    prepare ({ classes, start, end }) {
      let parsedStart = start ? parseISO(start) : ''
      let formattedStart = start ? format(parsedStart, "dd/MM/yy") : ''
      let parsedEnd = end ? parseISO(end) : ''
      let formattedEnd = end ? format(parsedEnd, "dd/MM/yy") : ''
      let dates = (start && end) ?`${formattedStart}-${formattedEnd}: ` : ''

      return {
        title: `${classes.length} class${classes.length === 1 ? '' : 'es'}`,
        subtitle: `${dates}`,
      }
    }
  }
}
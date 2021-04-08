import { BsCardText as Icon } from 'react-icons/bs'

export default {
  title: 'Description',
  name: 'description',
  type: 'object',
  icon: Icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockText'
    }
  ],
}
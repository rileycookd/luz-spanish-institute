import { IoPricetags } from 'react-icons/io5'

export default {
  name: 'category',
  title: 'Category',
  icon: IoPricetags,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }
  ]
}
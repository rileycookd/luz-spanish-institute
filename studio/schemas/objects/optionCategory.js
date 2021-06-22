// import { RiInsertColumnRight } from 'react-icons/ri'
import { MdWebAsset } from 'react-icons/md'

export default {
  name: 'optionCategory',
  title: 'Category',
  icon: MdWebAsset,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Category title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Items',
      type: 'array',
      of: [
        { type: 'string' }
      ]
    }
  ]
}
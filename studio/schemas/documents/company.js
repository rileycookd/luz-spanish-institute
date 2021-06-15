import { BsBuilding } from 'react-icons/bs'

export default {
  name: 'company',
  type: 'document',
  title: 'Company',
  icon: BsBuilding,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Company name'
    },
    {
      name: 'logo',
      title: 'Company logo',
      type: 'mainImage'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    },
    prepare({ title, media }) {
      return {
        title,
        media
      }
    }
  }
}
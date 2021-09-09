import { MdAssignment } from 'react-icons/md'

export default {
  name: 'homework',
  title: 'Homework',
  icon: MdAssignment,
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'due',
      title: 'Due date',
      type: 'datetime',
    }
  ]
}
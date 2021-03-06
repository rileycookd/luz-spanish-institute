
import timezones from "@vvo/tzdb/raw-time-zones.json";
import { MdBusiness } from 'react-icons/md'

const timeZoneOptions = timezones.map(t => `${t.name}`)

export default {
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  icon: MdBusiness,
  fieldsets: [
    {name: 'contact', title: 'Contact info', options: { collapsible: true, collapsed: false, columns: 2 }},
    {name: 'scheduling', title: 'Scheduling', options: { collapsible: true, collapsed: false, columns: 1 }},
    {name: 'social', title: 'Social media urls', options: { collapsible: true, collapsed: false, columns: 2 }},
  ],
  fields: [
    {
      name: 'name',
      title: 'Company name',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockText',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      fieldset: 'contact'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      fieldset: 'scheduling',
      options: {
        list: timeZoneOptions
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'address1',
      title: 'Address 1',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'address2',
      title: 'Address 2',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      fieldset: 'social'
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      fieldset: 'social'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'string',
      fieldset: 'social'
    }
  ]
}
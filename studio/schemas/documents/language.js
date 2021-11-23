import { IoLanguage } from 'react-icons/io5'
import React from 'react'
import Flag from 'react-world-flags'
 

const FlagComponent = ({ code }) => {
  return <Flag code={ code } />
}

export default {
  name: 'language',
  type: 'document',
  icon: IoLanguage,
  title: 'Language',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Language'
    },
    {
      name: 'code',
      type: 'string',
      title: 'Country code',
      description: 'Enter the two letter, three letter or three digit country code.'
    },
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code'
    },
    prepare(selection) {
      const {title, code} = selection
      return {
        title: title,
        
        // `media` takes a function, string or React element
        // Remember to import React from 'react' if you are rendering React components like below
      media: code ? <FlagComponent code={code} /> : <IoLanguage />
      }
    },
  }
}

import { BsFillImageFill as icon } from 'react-icons/bs';
import React from 'react';
import Unsplash from 'part:sanity-plugin-asset-source-unsplash/image-asset-source'
// import Default from 'part:sanity-plugin-media/asset-source'



export default {
  name: 'figure',
  title: 'Figure',
  type: 'image',
  icon,
  options: {
    hotspot: true,
    sources: [Unsplash]
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      description: 'Overrides the alt text from the media library',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: '(Optional) Overrides the image description from the media library',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      title: 'asset.title',
      imageUrl: 'asset.url',
      aspectRatio: 'asset.metadata.dimensions.aspectRatio',
      width: 'asset.metadata.dimensions.width',
      height: 'asset.metadata.dimensions.height'
    },
    prepare ({ title = 'Image', imageUrl, altText, aspectRatio, width, height}) {
      return {
        title,
        media: <img src={imageUrl} alt={altText} style={{objectFit: 'cover', width: '100%'}} />
      }
    }
  }
}
import Unsplash from 'part:sanity-plugin-asset-source-unsplash/image-asset-source'
// import Default from 'part:sanity-plugin-media/asset-source'

export default {
  name: 'mainImage',
  title: 'Main image',
  type: 'image',
  options: {
    hotspot: true,
    sources: [Unsplash]
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
      description: 'Overrides the alt text from the media library',
    }
  ]
}
